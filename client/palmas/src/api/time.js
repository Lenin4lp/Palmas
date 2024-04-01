import axios from "./axios";

export const createYear = (year) => axios.post("/year", year);
export const getYears = () => axios.get("/years");
export const getYear = (id) => axios.get(`/year/${id}`);
export const deleteYear = (id) => axios.delete(`/year/${id}`);
