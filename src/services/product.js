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

export const createHost = async (body) => {
  return await Axios.post(`/product/createHost`, body).then((response) => {
    return response;
  });
};

export const getAllHosts = async (body) => {
  return await Axios.get(`/product/getAll`, body).then((response) => {
    return response;
  });
};

export const getSingleHost = async (id) => {
  return await Axios.get(`/product/getHost/${id}`).then((response) => {
    return response;
  });
};

export const updateHost = async (id, body) => {
  return await Axios.put(`/product/updateHost/${id}`, body).then((response) => {
    return response;
  });
};

export const deleteHost = async (id) => {
  return await Axios.post(`/product/deleteHost`, { id }).then((response) => {
    return response;
  });
};
