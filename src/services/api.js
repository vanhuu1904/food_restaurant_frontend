import axios from "../utils/axios-customize";

const getAllUser = () => {
  return axios.get("/account/allAccounts");
};

const loginUser = (data) => {
  return axios.post("auth/login", data);
};

const getAllFood = () => {
  return axios.get("/food");
};

const createAFood = (data) => {
  return axios.post("/food/register", data);
};

const fetchFoodById = (id) => {
  return axios.post("/food/id", id);
};

const callLogout = () => {
  return axios.post("/auth/logout");
};

export const callFetchAccount = () => {
  return axios.get("/api/v1/auth/account");
};

const logout = () => {
  return axios.post("auth/logout");
};

const register = (data) => {
  return axios.post("auth/register", data);
};

const registerOrder = (data) => {
  return axios.post("order/register", data);
};

const fetchAccount = () => {
  return axios.get("/auth/account");
};

const fetchListUser = (query) => {
  return axios.get(`/users?${query}`);
};

const getAUser = (_id) => {
  return axios.get(`/users/${_id}`);
};

const createANewUser = (username, password, fullname, studentcode, address) => {
  return axios.post("/users", {
    username,
    password,
    fullname,
    studentcode,
    address,
  });
};

const updateAUser = (_id, fullname, studentcode, address) => {
  return axios.patch("/users", { _id, fullname, studentcode, address });
};

const deleteAUser = (_id) => {
  return axios.delete(`/users/${_id}`);
};

const changePassword = (currentpassword, newpassword) => {
  return axios.post(`/auth/change_password`, { currentpassword, newpassword });
};

export {
  loginUser,
  register,
  getAllFood,
  createAFood,
  fetchFoodById,
  callLogout,
  fetchAccount,
  registerOrder,
  logout,
  fetchListUser,
  createANewUser,
  updateAUser,
  deleteAUser,
  getAUser,
  changePassword,
  getAllUser,
};
