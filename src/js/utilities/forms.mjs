"use strict";

// Callbacks for signup form data
let signUpFormDataCallback = null;

function setSignUpFormDataCallback(callback) {
  signUpFormDataCallback = callback;
}

document.addEventListener("DOMContentLoaded", function () {
  const signUpForm = document.getElementById("signUpForm");
  if (signUpForm) {
    signUpForm.addEventListener("submit", handleSignUpForm, false);
  }
});

// >>>>>>Section for the signup<<<<<<<<<<
function handleSignUpForm(event) {
  event.preventDefault();
  const form = event.currentTarget;

  // Username
  const userNameInput = document.getElementById("signUpUserName");
  const userName = userNameInput.value;
  const isValidUserName = /^[A-Za-z0-9_]+$/.test(userName);
  userNameInput.setCustomValidity(
    isValidUserName
      ? ""
      : "User name must not contain punctuation symbols apart from underscore (_)"
  );

  // Email
  const emailInput = document.getElementById("signUpEmail");
  const chosenEmail = emailInput.value;
  const isNoroffEmail = /@(stud\.noroff\.no|noroff\.no)$/.test(chosenEmail);
  emailInput.setCustomValidity(
    isNoroffEmail ? "" : "Email must contain stud.noroff.no or noroff.no"
  );

  // Password
  const password = document.getElementById("signUpPassword").value;
  const confirmPassword = document.getElementById(
    "signUpConfirmPassword"
  ).value;
  document
    .getElementById("signUpConfirmPassword")
    .setCustomValidity(
      password === confirmPassword ? "" : "Passwords do not match."
    );

  // Section for checking the form validity
  if (form.checkValidity() && signUpFormDataCallback) {
    const userData = { name: userName, email: chosenEmail, password };
    signUpFormDataCallback(userData);
  }
  console.log(userData);
  form.classList.add("was-validated");
}

// >>>>>>>><<SECTION FOR LOG IN <<<<<<<<<<
// Callbacks for login form data
let loginFormDataCallback = null;
function setLoginFormDataCallback(callback) {
  loginFormDataCallback = callback;
}

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLoginForm, false);
  }
});

function handleLoginForm(event) {
  event.preventDefault();
  const form = event.currentTarget;

  if (form.checkValidity() && loginFormDataCallback) {
    const logInEmail = document.getElementById("logInEmail").value;
    const logInPassword = document.getElementById("logInPassword").value;
    const loginData = { email: logInEmail, password: logInPassword };

    // console.log("Forms.mjs logindata", loginData);

    loginFormDataCallback(loginData);
  } else {
    console.log("Form is invalid or callback not set");
  }
  form.classList.add("was-validated");
}

export { setSignUpFormDataCallback, setLoginFormDataCallback };
