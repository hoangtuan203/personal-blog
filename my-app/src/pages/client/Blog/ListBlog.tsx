import { useState, useEffect } from "react";
import { 
  BookOpen, 
  Calendar, 
  MessageCircle, 
  Tag, 
  User, 
  Clock,
  Eye,
  Heart,
  Share2,
  Bookmark,
  ArrowRight,
  Sparkles,
  TrendingUp
} from "lucide-react";

// Define TypeScript interfaces for type safety
interface Post {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  authorAvatar: string;
  commentCount: number;
  viewCount: number;
  likeCount: number;
  readTime: number;
  tags: string[];
  isFeatured?: boolean;
}

// Mock data for posts
const mockPosts: Post[] = [
  {
    id: "post-1",
    title: "Khám phá vẻ đẹp Đà Lạt trong mùa hoa anh đào",
    excerpt: "Giới thiệu ngắn gọn về blog và những gì bạn có thể mong đợi từ nội dung của tôi. Đây là nơi tôi chia sẻ những trải nghiệm và suy nghĩ cá nhân về cuộc sống và du lịch.",
    image: "https://res.cloudinary.com/dm1alq68q/image/upload/v1748865172/dalat_4_pqmrub.jpg",
    date: "2025-06-01",
    author: "Nguyễn Văn A",
    authorAvatar: "https://github.com/shadcn.png",
    commentCount: 24,
    viewCount: 1250,
    likeCount: 89,
    readTime: 5,
    tags: ["Du lịch", "Đà Lạt", "Nhiếp ảnh"],
    isFeatured: true,
  },
  {
    id: "post-2",
    title: "Bí quyết viết content hấp dẫn cho blog cá nhân",
    excerpt: "Học cách viết những câu chuyện hấp dẫn và thu hút người đọc hiệu quả. Một số mẹo hữu ích để cải thiện kỹ năng viết lách của bạn và xây dựng thương hiệu cá nhân.",
    image: "https://res.cloudinary.com/dm1alq68q/image/upload/v1748865172/dalat_4_pqmrub.jpg",
    date: "2025-06-02",
    author: "Trần Thị B",
    authorAvatar: "https://github.com/shadcn.png",
    commentCount: 18,
    viewCount: 892,
    likeCount: 67,
    readTime: 7,
    tags: ["Viết lách", "Content", "Marketing"],
  },
  {
    id: "post-3",
    title: "Hành trình khởi nghiệp từ ý tưởng đến thành công",
    excerpt: "Hành trình của tôi khi bắt đầu viết blog và những động lực đằng sau việc chia sẻ suy nghĩ. Một câu chuyện về đam mê, sáng tạo và những thử thách trong khởi nghiệp.",
    image: "https://res.cloudinary.com/dm1alq68q/image/upload/v1748865172/dalat_4_pqmrub.jpg",
    date: "2025-06-03",
    author: "Lê Văn C",
    authorAvatar: "https://github.com/shadcn.png",
    commentCount: 32,
    viewCount: 1567,
    likeCount: 124,
    readTime: 8,
    tags: ["Khởi nghiệp", "Kinh doanh", "Động lực"],
    isFeatured: true,
  },
  {
    id: "post-4",
    title: "Xu hướng công nghệ 2025: AI và tương lai",
    excerpt: "Phân tích sâu về những xu hướng công nghệ mới nhất và tác động của chúng đến cuộc sống hàng ngày. Khám phá cách AI thay đổi thế giới chúng ta.",
    image: "https://res.cloudinary.com/dm1alq68q/image/upload/v1748865172/dalat_4_pqmrub.jpg",
    date: "2025-06-04",
    author: "Phạm Minh D",
    authorAvatar: "https://github.com/shadcn.png",
    commentCount: 45,
    viewCount: 2134,
    likeCount: 187,
    readTime: 12,
    tags: ["Công nghệ", "AI", "Tương lai"],
  },
  {
    id: "post-5",
    title: "Nghệ thuật chụp ảnh đường phố ở Sài Gòn",
    excerpt: "Khám phá vẻ đẹp của Sài Gòn qua ống kính máy ảnh. Những mẹo nhỏ để có được những bức ảnh đường phố ấn tượng và đầy cảm xúc.",
    image: "https://res.cloudinary.com/dm1alq68q/image/upload/v1748865172/dalat_4_pqmrub.jpg",
    date: "2025-06-05",
    author: "Nguyễn Thị E",
    authorAvatar: "https://github.com/shadcn.png",
    commentCount: 29,
    viewCount: 1023,
    likeCount: 78,
    readTime: 6,
    tags: ["Nhiếp ảnh", "Sài Gòn", "Nghệ thuật"],
  },
];

export default function ModernBlogList() {
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<string>>(new Set());

  const handleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleBookmark = (postId: string) => {
    setBookmarkedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-emerald-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-pink-400/10 to-yellow-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/25">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-4">
            Blog Stories
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Khám phá những câu chuyện thú vị, kiến thức bổ ích và trải nghiệm sống đầy cảm hứng
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="space-y-8">
          {mockPosts.map((post, index) => (
            <article
              key={post.id}
              className="group relative"
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
            >
              {/* Featured Badge */}
              {post.isFeatured && (
                <div className="absolute -top-3 -left-3 z-20">
                  <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg shadow-amber-500/30 flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>Featured</span>
                  </div>
                </div>
              )}

              {/* Main Card */}
              <div className={`backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-3xl border border-white/20 dark:border-gray-700/50 shadow-2xl shadow-blue-500/5 dark:shadow-purple-500/10 overflow-hidden transition-all duration-700 ${
                hoveredPost === post.id ? 'scale-[1.02] shadow-3xl shadow-blue-500/20' : ''
              }`}>
                
                <div className="flex flex-col lg:flex-row">
                  
                  {/* Image Section */}
                  <div className="lg:w-2/5 relative overflow-hidden">
                    <div className="relative h-64 lg:h-80 group-hover:scale-105 transition-transform duration-700">
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-purple-900/30 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                      
                      {/* Hover Icon */}
                      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                        hoveredPost === post.id ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                      }`}>
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                          <BookOpen className="w-8 h-8 text-white drop-shadow-lg" />
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className={`absolute top-4 right-4 flex flex-col space-y-2 transition-all duration-500 ${
                        hoveredPost === post.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                      }`}>
                        <button
                          onClick={() => handleLike(post.id)}
                          className={`w-10 h-10 rounded-full backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-300 ${
                            likedPosts.has(post.id) 
                              ? 'bg-red-500/80 text-white' 
                              : 'bg-white/20 text-white hover:bg-red-500/60'
                          }`}
                        >
                          <Heart className={`w-5 h-5 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                        </button>
                        <button
                          onClick={() => handleBookmark(post.id)}
                          className={`w-10 h-10 rounded-full backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-300 ${
                            bookmarkedPosts.has(post.id) 
                              ? 'bg-blue-500/80 text-white' 
                              : 'bg-white/20 text-white hover:bg-blue-500/60'
                          }`}
                        >
                          <Bookmark className={`w-5 h-5 ${bookmarkedPosts.has(post.id) ? 'fill-current' : ''}`} />
                        </button>
                        <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300">
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Read Time Badge */}
                      <div className="absolute bottom-4 left-4">
                        <div className="bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime} phút đọc</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="lg:w-3/5 p-8 lg:p-10 flex flex-col justify-between">
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, tagIndex) => (
                        <div
                          key={tag}
                          className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-500 cursor-pointer hover:scale-105 ${
                            tagIndex === 0 
                              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
                              : 'bg-gray-100/80 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200/80 dark:hover:bg-gray-700/50'
                          }`}
                        >
                          <div className="flex items-center space-x-1">
                            <Tag className="w-3 h-3" />
                            <span>{tag}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{formatNumber(post.viewCount)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{formatNumber(post.likeCount)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.commentCount}</span>
                        </div>
                      </div>
                    </div>

                    {/* Author & Date */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-gray-200 dark:ring-gray-700">
                          <img 
                            src={post.authorAvatar} 
                            alt={post.author}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white text-sm">
                            {post.author}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(post.date)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Read More Button */}
                      <button className="group/btn bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 flex items-center space-x-2">
                        <span>Đọc thêm</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Section */}
        <div className="mt-16 text-center">
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 flex items-center space-x-2 mx-auto">
            <span>Xem thêm bài viết</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}