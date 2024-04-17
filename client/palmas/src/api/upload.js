import axios from "./axios";

export const upload = (file) => axios.post("/upload", file);
