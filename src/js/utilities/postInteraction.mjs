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

async function updatePostFormControl() {
  try {
    await dynamicallyInsertedPostsPromise;

    const updateButtons = document.querySelectorAll('[data-bs-target^="#exampleModal_"]');

    updateButtons.forEach((button) => {
      const modalId = button.getAttribute("data-bs-target");
      const modal = document.querySelector(modalId);
      const postId = modalId.split("_")[1];

      const form = modal.querySelector("form");
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        console.log("yiha");
        const updateTitle = form.querySelector("#updateTitleInput").value;
        const updateBody = form.querySelector("#updatePostTextarea").value;
        const updateMedia = form.querySelector("#updateFileInput").value;
        const updateTags = form.querySelector("#updateTagsInput").value;

        let updatePostData = {};
        if (updateTitle) updatePostData.title = updateTitle;
        if (updateBody) updatePostData.body = updateBody;
        if (updateMedia) updatePostData.media = updateMedia;
        if (updateTags) updatePostData.tags = updateTags.split(",").map((tag) => tag.trim());

        if (Object.keys(updatePostData).length > 0) {
          await updatePost(postId, updatePostData);
          console.log(`Updated post ${postId}`, updatePostData);
        } else {
          console.log("No changes to update");
        }
      });
    });
  } catch (error) {
    console.error("Error in updatePostFormControl", error);
  }
}

updatePostFormControl();

async function reactionwrapped() {
  try {
    await dynamicallyInsertedPostsPromise;
    document.addEventListener("click", async function (event) {
      if (event.target && event.target.classList.contains("reactionSymbol")) {
        const emojiSymbol = event.target.textContent;
        const postId = event.target.id.split("_")[1];

        if (emojiSymbol && postId) {
          try {
            const response = await reactToPost(postId, emojiSymbol);
            console.log("Reaction response:", response);
          } catch (error) {
            console.error("Error reacting to post:", error);
          }
        }
      }
    });
  } catch (error) {
    console.error("Error with reactions", error);
  }
}

async function reactToPost(postId, symbol) {
  console.log("running");
  const url = `${API_BASE_URL}/social/posts/${postId}/react/${symbol}`;
  return commonApiRequest(url, "PUT");
}

reactionwrapped();

async function commentFormData() {
  try {
    await dynamicallyInsertedPostsPromise;
    const commentForm = document.getElementById("commentForm");
    if (commentForm) {
      commentForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const postId = commentForm.getAttribute("data-post-id");
        const commentTextArea = document.getElementById("commentTextArea");
        const commentValue = commentTextArea.value.trim();

        if (commentValue) {
          const url = `${API_BASE_URL}/social/posts/${postId}/comment`;
          const data = {
            body: commentValue,
            replyToId: null,
          };
          try {
            const response = await commonApiRequest(url, "POST", data);
            console.log("Comment added:", response);

            document.getElementById("postCommentsBody").innerHTML += commentValue;
          } catch (apiError) {
            console.error("Failed to post comment:", apiError);
          }
        } else {
          console.log("Waiting for comment");
        }
      });
    } else {
      console.log("Comment form not found");
    }
  } catch (error) {
    console.error("An error has occurred with commenting", error);
  }
}

export { commentFormData };
