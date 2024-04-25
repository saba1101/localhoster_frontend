import axios from "axios";
import { notification } from "antd";
import { useStore } from "../store/store.js";

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

const Axios = axios.create({ ...config });

Axios.interceptors.request.use(requestInterceptorCallback);

const handleSessionExpired = () => {
  window.localStorage.setItem("isLoggedIn", false);
  window.localStorage.setItem("token", null);
  const { setAuthState } = useStore.getState();
  setAuthState({ isLoggedIn: false });
};

Axios.interceptors.response.use(
  (response) => {
    if (response.data.message) {
      openNotificationWithIcon("error", "Error", response.data.message);
    }
    return response;
  },
  (err) => {
    if (
      err.response &&
      err.response.data &&
      err.response.data.message === "Session Expired"
    ) {
      handleSessionExpired();
    }
    if (err.message) {
      openNotificationWithIcon("error", "Error", err.message);
    } else {
      openNotificationWithIcon("error", "Error", "An error occurred");
    }
    return Promise.reject(err);
  }
);

export default Axios;
