"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Define the Author type
export type Author = {
  name: string | null;
  image_url: string | null;
};

// Define the Post type
export type Post = {
  title: string;
  display_slug: string; // This can be either an internal route (e.g., /success/slug) or external URL
  display_image: string | null;
  display_description: string;
  practice_area_name: string | null;
  authors?: Author[] | null;
  is_external_link?: boolean; // Add flag to indicate if it's an external link
};

export const PostCard = ({ post, index }: { post: Post; index: number }) => {
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
    <>
      {/* Conditionally render image section only if display_image exists */}
      {post.display_image && (
        <BlurImage
          src={post.display_image}
          alt={post.title}
          height="800"
          width="800"
          className="h-52 object-cover w-full"
        />
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
        className="p-4 md:p-8 bg-white dark:bg-neutral-900"
      >
        {post.practice_area_name && (
          <p className="text-sm font-normal text-brand dark:text-brand-foreground mb-2">
            {post.practice_area_name}
          </p>
        )}
        <p className="line-clamp-2 text-lg font-bold mb-4 text-neutral-800 dark:text-neutral-100">
          {post.title}
        </p>
        <p className="line-clamp-3 text-left text-sm mt-2 text-neutral-600 dark:text-neutral-400">
          {truncate(stripMarkdown(post.display_description), 100)}
        </p>
        {post.authors && post.authors.length > 0 && (
          <div className="flex items-center mt-4">
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
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {author.name}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {isExternalLink ? (
        <a
          className="shadow-derek rounded-3xl border dark:border-neutral-800 w-full bg-white dark:bg-neutral-900 overflow-hidden hover:scale-[1.02] transition duration-200 block"
          href={post.display_slug}
          target="_blank"
          rel="noopener noreferrer"
        >
          {cardContent}
        </a>
      ) : (
        <Link
          className="shadow-derek rounded-3xl border dark:border-neutral-800 w-full bg-white dark:bg-neutral-900 overflow-hidden hover:scale-[1.02] transition duration-200 block"
          href={post.display_slug}
        >
          {cardContent}
        </Link>
      )}
    </motion.div>
  );
};

interface IBlurImage {
  height?: number | `${number}`;
  width?: number | `${number}`;
  src?: string;
  className?: string;
  alt?: string;
  [x: string]: unknown;
}

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: IBlurImage) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn(
        "transition duration-300 transform",
        isLoading ? "blur-sm scale-105" : "blur-0 scale-100",
        className
      )}
      onLoad={() => setLoading(false)}
      src={src || ''}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={src}
      alt={alt ? alt : "Avatar"}
      {...rest}
    />
  );
}; 