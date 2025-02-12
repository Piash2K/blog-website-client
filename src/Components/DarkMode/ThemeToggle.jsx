import { Moon, Sun } from "lucide-react";
import useTheme from "./useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-2 rounded-full bg-secondary-light dark:bg-secondary-dark 
                   text-text-light dark:text-text-dark hover:opacity-80 transition-opacity"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
}