import axios from "./axios";

export const getAccountStates = () => axios.get("/accountStates");
export const getAccountState = (id) => axios.get(`/accountState/${id}`);
