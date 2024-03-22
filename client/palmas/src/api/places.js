import axios from "./axios";

export const getPlaces = () => axios.get("/places");
export const getPlace = (id) => axios.get(`/place/${id}`);
export const createPlace = (place) => axios.post("/place", place);
export const updatePlace = (id, place) => axios.put(`/place/${id}`, place);
export const deletePlace = (id) => axios.delete(`/place/${id}`);

// ? Place types
export const getPlaceTypes = () => axios.get("/placeTypes");
export const getPlaceType = (id) => axios.get(`/placeType/${id}`);
export const createPlaceType = (placeType) =>
  axios.post("/placeType", placeType);
export const updatePlaceType = (id, placeType) =>
  axios.put(`/placeType/${id}`, placeType);
export const deletePlaceType = (id) => axios.delete(`/placeType/${id}`);
