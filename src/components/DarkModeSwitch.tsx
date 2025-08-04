import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const DarkModeSwitch = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme) {
      setDarkMode(savedTheme === "dark" ? true : false);
    } else if (systemPrefersDark) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", darkMode ? "dark" : "light");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className="flex items-center gap-4">
      <span className="text-lg">{darkMode ? "Dark" : "Light"} Mode</span>

      <motion.button
        type="button"
        onClick={() => setDarkMode(!darkMode)}
        animate={{ backgroundColor: darkMode ? "#1e293b" : "#facc15" }}
        transition={{ duration: 0.4 }}
        className="rounded-full w-20 h-10 relative overflow-hidden dark:outline dark:ring-2 dark:outline-gray-50"
        aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
        title={`Switch to ${darkMode ? "light" : "dark"} mode`}
      >
        <motion.div
          className="h-8 w-8 rounded-full absolute top-1/2 -translate-y-1/2"
          animate={{
            left: darkMode ? "2.75rem" : "0.25rem",
            backgroundColor: darkMode ? "#f97316" : "#44bee4",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {darkMode ? (
            <div className="absolute top-1/2 left-1/2 -translate-1/2">
              <Moon fill="#1e293b" stroke="#1e293b" />
            </div>
          ) : (
            <div className="absolute top-1/2 left-1/2 -translate-1/2">
              <Sun fill="#facc15" stroke="#facc15" />
            </div>
          )}
        </motion.div>
      </motion.button>
    </div>
  );
};

export default DarkModeSwitch;
