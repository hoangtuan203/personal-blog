import { type FC, memo } from "react";
import { BookOpen, Clock } from "lucide-react";
import FeaturedBadge from "./FeaturedBadge";
import Stats from "./Stats";
import AuthorInfo from "./AuthorInfo";
import type { Post } from "../../types/Post";
import Tags from "../Tag/Tags";
import QuickActions from "./QuickActions";

interface PostCardProps {
  post: Post;
  isHovered: boolean;
  isLiked: boolean;
  isBookmarked: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onLike: (postId: string) => void;
  onShare: (postId: string) => void;
  onBookmark: (postId: string) => void;
  formatNumber: (num: number) => string;
  formatDate: (dateString: string) => string;
}

const PostCard: FC<PostCardProps> = memo(
  ({
    post,
    isHovered,
    isLiked,
    isBookmarked,
    onMouseEnter,
    onMouseLeave,
    onLike,
    onShare,
    onBookmark,
    formatNumber,
    formatDate,
  }) => (
    
    <article
      className="group relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      
      <FeaturedBadge isFeatured={post.isFeatured} />
      <div
        className={`backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-3xl border border-white/20 dark:border-gray-700/50 shadow-2xl shadow-blue-500/5 dark:shadow-purple-500/10 overflow-hidden transition-all duration-700 ${
          isHovered ? "scale-[1.02] shadow-3xl shadow-blue-500/20" : ""
        }`}
      >
        <div className="flex flex-col lg:flex-row">
          {/* Phần hình ảnh */}
          <div className="lg:w-2/5 relative overflow-hidden">
            <div className="relative h-64 lg:h-80 group-hover:scale-105 transition-transform duration-700">
              <img
                src={post.images[0]}
                alt={post.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-purple-900/30 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
              <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                  isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
              >
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                  <BookOpen className="w-8 h-8 text-white drop-shadow-lg" />
                </div>
              </div>
             <QuickActions
                postId={post.id}
                isLiked={isLiked}
                isBookmarked={isBookmarked}
                isHovered={isHovered}
                onLike={onLike}
                onBookmark={onBookmark}
                onShare={onShare}
              />
              <div className="absolute bottom-4 left-4">
                <div className="bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{post.readTime} phút đọc</span>
                </div>
              </div>
            </div>
          </div>
          {/* Phần nội dung */}
          <div className="lg:w-3/5 p-8 lg:p-10 flex flex-col justify-between">
            <Tags tags={post.tags} />
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {post.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 leading-relaxed">
              {post.excerpt}
            </p>
            <Stats
              viewCount={post.viewCount}
              likeCount={post.likeCount as number}
              commentCount={post.commentCount as number}
              formatNumber={formatNumber}
            />
            <AuthorInfo
              author={post.author}
              authorAvatar={post.authorAvatar}
              date={post.date}
              formatDate={formatDate}
            />
          </div>
        </div>
      </div>
    </article>
  )
);

export default PostCard;
