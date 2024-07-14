// api_calls/user.js
import axios from "axios";

export const getUserInfo = (token) => {
  return axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  );
};
