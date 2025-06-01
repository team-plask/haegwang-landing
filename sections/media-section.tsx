import { Database } from "@/database.types";
import { PostCard, Post } from "@/components/post-card";
import { Heading } from "@/components/heading";

export type PostCardFromDB = Pick<
  Database["public"]["Tables"]["posts"]["Row"],
  "id" | "title" | "content_payload" | "thumbnail_url" | "external_link"
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

    return {
      title: dbPost.title,
      display_slug: dbPost.external_link || "#",
      display_image: dbPost.thumbnail_url,
      display_description: description,
      practice_area_name: dbPost.practice_area?.area_name || null,
    };
  };

  return (
    <section className="w-full items-center justify-center py-12 md:py-32 mx-auto bg-gray-100">
      <div className="container max-w-7xl flex flex-col items-center justify-between mx-auto px-4 md:px-8">
        <Heading badge="언론보도" title="해광의 최신 소식을 확인해보세요" description="법무법인(유한) 해광은 민사부터 기업 법무까지 다양한 업무를 진행합니다." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {media && media.length > 0 && 
            media.map((postItem, index) => (
              <PostCard key={postItem.id} post={transformPostData(postItem)} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
