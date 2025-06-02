import { BookOpen, Calendar, MessageCircle, Tag, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "../../../components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";

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
  tags: string[];
}

// Mock data for posts
const mockPosts: Post[] = [
  {
    id: "post-1",
    title: "Bài viết đầu tiên của tôi",
    excerpt:
      "Giới thiệu ngắn gọn về blog và những gì bạn có thể mong đợi từ nội dung của tôi. Đây là nơi tôi chia sẻ những trải nghiệm và suy nghĩ cá nhân.",
    image:
      "https://res.cloudinary.com/dm1alq68q/image/upload/v1748865172/dalat_4_pqmrub.jpg",
    date: "2025-06-01",
    author: "Nguyễn Văn A",
    authorAvatar: "https://github.com/shadcn.png",
    commentCount: 5,
    tags: ["Giới thiệu", "Blog"],
  },
  {
    id: "post-2",
    title: "Mẹo viết bài tốt hơn",
    excerpt:
      "Học cách viết những câu chuyện hấp dẫn và thu hút người đọc hiệu quả. Một số mẹo hữu ích để cải thiện kỹ năng viết lách của bạn.",
    image:
      "https://res.cloudinary.com/dm1alq68q/image/upload/v1748865172/dalat_4_pqmrub.jpg",
    date: "2025-06-02",
    author: "Trần Thị B",
    authorAvatar: "https://github.com/shadcn.png",
    commentCount: 12,
    tags: ["Viết lách", "Kỹ năng"],
  },
  {
    id: "post-3",
    title: "Tại sao tôi bắt đầu viết blog",
    excerpt:
      "Hành trình của tôi khi bắt đầu viết blog và những động lực đằng sau việc chia sẻ suy nghĩ. Một câu chuyện về đam mê và sáng tạo.",
    image:
      "https://res.cloudinary.com/dm1alq68q/image/upload/v1748865172/dalat_4_pqmrub.jpg",
    date: "2025-06-03",
    author: "Lê Văn C",
    authorAvatar: "https://github.com/shadcn.png",
    commentCount: 8,
    tags: ["Động lực", "Sáng tạo"],
  },
  {
    id: "post-4",
    title: "Tại sao tôi bắt đầu viết blog",
    excerpt:
      "Hành trình của tôi khi bắt đầu viết blog và những động lực đằng sau việc chia sẻ suy nghĩ. Một câu chuyện về đam mê và sáng tạo.",
    image:
      "https://res.cloudinary.com/dm1alq68q/image/upload/v1748865172/dalat_4_pqmrub.jpg",
    date: "2025-06-03",
    author: "Lê Văn C",
    authorAvatar: "https://github.com/shadcn.png",
    commentCount: 8,
    tags: ["Động lực", "Sáng tạo"],
  },
  {
    id: "post-5",
    title: "Tại sao tôi bắt đầu viết blog",
    excerpt:
      "Hành trình của tôi khi bắt đầu viết blog và những động lực đằng sau việc chia sẻ suy nghĩ. Một câu chuyện về đam mê và sáng tạo.",
    image:
      "https://res.cloudinary.com/dm1alq68q/image/upload/v1748865172/dalat_4_pqmrub.jpg",
    date: "2025-06-03",
    author: "Lê Văn C",
    authorAvatar: "https://github.com/shadcn.png",
    commentCount: 8,
    tags: ["Động lực", "Sáng tạo"],
  },
  {
    id: "post-6",
    title: "Tại sao tôi bắt đầu viết blog",
    excerpt:
      "Hành trình của tôi khi bắt đầu viết blog và những động lực đằng sau việc chia sẻ suy nghĩ. Một câu chuyện về đam mê và sáng tạo.",
    image:
      "https://res.cloudinary.com/dm1alq68q/image/upload/v1748865172/dalat_4_pqmrub.jpg",
    date: "2025-06-03",
    author: "Lê Văn C",
    authorAvatar: "https://github.com/shadcn.png",
    commentCount: 8,
    tags: ["Động lực", "Sáng tạo"],
  },
  {
    id: "post-7",
    title: "Tại sao tôi bắt đầu viết blog",
    excerpt:
      "Hành trình của tôi khi bắt đầu viết blog và những động lực đằng sau việc chia sẻ suy nghĩ. Một câu chuyện về đam mê và sáng tạo.",
    image:
      "https://res.cloudinary.com/dm1alq68q/image/upload/v1748865172/dalat_4_pqmrub.jpg",
    date: "2025-06-03",
    author: "Lê Văn C",
    authorAvatar: "https://github.com/shadcn.png",
    commentCount: 8,
    tags: ["Động lực", "Sáng tạo"],
  },
];

const ListBlog: React.FC = () => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 w-full mx-auto">
      <div className="space-y-6">
        {mockPosts.map((post, index) => (
          <article
            key={post.id}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:-translate-y-1 animate-[fadeIn_0.4s_ease-out]"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex flex-col lg:flex-row">
              {/* Image Section */}
              <div className="lg:w-1/3">
                <Link to={`/blog/${post.id}`} className="block h-full">
                  <div className="relative h-48 lg:h-60 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/20 dark:from-white/5 dark:to-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <BookOpen className="w-8 h-8 text-white drop-shadow-md" />
                    </div>
                  </div>
                </Link>
              </div>

              {/* Content Section */}
              <div className="lg:w-2/3 p-5 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    <Link
                      to={`/blog/${post.id}`}
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.map((tag) => (
                      <Link to={`/tags/${tag.toLowerCase()}`} key={tag}>
                        <Badge
                          variant="secondary"
                          className="bg-gray-100 text-gray-800 hover:bg-blue-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-blue-600 transition-all duration-200 px-2 py-0.5 rounded-md text-xs font-medium"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Author & Meta Info */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8 ring-1 ring-gray-200 dark:ring-gray-600">
                      <AvatarImage src={post.authorAvatar} alt={post.author} />
                      <AvatarFallback className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white text-xs">
                        {post.author[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center text-gray-900 dark:text-white text-xs font-medium">
                        <User className="w-3 h-3 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
                        <Calendar className="w-3 h-3 mr-1" />
                        {post.date}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
                      <MessageCircle className="w-3 h-3 mr-1" />
                      <span>{post.commentCount}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900 transition-all duration-200 rounded-md text-xs font-medium px-4"
                    >
                      <Link
                        to={`/blog/${post.id}`}
                        className="flex items-center"
                      >
                        Đọc thêm
                        <BookOpen className="ml-1 w-3 h-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ListBlog;
