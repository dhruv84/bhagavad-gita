import axios from "axios";
const Alert = require("../../utilities/createAlert");

export const forgetPassword = async (email, doc) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:3000/api/gita/users/forgetPassword",
      data: {
        email,
      },
    });

    if (res.data.status === "success") {
      new Alert("Mail has been sent!", doc).renderAlert();
    }
  } catch (err) {
    new Alert(err.response.data.message, doc).renderAlert();
  }
};

export const resetPassword = async (password, passwordConfirm, token, doc) => {
  try {
    const res = await axios({
      method: "POST",
      url: `http://localhost:3000/api/gita/users/resetPassword/${token}`,
      data: {
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === "success") {
      new Alert("Password Successfuly Changed", doc).renderAlert();
      setTimeout(() => {
        location.assign("/");
      }, 1000);
    }
  } catch (err) {
    new Alert(err.response.data.message, doc).renderAlert();
  }
};
