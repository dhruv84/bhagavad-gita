import "@babel/polyfill";
import { login, logout } from "./loginlogout";
import { signup } from "./signup";
import {
  addBookmark,
  updateUser,
  updatePassword,
  removeBookmark,
  updateContinue,
  updateUserNew,
  deleteUser,
} from "./updateUser";

import { getSloka } from "./searchSloka";
import { forgetPassword, resetPassword } from "./forgetResetPassword";

const meaningBox = document.querySelectorAll(".meaning");

const btnLogout = document.getElementById("logout");
const btnNavOpen = document.querySelector(".btn_open-nav");
const btn_meaning = document.querySelectorAll(".btn_meaning");
const btnNavClose = document.querySelector(".btn_close-nav");
const btnSearchSloka = document.querySelector(".btn_sloka-search");
const btnDeleteConfirm = document.querySelector(".delete-confirm");

const user = document.querySelector(".header_nav-links-user");
const profileNav = document.querySelector(".userProfile-nav");
const userOptions = document.querySelector(".header_nav-userOptions");

const headerContent = document.querySelector(".click-event");
const chapterBookmark = document.querySelector(".chapterBookmark");

const slokaBookmarks = document.querySelectorAll(".gitaChapter_bookmark");
const favRemoveBtn = document.querySelectorAll(".favourite__sloka-times");
const userPopupBtn = document.querySelector(".userPopup-content-button");
const favouriteDropdown = document.querySelectorAll(".favourite_dropdown");

const slokaSearchBox = document.querySelector(".sloka_search-box");
const formSlokaSearch = document.querySelector(".sloka_search-form");
const userProfile = document.querySelector(".userProfile-nav");
const loginForm = document.querySelector(".form--login");
const signupForm = document.querySelector(".form--signup");
const forgetPasswordForm = document.querySelector(".form--forgetPassword");
const resetPasswordForm = document.querySelector(".form--resetPassword");
const userUpdateForm = document.querySelector(".form-user-data");
const userPasswordForm = document.querySelector(".form-user-password");

//cookie-section
console.log((document.cookie = "name=Dhruv"));

if (btnDeleteConfirm) {
  btnDeleteConfirm.addEventListener("click", (e) => {
    e.preventDefault();

    const markup = `
      <div class="confirm_page">
        <p class="confirm_page-para">Your account will be permanentaly deleted, are you sure you want to delete your account?</p>
        <div class="confirm_page-btns">
          <button class="confirm_page-btn btn_keep-user">No</button>
          <button class="confirm_page-btn btn_delete-user">Yes</button>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("afterbegin", markup);

    if (document.querySelector(".confirm_page")) {
      document
        .querySelector(".btn_delete-user")
        .addEventListener("click", async () => {
          await deleteUser();
          console.log("User Deleted Permanentaly");
          location.assign("/");
        });
      document.querySelector(".btn_keep-user").addEventListener("click", () => {
        console.log("User Not Deleted Permanentaly");
        document.querySelector(".confirm_page").remove();
      });
    }
  });
}

if (document.querySelector(".container")) {
  document.body.style.overflowY = "hidden";

  window.addEventListener("mousemove", (e) => {
    document.querySelector(".container_maya").style.left = `${e.pageX}px`;
    document.querySelector(".container_maya").style.top = `${
      e.pageY - window.scrollY
    }px`;

    document.querySelector(".container_you").style.left = `${e.pageX}px`;
    document.querySelector(".container_you").style.top = `${
      e.pageY - window.scrollY
    }px`;

    if (
      e.pageY > screen.height - 130 ||
      e.pageY < 20 ||
      e.pageX > screen.width - 20 ||
      e.pageX < 10
    ) {
      document.querySelector(".container_maya").classList.add("hide_G-Obj");
      document.querySelector(".container_you").style.transition =
        "all 2s ease-out";
    } else {
      document.querySelector(".container_maya").classList.remove("hide_G-Obj");
      document.querySelector(".container_you").style.transition =
        "all 1s ease-out";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      location.assign("/");
    }
  });
}

if (document.querySelector(".moveToTop")) {
  window.addEventListener("scroll", function () {
    this.scrollY > 1000
      ? document.querySelector(".moveToTop").classList.add("show")
      : document.querySelector(".moveToTop").classList.remove("show");
  });
}

if (favouriteDropdown) {
  favouriteDropdown.forEach((dropdown) => {
    dropdown.addEventListener("click", () => {
      document
        .querySelectorAll(".favourite_dropdown-options")
        .forEach((option) => {
          if (dropdown.parentElement === option.parentElement) {
            option.classList.toggle("show");
          }
        });
    });
  });
}

if (userPopupBtn) {
  userPopupBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    document.querySelector(".userPopup").style.display = "none";

    await updateUserNew();
  });
}

if (chapterBookmark) {
  chapterBookmark.addEventListener("click", async () => {
    const link = chapterBookmark.dataset.link;

    await updateContinue(link, chapterBookmark);
  });
}

if (forgetPasswordForm) {
  forgetPasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    document.querySelector(".loading_Update").style.display = "block";

    const email = document.getElementById("email").value;

    await forgetPassword(email);

    document.querySelector(".loading_Update").style.display = "none";
  });
}

if (resetPasswordForm) {
  resetPasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    document.querySelector(".loading_Update").style.display = "block";

    const token = document.querySelector(".btn--resetPassword").dataset.token;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;

    await resetPassword(password, passwordConfirm, token);

    document.querySelector(".loading_Update").style.display = "none";
  });
}

if (btnSearchSloka) {
  btnSearchSloka.addEventListener("click", (e) => {
    e.preventDefault();

    slokaSearchBox.classList.toggle("form_sloka-search-rev");
  });
}

if (formSlokaSearch) {
  formSlokaSearch.addEventListener("submit", async (e) => {
    e.preventDefault();

    const chapter = document.getElementById("chapter").value;
    const slokaNumber = document.getElementById("slokaNum").value;

    if (document.querySelector(".search_sloka-box")) {
      document.querySelector(".search_sloka-box").remove();
    }

    document.querySelector(".loading_circle").style.display = "grid";

    const sloka = await getSloka(chapter, slokaNumber);

    const arr = sloka.sloka.split("-");

    const markup = ` 
      <div class="search_sloka-box">
        <div class="search_sloka-box-sloka sloka_sans">
          <p>${arr[0].split("S")[0]}</p>
          <p>${arr[0].split("S")[1]}</p>
        </div>
        <p class="search_sloka-box-sloka color_grey">${sloka.translation_hi}</p>
        <p class="search_sloka-box-sloka color_grey font-eng">${
          sloka.translation_eng
        }</p>
      </div>
    `;

    document.querySelector(".loading_circle").style.display = "none";

    slokaSearchBox.insertAdjacentHTML("beforeend", markup);
  });
}

if (btn_meaning) {
  btn_meaning.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      meaningBox.forEach((box) => {
        if (btn.parentElement === box.parentElement) {
          box.classList.toggle("hidden");
        }
      });
    });
  });
}

if (btnNavOpen) {
  btnNavOpen.addEventListener("click", (e) => {
    e.preventDefault();

    userProfile.style.left = "0";
  });
}

if (btnNavClose) {
  btnNavClose.addEventListener("click", (e) => {
    e.preventDefault();

    userProfile.style.left = "-30rem";
  });
}

if (headerContent) {
  headerContent.addEventListener("click", (e) => {
    userOptions.classList.add("hidden");

    // if (document.querySelectorAll(".favourite_dropdown-options")) {
    //   document
    //     .querySelectorAll(".favourite_dropdown-options")
    //     .forEach((option) => {
    //       option.classList.remove("show");
    //     });
    // }
  });
}

if (user) {
  user.addEventListener("click", (e) => {
    e.preventDefault();
    userOptions.classList.toggle("hidden");
  });

  window.addEventListener("scroll", (e) => {
    if (user) {
      userOptions.classList.add("hidden");
    }
  });
}

if (profileNav) {
  profileNav.addEventListener("click", (e) => {
    e.preventDefault();
    if (!e.target.classList.contains("userProfile-nav-item")) return;

    const target = e.target;
    const dataset = e.target.dataset.tab;

    const profileItems = document.querySelectorAll(".userProfile-nav-item");
    const tabs = document.querySelectorAll(".tab");

    profileItems.forEach((item) => {
      item.classList.remove("selected");
    });

    tabs.forEach((tab) => {
      tab.classList.add("hidden");
    });

    target.classList.add("selected");

    document.querySelector(`.tab-${dataset}`).classList.remove("hidden");
  });
}

if (favRemoveBtn) {
  favRemoveBtn.forEach((btn) =>
    btn.addEventListener("click", async (e) => {
      e.preventDefault();

      const slokaID = btn.dataset.id;

      await removeBookmark(slokaID);

      btn.parentElement.parentElement.style.display = "none";

      btn.parentElement.parentElement.remove();
    })
  );
}

if (slokaBookmarks) {
  slokaBookmarks.forEach((bookmark) => {
    bookmark.addEventListener("click", async (e) => {
      e.preventDefault();

      const slokaID = bookmark.dataset.id;
      const slug = bookmark.dataset.slug;

      document.querySelector(".chapterPagination-load").classList.add("load");

      if (bookmark.classList.contains("addFav")) {
        await addBookmark(slokaID, bookmark, slug);
      } else {
        await removeBookmark(slokaID, bookmark);
      }

      document
        .querySelector(".chapterPagination-load")
        .classList.remove("load");
    });
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    document.querySelector(".loading_Update").style.display = "block";

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    await login(email, password);

    document.querySelector(".loading_Update").style.display = "none";
  });
}

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    document.querySelector(".loading_Update").style.display = "block";

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;

    await signup(name, email, password, passwordConfirm);

    document.querySelector(".loading_Update").style.display = "none";
  });
}

if (btnLogout) btnLogout.addEventListener("click", logout);

if (userUpdateForm) {
  userUpdateForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    document.querySelector(".loading_Update-save").style.display = "block";

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    await updateUser(email, name);

    document.querySelector(".loading_Update-save").style.display = "none";
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    document.querySelector(".loading_Update-pass").style.display = "block";

    const passwordCurrent = document.getElementById("passwordCurrent").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;

    await updatePassword(passwordCurrent, password, passwordConfirm);

    document.querySelector(".loading_Update-pass").style.display = "none";
  });
}
