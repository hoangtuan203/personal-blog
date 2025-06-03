import { type FC, memo } from "react";
import { Calendar, ArrowRight } from "lucide-react";

interface AuthorInfoProps {
  author: string;
  authorAvatar: string;
  date: string;
  formatDate: (dateString: string) => string;
}

const AuthorInfo: FC<AuthorInfoProps> = memo(({ author, authorAvatar, date, formatDate }) => (
  <div className="flex items-center justify-between pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
    <div className="flex items-center space-x-3">
      <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-gray-200 dark:ring-gray-700">
        <img src={authorAvatar} alt={author} className="w-full h-full object-cover" />
      </div>
      <div>
        <div className="font-medium text-gray-900 dark:text-white text-sm">{author}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1">
          <Calendar className="w-3 h-3" />
          <span>{formatDate(date)}</span>
        </div>
      </div>
    </div>
    <button className="group/btn bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 flex items-center space-x-2">
      <span>Đọc thêm</span>
      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
    </button>
  </div>
));

export default AuthorInfo;