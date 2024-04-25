import axios from "axios";
import { notification } from "antd";

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

Axios.interceptors.response.use(
  (response) => {
    if (response.message) {
      openNotificationWithIcon("error", "Error", response.message);
    }
    return response;
  },
  (err) => {
    if (err.message) {
      openNotificationWithIcon("error", "Error", err.message);
    } else {
      openNotificationWithIcon("error", "Error", err.message);
    }
    return err;
  }
);

export default Axios;
