import {type FC, memo } from "react";
import type { Post } from "../../types/Post";

interface ArticleContentProps {
  post: Post;
}

const ArticleContent: FC<ArticleContentProps> = memo(({ post }) => (
  <article className="bg-white rounded-3xl shadow-2xl overflow-hidden">
    <div className="p-4 sm:p-8 md:p-12">
      <div
        className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-900"
        dangerouslySetInnerHTML={{ __html: post.content as string }}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {post.images.slice(1).map((image, index) => (
          <div key={index} className="group relative overflow-hidden rounded-2xl">
            <img
              src={image}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        ))}
      </div>
    </div>
  </article>
));

export default ArticleContent;