import axios from "axios";
import { getJWT } from "./auth";

const BASE_URL = import.meta.env.VITE_API_URL || "/";

// Public Axios instance (no auth)
export const publicAxios = axios.create({
  baseURL: BASE_URL,
});

// Private Axios instance (we'll attach Authorization header when token is set)
export const privateAxios = axios.create({
  baseURL: BASE_URL,
});

// Attach token to outgoing private requests. Prefer in-memory token, fall back to storage.
privateAxios.interceptors.request.use(
  async (config) => {
    const token = await getJWT();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
