import api from "./api";

export const authService = {
  login: (email, password) => api.post("/auth/login", { email, password }),
  register: (data) => api.post("/auth/register", data),
  verifyOTP: (userId, otp) => api.post("/auth/verify-otp", { userId, otp }),
  resendOTP: (userId) => api.post("/auth/resend-otp", { userId }),
  forgotPassword: (email) => api.post("/auth/forgot-password", { email }),
  verifyResetOTP: (userId, otp) => api.post("/auth/verify-reset-otp", { userId, otp }),
  resetPassword: (token, password) => api.post("/auth/reset-password", { token, password }),
  getMe: () => api.get("/auth/me"),
  updateProfile: (data) => api.put("/auth/update", data),
};

export const appointmentHelpers = {
  book: (data) => api.post("/appointments/book", data),
  getMy: () => api.get("/appointments/my"),
  getById: (id) => api.get(`/appointments/${id}`),
  cancel: (id) => api.put(`/appointments/${id}/cancel`),
};
