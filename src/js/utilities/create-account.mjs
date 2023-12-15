import { setSignUpFormDataCallback } from "./forms.mjs";
import { API_BASE_URL } from "./global-values.mjs";

function wrappedCreateAccount() {
  // Section for getting the form data from forms.mjs
  let createAccountFormData = {};

  function handleFormData(data) {
    createAccountFormData = data;
    if (Object.keys(createAccountFormData).length > 0) {
      createAccount(registerURL, createAccountFormData);
    }
  }

  setSignUpFormDataCallback(handleFormData);

  /**
   * Handles the API call for account creation. This function sends the user's input data to the specified URL for account registration and validation.
   *
   * @param {string} url - The API endpoint for account creation. This should be the base URL combined with '/social/auth/register'.
   * @param {object} userFormData - The user's input data. This should include all necessary information required for account creation, such as username, email, and password.
   * @returns {Promise<object>} A promise that resolves with the response from the API call.
   */
  async function createAccount(url, userFormData) {
    try {
      const postData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userFormData),
      };

      const response = await fetch(url, postData);
      // console.log(response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      // console.log(json);

      // Trigger collapse state change upon successful account creation to make an understandable UI for user
      const signUpCollapse = new bootstrap.Collapse(document.getElementById("multiCollapseExample2"));
      const logInCollapse = new bootstrap.Collapse(document.getElementById("multiCollapseExample1"));

      signUpCollapse.show();
      logInCollapse.hide();
    } catch (error) {
      console.log("Error in creating account", error);
      const indexErrorDisplay = document.getElementById("indexErrorMessages2");
      indexErrorDisplay.innerHTML += `<p><b>Account allready exists</b></br>Contact site owner if problem persists:${error}</p>`;
    }
  }

  const registerURL = `${API_BASE_URL}/social/auth/register`;
}

export { wrappedCreateAccount };
