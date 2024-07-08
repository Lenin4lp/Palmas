import axios from "./axios";

export const upload = (file) => axios.post("/upload", file);
export const extraUpload = (file) => axios.post("/extraUpload", file);
export const accountUpload = (file) => axios.post("/accountUpload", file);
