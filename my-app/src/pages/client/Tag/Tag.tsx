import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";

const Tags: React.FC = () => {
  // Sample tags data (replace with dynamic data from API or state management)
  const tags = [
    "React",
    "TypeScript",
    "TailwindCSS",
    "JavaScript",
    "Web Development",
    "Programming",
    "Tech",
    "Lifestyle",
    "Travel",
    "Food",
  ];
  
  return (
    <div className="w-full min-h-screen bg-white dark:bg-black">
      {/* Tags Section full width */}
      <section className="w-full py-20 border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-black dark:text-white mb-6 tracking-tight">
            Khám phá theo
            <span className="block mt-2 bg-gradient-to-r from-gray-700 to-black dark:from-gray-300 dark:to-white bg-clip-text text-transparent">
              Chủ đề
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed max-w-3xl mx-auto">
            Tìm các bài viết theo chủ đề yêu thích của bạn
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {tags.map((tag, index) => (
              <Button
                key={index}
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 text-black hover:bg-gray-100 dark:border-gray-600 dark:text-white dark:hover:bg-gray-800 px-4 py-2 text-base font-medium rounded-full transition-all duration-300 hover:scale-105"
              >
                <Link to={`/tag/${tag.toLowerCase()}`}>{tag}</Link>
              </Button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tags;