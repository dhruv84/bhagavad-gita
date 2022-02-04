import axios from "axios";
const Alert = require("../../utilities/createAlert");

export const forgetPassword = async (email) => {
  try {
    const res = await axios({
      method: "POST",
      // url: "http://localhost:3000/api/gita/users/forgetPassword",
      url: "/api/gita/users/forgetPassword",
      data: {
        email,
      },
    });

    if (res.data.status === "success") {
      new Alert("Mail has been sent!").renderAlert();
    }
  } catch (err) {
    new Alert(err.response.data.message).renderAlert();
  }
};

export const resetPassword = async (password, passwordConfirm, token) => {
  try {
    const res = await axios({
      method: "POST",
      // url: `http://localhost:3000/api/gita/users/resetPassword/${token}`,
      url: `/api/gita/users/resetPassword/${token}`,
      data: {
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === "success") {
      new Alert("Password Successfuly Changed").renderAlert();
      setTimeout(() => {
        location.assign("/");
      }, 1000);
    }
  } catch (err) {
    new Alert(err.response.data.message).renderAlert();
  }
};
