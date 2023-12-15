import { API_BASE_URL } from "./global-values.mjs";
async function profileApiCall(url, method, data = null) {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const postData = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: data ? JSON.stringify(data) : null,
    };
    const response = await fetch(url, postData);
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    const updateErrorDisplay = document.getElementById("newPostErrorMessage");
    updateErrorDisplay.innerHTML += `<p class="text-warning">!!! Error with profile<br>Contact site owner if problem persists: ${error}</p>`;
  }
}

async function profileDetails() {
  const profileName = localStorage.getItem("userName");
  const url = `${API_BASE_URL}/social/profiles/${profileName}`;
  try {
    const profileData = await profileApiCall(url, "GET");
    if (profileData) {
      profileModalHtml(profileData);
    }
  } catch (error) {
    console.error("Error fetching profile details:", error);
    // Handle error appropriately
  }
}

async function profileUpdate(avatarUrl, bannerUrl) {
  const profileName = localStorage.getItem("userName");
  const url = `${API_BASE_URL}/social/profiles/${profileName}/media`;

  const data = {};
  if (avatarUrl) {
    data.avatar = avatarUrl;
  }
  if (bannerUrl) {
    data.banner = bannerUrl;
  }

  try {
    await profileApiCall(url, "PUT", data);
    location.reload();
  } catch (error) {
    console.error("Error updating profile:", error);
    // Handle error appropriately
  }
}

function profileUpdateForm() {
  const updateProfileForm = document.getElementById("updateProfileForm");

  if (updateProfileForm) {
    updateProfileForm.addEventListener("submit", (event) => {
      const avatarInput = document.getElementById("updateAvatarInput");
      const bannerInput = document.getElementById("updateBannerInput");

      event.preventDefault();
      if (avatarInput.value || bannerInput.value) {
        profileUpdate(avatarInput.value, bannerInput.value);
      }
    });
  }
}

function profileModalHtml(profileData) {
  if (!profileData) {
    return;
  }
  const modalHtml = ` <button class="avatar-position mt-4" type="button" data-bs-toggle="modal" data-bs-target="#uniqueExampleModal" tabindex="1">
  <img src="${profileData.avatar} || "../src/img/Image_not_available.png"}" class="profile-picture" id="personalProfileImg" />
    </button>
    <div class="modal fade" id="uniqueExampleModal" tabindex="-1" aria-labelledby="uniqueExampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content background-primary">
          <!-- Modal header -->
          <div class="modal-header">
            <h1 id="uniqueExampleModalLabel" class="custom-title-font fs-4 fw-bold ms-5">Your profile</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-4">
                <img src="${profileData.avatar}" class="profile-picture ms-3" id="personalProfileImg" />
              </div>
              <div class="col-8 custom-title-font fs-5 bold text.center mt-0 mt-md-3">
                <span id="profileName" class="">Name: ${profileData.name}</span>
                <span id="profileEmail" class="">Email: ${profileData.email}</span>
              </div>
              <div class="col-5 d-flex align-items-center ms-3 mt-3">
              <span class="fs-4 custom-title-font mt-2">Your banner</span>
              </div>
              <div class="col-4">
              <img src="${profileData.banner}" id="profileBanner" class="profile-picture  mt-3"/>
              </div>
              <div class="col-12 custom-text-font d-flex gap-3 mt-2 ms-3">
                <span id="profilePostsCount" class="">Posts: ${profileData._count.posts}</span>
                <span id="profileFollowersCount" class="">Followers: ${profileData._count.followers}</span>
                <span id="profileFollowingCount" class="">Following: ${profileData._count.following}</span>
              </div>
            </div>
            <hr />
            <form class="container" id="updateProfileForm">
              <div class="mb-3">
                <label for="updateAvatarInput" class="form-label custom-title-font">Update Avatar</label>
                <input type="text" class="form-control" id="updateAvatarInput" placeholder="Add Image url" />
              </div>
              <div class="mb-3">
                <label for="updateBannerInput" class="form-label custom-title-font">Update Banner</label>
                <input type="text" class="form-control" id="updateBannerInput" placeholder="Add Image url" />
              </div>
              <button type="submit" id="updateProfileSubmit" class="btn btn-primary">Update Profile</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  const modalContainer = document.getElementById("insertedProfileModal");
  if (modalContainer) {
    modalContainer.innerHTML = modalHtml;
    profileUpdateForm();
  }
}

export { profileModalHtml, profileDetails, profileUpdateForm };
