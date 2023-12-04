import { setLoginFormDataCallback } from "./forms.mjs";
function wrappedLogInUser() {
  let logInFormData = {};

  function handleFormData(data) {
    logInFormData = data;
    console.log("login.mjs recevied data!", logInFormData);
    // Function for login to be run after form handling is complete.
    // If/else statement to check that there actually is a ready form data.
    if (Object.keys(logInFormData).length > 0) {
      logInUser(loginURL, logInFormData);
    } else {
      // WHy does not the else run
      console.log("Waiting for login details");
    }
  }
  setLoginFormDataCallback(handleFormData);

  const API_BASE_URL = `https://api.noroff.dev/api/v1`;

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
      console.log(response);
      const accessToken = json.accessToken;
      localStorage.setItem("accessToken", accessToken);
      console.log(json);
      return json;
    } catch (error) {
      console.log(error);
    }
  }

  const loginURL = `${API_BASE_URL}/social/auth/login`;
}

export { wrappedLogInUser };
