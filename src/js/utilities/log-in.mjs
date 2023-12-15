import { setLoginFormDataCallback } from "./forms.mjs";
import { API_BASE_URL } from "./global-values.mjs";
function wrappedLogInUser() {
  const loginURL = `${API_BASE_URL}/social/auth/login`;

  /**
   * Uses the callback from forms.mjs and does an api call to validate user. If validates the accesskey and user name is stored in local storage, and user is redirected to postandfeed.html
   *
   * @param {string} url - Base url combined with /social/auth/login
   * @param {object} userFormLoginData - userdata collected form the form and callback
   */
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
        localStorage.setItem("userName", json.name);
        // console.log("Login successful", json);
        window.location.href = "/postandfeed/postandfeed.html";
      } else {
        const indexErrorDisplay = document.getElementById("indexErrorMessages");
        indexErrorDisplay.innerHTML += `<p>User not found!</p>`;
      }
    } catch (error) {
      const indexErrorDisplay = document.getElementById("indexErrorMessages");
      indexErrorDisplay.innerHTML += `<p>!!! Error with login, contact site owner${error}</p>`;
      console.error("Error during login:", error);
    }
  }

  function handleFormData(data) {
    if (data && Object.keys(data).length > 0) {
      logInUser(loginURL, data);
    } else {
      // console.log("Waiting for login details");
    }
  }

  setLoginFormDataCallback(handleFormData);
}

export { wrappedLogInUser };
