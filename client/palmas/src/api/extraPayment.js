import axios from "./axios";

export const getExtraPayments = () => axios.get("/extraPayments");
export const getExtraPayment = (id) => axios.get(`/extraPayment/${id}`);
export const createExtraPayment = (data) => axios.post("/extraPayment", data);
export const updateExtraPayment = (id, data) =>
  axios.put(`/extraPayment/${id}`, data);
export const deleteExtraPayment = (id) => axios.delete(`/extraPayment/${id}`);

// ? extraPaymentTypes
export const getExtraPTypes = () => axios.get("/extraPTypes");
export const getExtraPType = (id) => axios.get(`/extraPType/${id}`);
export const createExtraPType = (data) => axios.post("/extraPType", data);
export const updateExtraPType = (id, data) =>
  axios.put(`/extraPType/${id}`, data);
export const deleteExtraPType = (id) => axios.delete(`/extraPType/${id}`);

//? extraPPayments
export const getExtraPPayments = () => axios.get("/extraPPayments");
export const getExtraPPayment = (id) => axios.get(`/extraPPayment/${id}`);
export const createExtraPPayment = (data) => axios.post("/extraPPayment", data);
export const updateExtraPPayment = (id, data) =>
  axios.put(`/extraPPayment/${id}`, data);
export const deleteExtraPPayment = (id) => axios.delete(`/extraPPayment/${id}`);
