// Example starter JavaScript for disabling form submissions if there are invalid fields
"use strict";
function validateBootstrapForms() {
     const forms = document.querySelectorAll(".needs-validation");

     Array.from(forms).forEach((form) => {
          form.addEventListener(
               "submit",
               (event) => {
                    if (!form.checkValidity()) {
                         event.preventDefault();
                         event.stopPropagation();
                    }

                    form.classList.add("was-validated");
               },
               false
          );
     });
}

export { validateBootstrapForms };

// Functionlaity for collapsable from
function collapsableForm() {
     const collapseElements = document.querySelectorAll(".multi-collapse");
     const signUpCollapseBtn = document.getElementById("sign-up-btn");
     const logInCollapseBtn = document.getElementById("log-in-btn");

     // Attach event listeners for 'show' and 'hide' to each collapse element
     collapseElements.forEach((el) => {
          // When a collapse element is shown
          el.addEventListener("show.bs.collapse", function () {
               // Hide other collapse elements
               collapseElements.forEach((colEl) => {
                    if (el !== colEl && colEl.classList.contains("show")) {
                         var collapseInstance =
                              bootstrap.Collapse.getInstance(colEl);
                         collapseInstance.hide();
                    }
               });
               // Additionally, hide the sign-up button when the log-in collapse element is shown
               if (
                    el ===
                    document.querySelector(logInCollapseBtn.dataset.bsTarget)
               ) {
                    signUpCollapseBtn.style.display = "inline-block";
               }
          });

          // When a collapse element is hidden
          el.addEventListener("hide.bs.collapse", function () {
               // Show the sign-up button when the log-in collapse element is hidden
               if (
                    el ===
                    document.querySelector(logInCollapseBtn.dataset.bsTarget)
               ) {
                    signUpCollapseBtn.style.display = "none";
               }
          });
     });
}

// Call collapsableForm when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", collapsableForm);

export { collapsableForm };

//
