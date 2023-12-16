import { loadPosts } from "./post-handling.mjs";
import { API_BASE_URL } from "./global-values.mjs";

async function authenticateForDeletion(url) {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.log("No access token available.");
      return;
    }

    const DeleteData = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, DeleteData);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("Post deleted successfully");
    return response;
  } catch (error) {
    console.log("Error:", error.message);
    const DeleteErrorDisplay = document.getElementById("postsGeneralError");
    DeleteErrorDisplay.innerHTML += `<p class="text-warning text-center">!!! Error with deleting post</br>contact site owner if problem persists${error}</p>`;
    return null;
  }
}

function postDeletion() {
  document.addEventListener("click", function (event) {
    let clickedElement = event.target;
    while (clickedElement) {
      if (clickedElement.className.includes("deletePostBtn")) {
        const postId = clickedElement.id;
        const deleteUrl = `${API_BASE_URL}/social/posts/${postId}`;
        authenticateForDeletion(deleteUrl)
          .then(() => {
            // console.log(`Post ${postId} deleted`);
            loadPosts();
          })
          .catch((error) => {
            console.error("Failed to delete post:", error);
          });
        return;
      }
      clickedElement = clickedElement.parentElement;
    }
  });
}

export { postDeletion };
