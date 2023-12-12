function searchBarForm() {
  const currentSearchBar = document.getElementById("mainSearchBar");
  const searchDropdown = document.getElementById("searchResultsDropdown");
  const searchSubmitBtn = document.getElementById("searchSubmitBtn");

  if (currentSearchBar && searchDropdown) {
    currentSearchBar.addEventListener("input", () => {
      const searchValue = currentSearchBar.value.trim();
      if (searchValue) {
        searchDropdown.style.display = "block";
        filterAndDisplayPosts(searchValue, searchDropdown);
      } else {
        searchDropdown.style.display = "none";
      }
    });
  } else {
    console.log("Search bar or dropdown not found");
  }
  if (searchSubmitBtn) {
    searchSubmitBtn.addEventListener("click", (event) => {
      event.preventDefault();
      const searchValue = currentSearchBar.value.trim();
      if (searchValue) {
        applyPostFiltering(searchValue);
      } else {
        showAllPosts();
      }
    });
  }
}

function showAllPosts() {
  console.log("reset begins");
  const posts = document.querySelectorAll(".custom-card");
  posts.forEach((post) => {
    post.style.display = "flex";
  });
}

function filterAndDisplayPosts(searchValue, dropdown) {
  const posts = Array.from(document.querySelectorAll(".custom-card"));
  dropdown.innerHTML = "";

  const filteredSortedPosts = posts
    .map((post) => {
      const postId = post.id;
      const postTitle = post.querySelector('[id^="postTitle_"]')?.textContent || "";
      const matchCount = countMatches(searchValue, postTitle, postId);
      return { post, postId, postTitle, matchCount };
    })
    .filter((postData) => postData.matchCount >= 3)
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, 20);

  filteredSortedPosts.forEach(({ postId, postTitle }) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "dropdown-item";
    button.textContent = `ID: ${postId}, Title: ${postTitle}`;
    button.onclick = () => scrollToPost(postId);
    dropdown.appendChild(button);
  });
}

function scrollToPost(postId) {
  const postElement = document.getElementById(postId);
  if (postElement) {
    postElement.scrollIntoView({ behavior: "smooth" });
  } else {
    console.log("Post not found:", postId);
  }
}
function applyPostFiltering(searchValue) {
  console.log("running!");
  const posts = Array.from(document.querySelectorAll(".custom-card"));
  posts.forEach((post) => {
    const postId = post.id;
    const postTitle = post.querySelector('[id^="postTitle_"]')?.textContent || "";
    const matchCount = countMatches(searchValue, postTitle, postId);
    // Dynamically hiding the posts
    if (matchCount < 3) {
      post.style.display = "none";
    } else {
      post.style.display = "flex";
    }
  });
}

function countMatches(searchValue, text, postId) {
  let matches = 0;

  // Checkthe characters
  for (let i = 0; i < searchValue.length; i++) {
    if (text.includes(searchValue[i])) {
      matches++;
    }
  }

  //Checking the postId
  if (postId.includes(searchValue)) {
    matches += searchValue.length;
  }

  return matches;
}

export { searchBarForm };
