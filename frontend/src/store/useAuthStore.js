import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      resetEmail: "",

      setAuth: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),

      setResetEmail: (email) => set({ resetEmail: email }),
      clearResetEmail: () => set({ resetEmail: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
