import { setNewPostFormDataCallback } from "./formsPost&feed.mjs";

let newPostFormData = {};
function handleNewPostFormData(data) {
	newPostFormData = data;
	console.log("newPost.mjs recevied data!", newPostFormData);
}
setNewPostFormDataCallback(handleNewPostFormData);
export { handleNewPostFormData };

const API_BASE_URL = `https://api.noroff.dev/api/v1`;

async function authenticateForNewPost(url) {
	try {
		// Retriving the key that has allready been stored from login
		const token = localStorage.getItem("accessToken");
		if (!token) {
			console.log("No access token available.");
			return;
		}

		const PostData = {
			method: "POST",
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
		console.log("JSON POSTS DATA:", json);
		return json;
	} catch (error) {
		console.log("Error:", error.message);
		return null;
	}
}
