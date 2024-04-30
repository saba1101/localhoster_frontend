import Axios from "../utils/axios";

export const getCategories = async () => {
  return await Axios.get(`/product/getCategories`).then((response) => {
    return response;
  });
};

export const createCategory = async (body) => {
  return await Axios.post(`/product/createCategory`, body).then((response) => {
    return response;
  });
};

export const updateCategory = async (id, body) => {
  return await Axios.put(`/product/updateCategory/${id}`, body).then(
    (response) => {
      return response;
    }
  );
};

export const deleteCategory = async (id) => {
  return await Axios.post(`/product/deletecategory`, { id }).then(
    (response) => {
      return response;
    }
  );
};
