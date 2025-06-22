"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Post, Author, BlurImage } from "@/components/post-card";

// Re-export types for use in other components
export type { Post, Author } from "@/components/post-card";

export const PostListCard = ({ post, index }: { post: Post; index: number }) => {
  const truncate = (text: string, length: number) => {
    return text.length > length ? text.slice(0, length) + "..." : text;
  };

  // Check if the link is external
  const isExternalLink = post.is_external_link || 
    post.display_slug.startsWith('http://') || 
    post.display_slug.startsWith('https://') ||
    post.display_slug.startsWith('//');

  const cardContent = (
    <div className="flex flex-col sm:flex-row h-full">
      {/* Image Section - Left side on desktop, top on mobile */}
      {post.display_image && (
        <div className="w-full sm:w-48 md:w-56 flex-shrink-0">
          <BlurImage
            src={post.display_image}
            alt={post.title}
            height="400"
            width="400"
            className="h-48 sm:h-full object-cover w-full rounded-t-3xl sm:rounded-l-3xl sm:rounded-tr-none"
          />
        </div>
      )}
      
      {/* Content Section - Right side on desktop, bottom on mobile */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
        className="flex-1 p-6 md:p-8 bg-white dark:bg-neutral-900 flex flex-col justify-between"
      >
        <div>
          {post.practice_area_name && (
            <p className="text-sm font-medium text-brand dark:text-brand-foreground mb-2 inline-block px-2 py-1 bg-brand/10 rounded-full">
              {post.practice_area_name}
            </p>
          )}
          <h3 className="line-clamp-2 text-xl md:text-2xl font-bold mb-3 text-neutral-800 dark:text-neutral-100 leading-tight">
            {post.title}
          </h3>
          <p className="line-clamp-3 text-left text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {truncate(post.display_description, 200)}
          </p>
        </div>
        
        {/* Authors Section */}
        {post.authors && post.authors.length > 0 && (
          <div className="flex items-center mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-700">
            {post.authors.map((author: Author, idx: number) => (
              <div key={idx} className="flex items-center mr-6">
                {author.image_url && (
                  <Image
                    src={author.image_url}
                    alt={author.name || "author image"}
                    width={32}
                    height={32}
                    className="rounded-full mr-3"
                  />
                )}
                {author.name && (
                  <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    {author.name}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* External Link Indicator */}
        {isExternalLink && (
          <div className="flex items-center mt-4 text-xs text-neutral-500 dark:text-neutral-400">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            외부 링크
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
          className="shadow-lg rounded-3xl border border-neutral-200 dark:border-neutral-800 w-full bg-white dark:bg-neutral-900 overflow-hidden hover:scale-[1.01] hover:shadow-xl transition-all duration-300 block min-h-[200px] sm:min-h-[160px]"
          href={post.display_slug}
          target="_blank"
          rel="noopener noreferrer"
        >
          {cardContent}
        </a>
      ) : (
        <Link
          className="shadow-lg rounded-3xl border border-neutral-200 dark:border-neutral-800 w-full bg-white dark:bg-neutral-900 overflow-hidden hover:scale-[1.01] hover:shadow-xl transition-all duration-300 block min-h-[200px] sm:min-h-[160px]"
          href={post.display_slug}
        >
          {cardContent}
        </Link>
      )}
    </motion.div>
  );
}; 