import { create } from "zustand";
import { persist } from "zustand/middleware";

type StoreState = {
  isAuthenticated: boolean;
  toggleAuth: () => void;
};

const INITIAL_STATE = {
  isAuthenticated: false,
};

export const useStoreApp = create<StoreState>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,
      toggleAuth: () =>
        set((state) => ({ isAuthenticated: !state.isAuthenticated })),
    }),
    {
      name: "isAuth",
    }
  )
);
