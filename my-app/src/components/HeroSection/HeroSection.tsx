import {  memo, type FC } from "react";
import { MapPin, Clock, Eye } from "lucide-react";
import type { Post } from "../../types/Post";

interface HeroSectionProps {
  post: Post;
}

const HeroSection: FC<HeroSectionProps> = memo(({ post }) => (
  <div className="relative h-screen overflow-hidden">
    <div className="absolute inset-0">
      <img
        src={post.images[0]}
        alt={post.title}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30"></div>
    </div>
    <div className="relative z-10 flex items-end h-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 pb-20">
        <div className="w-full">
          <div className="flex flex-wrap gap-3 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/30"
              >
                <MapPin className="w-4 h-4" />
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-white/90">
            <div className="flex items-center gap-3">
              <img
                src={post.authorAvatar}
                alt={post.author}
                className="w-12 h-12 rounded-full border-2 border-white/50"
                loading="lazy"
              />
              <div>
                <p className="font-semibold">{post.author}</p>
                <p className="text-sm text-white/70">{post.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                {post.viewCount.toLocaleString()} lượt xem
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
));

export default HeroSection;