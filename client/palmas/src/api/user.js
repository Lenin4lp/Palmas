import axios from "./axios";

export const getUsers = () => axios.get("/users");
export const getUser = (id) => axios.get(`/user/${id}`);
export const updateUser = (id, user) => axios.put(`/user/${id}`, user);
export const deleteUser = (id) => axios.delete(`/user/${id}`);

// ? User Roles

export const getUserRoles = () => axios.get("/userRoles");
export const getUserRole = (id) => axios.get(`/userRole/${id}`);
