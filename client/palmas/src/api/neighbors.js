import axios from "./axios";

export const createNeighbor = (neighbor) => axios.post("/neighbor", neighbor);
export const getNeighbor = (id) => axios.get(`/neighbor/${id}`);
export const getNeighbors = () => axios.get("/neighbors");
export const updateNeighbor = (id, neighbor) =>
  axios.put(`/neighbor/${id}`, neighbor);
export const deleteNeighbor = (id) => axios.delete(`/neighbor/${id}`);

// ? Neighbor roles
export const getRoles = () => axios.get("/roles");
export const getRole = (id) => axios.get(`/role/${id}`);

// ? Neighbor places
export const addPlaceFromNeighbor = (id, place_id) =>
  axios.post(`/placeNeighbor/${id}`, { place_id });
export const deletePlaceFromNeighbor = (id, place_id) =>
  axios.delete(`/placeNeighbor/${id}/${place_id}`);
