import axios from "./axios";

export const getVehicleTypes = () => axios.get("/vehicleTypes");
export const getVehicleType = (id) => axios.get(`/vehicleType/${id}`);
export const createVehicleType = (vehicleType) =>
  axios.post("/vehicleType", vehicleType);
export const updateVehicleType = (id, vehicleType) =>
  axios.put(`/vehicleType/${id}`, vehicleType);
export const deleteVehicleType = (id) => axios.delete(`/vehicleType/${id}`);
