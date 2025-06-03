import { type FC, memo } from "react";
import { Heart, MessageCircle, Bookmark, Share2 } from "lucide-react";

interface ActionBarProps {
  likes: number;
  isLiked: boolean;
  isBookmarked: boolean;
  onLike: () => void;
  onBookmark: () => void;
  onShare: () => void;
  commentCount: number;
}

const ActionBar: FC<ActionBarProps> = memo(
  ({ likes, isLiked, isBookmarked, onLike, onBookmark, onShare, commentCount }) => (
    <div className="sticky top-6 z-30 mx-4 sm:mx-6 lg:mx-8 mt-6">
      <div className="flex justify-between items-center bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-lg border border-gray-100">
        <div className="flex items-center gap-4">
          <button
            onClick={onLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
              isLiked ? "bg-red-100 text-red-600" : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
            <span className="font-medium">{likes}</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-600 rounded-xl transition-all duration-300">
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium">{commentCount}</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onBookmark}
            className={`p-2 rounded-xl transition-all duration-300 ${
              isBookmarked ? "bg-yellow-100 text-yellow-600" : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`} />
          </button>
          <button
            onClick={onShare}
            className="p-2 hover:bg-gray-100 text-gray-600 rounded-xl transition-all duration-300"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
);

export default ActionBar;