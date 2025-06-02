import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ModeToggle } from "../theme/model-toggle";
import { Button } from "../ui/button";


interface UserMenuProps {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserMenu: React.FC<UserMenuProps> = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <div className="relative">
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex items-center text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
              aria-label="Menu người dùng"
            >
              <div className="w-8 h-8 rounded-full bg-white dark:bg-black border border-black dark:border-white flex items-center justify-center overflow-hidden hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-200">
                <UserCircleIcon className="w-6 h-6 text-black dark:text-white" />
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-white dark:bg-black border-black dark:border-white rounded-lg shadow-xl"
          >
            <DropdownMenuItem asChild>
              <Link
                to="/profile"
                className="flex items-center px-4 py-3 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-150"
              >
                <span className="font-medium">Hồ sơ</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                to="/settings"
                className="flex items-center px-4 py-3 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-150"
              >
                <span className="font-medium">Cài đặt</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                to="/my-posts"
                className="flex items-center px-4 py-3 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-150"
              >
                <span className="font-medium">Bài viết của tôi</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-black dark:bg-white" />
            <DropdownMenuItem asChild>
              <div className="px-4 py-3">
                <ModeToggle />
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button
                variant="ghost"
                className="w-full text-left flex items-center px-4 py-3 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-150"
                onClick={handleLogout}
              >
                <span className="font-medium">Đăng xuất</span>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="font-medium text-black dark:text-white border-black dark:border-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors duration-150"
          >
            <Link to="/login">Sign In</Link>
          </Button>
          <Button
            variant="default"
            size="sm"
            asChild
            className="font-medium bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-150"
          >
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;