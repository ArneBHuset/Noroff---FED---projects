import { validatedFormData } from "./forms.mjs";

let createAccountFormData = {};

function handleFormData(data) {
  createAccountFormData = data;
  console.log("createAccount.mjs", createAccountFormData);
}

validatedFormData(handleFormData);

const API_BASE_URL = "https://nf-api.onrender.com";

async function createAccount() {
  console.log("Beginning of createAccount function:");

  try {
    //
  } catch (error) {
    console.log(error);
  }
}

export { createAccount };
