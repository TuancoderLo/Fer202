// Set config defaults when creating the instance
import axios from "axios";
const api = axios.create({
  baseURL: "https://678b95c11a6b89b27a2acf18.mockapi.io/Orchid",
});

export default api;
