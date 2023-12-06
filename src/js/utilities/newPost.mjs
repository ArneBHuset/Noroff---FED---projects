import { setNewPostFormDataCallback } from "./formsPost&feed.mjs";

let newPostFormData = {};
let formDataPromiseResolve;
let formDataPromise = new Promise((resolve) => (formDataPromiseResolve = resolve));

function handleNewPostFormData(data) {
  newPostFormData = data;
  formDataPromiseResolve();
  console.log("newPost.mjs received data!", newPostFormData);
}

setNewPostFormDataCallback(handleNewPostFormData);

const API_BASE_URL = `https://api.noroff.dev/api/v1`;

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
    return null;
  }
}

async function createAndAddPost() {
  await formDataPromise;

  if (Object.keys(newPostFormData).length > 0) {
    const newPostUrl = `${API_BASE_URL}/social/posts`;
    try {
      const response = await authenticateForNewPost(newPostUrl, newPostFormData);
      if (response) {
        console.log("Post created!", response);
      }
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  } else {
    console.log("No form data found");
  }
}

export { createAndAddPost };
