import React from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";

interface UserMenuProps {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserMenu: React.FC<UserMenuProps> = ({ isAuthenticated, setIsAuthenticated }) => {
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="relative">
      {isAuthenticated ? (
        <>
          {/* Full-sized button for md screens and above */}
          <div className="hidden md:flex items-center">
            <Link to="/create-post">
              <Button
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-4 py-2 rounded-xl flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-100"
              >
                <Plus className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                <span>Bài viết mới</span>
              </Button>
            </Link>
          </div>
          {/* Icon-only button for mobile screens */}
          <div className="flex md:hidden items-center">
            <Link to="/create-post">
              <Button
                size="icon"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-100"
              >
                <Plus className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="font-medium text-black dark:text-white border-gray-600 dark:border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
          >
            <Link to="/">Sign In</Link>
          </Button>
          <Button
            variant="default"
            size="sm"
            asChild
            className="font-medium bg-black text-white dark:bg-gray-200 dark:text-black hover:bg-gray-800 dark:hover:bg-gray-300 transition-colors duration-150"
          >
            <Link to="/sign-up">Sign Up</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;