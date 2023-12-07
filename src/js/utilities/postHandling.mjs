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
  return `<div id="${post.id}"class="custom-card mb-5">
  <button id="${post.id}" class="deletePostBtn col-1 custom-popover-btn text-center">
  <span class="material-symbols-outlined p-0">cancel</span>
</button> 
    <div class="card-header row text-center m-0 ">
      <span id="postID_${post.id}" class="col-6 ">#${post.id}</span>
      <button
 class="col-3 col-md-4 custom-popover-btn"
data-bs-container="body"
data-bs-toggle="popover"
data-bs-trigger="hover"
data-bs-placement="bottom"
data-bs-content="fds">
<span id="postCreationDate_${post.id}" class="col-6">${post.created}</span>
</button>

      
  
      <span id="postTitle_${post.id}" class="col-12">${post.title}</span>
    </div>
    <div class="card-body">
      <img src="${post.media || "../src/img/Image_not_available.png"}" class="card-img" alt="${post.title}" />
      
      <div>Tags: ${post.tags.join(", ")}</div>
    </div>
    <div class="row card-footer text-body-secondary m-0">
    <div class="col-12"><p>${post.body}</p></div>
    <div class="col-12">       
                                  <span id="postComments">Comments</span> 
                                  </button>
                                  <span
                                    id="postCommentsBody"
                                    class="border text-center p-0"
                                    >This be where the comments comes</span>
                                    <form id="commentForm">
                                    <div class="mt-3">
                                      <label for="CommentTextarea" class="form-label">Comment</label>
                                      <textarea class="" id="commentTextArea" rows="2"></textarea>
                                    </div>
                                    <button type="submit" class="btn btn-primary" id="commentSubmitBtn">Submit</button>
                                    </form>
                                </div>            
                            </div>
      <div class="mt-2 col-12">
        <span id="postCountComments_${post.id}">${post._count.comments} Comments</span>
        <span id="postCountReactions_${post.id}">${post._count.reactions} Reactions</span>
      </div>
    </div>
  </div>`;
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

  const postsUrl = `${API_BASE_URL}/social/posts/9043`;
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

export { dynamicallyInsertedPosts };
