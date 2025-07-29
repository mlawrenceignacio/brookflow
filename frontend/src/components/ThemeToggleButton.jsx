import React, { useEffect, useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { FaRegSun } from "react-icons/fa";

const ThemeToggleButton = () => {
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <div
      className="w-[75%] h-12 rounded-full bg-gray-200 dark:bg-gray-900 2xl:dark:bg-gray-800 p-1 relative cursor-pointer transition-colors duration-300 flex items-center"
      onClick={toggleTheme}
    >
      <div
        className={`h-10 w-10 flex items-center justify-center bg-white dark:bg-black rounded-full shadow-md transition-all duration-300 ${
          isDark ? "ml-auto" : "ml-0"
        }`}
      >
        {isDark ? (
          <FaRegSun size={25} color="orange" />
        ) : (
          <MdDarkMode size={30} />
        )}
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none">
        <span
          className={`font-medium text-xl ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          {isDark ? "Light" : "Dark"}
        </span>
      </div>
    </div>
  );
};

export default ThemeToggleButton;
