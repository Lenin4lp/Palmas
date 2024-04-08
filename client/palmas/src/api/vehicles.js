import axios from "./axios";

export const getVehicles = () => axios.get("/vehicles");
export const getVehicle = (id) => axios.get(`/vehicle/${id}`);
export const createVehicle = (vehicle) => axios.post("/vehicle", vehicle);
export const updateVehicle = (id, vehicle) =>
  axios.put(`/vehicle/${id}`, vehicle);
export const deleteVehicle = (id) => axios.delete(`/vehicle/${id}`);

export const getVehicleTypes = () => axios.get("/vehicleTypes");
export const getVehicleType = (id) => axios.get(`/vehicleType/${id}`);
export const createVehicleType = (vehicleType) =>
  axios.post("/vehicleType", vehicleType);
export const updateVehicleType = (id, vehicleType) =>
  axios.put(`/vehicleType/${id}`, vehicleType);
export const deleteVehicleType = (id) => axios.delete(`/vehicleType/${id}`);
