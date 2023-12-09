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
    console.log("JSON POSTS DATA:", json);
    return json;
  } catch (error) {
    console.log("Error:", error.message);
    return null;
  }
}

// retrieveApiPostData(postsUrl);
// export { retrieveApiPostData };

// Section for creating post
function createPostHtml(post) {
  let reactionsHtml = "";
  if (post.reactions) {
    post.reactions.forEach((reaction) => {
      reactionsHtml += `<div>${reaction.symbol} - Count: ${reaction.count}</div>`;
    });
  }

  let commentsHtml = "";
  if (post.comments) {
    post.comments.forEach((comment) => {
      commentsHtml += `<div>${comment.body} - Author: ${comment.author.name}</div>`;
    });
  }
  // Constructing the HTML
  return `<div id="${post.id}" class="custom-card mb-5">
 
  <div class="card-header row text-center m-0 ">
    <span id="postID_${post.id}" class="col-6 ">#${post.id}</span>
    <span id="postCreationDate_${post.id}" class="col-6">${post.created}</span>
    <button type="button" class="btn-primary col-1" data-bs-toggle="modal" data-bs-target="#exampleModal_${post.id}">
      Update post
    </button>
    <button id="${post.id}" class="deletePostBtn col-1 custom-popover-btn text-center">
    <span class="material-symbols-outlined p-0">cancel</span>
    </button> 
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
    <span id="postTitle_${post.id}" class="col-12">${post.title}</span>
    <span id="postCreationDate_${post.id}" class="col-6">${post.updated}</span>
  </div>
  <div class="card-body">
    <img src="${post.media || "../src/img/Image_not_available.png"}" class="card-img" alt="${post.title}" />
  </div>
  <div class="row card-footer text-body-secondary m-0">
    <div class="col-8"><p>${post.body}</p></div>
    <div class="col-4">
       <button type="button" class="reactionSymbol" id="reactThumbsUp_${post.id}">👍</button>
       <button type="button" class="reactionSymbol" id="reactThumbsDown_${post.id}">👎</button>
      <button type="button" class="reactionSymbol" id="reactHeart_${post.id}">❤️</button>
    </div>

    <div class="col-12">
      <span id="postComments_${post.id}">Comments</span>
      <span id="postCommentsBody" class="border text-center p-0">${commentsHtml}</span>
      <form id="commentForm" data-post-id="${post.id}">
        <div class="mt-3">
          <label for="commentTextArea" class="form-label">Comment</label>
          <textarea class="form-control" id="commentTextArea" rows="2"></textarea>
        </div>
        <button type="submit" class="btn btn-primary" id="commentSubmitBtn_${post.id}">Submit</button>
      </form>
    </div>
    <div class="col-12">
    <span id="postTags_${post.id}">${post.tags}</span>
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

async function dynamicallyInsertedPosts(tagFilter = "", isActive = true) {
  const loadingSpinner = document.getElementById("spinner");
  loadingSpinner.classList.remove("d-none");
  loadingSpinner.classList.add("d-flex");

  await new Promise((resolve) => setTimeout(resolve, 200));

  let postsUrl = `${API_BASE_URL}/social/posts/`;
  const queryParams = ["_author=true", "_comments=true", "_reactions=true"]; // Include author, comments, and reactions

  if (tagFilter) queryParams.push(`_tag=${encodeURIComponent(tagFilter)}`);
  if (!isActive) queryParams.push("_active=false");
  if (queryParams.length) postsUrl += `?${queryParams.join("&")}`;

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

dynamicallyInsertedPosts("", true);

function filteringOptions() {
  document.getElementById("tagFilteringBtn").addEventListener("click", () => {
    let tagInput = document.getElementById("tagsInputValue").value;
    const isActive = !document.getElementById("activeFiltering").checked;
    console.log(tagInput, isActive);
    dynamicallyInsertedPosts(tagInput, isActive);
  });

  document.getElementById("tagsInputValue").addEventListener("input", (e) => {
    if (e.target.value && !e.target.value.startsWith("#")) {
      e.target.value = "#" + e.target.value.replace(/#/g, "");
    }
  });

  document.getElementById("activeFiltering").addEventListener("change", () => {
    const tagInput = document.getElementById("tagsInputValue").value;
    const isActive = !document.getElementById("activeFiltering").checked;

    dynamicallyInsertedPosts(tagInput, isActive);
  });
}

filteringOptions();

export { dynamicallyInsertedPosts };
