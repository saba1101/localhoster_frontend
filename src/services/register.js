import Axios from "../utils/axios";

export const serviceRegister = async (body) => {
  return await Axios.post("/auth/create", body);
};
