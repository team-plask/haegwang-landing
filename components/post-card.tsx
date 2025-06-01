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

// Define the Media type using fields from media_coverage and related practice_areas
// This type will be used by the MediaCard and expected by SimpleBlogWithGrid.
export type Post = {
  title: string;
  display_slug: string; // Assuming this comes from posts.slug or posts.external_link
  display_image: string | null; // Assuming this comes from posts.thumbnail_url
  display_description: string; // Assuming this comes from posts.content_payload or a summary
  practice_area_name: string | null; // Assuming this comes from practice_areas.area_name
  authors?: Author[] | null; // Add authors here
};

export const PostCard = ({ post, index }: { post: Post; index: number }) => {
  const truncate = (text: string, length: number) => {
    return text.length > length ? text.slice(0, length) + "..." : text;
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        className="shadow-derek rounded-3xl border dark:border-neutral-800 w-full bg-white dark:bg-neutral-900  overflow-hidden  hover:scale-[1.02] transition duration-200 block"
        href={post.display_slug} // Use display_slug
        target="_blank"
        rel="noopener noreferrer"
      >
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
              {post.practice_area_name} {/* Use practice_area_name */}
            </p>
          )}
          <p className="line-clamp-2 text-lg font-bold mb-4 text-neutral-800 dark:text-neutral-100">
            {post.title}
          </p>
          <p className="line-clamp-3 text-left text-sm mt-2 text-neutral-600 dark:text-neutral-400">
            {truncate(post.display_description, 100)} {/* Use display_description */}
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
      </Link>
    </motion.div>
  );
};

interface IBlurImage {
  height?: number | `${number}`;
  width?: number | `${number}`;
  src?: string;
  className?: string;
  alt?: string;
  layout?: "fixed" | "intrinsic" | "responsive" | "fill";
  [x: string]: unknown;
}

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  layout,
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
      onLoadingComplete={() => setLoading(false)}
      src={src || ''}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={src}
      layout={layout}
      alt={alt ? alt : "Avatar"}
      {...rest}
    />
  );
}; 