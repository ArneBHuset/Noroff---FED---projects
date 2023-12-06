const API_BASE_URL = `https://api.noroff.dev/api/v1`;

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
    return null;
  }
}

function postDeletion() {
  document.addEventListener("click", function (event) {
    let clickedElement = event.target;
    while (clickedElement) {
      if (clickedElement.className.includes("deletePostBtn")) {
        const postId = clickedElement.id;
        console.log("Delete button clicked for post ID:", postId);

        const deleteUrl = `${API_BASE_URL}/social/posts/${postId}`;
        authenticateForDeletion(deleteUrl)
          .then(() => {
            console.log(`Post ${postId} deleted`);
            // Remove the post element from the DOM??
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
