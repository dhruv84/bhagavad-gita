import axios from "axios";
const Alert = require("../../utilities/createAlert");

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: "POST",
      // url: "http://localhost:3000/api/gita/users/signup",
      url: "/api/gita/users/signup",
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === "success") {
      new Alert("User Registered Successfully!").renderAlert();

      window.setTimeout(() => {
        location.assign("/");
      }, 1000);
    }
  } catch (err) {
    new Alert(err.response.data.message).renderAlert();
  }
};
