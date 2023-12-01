import { validatedFormData } from "./forms.mjs";

function wrappedCreateAccount() {
  // Section for getting the form data from forms.mjs
  let createAccountFormData = {};

  function handleFormData(data) {
    createAccountFormData = data;
    console.log("createAccount.mjs", createAccountFormData);
    // Function for creating account to be run after form handling is complete

    if (Object.keys(createAccountFormData).length > 0) {
      createAccount(registerURL, createAccountFormData);
    } else {
      console.log("Form data is not ready yet.");
    }
  }

  validatedFormData(handleFormData);

  // const createAccountFormData = {
  //   name: "test_a1",
  //   email: "arne1@noroff.no",
  //   password: "12345678",
  // };

  // Section for actual JWT create account function
  const API_BASE_URL = `https://api.noroff.dev/api/v1`;

  // ALl end-points:
  // /social/auth/register`

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
