import { setSignUpFormDataCallback } from "./forms.mjs";

/**
 * API call that registers the user
 * @param {string} url
 * @param {any} userFormData
 * ``` js
 * createAccount(registerURL, createAccountFormData);
 * ```
 */

function wrappedCreateAccount() {
  // Section for getting the form data from forms.mjs
  let createAccountFormData = {};

  function handleFormData(data) {
    createAccountFormData = data;
    console.log("createAccount.mjs", createAccountFormData);
    // Function for creating account to be run after form handling is complete.
    // If/else statement to check that there actually is a ready form data.
    if (Object.keys(createAccountFormData).length > 0) {
      createAccount(registerURL, createAccountFormData);
    } else {
      // WHy does not the else run?
      console.log("Waiting for signup details");
    }
  }

  setSignUpFormDataCallback(handleFormData);

  // Section for actual JWT create account function
  const API_BASE_URL = `https://api.noroff.dev/api/v1`;

  async function createAccount(url, userFormData) {
    console.log(url, userFormData);

    try {
      const postData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userFormData),
      };
      const response = await fetch(url, postData);
      console.log("response", response);
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log("!ERROR!", error);
    }
  }

  const registerURL = `${API_BASE_URL}/social/auth/register`;
}

export { wrappedCreateAccount };
