import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  token: typeof window !== 'undefined' ? sessionStorage.getItem('jwt') : null,
  setToken: (token) => {
    sessionStorage.setItem('jwt', token);
    set({ token });
  },
  clearToken: () => {
    sessionStorage.removeItem('jwt');
    set({ token: null });
  },
}));
