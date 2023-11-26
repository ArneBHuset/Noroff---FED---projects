// Default bootstrap validation is used and expanded to include password confirmation, confirmation of email
// Containting neseccary values and creating a Json object of the data.
"use strict";

function validateBootstrapForms() {
  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        // NB!!!! prevent defualt for testing in console only, will stop form submisson
        event.preventDefault();
        // NB!!!! prevent defualt for testing in console only, will stop form submisson
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
          event.preventDefault();
          event.stopPropagation();
          form.classList.add("was-validated");
        } else {
          form.classList.add("was-validated");

          const userName = document.getElementById("signUpUserName").value;
          const userData = { userName, email: chosenEmail, password };
          const userJSON = JSON.stringify(userData);
          validatedFormData(userData);
          console.log("Forms.mjs:", userJSON);
        }
      },
      false
    );
  });
}
function validatedFormData(data) {}
export { validateBootstrapForms };

export { validatedFormData };
