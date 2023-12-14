import { loadPosts } from "./post-handling.mjs";

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

async function handleUpdateFormSubmit(event, postId) {
  event.preventDefault();
  console.log("UpdateForm is running!");
  const form = event.target;
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
    loadPosts();
    const modalElement = document.querySelector(`#exampleModal_${postId}`);
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
  } else {
    console.log("No changes to update");
  }
}

function attachUpdateFormListeners() {
  const updateButtons = document.querySelectorAll('[data-bs-target^="#exampleModal_"]');
  updateButtons.forEach((button) => {
    const modalId = button.getAttribute("data-bs-target");
    const modal = document.querySelector(modalId);
    const postId = modalId.split("_")[1];
    const form = modal.querySelector("form");

    form.removeEventListener("submit", (e) => handleUpdateFormSubmit(e, postId)); // Remove existing listener
    form.addEventListener("submit", (e) => handleUpdateFormSubmit(e, postId));
  });
}

attachUpdateFormListeners();

async function handleReactionClick(event) {
  if (event.target && event.target.classList.contains("reactionSymbol")) {
    const emojiSymbol = event.target.textContent;
    const postId = event.target.id.split("_")[1];

    if (emojiSymbol && postId) {
      try {
        const response = await reactToPost(postId, emojiSymbol);
        console.log("Reaction response:", response);
        loadPosts();
      } catch (error) {
        console.error("Error reacting to post:", error);
      }
    }
  }
}

async function reactToPost(postId, symbol) {
  console.log("running");
  const url = `${API_BASE_URL}/social/posts/${postId}/react/${symbol}`;
  return commonApiRequest(url, "PUT");
}

function attachReactionListeners() {
  document.removeEventListener("click", handleReactionClick); // Remove existing listener to prevent duplicates
  document.addEventListener("click", handleReactionClick);
}

attachReactionListeners();

async function handleCommentFormSubmit(event) {
  console.log("runningComment!!!!!!!!!!!!!!!!!!!!!!!!!!");
  event.preventDefault();
  const form = event.target;
  const postId = form.getAttribute("data-post-id");
  const commentTextArea = form.querySelector(".commentTextArea");
  const commentValue = commentTextArea.value.trim();

  if (commentValue) {
    const url = `${API_BASE_URL}/social/posts/${postId}/comment`;
    const data = { body: commentValue, replyToId: null };

    try {
      const response = await commonApiRequest(url, "POST", data);
      console.log("Comment added:", response);
      loadPosts();
    } catch (apiError) {
      console.error("Failed to post comment:", apiError);
    }
  } else {
    console.log("Waiting for comment");
  }
  console.log("END OF ALL ROADS");
}

function attachCommentFormListeners() {
  const commentForms = document.querySelectorAll(".comment-Form");
  commentForms.forEach((form) => {
    form.removeEventListener("submit", handleCommentFormSubmit);
    form.addEventListener("submit", handleCommentFormSubmit);
  });
  console.log("attachCommentFormListeners running END");
}

export { attachCommentFormListeners, attachReactionListeners, attachUpdateFormListeners };
