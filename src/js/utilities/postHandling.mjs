const API_BASE_URL = `https://api.noroff.dev/api/v1`;

async function retrieveApiPostData(url) {
  try {
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

// retrieveApiPostData(postsUrl);
// export { retrieveApiPostData };

// Section for creating post
function createPostHtml(post) {
  return `<div class="custom-card mb-5">
  <div class="card-header row text-center pt-2">
    <span id="postID_${post.id}" class="col-4 col-md-2">#${post.id}</span>
    <span id="postTitle_${post.id}" class="col-4 col-md-6">${post.title}</span>
    <button
      class="col-3 col-md-4 custom-popover-btn"
      data-bs-container="body"
      data-bs-toggle="popover"
      data-bs-trigger="hover"
      data-bs-placement="bottom"
      data-bs-content="Updated"
    >
      <span id="postCreationDate_${post.id}">Created</span>
    </button>
  </div>
  <div class="card-body">
    <img src="${
      post.media || "../src/img/Page1backG.png"
    }" class="card-img" alt="${post.title}" />
  </div>
  <div class="row card-footer text-body-secondary m-0">
    <!-- Author Section -->
    <div class="col-12 col-md-6">
      <button
        class="custom-popover-btn"
        data-bs-container="body"
        data-bs-toggle="popover"
        data-bs-trigger="hover"
        data-bs-placement="bottom"
        data-bs-content="Author email, Author avatar, Author banner"
      >
        <span id="postAuthor_${post.id}" class="text-danger">${
    post.author
  }</span>
      </button>
    </div>
    <!-- Reactions Section -->
    <div id="postReactions_${post.id}" class="col-12 col-md-6">
      <!-- Dynamically insert reactions here -->
    </div>
    <!-- Comments Section -->
    <div class="col-12">
      <p>
        <a class="" data-bs-toggle="collapse" href="#collapseComments_${
          post.id
        }" role="button" aria-expanded="true" aria-controls="collapseComments_${
    post.id
  }">
          <span id="postComments_${post.id}">Comments</span>
        </a>
      </p>
      <div class="collapse" id="collapseComments_${post.id}">
        <div class="card card-body text-primary p-0 m-0">
          <!-- Dynamically insert comments here -->
        </div>
      </div>
    </div>
    <!-- Post Counts Section -->
    <div class="mt-2">
      <span id="postCountComments_${post.id}">${
    post._count.comments
  } Comments</span>
      <span id="postCountReactions_${post.id}">${
    post._count.reactions
  } Reactions</span>
    </div>
  </div>
</div>
`;
}

async function dynamicallyInsertedPosts() {
  const loadingSpinner = document.getElementById("spinner");
  loadingSpinner.classList.remove("d-none");
  loadingSpinner.classList.add("d-flex");
  // Delaying the spinner for cool visual effect
  await new Promise((resolve) => setTimeout(resolve, 400));
  const postsUrl = `${API_BASE_URL}/social/posts/89fdsdf28fsd`;
  const response = await retrieveApiPostData(postsUrl);
  // console.log("!response data!", response);
  loadingSpinner.classList.remove("d-flex");
  loadingSpinner.classList.add("d-none");
  const postsContainer = document.getElementById("SocialPostsCard");
  postsContainer.innerHTML = "";
  if (Array.isArray(response)) {
    //  multiple posts
    response.forEach(
      (post) => (postsContainer.innerHTML += createPostHtml(post))
    );
  } else if (response && typeof response === "object") {
    //  single post
    postsContainer.innerHTML = createPostHtml(response);
  } else {
    console.log("ERROR with dynamic posts");
    postsContainer.innerHTML = `<h5 class="d-flex justify-content-center text-warning text-center">ERROR! Cannot retrieve any posts,</br> please reload or come back later</h5>`;
  }
}

export { dynamicallyInsertedPosts };
