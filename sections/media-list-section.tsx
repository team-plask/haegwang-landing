import { Database } from "@/database.types";
import { PostListCard, Post } from "@/components/post-list-card";

export type PostCardFromDB = Pick<
  Database["public"]["Tables"]["posts"]["Row"],
  "id" | "title" | "content_payload" | "thumbnail_url" | "external_link" | "slug" | "post_type"
> & {
  practice_area: Pick<Database["public"]["Tables"]["practice_areas"]["Row"], "area_name" | "slug"> | null;
};

export type MediaProps = PostCardFromDB[];

export function MediaListSection({ media }: { media: MediaProps }) {
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
    <section className="w-full items-center justify-center py-12 md:py-16 mx-auto">
      <div className="container max-w-7xl flex flex-col items-center justify-between mx-auto px-4 md:px-8">
        <div className="w-full flex flex-col gap-6">
          {media && media.length > 0 && 
            media.map((postItem, index) => (
              <PostListCard key={postItem.id} post={transformPostData(postItem)} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
} 