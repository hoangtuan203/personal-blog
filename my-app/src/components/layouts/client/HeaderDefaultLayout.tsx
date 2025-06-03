import React, { useState } from "react";
import { Search } from "lucide-react";
import UserMenu from "../../user/UserMenu";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { ModeToggle } from "../../theme/model-toggle";

const HeaderLayout: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Search:", searchQuery);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 w-full">
      <div className="w-full max-w-none">
        <div className="flex items-center justify-between px-0 sm:px-2 lg:px-4 py-3">
          <form
            onSubmit={handleSearch}
            className="flex items-center w-full max-w-xs lg:max-w-sm mr-4 lg:mr-6 lg:ml-0 ml-2"
          >
            <Input
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-r-none focus:ring-blue-500 dark:focus:ring-blue-400 text-sm px-2 py-1.5 h-9"
            />
            <Button
              type="submit"
              variant="default"
              size="icon"
              className="bg-black text-white hover:bg-black  rounded-l-none border border-black  h-9 w-9"
            >
              <Search className="w-4 h-4" />
            </Button>
          </form>
          <div className="flex items-center space-x-6">
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