/**
 * Function for sign out button, removing accesTOken and user name from local storage and redirecting to index.html
 */
function signOut() {
  const signOutBtn = document.getElementById("signOutBtn");

  signOutBtn.addEventListener("click", (event) => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userName");
  });
}

export { signOut };
