import { setLoginFormDataCallback } from "./forms.mjs";

function wrappedLogInUser() {
  const API_BASE_URL = `https://api.noroff.dev/api/v1`;
  const loginURL = `${API_BASE_URL}/social/auth/login`;

  async function logInUser(url, userFormLoginData) {
    try {
      const postData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userFormLoginData),
      };
      const response = await fetch(url, postData);
      const json = await response.json();
      if (json.accessToken) {
        localStorage.setItem("accessToken", json.accessToken);
        console.log("Login successful", json);
        window.location.href = "/post&feed/post&feed.html";
      } else {
        console.log("Login failed", json);
        alert("User not found");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  function handleFormData(data) {
    if (data && Object.keys(data).length > 0) {
      logInUser(loginURL, data);
    } else {
      console.log("Waiting for login details");
    }
  }

  setLoginFormDataCallback(handleFormData);
}

export { wrappedLogInUser };
