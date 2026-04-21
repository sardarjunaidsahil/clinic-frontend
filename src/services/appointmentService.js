import api from './api'

export const appointmentService = {
  getSlots: (doctorId, date) => api.get(`/appointments/slots?doctorId=${doctorId}&date=${date}`),
  book: (data) => api.post('/appointments/book', data),
  getMyAppointments: () => api.get('/appointments/my'),
  getMyRecords: () => api.get('/appointments/records'),   // ← NEW
  cancel: (id) => api.put(`/appointments/${id}/cancel`),
  getAll: (params) => api.get('/appointments/all', { params }),
  updateStatus: (id, status, notes) => api.put(`/appointments/${id}/status`, { status, notes }),
}