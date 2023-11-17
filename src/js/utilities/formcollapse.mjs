function collapsableForm() {
     const collapseElements = document.querySelectorAll(".multi-collapse");
     const signUpCollapseBtn = document.getElementById("sign-up-btn");
     const logInCollapseBtn = document.getElementById("log-in-btn");

     collapseElements.forEach((el) => {
          el.addEventListener("show.bs.collapse", function () {
               collapseElements.forEach((colEl) => {
                    if (el !== colEl && colEl.classList.contains("show")) {
                         var collapseInstance =
                              bootstrap.Collapse.getInstance(colEl);
                         collapseInstance.hide();
                    }
               });

               if (
                    el ===
                    document.querySelector(logInCollapseBtn.dataset.bsTarget)
               ) {
                    signUpCollapseBtn.style.display = "inline-block";
               }
          });

          el.addEventListener("hide.bs.collapse", function () {
               if (
                    el ===
                    document.querySelector(logInCollapseBtn.dataset.bsTarget)
               ) {
                    signUpCollapseBtn.style.display = "none";
               }
          });
     });
}

document.addEventListener("DOMContentLoaded", collapsableForm);

export { collapsableForm };
