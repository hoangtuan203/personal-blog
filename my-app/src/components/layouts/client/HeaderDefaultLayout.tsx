import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Plus } from "lucide-react";
import UserMenu from "../../user/UserMenu";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { ModeToggle } from "../../theme/model-toggle";

const HeaderLayout: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Search:", searchQuery);
    }
  };

  return (
    <header className="bg-white dark:bg-black shadow-sm border-b border-black dark:border-white sticky top-0 z-40 w-full">
      <div className="w-full max-w-none mx-auto">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-12 py-3">
          <form
            onSubmit={handleSearch}
            className="flex items-center w-full lg:ml-0 ml-4"
          >
            <Input
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-100 dark:bg-gray-900 border-black dark:border-white text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-r-none focus:ring-black dark:focus:ring-white flex-1"
            />
            <Button
              type="submit"
              variant="default"
              size="icon"
              className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 rounded-l-none border border-black dark:border-white"
            >
              <Search className="w-4 h-4" />
            </Button>
          </form>
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex items-center space-x-6">
              {isAuthenticated && (
                <Link
                  to="/create-post"
                  className="flex items-center text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                >
                  <Plus className="w-5 h-5 mr-1" />
                  Bài viết mới
                </Link>
              )}
            </nav>
            <div className="flex items-center space-x-2">
              <UserMenu
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
              />
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderLayout;