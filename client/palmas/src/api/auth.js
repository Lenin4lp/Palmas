import axios from "./axios";

export const loginRequest = (user) => axios.post("/login", user);
export const veryTokenRequest = () => axios.get("/verify");
export const logoutRequest = () => axios.post("/logout");
export const registerRequest = (user) => axios.post("/register", user);
