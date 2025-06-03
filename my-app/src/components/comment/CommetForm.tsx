import { type FC, type FormEvent, memo } from "react";

interface CommentFormProps {
  newComment: string;
  setNewComment: (value: string) => void;
  onSubmit: (e?: FormEvent) => void;
}

const CommentForm: FC<CommentFormProps> = memo(({ newComment, setNewComment, onSubmit }) => (
  <div className="mb-12">
    <div className="flex gap-4">
      <img
        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
        alt="Your avatar"
        className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200"
        loading="lazy"
      />
      <div className="flex-1">
        <div className="relative">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Chia sẻ suy nghĩ của bạn về bài viết này..."
            className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
            rows={4}
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onSubmit}
            disabled={!newComment.trim()}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100 transition-all duration-300 font-semibold"
          >
            Đăng bình luận
          </button>
        </div>
      </div>
    </div>
  </div>
));

export default CommentForm;
