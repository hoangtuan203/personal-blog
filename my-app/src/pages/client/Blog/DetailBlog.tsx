import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, MessageCircle, Share2, Reply, Tag, MapPin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import { Badge } from "../../../components/ui/badge";

// Dữ liệu mẫu cho bài viết về chuyến du lịch
const mockPosts = [
  {
    id: "post-1",
    title: "Chuyến Du Lịch Đáng Nhớ Đến Đà Lạt",
    content: `
      <p>Mùa hè năm 2024, tôi đã có một chuyến đi đáng nhớ đến Đà Lạt - thành phố ngàn hoa. Đây là lần đầu tiên tôi khám phá vùng đất này, và mọi thứ đều vượt xa mong đợi!</p>
      
      <h2>Ngày 1: Khám phá trung tâm thành phố</h2>
      <p>Chúng tôi bắt đầu hành trình tại <strong>Quảng trường Lâm Viên</strong>, nơi có biểu tượng hoa dã quỳ khổng lồ. Buổi tối, chợ đêm Đà Lạt tấp nập với những gian hàng đầy màu sắc và mùi bánh tráng nướng thơm lừng.</p>
      
      <h2>Ngày 2: Tham quan các điểm ngoại ô</h2>
      <p>Ngày thứ hai, chúng tôi ghé <strong>Thung Lũng Tình Yêu</strong> và <strong>Đồi Chè Cầu Đất</strong>. Những đồi chè xanh mướt trải dài bất tận thực sự khiến tôi cảm thấy như lạc vào một bức tranh. Đừng quên thử cà phê Đà Lạt, vị đậm đà khó quên!</p>
      
      <h2>Ngày 3: Hành trình săn mây</h2>
      <p>Buổi sáng sớm, chúng tôi leo lên <strong>Đồi Đa Phú</strong> để săn mây. Khi mặt trời mọc, cả không gian như bừng sáng với biển mây trắng bồng bềnh. Đây chắc chắn là khoảnh khắc đẹp nhất trong chuyến đi!</p>
      
      <p>Đà Lạt không chỉ đẹp bởi cảnh sắc mà còn bởi con người thân thiện và không khí trong lành. Nếu có cơ hội, tôi chắc chắn sẽ quay lại!</p>
    `,
    images: [
      "https://res.cloudinary.com/dm1alq68q/image/upload/v1748865172/dalat_1_dukfcd.jpg",
      "https://res.cloudinary.com/dm1alq68q/image/upload/v1748865172/dalat_2_kqwwpy.jpg",
      "https://res.cloudinary.com/dm1alq68q/image/upload/v1748865172/dalat_3_cqtl02.jpg",
      "https://res.cloudinary.com/dm1alq68q/image/upload/v1748865172/dalat_4_pqmrub.jpg",
    ],
    date: "2024-08-15",
    author: "Nguyễn Văn A",
    authorAvatar: "https://github.com/shadcn.png",
    commentCount: 5,
    tags: ["Du lịch", "Đà Lạt", "Kỷ niệm"],
  },
];

// Giao diện bình luận
interface Comment {
  id: string;
  content: string;
  author: string;
  authorAvatar: string;
  timestamp: number;
  likes: number;
  replies: Comment[];
}

const DetailBlog: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<(typeof mockPosts)[0] | null>(null);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyContent, setReplyContent] = useState<{ [key: string]: string }>({});
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const foundPost = mockPosts.find((p) => p.id === postId);
    setPost(foundPost || null);
    if (foundPost) {
      setComments([
        {
          id: "c1",
          content: "Đà Lạt đẹp quá! Mình cũng muốn đi săn mây ở Đồi Đa Phú!",
          author: "Phạm Văn D",
          authorAvatar: "https://github.com/shadcn.png",
          timestamp: Date.now() - 3600000,
          likes: 3,
          replies: [
            {
              id: "r1",
              content: "Hãy đi vào sáng sớm nhé, mây đẹp lắm!",
              author: "Nguyễn Thị E",
              authorAvatar: "https://github.com/shadcn.png",
              timestamp: Date.now() - 1800000,
              likes: 1,
              replies: [],
            },
          ],
        },
        {
          id: "c2",
          content: "Bánh tráng nướng ở chợ đêm ngon thế nào bạn? 😋",
          author: "Trần Văn F",
          authorAvatar: "https://github.com/shadcn.png",
          timestamp: Date.now() - 7200000,
          likes: 2,
          replies: [],
        },
      ]);
    }
  }, [postId]);

  const handleLikePost = () => {
    setLikes(likes + 1);
  };

  const handleLikeComment = (commentId: string, parentId?: string) => {
    setComments((prevComments) =>
      updateCommentLikes(prevComments, commentId, parentId)
    );
  };

  const updateCommentLikes = (
    comments: Comment[],
    commentId: string,
    parentId?: string
  ): Comment[] => {
    return comments.map((comment) => {
      if (parentId && comment.id === parentId) {
        return {
          ...comment,
          replies: updateCommentLikes(comment.replies, commentId),
        };
      }
      if (comment.id === commentId) {
        return { ...comment, likes: comment.likes + 1 };
      }
      return comment;
    });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj: Comment = {
        id: `c${Date.now()}`,
        content: newComment,
        author: "Người dùng G",
        authorAvatar: "https://github.com/shadcn.png",
        timestamp: Date.now(),
        likes: 0,
        replies: [],
      };
      setComments([...comments, newCommentObj]);
      setNewComment("");
    }
  };

  const handleReplySubmit = (e: React.FormEvent, parentId: string) => {
    e.preventDefault();
    const replyText = replyContent[parentId];
    if (replyText?.trim()) {
      const newReply: Comment = {
        id: `r${Date.now()}`,
        content: replyText,
        author: "Người dùng G",
        authorAvatar: "https://github.com/shadcn.png",
        timestamp: Date.now(),
        likes: 0,
        replies: [],
      };
      setComments((prevComments) =>
        addReplyToComment(prevComments, parentId, newReply)
      );
      setReplyContent((prev) => ({ ...prev, [parentId]: "" }));
      setReplyingTo(null);
    }
  };

  const addReplyToComment = (
    comments: Comment[],
    parentId: string,
    reply: Comment
  ): Comment[] => {
    return comments.map((comment) => {
      if (comment.id === parentId) {
        return { ...comment, replies: [...comment.replies, reply] };
      }
      return {
        ...comment,
        replies: addReplyToComment(comment.replies, parentId, reply),
      };
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-900">
        <h2 className="text-2xl font-semibold">Bài viết không tìm thấy</h2>
        <Button variant="link" asChild className="mt-4 text-blue-600 dark:text-blue-400">
          <Link to="/blog">Quay lại Blog</Link>
        </Button>
      </div>
    );
  }

  const renderComment = (comment: Comment, level: number = 0) => (
    <div
      key={comment.id}
      className={`flex gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
        level > 0 ? "ml-4 sm:ml-8" : ""
      }`}
    >
      <Avatar className="w-8 h-8 ring-1 ring-gray-200 dark:ring-gray-600">
        <AvatarImage src={comment.authorAvatar} alt={comment.author} />
        <AvatarFallback className="bg-gray-200 dark:bg-gray-600 text-xs">
          {comment.author[0]}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {comment.author}
            </span>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {formatTimestamp(comment.timestamp)}
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-200 mt-1">{comment.content}</p>
        <div className="flex items-center gap-3 mt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleLikeComment(comment.id, level > 0 ? comment.id : undefined)}
            className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400"
          >
            <Heart
              className={`w-4 h-4 ${comment.likes > 0 ? "fill-red-500 text-red-500" : ""}`}
            />
            <span className="text-xs">{comment.likes}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setReplyingTo(comment.id)}
            className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <Reply className="w-4 h-4" />
            <span className="text-xs">Trả lời</span>
          </Button>
        </div>
        {replyingTo === comment.id && (
          <form
            onSubmit={(e) => handleReplySubmit(e, comment.id)}
            className="mt-3"
          >
            <Textarea
              value={replyContent[comment.id] || ""}
              onChange={(e) =>
                setReplyContent((prev) => ({
                  ...prev,
                  [comment.id]: e.target.value,
                }))
              }
              placeholder="Viết phản hồi của bạn..."
              className="mb-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-blue-500 text-sm"
            />
            <div className="flex gap-2">
              <Button
                type="submit"
                variant="default"
                size="sm"
                className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-xs"
              >
                Gửi
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setReplyingTo(null)}
                className="text-gray-700 dark:text-gray-200 text-xs border-gray-300 dark:border-gray-600"
              >
                Hủy
              </Button>
            </div>
          </form>
        )}
        {comment.replies.length > 0 && (
          <div className="mt-3 space-y-3">
            {comment.replies.map((reply) => renderComment(reply, level + 1))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-[calc(100vh-8rem)] bg-gray-50 dark:bg-gray-900 py-10 px-4 sm:px-6 lg:px-8">
      <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full overflow-hidden">
        <div className="relative">
          <img
            src={post.images[0]}
            alt={post.title}
            loading="lazy"
            className="w-full h-64 sm:h-80 md:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <h1 className="absolute bottom-4 left-4 right-4 text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
            {post.title}
          </h1>
        </div>
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="w-10 h-10 ring-1 ring-gray-200 dark:ring-gray-600">
              <AvatarImage src={post.authorAvatar} alt={post.author} />
              <AvatarFallback className="bg-gray-200 dark:bg-gray-600 text-xs">
                {post.author[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {post.author}
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400">{post.date}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <Link to={`/tags/${tag.toLowerCase()}`} key={tag}>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs px-2 py-0.5 rounded-md"
                >
                  <MapPin className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
          <div
            className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-200 text-base mb-8 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          {/* Gallery hình ảnh */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {post.images.slice(1).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Hình ảnh ${index + 1} của chuyến đi`}
                loading="lazy"
                className="w-full h-48 sm:h-64 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
              />
            ))}
          </div>

          {/* Tương tác */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLikePost}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:bg-green-100 dark:hover:bg-green-900 hover:text-green-600 dark:hover:text-green-400 border-gray-300 dark:border-gray-600"
            >
              <Heart className={`w-4 h-4 ${likes > 0 ? "fill-red-500 text-red-500" : ""}`} />
              <span className="text-sm">{likes} Thích</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:bg-green-100 dark:hover:bg-green-900 hover:text-green-600 dark:hover:text-green-400 border-gray-300 dark:border-gray-600"
            >
              <Link to="#comments">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">{comments.length + post.commentCount} Bình luận</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:bg-green-100 dark:hover:bg-green-900 hover:text-green-600 dark:hover:text-green-400 border-gray-300 dark:border-gray-600"
            >
              <Share2 className="w-4 h-4" />
              <span className="text-sm">{isCopied ? "Đã sao chép!" : "Chia sẻ"}</span>
            </Button>
          </div>

          {/* Bình luận */}
          <div id="comments" className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Bình luận
            </h2>
            <form onSubmit={handleCommentSubmit} className="mb-6">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Viết bình luận của bạn..."
                className="mb-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:ring-green-500 text-sm rounded-lg"
              />
              <Button
                type="submit"
                variant="default"
                className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-sm"
              >
                Gửi bình luận
              </Button>
            </form>
            <div className="space-y-3">
              {comments.map((comment) => renderComment(comment))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default DetailBlog;