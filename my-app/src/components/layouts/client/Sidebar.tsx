import { useState } from "react";
import { BookOpen, Flame, Home, MessageSquare, Tag, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { ProfilePanel } from "../../../pages/client/Profile/ProfilePanel";

// Define TypeScript interfaces for type safety
interface HotPost {
  id: string;
  title: string;
  views: string;
}

interface SidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
}

const popularTags: string[] = ["Tech", "Programming", "JavaScript", "React", "Life", "Career"];
const hotPosts: HotPost[] = [
  { id: "post-1", title: "Bài viết đầu tiên", views: "1.2k" },
  { id: "post-2", title: "Mẹo viết bài tốt hơn", views: "856" },
  { id: "post-3", title: "Tại sao tôi bắt đầu viết blog", views: "642" },
];

export const Sidebar: React.FC<SidebarProps> = ({ isMobile = false, onClose }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleProfileClick = () => {
    setIsProfileOpen(true);
  };

  const handleProfileClose = () => {
    setIsProfileOpen(false);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full w-full bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 overflow-y-auto">
      <div className="p-6 space-y-8">
        {/* Logo/Brand */}
        <Link 
          to="/" 
          className="flex items-center space-x-3 group animate-[slideIn_0.5s_ease-out]" 
          onClick={onClose}
        >
          <div className="p-2 rounded-xl bg-black dark:bg-white group-hover:scale-110 transition-transform duration-300">
            <BookOpen className="w-6 h-6 text-white dark:text-black" />
          </div>
          <div>
            <span className="text-xl font-bold text-black dark:text-white block leading-tight">
              MyBlog
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Personal Space
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="space-y-2 animate-[slideIn_0.5s_ease-out] delay-100">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Navigation
          </h3>
          <Link
            to="/"
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-300 group relative overflow-hidden"
            onClick={onClose}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10 dark:to-white/10 group-hover:from-transparent group-hover:to-transparent transition-all duration-500" />
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            <span className="font-medium">Home</span>
          </Link>
          <Link
            to="/blog"
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-300 group relative overflow-hidden"
            onClick={onClose}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10 dark:to-white/10 group-hover:from-transparent group-hover:to-transparent transition-all duration-500" />
            <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            <span className="font-medium">Blog</span>
          </Link>
          <Link
            to="/tags"
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-300 group relative overflow-hidden"
            onClick={onClose}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10 dark:to-white/10 group-hover:from-transparent group-hover:to-transparent transition-all duration-500" />
            <Tag className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            <span className="font-medium">Tags</span>
          </Link>
          <Link
            to="/forum"
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-300 group relative overflow-hidden"
            onClick={onClose}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10 dark:to-white/10 group-hover:from-transparent group-hover:to-transparent transition-all duration-500" />
            <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            <span className="font-medium">Forum</span>
          </Link>
        </nav>

        {/* User Info */}
        <div className="space-y-3 animate-[slideIn_0.5s_ease-out] delay-200">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Profile
          </h3>
          <div
            className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
            onClick={handleProfileClick}
          >
            <Avatar className="w-10 h-10 ring-2 ring-gray-300 dark:ring-gray-600">
              <AvatarImage src="https://github.com/shadcn.png" alt="Người dùng" />
              <AvatarFallback className="bg-black text-white dark:bg-white dark:text-black font-semibold">
                ND
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-black dark:text-white truncate">
                Hoàng Tuấn
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                <Users className="w-3 h-3 mr-1" />
                Thành viên
              </div>
            </div>
          </div>
        </div>

        {/* Popular Tags */}
        <div className="space-y-3 animate-[slideIn_0.5s_ease-out] delay-300">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Popular Tags
            </h3>
            <TrendingUp className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag, index) => (
              <Link 
                to={`/tags/${tag.toLowerCase()}`} 
                key={tag} 
                onClick={onClose}
                className="animate-[fadeIn_0.3s_ease-out]"
                style={{ animationDelay: `${300 + index * 50}ms` }}
              >
                <Badge
                  variant="secondary"
                  className="bg-gray-100 text-black hover:bg-black hover:text-white dark:bg-gray-800 dark:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 px-3 py-1 rounded-full font-medium cursor-pointer hover:scale-105"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        {/* Trending Posts */}
        <div className="space-y-3 animate-[slideIn_0.5s_ease-out] delay-400">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Trending Posts
            </h3>
            <Flame className="w-4 h-4 text-gray-400" />
          </div>
          <div className="space-y-2">
            {hotPosts.map((post, index) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="block transition-all duration-300 hover:bg-black/5 dark:hover:bg-white/5 hover:translate-x-1 rounded-lg p-2 -m-2 animate-[fadeIn_0.3s_ease-out]"
                onClick={onClose}
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                    <Flame className="w-4 h-4 text-orange-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-black dark:text-white line-clamp-2 leading-tight mb-1">
                      {post.title}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {post.views} lượt xem
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="space-y-3 animate-[slideIn_0.5s_ease-out] delay-500">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Community Stats
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center">
              <div className="text-lg font-bold text-black dark:text-white">125</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Bài viết</div>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center">
              <div className="text-lg font-bold text-black dark:text-white">2.4K</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Lượt xem</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className={`lg:block fixed top-0 left-0 w-64 h-full z-50 ${isMobile ? "block" : "hidden"}`}>
        {sidebarContent}
      </aside>
      <ProfilePanel isOpen={isProfileOpen} onClose={handleProfileClose} />
    </>
  );
};