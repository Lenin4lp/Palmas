import axios from "./axios";

export const getPayments = () => axios.get("/payments");
export const getPayment = (id) => axios.get(`/payment/${id}`);
export const createPayment = (data) => axios.post("/payment", data);
export const updatePayment = (id, data) => axios.put(`/payment/${id}`, data);
export const deletePayment = (id) => axios.delete(`/payment/${id}`);
