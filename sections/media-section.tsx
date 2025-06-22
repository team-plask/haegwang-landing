import { Database } from "@/database.types";
import { PostListCard, Post } from "@/components/post-list-card";
import { Heading } from "@/components/heading";

export type PostCardFromDB = Pick<
  Database["public"]["Tables"]["posts"]["Row"],
  "id" | "title" | "content_payload" | "thumbnail_url" | "external_link" | "slug" | "post_type"
> & {
  practice_area: Pick<Database["public"]["Tables"]["practice_areas"]["Row"], "area_name" | "slug"> | null;
};

export type MediaProps = PostCardFromDB[];

export function MediaSection({ media }: { media: MediaProps }) {
  const transformPostData = (dbPost: PostCardFromDB): Post => {
    let description = "";
    if (dbPost.content_payload && typeof dbPost.content_payload === 'object') {
      const payload = dbPost.content_payload as any;
      if (typeof payload.outlet_name === 'string' && typeof payload.summary === 'string') {
        description = `[${payload.outlet_name}] ${payload.summary}`;
      } else if (typeof payload.text === 'string') {
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

    // Media posts usually have external links, but check just in case
    const isExternalLink = !!dbPost.external_link;
    const displaySlug = isExternalLink 
      ? (dbPost.external_link || "#")
      : dbPost.slug ? `/media/${dbPost.slug}` : "#";

    return {
      title: dbPost.title,
      display_slug: displaySlug,
      display_image: dbPost.thumbnail_url,
      display_description: description,
      practice_area_name: dbPost.practice_area?.area_name || null,
      is_external_link: isExternalLink,
    };
  };

  return (
    <section className="w-full items-center justify-center py-12 md:py-32 mx-auto bg-gray-100">
      <div className="container max-w-6xl flex flex-col items-center justify-between mx-auto px-4 md:px-8">
        <Heading 
          badge="언론보도" 
          title="해광의 최신 소식을 확인해보세요" 
          description="법무법인(유한) 해광은 민사부터 기업 법무까지 다양한 업무를 진행합니다." 
        />
        
        <div className="w-full flex flex-col gap-6 mt-8">
          {media && media.length > 0 && 
            media.map((postItem, index) => (
              <PostListCard key={postItem.id} post={transformPostData(postItem)} index={index} />
          ))}
        </div>
        
        {media && media.length > 0 && (
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
        )}
      </div>
    </section>
  );
}
