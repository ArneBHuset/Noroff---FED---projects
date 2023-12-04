const API_BASE_URL = `https://api.noroff.dev/api/v1`;

async function retrieveApiPostData(tag = "", active = true) {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.log("No access token available.");
      return;
    }
    const url = `${API_BASE_URL}/social/posts?_tag=${encodeURIComponent(
      tag
    )}&_active=${active}`;

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
  } catch (error) {
    console.log("Error:", error.message);
  }
}

export { retrieveApiPostData };

// Section for creating post
async function dynamicallyInsertedPosts() {
  document.getElementById("spinner").style.display = "block";
  // Delaying the spinner for cool visual effect
  await new Promise((resolve) => setTimeout(resolve, 1500));
  // Fetching posts
  const posts = await retrieveApiPostData("my_tag", true);
  console.log("postsdata", posts);
  document.getElementById("spinner").style.display = "none";
  if (posts && Array.isArray(posts)) {
    const postsContainer = document.getElementById("SocialPostsCard");
    postsContainer.innerHTML = "";
    posts.forEach((post) => {
      // Construct post HTML
      const postHtml = `<div class="custom-card mb-5">
      <div class="card-header">
        <span id="postID">${post.id}</span>
        <span id="postTitle">${post.title}</span>
        <span id="postCreationDate">${post.created}</span>
        <span id="postUpdatedDate">${post.updated}</span>
      </div>
      <div class="card-body"></div>`;
      postsContainer.innerHTML += postHtml;
    });
  } else {
    console.log("ERROR with dynamic posts");
  }
}

export { dynamicallyInsertedPosts };

{
  /* 
    //     <span>
    //       <img */
}
//         src="../src/img/Page1backG.png"
//         class="card-img"
//         alt="..."
//         width=""
//         height=""
//       />
//     </span>
//   </div>
//   <div class="card-footer text-body-secondary">
//     <div>
//       <button
//         type="button"
//         class="btn btn-secondary"
//         data-bs-container="body"
//         data-bs-toggle="popover"
//         data-bs-placement="bottom"
//         data-bs-trigger="hover"
//         v
//         data-bs-content="Bottom popover"
//       >
//         <span id="postAuthor">Author</span>
//       </button>

//       <span id="postAuthorEmail">Author email</span>
//       <span id="postAuthorAvatar">Author avatar</span>
//       <span id="postAuthorBanner"> Author banner</span>
//     </div>
//     <div>
//       <span id="postReactions">Reactions</span>
//       <span id="postReactionsSymbol">Symbol</span>
//       <span id="postReactionsCount">Reactions count</span>
//       <span id="postReactionsId">ReactionsID</span>
//       <span id="postReactionsMessage">Message</span>
//     </div>
//     <div>
//       <span id="postComments">Comments</span>
//       <span id="postCommentsBody">commentsBody</span>
//       <span id="postCommentsReplyToId">replytoID</span>
//       <span id="postCommentsId">commentspostID</span>
//       <span id="postCommentsBody">commentsBody</span>
//       <span id="postCommentsOwner">commentsOwner?</span>
//       <span id="postCommentsDate">commentsDate</span>
//       <span id="postCommentsAuthor">commentsAuthor</span>
//       <span id="postAuthorEmail">Author email</span>
//       <span id="postAuthorAvatar">Author avatar</span>
//       <span id="postAuthorBanner"> Author banner</span>
//     </div>
//     <div>
//       <span id="postCountComments">CommentsCount</span>
//       <span id="postCountReactions">ReactionsCount</span>
//     </div>
//   </div>
// </div>
