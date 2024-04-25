import Axios from "../utils/axios";

export const serviceLogin = async (body) => {
  return await Axios.post("/auth/login", body);
};
