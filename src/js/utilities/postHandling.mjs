const API_BASE_URL = `https://api.noroff.dev/api/v1`;

async function retrieveApiToken(url) {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.log("No access token available.");
      return;
    }

    const getData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, getData);
    console.log(response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    console.log("The json:", json);
  } catch (error) {
    console.log("Error:", error.message);
  }
}

const postsURL = `${API_BASE_URL}/social/posts`;

retrieveApiToken(postsURL);

export { retrieveApiToken };

// Section for creating post
