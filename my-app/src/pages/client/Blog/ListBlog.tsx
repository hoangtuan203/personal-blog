import { type FC, memo, useCallback, useState } from "react";
import { ArrowRight } from "lucide-react";
import type { Post } from "../../../types/Post";
import PostCard from "../../../components/blog/PostCard";

const mockPosts: Post[] = [
  {
    id: "post-1",
    title: "Khám phá vẻ đẹp Đà Lạt trong mùa hoa anh đào",
    excerpt:
      "Giới thiệu ngắn gọn về blog và những gì bạn có thể mong đợi từ nội dung của tôi. Đây là nơi tôi chia sẻ những trải nghiệm và suy nghĩ cá nhân về cuộc sống và du lịch.",
    images: [
      "https://res.cloudinary.com/dm1alq68q/image/upload/v1748865172/dalat_4_pqmrub.jpg",
    ],
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
    excerpt:
      "Học cách viết những câu chuyện hấp dẫn và thu hút người đọc hiệu quả. Một số mẹo hữu ích để cải thiện kỹ năng viết lách của bạn và xây dựng thương hiệu cá nhân.",
    images: [
      "https://res.cloudinary.com/dm1alq68q/image/upload/v1748865172/dalat_4_pqmrub.jpg",
    ],
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
    excerpt:
      "Hành trình của tôi khi bắt đầu viết blog và những động lực đằng sau việc chia sẻ suy nghĩ. Một câu chuyện về đam mê, sáng tạo và những thử thách trong khởi nghiệp.",
    images: [
      "https://res.cloudinary.com/dm1alq68q/image/upload/v1748865172/dalat_4_pqmrub.jpg",
    ],
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
    excerpt:
      "Phân tích sâu về những xu hướng công nghệ mới nhất và tác động của chúng đến cuộc sống hàng ngày. Khám phá cách AI thay đổi thế giới chúng ta.",
    images: [
      "https://res.cloudinary.com/dm1alq68q/image/upload/v1748865172/dalat_4_pqmrub.jpg",
    ],
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
    excerpt:
      "Khám phá vẻ đẹp của Sài Gòn qua ống kính máy ảnh. Những mẹo nhỏ để có được những bức ảnh đường phố ấn tượng và đầy cảm xúc.",
    images: [
      "https://res.cloudinary.com/dm1alq68q/image/upload/v1748865172/dalat_4_pqmrub.jpg",
    ],
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

const BlogList: FC = () => {
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<string>>(
    new Set()
  );
  const [sharedPosts, setSharedPosts] = useState<Set<string>>(new Set());

  const handleLike = useCallback((postId: string) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  }, []);

  const handleBookmark = useCallback((postId: string) => {
    setBookmarkedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  }, []);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, []);

  const formatNumber = useCallback((num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  }, []);

  const handleShare = useCallback((postId: string) => {
    const post = mockPosts.find((p) => p.id === postId);
    if (post) {
      const shareUrl = `${window.location.origin}/blog/${postId}`;
      navigator.clipboard.writeText(shareUrl);
      setSharedPosts((prev) => new Set(prev).add(postId));
      alert(`Đã sao chép liên kết: ${shareUrl}`);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hiệu ứng nền động */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-emerald-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-pink-400/10 to-yellow-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Lưới bài viết */}
        <div className="space-y-8">
          {mockPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              isHovered={hoveredPost === post.id}
              isLiked={likedPosts.has(post.id)}
              isBookmarked={bookmarkedPosts.has(post.id)}
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
              onLike={handleLike}
              onBookmark={handleBookmark}
              onShare={handleShare}
              formatNumber={formatNumber}
              formatDate={formatDate}
            />
          ))}
        </div>

        {/* Nút tải thêm */}
        <div className="mt-16 text-center">
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 flex items-center space-x-2 mx-auto">
            <span>Xem thêm bài viết</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
