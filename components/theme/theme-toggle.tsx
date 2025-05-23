"use client";
import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Use useEffect to determine if component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // Return a placeholder with the same structure during server rendering
  if (!mounted) {
    return (
      <div className="relative inline-flex items-center justify-center">
        <div className="w-14 h-6 rounded-full p-1 cursor-pointer flex items-center bg-gray-200">
          <div className="flex items-center justify-center w-4 h-4 rounded-full bg-white shadow-md transform">
            <div className="relative w-3 h-3"></div>
          </div>
        </div>
        <span className="sr-only">Toggle theme</span>
      </div>
    );
  }

  const isDark = theme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <div
        className={`w-14 h-6 rounded-full p-1 cursor-pointer flex items-center transition-all duration-500 ease-in-out ${isDark ? "bg-gray-700" : "bg-gray-200"
          }`}
        onClick={handleToggle}
        role="switch"
        aria-checked={isDark}
        aria-label="Toggle dark mode"
      >
        <div
          className={`flex items-center justify-center w-4 h-4 rounded-full bg-white shadow-md transform transition-all duration-500 ease-in-out ${isDark ? "translate-x-8" : "translate-x-0"
            }`}
        >
          <div className="relative w-3 h-3">
            <Moon
              className={`absolute h-3 w-3 text-blue-900 transition-opacity duration-500 ease-in-out ${isDark ? "opacity-100" : "opacity-0"
                }`}
            />
            <Sun
              className={`absolute h-3 w-3 text-yellow-500 transition-opacity duration-500 ease-in-out ${isDark ? "opacity-0" : "opacity-100"
                }`}
            />
          </div>
        </div>
      </div>
      <span className="sr-only">Toggle theme</span>
    </div>
  );
}