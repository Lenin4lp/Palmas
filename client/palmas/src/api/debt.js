import axios from "./axios";

export const getMonthlyDebts = () => axios.get("/monthlyDebts");
export const getMonthlyDebt = (id) => axios.get(`/monthlyDebt/${id}`);
