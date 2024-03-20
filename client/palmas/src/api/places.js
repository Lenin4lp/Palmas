import axios from "./axios";

export const getPlaces = () => axios.get("/places");
export const getPlace = (id) => axios.get(`/place/${id}`);
export const createPlace = (place) => axios.post("/place", place);
export const updatePlace = (id, place) => axios.put(`/place/${id}`, place);
export const deletePlace = (id) => axios.delete(`/place/${id}`);
