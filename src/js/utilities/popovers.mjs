import { dynamicallyInsertedPostsPromise } from "./postHandling.mjs";
async function initializePopovers() {
  try {
    await dynamicallyInsertedPostsPromise;
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    popoverTriggerList.forEach((popoverTriggerEl) => {
      new bootstrap.Popover(popoverTriggerEl);
    });
  } catch (error) {
    console.log("Error with popovers", error);
  }
}

initializePopovers();

export { initializePopovers };
