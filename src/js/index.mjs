import {
  setLoginFormDataCallback,
  setSignUpFormDataCallback,
} from "./utilities/forms.mjs";
import { collapsableForm } from "./utilities/formcollapse.mjs";
import { wrappedCreateAccount } from "./utilities/createAccount.mjs";
import { wrappedLogInUser } from "./utilities/logIn.mjs";

setLoginFormDataCallback();
setSignUpFormDataCallback();
collapsableForm();
wrappedCreateAccount();
wrappedLogInUser();
