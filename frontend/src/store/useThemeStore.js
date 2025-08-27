import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("Ping_Mee-theme")||"coffee",
  setTheme: (theme) =>{
    localStorage.setItem("Ping_Mee-theme",theme)
    set({ theme })
   },
}));