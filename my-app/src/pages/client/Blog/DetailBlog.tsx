import { type FC, useCallback, useState } from "react";
import { MessageCircle, Share2 } from "lucide-react";

import { type FormEvent } from "react";
import CommentForm from "../../../components/comment/CommetForm";
import ArticleContent from "../../../components/ActicleContent";
import ActionBar from "../../../components/ActionBar/ActionBar";
import HeroSection from "../../../components/HeroSection/HeroSection";
import type { Post } from "../../../types/Post";
import CommentComponent from "../../../components/comment/Comment";
import type { Comment as CommentType } from "../../../types/Comment";

const mockPost: Post = {
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
    "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop",
  ],
  date: "2024-08-15",
  author: "Nguyễn Văn A",
  authorAvatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  viewCount: 1247,
  readTime: 5,
  tags: ["Du lịch", "Đà Lạt", "Kỷ niệm"],
};


const DetailBlog: FC = () => {
  const [post] = useState<Post>(mockPost);
  const [likes, setLikes] = useState<number>(42);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentType[]>([
    {
      id: "c1",
      content:
        "Đà Lạt đẹp quá! Mình cũng muốn đi săn mây ở Đồi Đa Phú! Cảm ơn bạn đã chia sẻ những trải nghiệm tuyệt vời này.",
      author: "Phạm Văn D",
      authorAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      timestamp: Date.now() - 3600000,
      likes: 8,
      replies: [
        {
          id: "r1",
          content:
            "Hãy đi vào sáng sớm nhé, mây đẹp lắm! Khoảng 5h sáng là thời điểm lý tưởng nhất.",
          author: "Nguyễn Thị E",
          authorAvatar:
            "https://images.unsplash.com/photo-1494790108755-2616b612b602?w=100&h=100&fit=crop&crop=face",
          timestamp: Date.now() - 1800000,
          likes: 3,
          replies: [],
        },
      ],
    },
    {
      id: "c2",
      content:
        "Bánh tráng nướng ở chợ đêm ngon thế nào bạn? Mình đang có kế hoạch đi Đà Lạt tháng tới 😋",
      author: "Trần Văn F",
      authorAvatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      timestamp: Date.now() - 7200000,
      likes: 5,
      replies: [],
    },
  ]);
  const [newComment, setNewComment] = useState<string>("");
  const [replyContent, setReplyContent] = useState<{ [key: string]: string }>(
    {}
  );
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleLikePost = useCallback(() => {
    setIsLiked((prev) => !prev);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  }, [isLiked]);

  const handleBookmark = useCallback(() => {
    setIsBookmarked((prev) => !prev);
  }, []);

  const handleLikeComment = useCallback(
    (commentId: string, parentId?: string) => {
      setComments((prevComments) =>
        updateCommentLikes(prevComments, commentId, parentId)
      );
    },
    []
  );

  const updateCommentLikes = useCallback(
    (
      comments: CommentType[],
      commentId: string,
      parentId?: string
    ): CommentType[] => {
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
    },
    []
  );

  const handleCommentSubmit = useCallback(
    (e?: FormEvent) => {
      if (e) e.preventDefault();
      if (newComment.trim()) {
        const newCommentObj: CommentType = {
          id: `c${Date.now()}`,
          content: newComment,
          author: "Bạn",
          authorAvatar:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
          timestamp: Date.now(),
          likes: 0,
          replies: [],
        };
        setComments((prev) => [newCommentObj, ...prev]);
        setNewComment("");
      }
    },
    [newComment]
  );

  const handleReplySubmit = useCallback(
    (e: FormEvent | React.MouseEvent, parentId: string) => {
      if (e) e.preventDefault();
      const replyText = replyContent[parentId];
      if (replyText?.trim()) {
        const newReply: CommentType = {
          id: `r${Date.now()}`,
          content: replyText,
          author: "Bạn",
          authorAvatar:
            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
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
    },
    [replyContent]
  );

  const addReplyToComment = useCallback(
    (
      comments: CommentType[],
      parentId: string,
      reply: CommentType
    ): CommentType[] => {
      return comments.map((comment) => {
        if (comment.id === parentId) {
          return { ...comment, replies: [...comment.replies, reply] };
        }
        return {
          ...comment,
          replies: addReplyToComment(comment.replies, parentId, reply),
        };
      });
    },
    []
  );

  const handleShare = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <HeroSection post={post} />
      <div className="relative -mt-20 z-20">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="w-full">
            <ActionBar
              likes={likes}
              isLiked={isLiked}
              isBookmarked={isBookmarked}
              onLike={handleLikePost}
              onBookmark={handleBookmark}
              onShare={handleShare}
              commentCount={comments.length}
            />
            <ArticleContent post={post} />
            <div className="mt-12 bg-white rounded-3xl shadow-2xl p-4 sm:p-8 md:p-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Bình luận ({comments.length})
                </h2>
              </div>
              <CommentForm
                newComment={newComment}
                setNewComment={setNewComment}
                onSubmit={handleCommentSubmit}
              />
              <div className="space-y-6">
                {comments.map((comment) => (
                  <CommentComponent
                    key={comment.id}
                    comment={comment}
                    onLike={handleLikeComment}
                    onReply={handleReplySubmit}
                    replyingTo={replyingTo}
                    replyContent={replyContent}
                    setReplyContent={setReplyContent}
                    setReplyingTo={setReplyingTo}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isCopied && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-2xl shadow-lg animate-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            <span className="font-medium">Đã sao chép liên kết!</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default DetailBlog;