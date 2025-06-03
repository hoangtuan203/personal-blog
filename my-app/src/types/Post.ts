export interface Post {
  id: string;
  title: string;
  content?: string; 
  excerpt?: string; // Optional, dùng trong BlogList
  images: string[]; // Dùng cho cả hai, BlogList lấy images[0]
  date: string;
  author: string;
  authorAvatar: string;
  commentCount?: number; // Optional, dùng trong BlogList
  viewCount: number; // Thống nhất từ views/viewCount
  likeCount?: number; // Optional, dùng trong BlogList
  readTime: number; // Số phút, format trong DetailBlog
  tags: string[];
  isFeatured?: boolean; // Optional, dùng trong BlogList
}