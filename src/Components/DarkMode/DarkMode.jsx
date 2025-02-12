import{ useState, useEffect } from "react";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";

const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Set the initial theme based on localStorage
  useEffect(() => {
    const selectedTheme = localStorage.getItem("selectedTheme");
    if (selectedTheme === "dark") {
      document.body.setAttribute("data-theme", "dark");
      setIsDarkMode(true);
    } else {
      document.body.setAttribute("data-theme", "light");
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      // Switch to light mode
      document.body.setAttribute("data-theme", "light");
      localStorage.setItem("selectedTheme", "light");
      setIsDarkMode(false);
    } else {
      // Switch to dark mode
      document.body.setAttribute("data-theme", "dark");
      localStorage.setItem("selectedTheme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <div className="dark_mode">
      <button
        onClick={toggleTheme}
        className="text-lg mt-2 rounded-full transition  dark:text-gray-300"
      >
        {isDarkMode ? <span className="text-yellow-500"><IoSunny /></span>: <FaMoon/>}
      </button>
    </div>
  );
};

export default DarkMode;