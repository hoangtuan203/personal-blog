import {type FC, memo } from "react";
import { Tag } from "lucide-react";

interface TagsProps {
  tags: string[];
}

const Tags: FC<TagsProps> = memo(({ tags }) => (
  <div className="flex flex-wrap gap-2 mb-4">
    {tags.map((tag, index) => (
      <div
        key={tag}
        className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-500 cursor-pointer hover:scale-105 ${
          index === 0
            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
            : "bg-gray-100/80 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200/80 dark:hover:bg-gray-700/50"
        }`}
      >
        <div className="flex items-center space-x-1">
          <Tag className="w-3 h-3" />
          <span>{tag}</span>
        </div>
      </div>
    ))}
  </div>
));

export default Tags;
