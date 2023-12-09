// import { retrieveApiPostData } from "./utilities/postHandling.mjs";
// import { dynamicallyInsertedPosts } from "./utilities/postHandling.mjs";
import { defaultFormControl } from "./utilities/newPostFormControl.mjs";
import { createAndAddPost } from "./utilities/newPost.mjs";
import { postDeletion } from "./utilities/postDelete.mjs";
// import { updatePostWrapped } from "./utilities/postChanges.mjs";
// import { reactionwrapped } from "./utilities/postInteraction.mjs";
import { commentFormData } from "./utilities/postInteraction.mjs";
import { searchBarForm } from "./utilities/searchBarFilter.mjs";
import { initializePopovers } from "./utilities/popovers.mjs";
// import { updatePostFormControl } from "./utilities/postInteraction.mjs";
// retrieveApiPostData();
// dynamicallyInsertedPosts();
defaultFormControl();
createAndAddPost();
postDeletion();
// updatePostWrapped();
// reactionwrapped();
commentFormData();
searchBarForm();
initializePopovers();
// updatePostFormControl();
document.addEventListener("DOMContentLoaded", function () {
  // function dynamicSidebar() {
  //   var footerHeight = document.querySelector("footer").offsetHeight;
  //   var sidebar = document.querySelector(".mobile-sidebar");
  //   sidebar.style.height = `calc(100vh - ${footerHeight}px)`;
  //   console.log("Footer height is:", footerHeight, "px");
  // }
  // dynamicSidebar();
  // >>>>DEFAULT BOOTSTRAP POPOVER LOGICK<<<<<<
});
