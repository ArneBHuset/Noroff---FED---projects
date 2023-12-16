import { defaultFormControl } from "./utilities/new-post-form-control.mjs";
import { createAndAddPost } from "./utilities/new-post.mjs";
import { postDeletion } from "./utilities/post-delete.mjs";
import { searchBarForm } from "./utilities/search-bar.mjs";
import { signOut } from "./utilities/sign-out.mjs";
import { filteringOptionsUpdate } from "./utilities/post-handling.mjs";
import { loadPosts } from "./utilities/post-handling.mjs";
import { profileModalHtml, profileDetails, profileUpdateForm } from "./utilities/profile-settings.mjs";

filteringOptionsUpdate();
loadPosts();
defaultFormControl();
createAndAddPost();
postDeletion();
searchBarForm();
signOut();
profileModalHtml();
profileDetails();
profileUpdateForm();
