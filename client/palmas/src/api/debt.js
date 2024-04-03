import axios from "./axios";

export const getMonthlyDebts = () => axios.get("/monthlyDebts");
export const getMonthlyDebt = (id) => axios.get(`/monthlyDebt/${id}`);

export const getMonthlyFlee = (id) => axios.get(`/monthlyFlee/${id}`);
export const getMonthlyFees = () => axios.get("/monthlyFees");
export const createMonthlyFee = (data) => axios.post("/monthlyFee", data);
export const updateMonthlyFee = (id, data) =>
  axios.put(`/monthlyFee/${id}`, data);
export const deleteMonthlyFee = (id) => axios.delete(`/monthlyFee/${id}`);
