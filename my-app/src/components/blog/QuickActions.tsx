import {type FC, memo } from "react";
import { Heart, Bookmark, Share2 } from "lucide-react";

interface QuickActionsProps {
  postId: string;
  isLiked: boolean;
  isBookmarked: boolean;
  isHovered: boolean;
  onLike: (postId: string) => void;
  onBookmark: (postId: string) => void;
  onShare: (postId: string) => void;
}

const QuickActions: FC<QuickActionsProps> = memo(
  ({ postId, isLiked, isBookmarked, isHovered, onLike, onBookmark, onShare }) => (
    <div
      className={`absolute top-4 right-4 flex space-x-2 transition-opacity duration-300 ${
        isHovered ? "opacity-100" : "opacity-0"
      }`}
    >
      <button
        onClick={() => onLike(postId)}
        className={`p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md hover:bg-blue-500 hover:text-white transition-all duration-300 ${
          isLiked ? "text-red-500" : "text-gray-600 dark:text-gray-300"
        }`}
        title={isLiked ? "Bỏ thích" : "Thích"}
      >
        <Heart className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} />
      </button>
      <button
        onClick={() => onBookmark(postId)}
        className={`p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md hover:bg-yellow-500 hover:text-white transition-all duration-300 ${
          isBookmarked ? "text-yellow-500" : "text-gray-600 dark:text-gray-300"
        }`}
        title={isBookmarked ? "Bỏ lưu" : "Lưu"}
      >
        <Bookmark className="w-5 h-5" fill={isBookmarked ? "currentColor" : "none"} />
      </button>
      <button
        onClick={() => onShare(postId)}
        className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md hover:bg-green-500 hover:text-white transition-all duration-300 text-gray-600 dark:text-gray-300"
        title="Chia sẻ"
      >
        <Share2 className="w-5 h-5" />
      </button>
    </div>
  )
);

export default QuickActions;
