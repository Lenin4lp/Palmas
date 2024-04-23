import axios from "axios";

const instance = axios.create({
  baseURL: "https://aliquot.api.softdeveral.com/api",
  withCredentials: true,
});

export default instance;
