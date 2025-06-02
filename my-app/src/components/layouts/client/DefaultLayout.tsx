import React from "react";
import { ThemeProvider } from "../../theme/theme-provider";
import HeaderLayout from "./HeaderDefaultLayout";
import { Sidebar } from "./Sidebar";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Sidebar />
        
        <div className="flex-1 flex flex-col lg:ml-64 w-full min-w-0">
          <HeaderLayout />
          <main className="flex-1 overflow-auto animate-[fadeIn_0.5s_ease-out]">
            <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default DefaultLayout;