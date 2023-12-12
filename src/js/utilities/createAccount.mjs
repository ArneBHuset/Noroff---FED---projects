import { setSignUpFormDataCallback } from "./forms.mjs";

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
    try {
      const postData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userFormData),
      };

      const response = await fetch(url, postData);
      console.log(response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);

      // Trigger collapse state change upon successful account creation
      const signUpCollapse = new bootstrap.Collapse(document.getElementById("multiCollapseExample2"));
      const logInCollapse = new bootstrap.Collapse(document.getElementById("multiCollapseExample1"));

      signUpCollapse.show();
      logInCollapse.hide();
    } catch (error) {
      console.log("Error in creating account", error);
      alert("Account allready exists");
    }
  }

  const registerURL = `${API_BASE_URL}/social/auth/register`;
}

export { wrappedCreateAccount };
