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
