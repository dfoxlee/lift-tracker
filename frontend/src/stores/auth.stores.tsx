import { create } from "zustand";

interface AuthStoreType {
   token: string | null;
   weightUnitPreferenceId: number | null;

   setToken: (token: string | null) => void;
   setWeightUnitPreferenceId: (id: number | null) => void;
}

export const useAuthStore = create<AuthStoreType>((set) => ({
   token: null,
   weightUnitPreferenceId: 1,

   setToken: (token: string | null) => set({ token }),

   setWeightUnitPreferenceId: (id: number | null) =>
      set({ weightUnitPreferenceId: id }),
}));
