import axios from "axios";
const Alert = require("../../utilities/createAlert");

export const addBookmark = async (slokaID, bookmark, slug) => {
  try {
    const res = await axios({
      method: "POST",
      // url: "http://localhost:3000/api/gita/users/createFavourites",
      url: "/api/gita/users/createFavourites",
      data: {
        slokaID,
        slug,
      },
    });
    if (res.data.status === "success") {
      bookmark.setAttribute("src", "/img/svg/Bookmark.svg");
      bookmark.classList.remove("addFav");
    }
  } catch (err) {
    new Alert(err.response.data.message).renderAlert();
  }
};

export const removeBookmark = async (slokaID, bookmark) => {
  try {
    const res = await axios({
      method: "DELETE",
      // url: "http://localhost:3000/api/gita/users/removeFavourites",
      url: "/api/gita/users/removeFavourites",
      data: {
        slokaID,
      },
    });
    if (res.data.status === "success" && bookmark) {
      bookmark.setAttribute("src", "/img/svg/Bookmark-line.svg");
      bookmark.classList.add("addFav");
    }
  } catch (err) {
    new Alert(err.response.data.message).renderAlert();
  }
};

export const updateUser = async (email, name) => {
  try {
    const res = await axios({
      method: "PATCH",
      // url: "http://localhost:3000/api/gita/users/updateMe",
      url: "/api/gita/users/updateMe",
      data: {
        email,
        name,
      },
    });

    if (res.data.status === "success") {
      new Alert("User Updated Successfully").renderAlert();
      setTimeout(() => {
        location.reload(true);
      }, 1000);
    }
  } catch (err) {
    new Alert(err.response.data.message).renderAlert();
  }
};

export const updatePassword = async (
  passwordCurrent,
  password,
  passwordConfirm
) => {
  try {
    const res = await axios({
      method: "PATCH",
      // url: "http://localhost:3000/api/gita/users/updatePassword",
      url: "/api/gita/users/updatePassword",
      data: {
        passwordCurrent,
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === "success") {
      new Alert("Password Updated Successfully").renderAlert();
      setTimeout(() => {
        location.reload(true);
      }, 1000);
    }
  } catch (err) {
    new Alert(err.response.data.message).renderAlert();
  }
};

export const updateContinue = async (link, bookmark) => {
  try {
    const res = await axios({
      method: "PATCH",
      // url: "http://localhost:3000/api/gita/users/updateContinue",
      url: "/api/gita/users/updateContinue",
      data: {
        link,
      },
    });
    if (res.data.status === "success") {
      bookmark.classList.add("pageBookmarked");
    }
  } catch (err) {
    new Alert(err.response.data.message).renderAlert();
  }
};

export const updateUserNew = async () => {
  try {
    const res = await axios({
      method: "PATCH",
      // url: "http://localhost:3000/api/gita/users/updateUserNew",
      url: "/api/gita/users/updateUserNew",
    });
  } catch (err) {
    new Alert(err.response.data.message).renderAlert();
  }
};

export const deleteUser = async () => {
  try {
    const res = await axios({
      method: "DELETE",
      // url: "http://localhost:3000/api/gita/users/deleteMe",
      url: "/api/gita/users/deleteMe",
    });
  } catch (err) {
    new Alert(err.response.data.message).renderAlert();
  }
};
