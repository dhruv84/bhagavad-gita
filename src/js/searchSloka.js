import axios from "axios";

export const getSloka = async (chapter, slokaNumber) => {
  try {
    const res = await axios({
      method: "POST",
      // url: "http://localhost:3000/api/gita/sloka/getSloka",
      url: "/api/gita/sloka/getSloka",
      data: {
        chapter,
        slokaNumber,
      },
    });

    if (res.data.status === "success") {
      return res.data.sloka;
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};
