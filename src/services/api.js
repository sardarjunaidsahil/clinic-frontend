import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://clinic-backend-liard.vercel.app/api",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  try {
    const u = JSON.parse(sessionStorage.getItem("wc_user") || "{}");
    if (u?.token) config.headers.Authorization = `Bearer ${u.token}`;
  } catch {}
  return config;
});

api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response?.status === 401) {
      sessionStorage.removeItem("wc_user");
      if (!window.location.pathname.includes("/login"))
        window.location.href = "/login";
    }
    return Promise.reject(err.response?.data || { message: err.message });
  },
);

export default api;
