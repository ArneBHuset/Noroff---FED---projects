// import { retrieveApiPostData } from "./utilities/postHandling.mjs";
import { dynamicallyInsertedPosts } from "./utilities/postHandling.mjs";
import { defaultFormControl } from "./utilities/formsPost&feed.mjs";
import { handleNewPostFormData } from "./utilities/newPost.mjs";

// retrieveApiPostData();
dynamicallyInsertedPosts();
defaultFormControl();
handleNewPostFormData();

document.addEventListener("DOMContentLoaded", function () {
  // function dynamicSidebar() {
  //   var footerHeight = document.querySelector("footer").offsetHeight;
  //   var sidebar = document.querySelector(".mobile-sidebar");
  //   sidebar.style.height = `calc(100vh - ${footerHeight}px)`;
  //   console.log("Footer height is:", footerHeight, "px");
  // }
  // dynamicSidebar();

  // >>>>DEFAULT BOOTSTRAP POPOVER LOGICK<<<<<<
  const popoverTriggerList = document.querySelectorAll(
    '[data-bs-toggle="popover"]'
  );
  const popoverList = [...popoverTriggerList].map(
    (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
  );
});
