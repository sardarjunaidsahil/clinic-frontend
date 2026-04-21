import api from "./api";

export const doctorService = {
  getAll: (params) => api.get("/doctors", { params }),
  getById: (id) => api.get(`/doctors/${id}`),
  add: (data) =>
    api.post("/doctors", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  update: (id, data) =>
    api.put(`/doctors/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  setSchedule: (id, schedule) =>
    api.put(`/doctors/${id}/schedule`, { schedule }),
};
