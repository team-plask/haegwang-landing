import { Database } from "@/database.types";
import { PostListCard, Post, Author } from "@/components/post-list-card";
import Link from "next/link";

export type PostCardFromDB = Pick<
  Database["public"]["Tables"]["posts"]["Row"],
  "id" | "title" | "content_payload" | "thumbnail_url" | "external_link" | "slug" | "post_type"
> & {
  practice_area: Pick<Database["public"]["Tables"]["practice_areas"]["Row"], "area_name" | "slug"> | null;
  post_authors?: Array<{
    lawyers: Pick<Database["public"]["Tables"]["lawyers"]["Row"], "name" | "profile_picture_url" | "profile_original_url"> | null;
  }> | null;
};

export type MediaProps = PostCardFromDB[];

// Pagination Component
function Pagination({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 mt-12">
      {/* Previous Button */}
      {currentPage > 1 && (
        <Link 
          href={`/media?page=${currentPage - 1}`}
          className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
        >
          이전
        </Link>
      )}

      {/* Page Numbers */}
      {getPageNumbers().map((pageNum) => (
        <Link
          key={pageNum}
          href={`/media?page=${pageNum}`}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            pageNum === currentPage
              ? "bg-brand text-white"
              : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
          }`}
        >
          {pageNum}
        </Link>
      ))}

      {/* Next Button */}
      {currentPage < totalPages && (
        <Link 
          href={`/media?page=${currentPage + 1}`}
          className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
        >
          다음
        </Link>
      )}
    </div>
  );
}

export function MediaListSection({ 
  media, 
  currentPage, 
  totalPages 
}: { 
  media: MediaProps; 
  currentPage: number; 
  totalPages: number; 
}) {
  const transformPostData = (dbPost: PostCardFromDB): Post => {
    let description = "";
    if (dbPost.content_payload && typeof dbPost.content_payload === 'object') {
      const payload = dbPost.content_payload as any;
      
      // Handle source/summary structure (new format)
      if (typeof payload.source === 'string' && typeof payload.summary === 'string') {
        description = `[${payload.source}] ${payload.summary}`;
      }
      // Handle outlet_name/summary structure (old format) - fallback
      else if (typeof payload.outlet_name === 'string' && typeof payload.summary === 'string') {
        description = `[${payload.outlet_name}] ${payload.summary}`;
      }
      // Handle other text formats
      else if (typeof payload.text === 'string') {
        description = payload.text;
      } else if (typeof payload.body_markdown === 'string') {
        description = payload.body_markdown;
      } else if (typeof payload.case_overview_markdown === 'string') {
        description = payload.case_overview_markdown;
      } else {
        description = JSON.stringify(payload);
      }
    } else if (typeof dbPost.content_payload === 'string') {
      description = dbPost.content_payload;
    }

    // Transform authors data
    const authors: Author[] = dbPost.post_authors
      ?.filter(authorRelation => authorRelation.lawyers !== null)
      ?.map(authorRelation => ({
        name: authorRelation.lawyers!.name,
        image_url: authorRelation.lawyers!.profile_picture_url || authorRelation.lawyers!.profile_original_url,
      })) || [];

    // If no authors, add default author
    if (authors.length === 0) {
      authors.push({
        name: "법무법인(유한) 해광",
        image_url: "https://gjfljnsvnrortuzjykdi.supabase.co/storage/v1/object/public/lawyers//logo_symbol.png",
      });
    }

    // Media posts usually have external links, but check just in case
    const isExternalLink = !!dbPost.external_link;
    const displaySlug = isExternalLink 
      ? (dbPost.external_link || "#")
      : dbPost.slug ? `/media/${dbPost.slug}` : "#";

    // Set default thumbnail if none exists
    const displayImage = dbPost.thumbnail_url || "https://gjfljnsvnrortuzjykdi.supabase.co/storage/v1/object/public/lawyers/media_thumnails/default.png";

    return {
      title: dbPost.title,
      display_slug: displaySlug,
      display_image: displayImage,
      display_description: description,
      practice_area_name: null, // Remove practice area display
      authors: authors, // Add authors data
      is_external_link: isExternalLink,
    };
  };

  return (
    <section className="px-4 md:px-0 w-full items-center justify-center py-12 md:py-16 mx-auto">
      <div className="container max-w-7xl flex flex-col items-center justify-between mx-auto">
        <div className="w-full flex flex-col gap-6">
          {media && media.length > 0 && 
            media.map((postItem, index) => (
              <PostListCard key={postItem.id} post={transformPostData(postItem)} index={index} />
          ))}
        </div>
        
        {/* Pagination */}
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </section>
  );
} 