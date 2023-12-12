import { defaultFormControl } from "./utilities/newPostFormControl.mjs";
import { createAndAddPost } from "./utilities/newPost.mjs";
import { postDeletion } from "./utilities/postDelete.mjs";
import { commentFormData } from "./utilities/postInteraction.mjs";
import { searchBarForm } from "./utilities/searchBarFilter.mjs";
import { initializePopovers } from "./utilities/popovers.mjs";
import { signOut } from "./utilities/signOut.mjs";

defaultFormControl();
createAndAddPost();
postDeletion();
commentFormData();
searchBarForm();
initializePopovers();
signOut();
