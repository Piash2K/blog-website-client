import { useState, useEffect } from "react";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";

const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const savedTheme = localStorage.getItem("selectedTheme");

    if (savedTheme) {
      document.body.setAttribute("data-theme", savedTheme);
      setIsDarkMode(savedTheme === "dark");
    } else {
      const initialTheme = prefersDarkMode ? "dark" : "light";
      document.body.setAttribute("data-theme", initialTheme);
      setIsDarkMode(prefersDarkMode);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("selectedTheme", newTheme); 
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="dark_mode">
      <button
        onClick={toggleTheme}
        className="text-lg mt-2 rounded-full transition dark:text-gray-300"
      >
        {isDarkMode ? (
          <span className="text-yellow-500">
            <IoSunny />
          </span>
        ) : (
          <FaMoon />
        )}
      </button>
    </div>
  );
};

export default DarkMode;