function searchBarForm() {
  const currentSearchBar = document.getElementById("mainSearchBar");
  const searchDropdown = document.getElementById("searchResultsDropdown");
  const searchSubmitBtn = document.getElementById("searchSubmitBtn");

  if (currentSearchBar && searchDropdown) {
    currentSearchBar.addEventListener("input", () => {
      const searchValue = currentSearchBar.value.trim();
      if (searchValue) {
        filterAndDisplayPosts(searchValue, searchDropdown);
      } else {
        searchDropdown.innerHTML = "";
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
        const filteredSortedPosts = filterAndDisplayPosts(searchValue, searchDropdown);
        const filteredPostIds = filteredSortedPosts.map(({ postId }) => postId);
        applyPostFiltering(filteredPostIds);
      } else {
        showAllPosts();
      }
    });
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

    let filteredSortedPosts = [];
    const exactMatchPost = posts.find((post) => {
      const postId = post.id;
      const postTitle = post.querySelector('[id^="postTitle_"]')?.textContent || "";
      const postAuthor = post.querySelector(".post-profile-picture")?.textContent.trim() || "";
      return postId === searchValue || postTitle === searchValue || postAuthor === searchValue;
    });

    if (exactMatchPost) {
      filteredSortedPosts.push({
        post: exactMatchPost,
        postId: exactMatchPost.id,
        postTitle: exactMatchPost.querySelector('[id^="postTitle_"]')?.textContent || "",
        postAuthor: exactMatchPost.querySelector(".post-profile-picture")?.textContent.trim() || "",
        matchCount: Number.MAX_SAFE_INTEGER, // Assigning the highest possible match count
      });
    } else {
      filteredSortedPosts = posts
        .map((post) => {
          const postId = post.id;
          const postTitle = post.querySelector('[id^="postTitle_"]')?.textContent || "";
          const postAuthor = post.querySelector('[id^="postAuthor_"]')?.textContent || "";
          const matchCount = countMatches(searchValue, postTitle + " " + postAuthor, postId);
          return { post, postId, postTitle, postAuthor, matchCount };
        })
        .filter((postData) => postData.matchCount > 0)
        .sort((a, b) => b.matchCount - a.matchCount)
        .slice(0, 10);
    }

    filteredSortedPosts.forEach(({ postId, postTitle, postAuthor }) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "dropdown-item";

      const textNode1 = document.createTextNode(`ID: ${postId} Title: ${postTitle}`);
      const lineBreak = document.createElement("br");
      const textNode2 = document.createTextNode(postAuthor);

      button.appendChild(textNode1);
      button.appendChild(lineBreak);
      button.appendChild(textNode2);

      button.onclick = () => scrollToPost(postId);
      dropdown.appendChild(button);
    });

    return filteredSortedPosts;
  }
  function scrollToPost(postId) {
    const postElement = document.getElementById(postId);
    if (postElement) {
      postElement.scrollIntoView({ behavior: "smooth" });
    } else {
      console.log("Post not found:", postId);
    }
  }
  function applyPostFiltering(filteredPostIds) {
    console.log("Filtering posts!");
    const posts = Array.from(document.querySelectorAll(".custom-card"));
    posts.forEach((post) => {
      const postId = post.id;
      post.style.display = filteredPostIds.includes(postId) ? "flex" : "none";
    });
  }
  function countMatches(searchValue, text, postId) {
    let matches = 0;
    for (let i = 0; i < searchValue.length; i++) {
      if (text.includes(searchValue[i])) {
        matches++;
      }
    }
    if (postId.includes(searchValue)) {
      matches += searchValue.length;
    }
    return matches;
  }
}
export { searchBarForm };
