import axios from "axios";
const Alert = require("../../utilities/createAlert");

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      // url: "http://localhost:3000/api/gita/users/login",
      url: "/api/gita/users/login",
      data: {
        email,
        password,
      },
    });

    if (res.data.status === "success") {
      new Alert("User logged in successfully!").renderAlert();

      window.setTimeout(() => {
        location.assign("/");
      }, 1000);
    }
  } catch (err) {
    new Alert(err.response.data.message).renderAlert();
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      // url: "http://localhost:3000/api/gita/users/logout",
      url: "/api/gita/users/logout",
    });

    if (res.data.status === "success") location.assign("/");
  } catch (err) {
    new Alert(err.response.data.message).renderAlert();
  }
};
