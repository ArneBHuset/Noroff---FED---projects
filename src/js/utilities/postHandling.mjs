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

// Section for creating post
function createPostHtml(post) {
  // Constructing the HTML
  return `<div id="${post.id}" class="custom-card mb-5">
  <button id="${post.id}" class="deletePostBtn col-1 custom-popover-btn text-center">
    <span class="material-symbols-outlined p-0">cancel</span>
  </button> 
  <div class="card-header row text-center m-0 ">
    <span id="postID_${post.id}" class="col-6 ">#${post.id}</span>
    <button class="col-4 col-md-4 custom-popover-btn"
            data-bs-container="body"
            data-bs-toggle="popover"
            data-bs-trigger="hover"
            data-bs-placement="bottom"
            data-bs-content="fds">
      <span id="postCreationDate_${post.id}" class="col-6">${post.created}</span>
    </button>
    <button type="button" class="btn-primary col-1" data-bs-toggle="modal" data-bs-target="#exampleModal_${post.id}">
      Update
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
  </div>
  <div class="card-body">
    <img src="${post.media || "../src/img/Image_not_available.png"}" class="card-img" alt="${post.title}" />
    <div>Tags: ${post.tags.join(", ")}</div>
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
      <span id="postCommentsBody_${post.id}" class="border text-center p-0">${post.comments}</span>
      <form id="commentForm" data-post-id="${post.id}">
        <div class="mt-3">
          <label for="commentTextArea_${post.id}" class="form-label">Comment</label>
          <textarea class="form-control" id="commentTextArea_${post.id}" rows="2"></textarea>
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
async function dynamicallyInsertedPosts() {
  const loadingSpinner = document.getElementById("spinner");
  loadingSpinner.classList.remove("d-none");
  loadingSpinner.classList.add("d-flex");

  await new Promise((resolve) => setTimeout(resolve, 200));

  const postsUrl = `${API_BASE_URL}/social/posts/?_tag=#wetrainforest, #moist`;
  const response = await retrieveApiPostData(postsUrl);
  // console.log(response);
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

function filteringOptions() {}

export { dynamicallyInsertedPosts };
