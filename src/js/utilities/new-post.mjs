import { setNewPostFormDataCallback } from "./new-post-form-control.mjs";
import { loadPosts } from "./post-handling.mjs";
import { API_BASE_URL } from "./global-values.mjs";

let newPostFormData = {};
let formDataPromiseResolve;
let formDataPromise = new Promise((resolve) => (formDataPromiseResolve = resolve));

function handleNewPostFormData(data) {
  newPostFormData = data;
  formDataPromiseResolve();
  console.log("newPost.mjs received data!", newPostFormData);
}

setNewPostFormDataCallback(handleNewPostFormData);

async function authenticateForNewPost(url, postData) {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.log("No access token available.");
      return;
    }

    const postDataOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    };

    const response = await fetch(url, postDataOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.log("Error:", error.message);
    const indexErrorDisplay = document.getElementById("newPostErrorMessage");
    indexErrorDisplay.innerHTML += `<p class="text-warning">!!! Error with creating post </br> contact site owner if problem persists${error}</p>`;

    return null;
  }
}
/**
 *Function that takes data from new-post-form-control and creates new post using API call in authenticateForNewPost
 */
async function createAndAddPost() {
  await formDataPromise;

  if (Object.keys(newPostFormData).length > 0) {
    const newPostUrl = `${API_BASE_URL}/social/posts`;
    try {
      const response = await authenticateForNewPost(newPostUrl, newPostFormData);
      if (response) {
        // console.log("Post created!", response);
        loadPosts();
      }
    } catch (error) {
      console.error("Failed to create post:", error);
      const indexErrorDisplay = document.getElementById("newPostErrorMessage");
      indexErrorDisplay.innerHTML += `<p class="text-warning">!!! Error with creating post </br> contact site owner if problem persists${error}</p>`;
    }
  } else {
    // console.log("No form data found");
  }
}

export { createAndAddPost };
