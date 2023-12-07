// import { retrieveApiPostData } from "./utilities/postHandling.mjs";
import { dynamicallyInsertedPosts } from "./utilities/postHandling.mjs";
import { defaultFormControl } from "./utilities/formsPost&feed.mjs";
import { createAndAddPost } from "./utilities/newPost.mjs";
import { postDeletion } from "./utilities/postDelete.mjs";
// import { updatePostWrapped } from "./utilities/postChanges.mjs";
import { reactionwrapped } from "./utilities/postChanges.mjs";
import { commentFormData } from "./utilities/postChanges.mjs";
// retrieveApiPostData();
dynamicallyInsertedPosts();
defaultFormControl();
createAndAddPost();
postDeletion();
// updatePostWrapped();
reactionwrapped();
commentFormData();

document.addEventListener("DOMContentLoaded", function () {
  // function dynamicSidebar() {
  //   var footerHeight = document.querySelector("footer").offsetHeight;
  //   var sidebar = document.querySelector(".mobile-sidebar");
  //   sidebar.style.height = `calc(100vh - ${footerHeight}px)`;
  //   console.log("Footer height is:", footerHeight, "px");
  // }
  // dynamicSidebar();

  // >>>>DEFAULT BOOTSTRAP POPOVER LOGICK<<<<<<
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  const popoverList = [...popoverTriggerList].map((popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl));
});
