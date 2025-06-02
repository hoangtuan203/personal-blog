import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col w-full max-w-full bg-white dark:bg-black">
      {/* Hero Section full width, no horizontal padding */}
      <section className="flex-1 py-20 border-b border-gray-200 dark:border-gray-800 animate-[fadeInUp_0.8s_ease-out] w-full max-w-full px-0">
        <div className="w-full max-w-full text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-black dark:text-white mb-6 tracking-tight">
            Chào mừng đến với
            <span className="block mt-2 bg-gradient-to-r from-gray-700 to-black dark:from-gray-300 dark:to-white bg-clip-text text-transparent">
              MyBlog
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            Khám phá những câu chuyện thú vị, chia sẻ kinh nghiệm và kết nối với cộng đồng yêu thích viết lách
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 px-8 py-3 text-lg font-medium rounded-full transition-all duration-300 hover:scale-105"
            >
              <Link to="/blog">Khám phá ngay</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-black text-black hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black px-8 py-3 text-lg font-medium rounded-full transition-all duration-300"
            >
              Tìm hiểu thêm
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;