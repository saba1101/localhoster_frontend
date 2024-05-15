// axios.js
import axios from "axios";
import { notification } from "antd";
import { SetAuth } from "../store/AuthStore";

const config = {
  baseURL: "http://127.0.0.1:2000",
};

const openNotificationWithIcon = (type, message, description) => {
  notification[type]({
    message: message,
    description: description,
  });
};

const requestInterceptorCallback = (config) => {
  config.headers["Content-Type"] = "application/json";
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
};

const handleSessionExpired = (dispatch) => {
  window.localStorage.setItem("isLoggedIn", false);
  window.localStorage.setItem("token", null);
  dispatch(SetAuth(false));
  location.reload();
};

const Axios = axios.create({ ...config });

// Setup interceptors inside a function
export const setupAxiosInterceptors = (dispatch) => {
  Axios.interceptors.request.use(requestInterceptorCallback);

  Axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      if (
        err.response &&
        err.response.data &&
        err.response.data.message === "Session Expired"
      ) {
        handleSessionExpired(dispatch);
      }
      if (err.message) {
        openNotificationWithIcon("error", "Error", err.message);
      } else {
        openNotificationWithIcon("error", "Error", "An error occurred");
      }
      return Promise.reject(err);
    }
  );
};

export default Axios;
