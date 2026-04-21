import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,

  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  login: (user, token) => set({ user, token, error: null }),
  logout: () => set({ user: null, token: null }),

  clearError: () => set({ error: null }),
}));
