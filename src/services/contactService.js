import api from "./api";

export const contactService = {
  send: async (formData) => {
    // return api.post('/contact', formData)
    return new Promise((resolve) =>
      setTimeout(() => resolve({ success: true }), 800),
    );
  },
};
