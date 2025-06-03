import {type FC, memo } from "react";
import { ThumbsUp, Reply } from "lucide-react";
import { type Comment } from "../../types/Comment";
import {type FormEvent } from "react";

interface CommentProps {
  comment: Comment;
  level?: number;
  onLike: (commentId: string, parentId?: string) => void;
  onReply: (e: FormEvent | React.MouseEvent, parentId: string) => void;
  replyingTo: string | null;
  replyContent: { [key: string]: string };
  setReplyContent: (value: { [key: string]: string }) => void;
  setReplyingTo: (value: string | null) => void;
}

const CommentComponent: FC<CommentProps> = memo(
  ({ comment, level = 0, onLike, onReply, replyingTo, replyContent, setReplyContent, setReplyingTo }) => {
    const formatTimestamp = (timestamp: number): string => {
      const now = Date.now();
      const diff = now - timestamp;
      const minutes = Math.floor(diff / 60000);
      const hours = Math.floor(diff / 3600000);
      const days = Math.floor(diff / 86400000);
      if (minutes < 60) return `${minutes} phút trước`;
      if (hours < 24) return `${hours} giờ trước`;
      return `${days} ngày trước`;
    };

    return (
      <div className={`${level > 0 ? "ml-8 mt-4" : "mt-6"}`}>
        <div className="group relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
          <div className="relative bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-all duration-500 hover:border-blue-200">
            <div className="flex gap-4">
              <div className="relative">
                <img
                  src={comment.authorAvatar}
                  alt={comment.author}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-lg"
                  loading="lazy"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-semibold text-gray-900">{comment.author}</h4>
                  <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {formatTimestamp(comment.timestamp)}
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">{comment.content}</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => onLike(comment.id, level > 0 ? comment.id : undefined)}
                    className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors duration-300 group/like"
                  >
                    <div className="relative">
                      <ThumbsUp className="w-4 h-4 group-hover/like:scale-110 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-red-400 rounded-full opacity-0 group-hover/like:opacity-20 scale-150 transition-all duration-300"></div>
                    </div>
                    <span className="text-sm font-medium">{comment.likes}</span>
                  </button>
                  <button
                    onClick={() => setReplyingTo(comment.id)}
                    className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors duration-300"
                  >
                    <Reply className="w-4 h-4" />
                    <span className="text-sm font-medium">Trả lời</span>
                  </button>
                </div>
                {replyingTo === comment.id && (
                  <div className="mt-4 animate-in slide-in-from-top-2 duration-300">
                    <div className="space-y-4">
                      <div className="relative">
                        <textarea
                          value={replyContent[comment.id] || ""}
                          onChange={(e) =>
                            setReplyContent({ ...replyContent, [comment.id]: e.target.value })
                          }
                          placeholder="Viết phản hồi của bạn..."
                          className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                          rows={3}
                        />
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={(e) => onReply(e, comment.id)}
                          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 font-medium"
                        >
                          Gửi
                        </button>
                        <button
                          onClick={() => setReplyingTo(null)}
                          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium"
                        >
                          Hủy
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {comment.replies.length > 0 && (
          <div className="space-y-4">
            {comment.replies.map((reply) => (
              <CommentComponent
                key={reply.id}
                comment={reply}
                level={level + 1}
                onLike={onLike}
                onReply={onReply}
                replyingTo={replyingTo}
                replyContent={replyContent}
                setReplyContent={setReplyContent}
                setReplyingTo={setReplyingTo}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

export default CommentComponent;