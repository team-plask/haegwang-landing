import { Database } from "@/database.types";
import { PostListCard, Post, Author } from "@/components/post-list-card";
import { Heading } from "@/components/heading";

export type PostCardFromDB = Pick<
  Database["public"]["Tables"]["posts"]["Row"],
  "id" | "title" | "content_payload" | "thumbnail_url" | "external_link" | "slug" | "post_type"
> & {
  practice_area: Pick<Database["public"]["Tables"]["practice_areas"]["Row"], "area_name" | "slug"> | null;
  post_authors?: Array<{
    lawyers: Pick<Database["public"]["Tables"]["lawyers"]["Row"], "name" | "profile_picture_url"> | null;
  }> | null;
};

export type MediaProps = PostCardFromDB[];

export function MediaSection({ media }: { media: MediaProps }) {
  console.log("MediaSection received data:", media);

  const transformPostData = (dbPost: PostCardFromDB): Post => {
    let description = "";
    
    // Handle content payload with better error handling
    try {
      if (dbPost.content_payload && typeof dbPost.content_payload === 'object') {
        const payload = dbPost.content_payload as any;
        
        // Handle source/summary structure (new format)
        if (payload.source && payload.summary) {
          description = `[${payload.source}] ${payload.summary}`;
        }
        // Handle outlet_name/summary structure (old format)
        else if (payload.outlet_name && payload.summary) {
          description = `[${payload.outlet_name}] ${payload.summary}`;
        }
        // Handle other text formats
        else if (payload.text) {
          description = payload.text;
        } else if (payload.body_markdown) {
          description = payload.body_markdown;
        } else if (payload.case_overview_markdown) {
          description = payload.case_overview_markdown;
        } else {
          description = JSON.stringify(payload);
        }
      } else if (typeof dbPost.content_payload === 'string') {
        description = dbPost.content_payload;
      } else {
        description = "언론보도 내용을 확인해보세요.";
      }
    } catch (error) {
      console.error("Error processing content payload:", error);
      description = "언론보도 내용을 확인해보세요.";
    }

    // Transform authors data with better error handling
    const authors: Author[] = [];
    try {
      if (dbPost.post_authors && Array.isArray(dbPost.post_authors)) {
        dbPost.post_authors.forEach(authorRelation => {
          if (authorRelation.lawyers && authorRelation.lawyers.name) {
            authors.push({
              name: authorRelation.lawyers.name,
              image_url: authorRelation.lawyers.profile_picture_url,
            });
          }
        });
      }
    } catch (error) {
      console.error("Error processing authors:", error);
    }

    // If no authors, add default author
    if (authors.length === 0) {
      authors.push({
        name: "법무법인(유한) 해광",
        image_url: "https://gjfljnsvnrortuzjykdi.supabase.co/storage/v1/object/public/lawyers//logo_symbol.png",
      });
    }

    // Check for external link
    const isExternalLink = !!dbPost.external_link;
    const displaySlug = isExternalLink 
      ? (dbPost.external_link || "#")
      : (dbPost.slug ? `/media/${dbPost.slug}` : "#");

    // Set default thumbnail if none exists
    const displayImage = dbPost.thumbnail_url || "https://gjfljnsvnrortuzjykdi.supabase.co/storage/v1/object/public/lawyers/media_thumnails/default.png";

    return {
      title: dbPost.title || "제목 없음",
      display_slug: displaySlug,
      display_image: displayImage,
      display_description: description,
      practice_area_name: null, // Remove practice area as requested
      authors: authors,
      is_external_link: isExternalLink,
    };
  };

  // Add safety check for media data
  if (!media || !Array.isArray(media) || media.length === 0) {
    console.log("No media data available");
    return (
      <section className="w-full items-center justify-center py-12 md:py-32 mx-auto bg-gray-100">
        <div className="container max-w-7xl flex flex-col items-center justify-between mx-auto px-4 md:px-8">
          <Heading 
            badge="언론보도" 
            title="해광의 최신 소식을 확인해보세요" 
            description="법무법인(유한) 해광은 민사부터 기업 법무까지 다양한 업무를 진행합니다." 
          />
          <div className="w-full flex flex-col gap-6 mt-8">
            <p className="text-center text-gray-500">현재 표시할 언론보도가 없습니다.</p>
          </div>
        </div>
      </section>
    );
  }

  console.log("Rendering media items:", media.length);

  return (
    <section className="w-full items-center justify-center py-12 md:py-32 mx-auto bg-gray-100">
      <div className="container max-w-7xl flex flex-col items-center justify-between mx-auto px-4 md:px-8">
        <Heading 
          badge="언론보도" 
          title="해광의 최신 소식을 확인해보세요" 
          description="법무법인(유한) 해광은 민사부터 기업 법무까지 다양한 업무를 진행합니다." 
        />
        
        <div className="w-full flex flex-col gap-6 mt-8">
          {media.map((postItem, index) => {
            console.log(`Rendering media item ${index}:`, postItem);
            const transformedPost = transformPostData(postItem);
            console.log(`Transformed post ${index}:`, transformedPost);
            return (
              <PostListCard key={postItem.id || index} post={transformedPost} index={index} />
            );
          })}
        </div>
        
        <div className="mt-12">
          <a
            href="/media"
            className="inline-flex items-center px-6 py-3 bg-brand text-white font-medium rounded-full hover:bg-brand/90 transition-colors duration-200"
          >
            더 많은 소식 보기
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
