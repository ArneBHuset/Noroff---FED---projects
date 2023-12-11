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
    console.log(response);
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

// retrieveApiPostData(postsUrl);
// export { retrieveApiPostData };

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
          `<div class="post-profile-picture">
        ${comment.body}<br>
        <img src="${comment.author.avatar || "../src/img/avatar.jpg"}" class="post-profile-picture">
        ${comment.author.name}<br>${new Date(comment.created).toLocaleString()}
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
    <div id="${post.id}" class="custom-card mb-5">
      <div class="card-header row text-center m-0 p-0">
        <span id="postID_${post.id}" class="col-4">#${post.id}</span>
        <span id="postCreationDate_${post.id}" class="col-4">${new Date(post.created).toLocaleString()}</span>
        <div class="col-2 corner-btn-position">
        <button type="button" class="btn-post-top-corner bg-primary" data-bs-toggle="modal" data-bs-target="#exampleModal_${post.id}">
          Update
        </button>
        <button id="${post.id}" class="deletePostBtn btn-post-top-corner bg-danger ">
        Delete
        </button>
        </div>
        <div class="col-5 post-profile-picture">${authorHtml}</div>
        <div class="col-6" id="postTitle_${post.id}">${post.title}</div>
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
      <div class="card-body">
        <img src="${post.media || "../src/img/Image_not_available.png"}" alt="${post.title}" class="card-img">
      </div>
      <div class="row card-footer text-body-secondary m-0">
        <div class="col-8">${post.body}</div>
        <div class="col-4 reaction-section">
          <button type="button" class="reactionSymbol" id="reactThumbsUp_${post.id}">👍</button> <span>${thumbsUpCount}</span>
          <button type="button" class="reactionSymbol" id="reactThumbsDown_${post.id}">👎</button> <span>${thumbsDownCount}</span>
          <button type="button" class="reactionSymbol" id="reactHeart_${post.id}">❤️</button> <span>${heartCount}</span>
        </div>
        <div class="col-12 comments-section">
          <span id="postComments_${post.id}">Comments</span>
          <div id="postCommentsBody_${post.id}" class="border text-center p-0">${commentsHtml}</div>
          <form id="commentForm_${post.id}" data-post-id="${post.id}">
            <div class="mt-3">
              <label for="commentTextArea_${post.id}" class="form-label">Comment</label>
              <textarea class="form-control" id="commentTextArea_${post.id}" rows="2"></textarea>
            </div>
            <button type="submit" class="btn btn-primary" id="commentSubmitBtn_${post.id}">Submit</button>
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
  if (JSON.stringify(currentFilters) === JSON.stringify({ includeAuthor, includeComments, includeReactions })) {
    return;
  }
  currentFilters = { tagFilter, includeAuthor, includeComments, includeReactions };

  const loadingSpinner = document.getElementById("spinner");
  loadingSpinner.classList.remove("d-none");
  loadingSpinner.classList.add("d-flex");

  await new Promise((resolve) => setTimeout(resolve, 200));

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
  resolveDynamicallyInsertedPosts();
}

// Running posts without any filters to begin with
dynamicallyInsertedPosts({
  tagFilter: "",
  isActive: true,
  includeAuthor: true,
  includeComments: true,
  includeReactions: true,
});

function filteringOptions() {
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

filteringOptions();

export { dynamicallyInsertedPosts };
