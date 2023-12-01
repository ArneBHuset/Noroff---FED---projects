"use strict";

let formDataCallback = null;

// Callback of the from data
function validatedFormData(callback) {
  formDataCallback = callback;
}

// From validation section
function validateBootstrapForms() {
  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        // Prevent the default form submission for testing!!
        event.preventDefault();
        // Prevent the default form submission for testing!!
        const emailInput = document.getElementById("signUpEmail");
        const chosenEmail = emailInput.value;
        const isNoroffEmail = /@(stud\.noroff\.no|noroff\.no)$/.test(
          chosenEmail
        );

        if (!isNoroffEmail) {
          emailInput.setCustomValidity(
            "Email must contain stud.noroff.no or noroff.no"
          );
        } else {
          emailInput.setCustomValidity("");
        }

        const password = document.getElementById("signUpPassword").value;
        const confirmPassword = document.getElementById(
          "signUpConfirmPassword"
        ).value;

        if (password !== confirmPassword) {
          document
            .getElementById("signUpConfirmPassword")
            .setCustomValidity("Passwords do not match.");
        } else {
          document
            .getElementById("signUpConfirmPassword")
            .setCustomValidity("");
        }

        if (!form.checkValidity()) {
          event.stopPropagation();
          form.classList.add("was-validated");
        } else {
          form.classList.add("was-validated");

          const userName = document.getElementById("signUpUserName").value;
          const userData = { name: userName, email: chosenEmail, password };
          if (formDataCallback) {
            formDataCallback(userData);
          }
          // Do i need it stringified?
          // const userJSON = JSON.stringify(userData);
          // console.log("Forms.mjs (stringified):", userJSON);
          // console.log("Froms.mjs normal", userData);
        }
      },
      false
    );
  });
}

export { validateBootstrapForms, validatedFormData };
