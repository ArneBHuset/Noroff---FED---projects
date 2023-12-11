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

  // Username Validation
  const userNameInput = document.getElementById("signUpUserName");
  const isValidUserName = /^[A-Za-z0-9_]+$/.test(userNameInput.value);
  userNameInput.setCustomValidity(isValidUserName);

  // Email Validation
  const emailInput = document.getElementById("signUpEmail");
  const isNoroffEmail = /@(stud\.noroff\.no|noroff\.no)$/.test(emailInput.value);
  emailInput.setCustomValidity(isNoroffEmail ? "" : "Must contain stud.noroff.no or noroff.no");
  document.getElementById("invalidEmailFeedback").textContent = emailInput.validationMessage;

  // Password Validation
  const password = document.getElementById("signUpPassword").value;
  const confirmPassword = document.getElementById("signUpConfirmPassword").value;
  document.getElementById("signUpConfirmPassword").setCustomValidity(password === confirmPassword ? "" : "Passwords do not match.");
  document.getElementById("passwordConfirmFeedback").textContent = document.getElementById("signUpConfirmPassword").validationMessage;

  // Check form validity and perform action
  if (form.checkValidity() && signUpFormDataCallback) {
    const userData = {
      name: userNameInput.value,
      email: emailInput.value,
      password,
    };
    signUpFormDataCallback(userData);
  } else {
    console.log("Form is invalid or callback not set");
  }

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
