import { Edit, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";

// Define TypeScript interfaces for type safety
interface Post {
  id: string;
  title: string;
  date: string;
}

interface ProfilePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const userPosts: Post[] = [
  { id: "post-1", title: "Bài viết đầu tiên", date: "2025-05-20" },
  { id: "post-2", title: "Mẹo viết bài tốt hơn", date: "2025-05-15" },
  { id: "post-3", title: "Tại sao tôi bắt đầu viết blog", date: "2025-05-10" },
];

export const ProfilePanel: React.FC<ProfilePanelProps> = ({ isOpen, onClose }) => {
  // Placeholder user info; in a real app, this would come from props or context
  const userInfo = {
    name: "Hoàng Tuấn",
    email: "hoangtuan@example.com",
    joinDate: "Tháng 5, 2024",
    avatarUrl: "https://github.com/shadcn.png",
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-black border-l border-gray-200 dark:border-gray-800 z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full p-6 space-y-6 overflow-y-auto">
        {/* Close Button */}
        <div className="flex justify-end">
          <Button
            variant="ghost"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full"
            onClick={onClose}
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </Button>
        </div>

        {/* User Information */}
        <div className="space-y-4 animate-[slideIn_0.5s_ease-out]">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              User Information
            </h3>
            <Link to="/profile" onClick={onClose}>
              <Button
                variant="ghost"
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full"
              >
                <Edit className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </Button>
            </Link>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center space-x-4 mb-4">
              <Avatar className="w-12 h-12 ring-2 ring-gray-300 dark:ring-gray-600">
                <AvatarImage src={userInfo.avatarUrl} alt="Người dùng" />
                <AvatarFallback className="bg-black text-white dark:bg-white dark:text-black font-semibold">
                  ND
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="text-base font-medium text-black dark:text-white truncate">
                  {userInfo.name}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Email: {userInfo.email}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Thành viên từ: {userInfo.joinDate}
              </div>
            </div>
          </div>
        </div>

        {/* History Posts */}
        <div className="space-y-4 animate-[slideIn_0.5s_ease-out] delay-100">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            History Posts
          </h3>
          <div className="space-y-3">
            {userPosts.map((post, index) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="block transition-all duration-300 hover:bg-black/5 dark:hover:bg-white/5 hover:translate-x-1 rounded-lg p-3 -m-3 animate-[fadeIn_0.3s_ease-out]"
                style={{ animationDelay: `${100 + index * 100}ms` }}
                onClick={onClose}
              >
                <div className="text-sm font-medium text-black dark:text-white line-clamp-2 leading-tight mb-1">
                  {post.title}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {post.date}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};