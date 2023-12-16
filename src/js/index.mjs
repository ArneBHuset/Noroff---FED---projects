import { setLoginFormDataCallback, setSignUpFormDataCallback } from "./utilities/forms.mjs";
import { collapsableForm } from "./utilities/formcollapse.mjs";
import { wrappedCreateAccount } from "./utilities/create-account.mjs";
import { wrappedLogInUser } from "./utilities/log-in.mjs";

setLoginFormDataCallback();
setSignUpFormDataCallback();
collapsableForm();
wrappedCreateAccount();
wrappedLogInUser();
