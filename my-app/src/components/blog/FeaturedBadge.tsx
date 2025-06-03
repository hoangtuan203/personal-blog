import { type FC, memo } from "react";
import { TrendingUp } from "lucide-react";

interface FeaturedBadgeProps {
  isFeatured?: boolean;
}

const FeaturedBadge: FC<FeaturedBadgeProps> = memo(({ isFeatured }) => {
  if (!isFeatured) return null;
  return (
    <div className="absolute -top-3 -left-3 z-20">
      <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg shadow-amber-500/30 flex items-center space-x-1">
        <TrendingUp className="w-3 h-3" />
        <span>Nổi bật</span>
      </div>
    </div>
  );
});

export default FeaturedBadge;