import Axios from "../utils/axios";

export const getUserDetails = async (id) => {
  return await Axios.get(`/user/get/${id}`).then((response) => {
    return response;
  });
};
