export interface Comment {
  id: string;
  content: string;
  author: string;
  authorAvatar: string;
  timestamp: number;
  likes: number;
  replies: Comment[];
}