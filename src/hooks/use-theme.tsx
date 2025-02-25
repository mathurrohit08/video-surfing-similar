
import { create } from "zustand";

type ThemeStore = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

export const useTheme = create<ThemeStore>((set) => ({
  theme: 
    localStorage.getItem("theme") as "light" | "dark" || 
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"),
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark");
      return { theme: newTheme };
    }),
}));

// Initialize theme
if (typeof window !== "undefined") {
  const theme = localStorage.getItem("theme") as "light" | "dark" || 
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.classList.toggle("dark", theme === "dark");
}
