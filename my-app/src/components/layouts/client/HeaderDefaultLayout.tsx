import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SunIcon, MoonIcon, PlusCircleIcon, UserCircleIcon } from "@heroicons/react/24/solid";

const HeaderLayout: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLoginLogout = () => {
    if (isAuthenticated) {
      setIsAuthenticated(false);
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="w-full px-4 sm:px-6 lg:px-12 py-2 flex justify-between items-center max-w-screen-2xl mx-auto">
        <Link to="/" className="text-xl font-semibold text-blue-600 dark:text-blue-400">
          MyBlog
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
            Home
          </Link>
          <Link to="/blog" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
            Blog
          </Link>
          <Link to="/tags" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
            Tags
          </Link>
          {isAuthenticated && (
            <Link to="/create-post" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 flex items-center">
              <PlusCircleIcon className="w-5 h-5 mr-1" /> New Post
            </Link>
          )}
          <button
            onClick={handleLoginLogout}
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 flex items-center"
          >
            <UserCircleIcon className="w-5 h-5 mr-1" />
            {isAuthenticated ? "Logout" : "Login"}
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderLayout;