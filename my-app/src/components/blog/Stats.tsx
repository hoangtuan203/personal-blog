import {type FC, memo } from "react";
import { Eye, Heart, MessageCircle } from "lucide-react";

interface StatsProps {
  viewCount: number;
  likeCount: number;
  commentCount: number;
  formatNumber: (num: number) => string;
}

const Stats: FC<StatsProps> = memo(({ viewCount, likeCount, commentCount, formatNumber }) => (
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
      <div className="flex items-center space-x-1">
        <Eye className="w-4 h-4" />
        <span>{formatNumber(viewCount)}</span>
      </div>
      <div className="flex items-center space-x-1">
        <Heart className="w-4 h-4" />
        <span>{formatNumber(likeCount)}</span>
      </div>
      <div className="flex items-center space-x-1">
        <MessageCircle className="w-4 h-4" />
        <span>{commentCount}</span>
      </div>
    </div>
  </div>
));

export default Stats;
