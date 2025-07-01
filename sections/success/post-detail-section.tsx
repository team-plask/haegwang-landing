import BlogInfoCard from "@/components/blog/blog-info-card";
import type { BlogInfoProps } from "@/components/blog/blog-info-card";
import BlogContentDisplay from "@/components/blog/blog-content-display";
import type { ParsedContent } from "@/components/blog/blog-content-display";
import BlogAuthorCard from "@/components/blog/blog-author-card";
import type { BlogAuthorCardProps } from "@/components/blog/blog-author-card";
import { Database } from "@/database.types";

// Database-based type definitions for the section
type Post = Database["public"]["Tables"]["posts"]["Row"];
type Lawyer = Database["public"]["Tables"]["lawyers"]["Row"];
type PostAuthor = Database["public"]["Tables"]["post_authors"]["Row"];
type PracticeArea = Pick<Database["public"]["Tables"]["practice_areas"]["Row"], "id" | "area_name" | "slug">;

// Content payload type based on post type
interface SuccessContentPayload {
  result?: string;
  main_markdown_content?: string;
  case_overview_markdown?: string;
}

interface NewsOrBlogContentPayload {
  main_markdown_content?: string;
}

interface PostDetailSectionProps {
  post: Post & {
    practice_area?: PracticeArea | null;
  };
  authors?: (PostAuthor & { lawyer: Lawyer })[];
}

export default function PostDetailSection({ post, authors }: PostDetailSectionProps) {
  
  // Transform post data to BlogInfoProps
  const blogInfo: BlogInfoProps = {
    id: post.id,
    title: post.title,
    post_type: post.post_type,
    created_at: post.created_at,
    published_at: post.published_at,
    thumbnail_url: post.thumbnail_url,
    practice_area_name: post.practice_area?.area_name || null
  };

  // Transform content data to ParsedContent
  let parsedContent: ParsedContent;
  const contentPayload = post.content_payload as any; // Type assertion since content_payload is Json type
  
  if (post.post_type === "승소사례") {
    const successContent = contentPayload as SuccessContentPayload;
    
    parsedContent = {
      post_type: "업무사례", // Map 승소사례 to 업무사례 for component compatibility
      result: successContent?.result || undefined,
      main_markdown_content: successContent?.main_markdown_content || successContent?.case_overview_markdown || undefined
    };
    
  } else if (post.post_type === "법인소식") {
    const newsContent = contentPayload as NewsOrBlogContentPayload;
    parsedContent = {
      post_type: "법인소식",
      main_markdown_content: newsContent?.main_markdown_content || undefined
    };
  } else if (post.post_type === "블로그") {
    const blogContent = contentPayload as NewsOrBlogContentPayload;
    parsedContent = {
      post_type: "블로그",
      main_markdown_content: blogContent?.main_markdown_content || undefined
    };
  } else {
    // Fallback for 언론보도 or any other post types
    const defaultContent = contentPayload as NewsOrBlogContentPayload;
    parsedContent = {
      post_type: "블로그",
      main_markdown_content: defaultContent?.main_markdown_content || undefined
    };
  }

  // Transform authors data to BlogAuthorCardProps
  const authorsList: BlogAuthorCardProps[] = authors?.map(author => ({
    name: author.lawyer.name,
    profile_picture_url: author.lawyer.profile_picture_url,
    lawyer_type: author.lawyer.lawyer_type,
    slug: author.lawyer.slug
  })) || [];

  return (
    <section className="py-12 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <BlogInfoCard blogInfo={blogInfo} />
        <div className="flex flex-col gap-8 md:flex-row md:gap-12">
          <div className="flex-1">
            <BlogContentDisplay parsedContent={parsedContent} />
          </div>
          <BlogAuthorCard authors={authorsList} />
        </div>
      </div>
    </section>
  );
}
