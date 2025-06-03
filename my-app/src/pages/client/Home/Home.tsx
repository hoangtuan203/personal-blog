import React from 'react';
import { ArrowRight, Calendar, Clock, Github, Twitter, Linkedin } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

const BlogHomepage = () => {
  const featuredPosts: BlogPost[] = [
    {
      id: 1,
      title: "Khám phá React Server Components: Tương lai của React",
      excerpt: "Tìm hiểu về React Server Components và cách chúng thay đổi cách chúng ta xây dựng ứng dụng React...",
      date: "2024-03-15",
      readTime: "5 phút đọc",
      category: "React",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop"
    },
    {
      id: 2,
      title: "TypeScript Best Practices cho Developers",
      excerpt: "Những tips và tricks giúp bạn viết TypeScript code hiệu quả và maintainable hơn...",
      date: "2024-03-10",
      readTime: "7 phút đọc",
      category: "TypeScript",
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Tối ưu Performance với Next.js 14",
      excerpt: "Hướng dẫn chi tiết về cách tối ưu hóa performance cho ứng dụng Next.js của bạn...",
      date: "2024-03-05",
      readTime: "6 phút đọc",
      category: "Next.js",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop"
    }
  ];

  const recentPosts: BlogPost[] = [
    {
      id: 4,
      title: "CSS Grid vs Flexbox: Khi nào nên dùng cái nào?",
      excerpt: "So sánh chi tiết giữa CSS Grid và Flexbox để chọn layout phù hợp...",
      date: "2024-03-01",
      readTime: "4 phút đọc",
      category: "CSS",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop"
    },
    {
      id: 5,
      title: "Microservices Architecture với Node.js",
      excerpt: "Xây dựng kiến trúc microservices hiệu quả với Node.js và Docker...",
      date: "2024-02-25",
      readTime: "8 phút đọc",
      category: "Node.js",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop"
    },
    {
      id: 6,
      title: "Authentication với JWT trong React",
      excerpt: "Implement JWT authentication một cách secure và user-friendly...",
      date: "2024-02-20",
      readTime: "6 phút đọc",
      category: "Security",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
 
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
              alt="Profile" 
              className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-white shadow-xl"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              Xin chào, tôi là
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Developer
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Chia sẻ kiến thức về <span className="text-blue-600 font-semibold">Frontend Development</span>, 
            <span className="text-purple-600 font-semibold"> React</span>, và 
            <span className="text-indigo-600 font-semibold"> Web Technologies</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/blog" className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg text-center">
              Khám phá Blog
            </a>
            <a href="/about" className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 text-center">
              Về tôi
            </a>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Bài viết nổi bật
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Những bài viết được quan tâm nhất về công nghệ và lập trình
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <article key={post.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
                <div className="relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(post.date).toLocaleDateString('vi-VN')}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                  <a href={`/blog/${post.id}`} className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                    Đọc thêm
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Bài viết gần đây
            </h2>
            <a href="/blog" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors flex items-center">
              Xem tất cả
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100">
                <a href={`/blog/${post.id}`} className="block">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </a>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm font-medium">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>
                  <a href={`/blog/${post.id}`}>
                    <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </a>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(post.date).toLocaleDateString('vi-VN')}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Về tôi
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Tôi là một Frontend Developer với niềm đam mê về công nghệ web hiện đại. 
            Thông qua blog này, tôi muốn chia sẻ những kiến thức, kinh nghiệm và 
            insights về React, TypeScript, và các công nghệ frontend khác.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="bg-blue-700 text-white p-3 rounded-full hover:bg-blue-800 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

    

    </div>
  );
};

export default BlogHomepage;