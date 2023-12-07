import { dynamicallyInsertedPostsPromise } from "./postHandling.mjs";

const API_BASE_URL = `https://api.noroff.dev/api/v1`;

async function commonApiRequest(url, method, data = null) {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.log("No access token available.");
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const options = {
      method: method,
      headers: headers,
    };

    // Only set 'Content-Type' to 'application/json' and include body if data is provided
    if (data !== null) {
      headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Request Error:", error.message);
    return null;
  }
}

async function updatePost(postId, updatedPostData) {
  const url = `${API_BASE_URL}/social/posts/${postId}`;
  return commonApiRequest(url, "PUT", updatedPostData);
}

const temporaryData = {
  title: "Updated rainforest title5",
  body: "Is this really a rainforest Updated",
  tags: ["#wetrainforest, #moist"],
  media: "https://shorturl.at/clzF0",
};

// updatePost(9023, temporaryData);

function reactionwrapped() {
  async function reactToPost(postId, symbol) {
    const url = `${API_BASE_URL}/social/posts/${postId}/react/${encodeURIComponent(symbol)}`;
    return commonApiRequest(url, "PUT");
  }

  // Example usage
  //   reactToPost(9023, "👍")
  //     .then((response) => {
  //       console.log("Reaction response:", response);
  //     })
  //     .catch((error) => {
  //       console.error("Error reacting to post:", error);
  //       alert("ERROR");
  //     });
}

export { reactionwrapped };

async function commentFormData() {
  try {
    // Wait for dynamicallyInsertedPosts to complete
    await dynamicallyInsertedPostsPromise;
    console.log("Now i can make comment functionality");

    const commentForm = document.getElementById("commentForm");
    const commentValue = document.getElementById("commentTextArea").value;
    console.log("This is thy comment", commentValue);
  } catch (error) {
    console.error("An error has occurred with commenting", error);
  }
}

export { commentFormData };

// async function commentFormData() {
//   await dynamicallyInsertedPosts();
//   const commentTextArea = document.getElementById("CommentTextarea");

//   if (commentTextArea) {
//     commentTextArea.addEventListener("input", (event) => {
//       console.log("Current value of textarea:", event.target.value);
//     });
//   } else {
//     console.log("CommentTextarea not found");
//   }
// }

// document.addEventListener("DOMContentLoaded", () => {
//   commentFormData();
// });

// export { commentFormData };

// async function commentOnPost(postId, commentData) {
//     const url = `${API_BASE_URL}/social/posts/${postId}/comment`;
//     return makeApiRequest(url, "POST", commentData);
//   }
