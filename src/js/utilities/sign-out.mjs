function signOut() {
  const signOutBtn = document.getElementById("signOutBtn");

  signOutBtn.addEventListener("click", (event) => {
    localStorage.removeItem("accessToken");
  });
}

export { signOut };
