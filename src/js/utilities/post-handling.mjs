import { attachCommentFormListeners, attachReactionListeners, attachUpdateFormListeners } from "./post-interaction.mjs";

const API_BASE_URL = `https://api.noroff.dev/api/v1`;

async function retrieveApiPostData(url) {
  try {
    // Retriving the key that has allready been stored from login
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.log("No access token available.");
      return;
    }

    const getData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, getData);
    // console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    // console.log("JSON POSTS DATA:", json);
    return json;
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
}

function createPostHtml(post) {
  let thumbsUpCount = 0;
  let thumbsDownCount = 0;
  let heartCount = 0;

  if (post.reactions) {
    post.reactions.forEach((reaction) => {
      switch (reaction.symbol) {
        case "👍":
          thumbsUpCount = reaction.count;
          break;
        case "👎":
          thumbsDownCount = reaction.count;
          break;
        case "❤️":
          heartCount = reaction.count;
          break;
        default:
          break;
      }
    });
  }

  let commentsHtml = "";
  if (post.comments) {
    commentsHtml = post.comments
      .map(
        (comment) =>
          `<div class="post-profile-picture border-bottom my-3 border-primary">
       
        <img src="${comment.author.avatar || "../src/img/avatar.jpg"}" class="post-profile-picture">
        <span class="custom-title-font">${comment.author.name}<br>${comment.created} <br></span>
        <span class="custom-text-font"> ${comment.body}</span>
      </div>`
      )
      .join("");
  }

  let authorHtml = "";
  if (post.author) {
    authorHtml = `<img src="${post.author.avatar || "../src/img/avatar.jpg"}" class="post-profile-picture">
                  ${post.author.name} (${post.author.email})`;
  }

  return `
    <div id="${post.id}" class="custom-card my-3">
      <div class="card-header row  m-0 pt-1 ">
        <span id="postID_${post.id}" class="col-3 col-md-3 custom-title-font fs-6 ps-1 ps-md-3 mt-md-2">#${post.id}</span>
        <span id="postCreationDate_${post.id}" class="col-9 col-md-6 custom-title-font fs-6 p-0 mt-md-2 text-center">${post.created}</span>
        <div class="col-12 col-md-3 d-flex custom-title-font justify-content-center gap-2 ms-md-0">
        <button type="button" class="btn p-1 btn-post-top-corner bg-warning" data-bs-toggle="modal" data-bs-target="#exampleModal_${post.id}">
          Update
        </button>
        <button id="${post.id}" class="btn p-1 deletePostBtn btn-post-top-corner bg-danger ">
        Delete
        </button>
        </div>
        <div class="col-12 col-md-4 mt-4 ms-3 ms-md-0 custom-title-font post-profile-picture" id="postAuthor_${post.id}">${authorHtml}</div>
        <div class="col-12 col-md-8 mt-4  ms-3 ms-md-0 text-left custom-title-font fs-4 fw-medium" id="postTitle_${post.id}">${post.title}</div>
      </div>
      <div class="modal fade" id="exampleModal_${post.id}" tabindex="-1" aria-labelledby="exampleModalLabel_${post.id}" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title" id="exampleModalLabel_${post.id}">Update post ${post.id} <br> ${post.title}</h3>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="container id="updatePostForm">
              <div class="mb-3">
                <label for="updateTitleInput" class="form-label">Update title</label>
                <input type="text" class="form-control" id="updateTitleInput"/>
              </div>
              <div class="mb-3">
                <label for="updatePostTextarea" class="form-label">Update post</label>
                <textarea class="form-control" id="updatePostTextarea" rows="3"></textarea>
              </div>
              <div class="mb-3">
                <label for="updateFileInput" class="form-label">Update picture/video</label>
                <input type="text" class="form-control" id="updateFileInput" value="https://shorturl.at/lnryW" />
              </div>
              <div class="mb-3">
                <label for="updateTagsInput" class="form-label">Tags</label>
                <input type="text" class="form-control" id="updateTagsInput" placeholder="Add tags, #moist" />
              </div>
              <button type="submit" id="updateSubmit" class="btn btn-primary">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
      <div class="card-body p-0">
        <img src="${post.media || "../src/img/Image_not_available.png"}" alt="${post.title}" class="card-img">
      </div>
      <div class="row card-footer p-1 text-body-secondary m-0 pt-2">
        <div class="col-12 col-md-7 my-2 custom-text-font fs-5">${post.body}</div>
        <div class="col-12 col-md-5 reaction-section text-center">
          <button type="button" class="reactionSymbol" id="reactThumbsUp_${post.id}">👍</button> <span>${thumbsUpCount}</span>
          <button type="button" class="reactionSymbol" id="reactThumbsDown_${post.id}">👎</button> <span>${thumbsDownCount}</span>
          <button type="button" class="reactionSymbol" id="reactHeart_${post.id}">❤️</button> <span>${heartCount}</span>
        </div>
        <div class="col-12 comments-section p-2">
          <span class="custom-title-font fw-medium fs-5" id="postComments">Comments:</span>
          <div id="postCommentsBody" class="p-1">${commentsHtml}</div>
          <form id="commentForm" class="comment-Form" type="post" data-post-id="${post.id}">
            <div class="mt-3">
              <label for="commentTextArea_${post.id}" class="form-label">Comment</label>
              <textarea class="form-control commentTextArea" id="commentTextArea"_${post.id} rows="2"></textarea>
            </div>
            <button type="submit" class="btn btn-primary" id="commentSubmitBtn_${post.id}">Add comment</button>
          </form>
        </div>
        <div class="col-12">
          <span id="postTags_${post.id}">Tags: ${post.tags.join(", ")}</span>
        </div>
      </div>
      <div class="mt-2 col-12">
        <span id="postCountComments_${post.id}">${post._count.comments} Comments</span>
        <span id="postCountReactions_${post.id}">${post._count.reactions} Reactions</span>
      </div>
    </div>
  `;
}

let resolveDynamicallyInsertedPosts;
export const dynamicallyInsertedPostsPromise = new Promise((resolve) => {
  resolveDynamicallyInsertedPosts = resolve;
});

let currentFilters = { tagFilter: "", includeAuthor: true, includeComments: true, includeReactions: true };

async function dynamicallyInsertedPosts({ tagFilter = "", includeAuthor = true, includeComments = true, includeReactions = true }) {
  tagFilter = tagFilter.trim();

  if (JSON.stringify(currentFilters) === JSON.stringify({ includeAuthor, includeComments, includeReactions })) {
    return;
  }

  console.log("Running dynamicallyInsertedPosts");
  currentFilters = { tagFilter, includeAuthor, includeComments, includeReactions };

  const loadingSpinner = document.getElementById("spinner");
  loadingSpinner.classList.remove("d-none");
  loadingSpinner.classList.add("d-flex");

  await new Promise((resolve) => setTimeout(resolve, 0));

  let postsUrl = `${API_BASE_URL}/social/posts/`;
  const queryParams = [];
  if (tagFilter) queryParams.push(`_tag=${encodeURIComponent(tagFilter)}`);
  if (includeAuthor) queryParams.push("_author=true");
  if (includeComments) queryParams.push("_comments=true");
  if (includeReactions) queryParams.push("_reactions=true");
  if (queryParams.length > 0) postsUrl += `?${queryParams.join("&")}`;

  const response = await retrieveApiPostData(postsUrl);
  loadingSpinner.classList.remove("d-flex");
  loadingSpinner.classList.add("d-none");

  const postsContainer = document.getElementById("SocialPostsCard");
  postsContainer.innerHTML = "";

  if (Array.isArray(response)) {
    response.forEach((post) => (postsContainer.innerHTML += createPostHtml(post)));
  } else if (response && typeof response === "object") {
    postsContainer.innerHTML = createPostHtml(response);
  } else {
    console.log("ERROR with dynamic posts");
    postsContainer.innerHTML = `<h5 class="d-flex justify-content-center text-warning text-center">ERROR! Cannot retrieve any posts, please reload or come back later</h5>`;
  }
  console.log("listerners reloaded in Dynamicallinsertespostss!");
  attachCommentFormListeners();
  attachReactionListeners();
  attachUpdateFormListeners();
}

async function filteringOptionsUpdate() {
  const updateFiltersAndPosts = () => {
    const tagInput = document.getElementById("tagsInputValue").value;
    const includeAuthor = document.getElementById("authorFiltering").checked;
    const includeComments = document.getElementById("commentsFiltering").checked;
    const includeReactions = document.getElementById("reactionsFiltering").checked;
    dynamicallyInsertedPosts({ tagFilter: tagInput, includeAuthor, includeComments, includeReactions });
  };

  document.getElementById("tagFilteringBtn").addEventListener("click", updateFiltersAndPosts);
  document.getElementById("authorFiltering").addEventListener("change", updateFiltersAndPosts);
  document.getElementById("commentsFiltering").addEventListener("change", updateFiltersAndPosts);
  document.getElementById("reactionsFiltering").addEventListener("change", updateFiltersAndPosts);
}
async function loadPosts() {
  dynamicallyInsertedPosts(currentFilters);
  attachCommentFormListeners();
  attachReactionListeners();
  attachUpdateFormListeners();
  console.log("Load posts functino has ran");
}

export { dynamicallyInsertedPosts, filteringOptionsUpdate, loadPosts };
