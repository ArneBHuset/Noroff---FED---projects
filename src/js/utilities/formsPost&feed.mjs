let newPostFormDataCallback = null;

function setNewPostFormDataCallback(callback) {
  newPostFormDataCallback = callback;
}

function defaultFormControl() {
  var forms = document.querySelectorAll(".needs-validation");
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        event.preventDefault();

        const newPostTitle = document.getElementById("titleInput").value;
        const newPostBody = document.getElementById("postTextarea").value;
        const newPostMedia = document.getElementById("fileInput").value;
        const newPostTags = document.getElementById("tagsInput").value.split(",");

        if (!form.checkValidity()) {
          event.stopPropagation();
        } else {
          const newPostData = {
            title: newPostTitle,
            body: newPostBody,
            tags: newPostTags,
            media: newPostMedia,
          };

          if (newPostFormDataCallback) {
            newPostFormDataCallback(newPostData);
          }
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
}

export { defaultFormControl, setNewPostFormDataCallback };

// Section for search form

function searchBarForm() {
  const currentSearchBar = document.getElementById("mainSearchBar");

  if (currentSearchBar) {
    currentSearchBar.addEventListener("focus", () => {
      const currentSearchValue = currentSearchBar.value.trim();
      if (currentSearchValue) {
        console.log("Current search value:", currentSearchValue);
      } else {
        console.log("Search bar focused, but no value entered yet");
      }
    });

    currentSearchBar.addEventListener("input", () => {
      const currentSearchValue = currentSearchBar.value.trim();
      console.log("Current typing value:", currentSearchValue);
    });
  } else {
    console.log("Search bar not found");
  }
}

export { searchBarForm };

{
  /* <form class="d-flex mt-3" role="search">
<input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
<button class="btn btn-outline-success" type="submit">Search</button>
</form> */
}
