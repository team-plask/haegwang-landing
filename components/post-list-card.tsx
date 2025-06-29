"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Post, Author, BlurImage } from "@/components/post-card";

// Re-export types for use in other components
export type { Post, Author } from "@/components/post-card";

export const PostListCard = ({ post, index }: { post: Post; index: number }) => {
  const truncate = (text: string, length: number) => {
    return text.length > length ? text.slice(0, length) + "..." : text;
  };

  const stripMarkdown = (text: string) => {
    return text
      // Remove headers (# ## ### etc.)
      .replace(/^#{1,6}\s+/gm, '')
      // Remove bold and italic (**text**, *text*, __text__, _text_)
      .replace(/(\*\*|__)(.*?)\1/g, '$2')
      .replace(/(\*|_)(.*?)\1/g, '$2')
      // Remove links [text](url)
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      // Remove images ![alt](url)
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
      // Remove inline code `code`
      .replace(/`([^`]+)`/g, '$1')
      // Remove code blocks ```code```
      .replace(/```[\s\S]*?```/g, '')
      // Remove blockquotes > 
      .replace(/^>\s+/gm, '')
      // Remove list markers (-, *, +, 1.)
      .replace(/^[\s]*[-\*\+]\s+/gm, '')
      .replace(/^[\s]*\d+\.\s+/gm, '')
      // Remove horizontal rules ---
      .replace(/^-{3,}$/gm, '')
      // Remove table syntax |
      .replace(/\|/g, ' ')
      // Remove extra whitespace and newlines
      .replace(/\n+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  // Check if the link is external
  const isExternalLink = post.is_external_link || 
    post.display_slug.startsWith('http://') || 
    post.display_slug.startsWith('https://') ||
    post.display_slug.startsWith('//');

  const cardContent = (
    <div className="flex flex-col sm:flex-row h-auto sm:h-56">
      {/* Image Section - Hidden on mobile, Left side on desktop */}
      {post.display_image && (
        <div className="hidden sm:block sm:w-48 md:w-56 flex-shrink-0">
          <BlurImage
            src={post.display_image}
            alt={post.title}
            height="400"
            width="400"
            className="h-full object-cover w-full rounded-l-3xl"
          />
        </div>
      )}
      
      {/* Content Section - Full width on mobile, Right side on desktop */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
        className="flex-1 p-4 sm:p-6 md:p-8 bg-white dark:bg-neutral-900 flex flex-col justify-between"
      >
        
        <div>
          <h3 className="line-clamp-2 text-xl md:text-2xl font-bold mb-3 text-neutral-800 dark:text-neutral-100 leading-tight">
            {post.title}
          </h3>
          <p className="line-clamp-2 text-left text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {truncate(stripMarkdown(post.display_description), 200)}
          </p>
        </div>
        
        {/* Authors Section */}
        {post.authors && post.authors.length > 0 && (
          <div className="flex items-center mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-700">
            {post.authors.map((author: Author, idx: number) => (
              <div key={idx} className="flex items-center mr-4">
                {author.image_url && (
                  <Image
                    src={author.image_url}
                    alt={author.name || "author image"}
                    width={24}
                    height={24}
                    className="rounded-full mr-2"
                  />
                )}
                {author.name && (
                  <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                    {author.name}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
        

      </motion.div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full"
    >
      {isExternalLink ? (
        <a
          className="shadow-lg rounded-3xl border border-neutral-200 dark:border-neutral-800 w-full bg-white dark:bg-neutral-900 overflow-hidden hover:scale-[1.01] hover:shadow-xl transition-all duration-300 block min-h-[120px] sm:min-h-[160px]"
          href={post.display_slug}
          target="_blank"
          rel="noopener noreferrer"
        >
          {cardContent}
        </a>
      ) : (
        <Link
          className="shadow-lg rounded-3xl border border-neutral-200 dark:border-neutral-800 w-full bg-white dark:bg-neutral-900 overflow-hidden hover:scale-[1.01] hover:shadow-xl transition-all duration-300 block min-h-[120px] sm:min-h-[160px]"
          href={post.display_slug}
        >
          {cardContent}
        </Link>
      )}
    </motion.div>
  );
}; 