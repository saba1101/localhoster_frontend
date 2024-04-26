import Axios from "../utils/axios";

export const serviceLogOut = async (token) => {
  return await Axios.post("/auth/logout/", { Token: token }).then(
    (response) => {
      return response;
    }
  );
};
