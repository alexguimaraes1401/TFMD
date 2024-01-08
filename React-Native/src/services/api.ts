import axios from "axios";
import appConfig from "../../app.config";

const api = axios.create({
  baseURL: appConfig.extra.BASE_URL,
});

export default api;
