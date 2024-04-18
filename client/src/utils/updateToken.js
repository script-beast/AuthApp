import axios from "axios";
import { jwtDecode } from "jwt-decode";

const updateToken = async () => {
  const refreshToken = localStorage.getItem("authRefreshToken");
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_APP_BASE_API_URL}user/refreshToken`,
      {
        refreshToken,
      }
    );
    localStorage.setItem("authToken", data.result);
    const decodedToken = jwtDecode(data.result);
    console.log("token updated");
    return decodedToken.id;
  } catch (e) {
    console.log(e);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authRefreshToken");
    return null;
  }
};

export default updateToken;
