
import axios from "axios";

const API_URL_BASE = process.env.NEXT_PUBLIC_API_URL;

export const axiosApiBase = axios.create({});
axiosApiBase.interceptors.request.use(
  async function (config) {
    // const cookieStore = await cookies();
    // const cookie = cookieStore.get("session")?.value;
    // const session = await decrypt(cookie);
    // const token = session?.access_token;
    // if (token) {
    //   // config.headers["Authorization"] = `${token}`;
    //   config.headers["Authorization"] = `Bearer ${token}`;
    // }
    // config.headers["Content-Type"] = "application/json";
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    config.baseURL = API_URL_BASE;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
axiosApiBase.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
