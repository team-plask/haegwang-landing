import { Database } from "@/database.types";
import { PostCard, Post, Author } from "@/components/post-card";
import { SectionHeading } from "@/components/section-heading";

export type PostCardFromDB = Pick<
  Database["public"]["Tables"]["posts"]["Row"],
  "id" | "title" | "content_payload" | "external_link" | "slug"
> & {
  post_type: Database["public"]["Enums"]["post_type_enum"];
  practice_area: Pick<Database["public"]["Tables"]["practice_areas"]["Row"], "id" | "area_name" | "slug">;
  post_authors: {
    lawyers: Pick<Database["public"]["Tables"]["lawyers"]["Row"], "name" | "profile_picture_url" | "id" | "slug">;
  }[];
};

export type SuccessProps = PostCardFromDB[];

export function SuccessSection({ success }: { success: SuccessProps }) {
  console.log("[SuccessSection] Received success props:", JSON.stringify(success, null, 2));

  const transformPostData = (dbPost: PostCardFromDB): Post => {
    console.log("[SuccessSection] Transforming dbPost:", JSON.stringify(dbPost, null, 2));
    console.log("[SuccessSection] dbPost.slug:", dbPost.slug);
    console.log("[SuccessSection] dbPost.external_link:", dbPost.external_link);
    
    const authors: Author[] = dbPost.post_authors.map(pa => ({
      name: pa.lawyers.name,
      image_url: pa.lawyers.profile_picture_url,
    }));

    let description = "";
    if (dbPost.content_payload && typeof dbPost.content_payload === 'object') {
      const payload = dbPost.content_payload as any;

      if (typeof payload.result === 'string' && typeof payload.case_overview_markdown === 'string') {
        description = `소송 결과 : ${payload.result}\n내용 : ${payload.case_overview_markdown}`;
      } else if (typeof payload.outlet_name === 'string' && typeof payload.summary === 'string') {
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

    // For success posts, use internal link with slug
    const isExternalLink = !!dbPost.external_link;
    const displaySlug = isExternalLink 
      ? (dbPost.external_link || "#")
      : dbPost.slug ? `/success/${dbPost.slug}` : "#";

    console.log("[SuccessSection] Generated displaySlug:", displaySlug);
    console.log("[SuccessSection] isExternalLink:", isExternalLink);

    const transformed = {
      title: dbPost.title,
      display_slug: displaySlug,
      display_image: null,
      display_description: description,
      practice_area_name: dbPost.practice_area.area_name,
      authors: authors,
      is_external_link: isExternalLink,
    };
    console.log("[SuccessSection] Transformed post data:", JSON.stringify(transformed, null, 2));
    return transformed;
  };

  if (!success || success.length === 0) {
    console.log("[SuccessSection] No success stories to display or success array is empty.");
    return null; // Or some placeholder indicating no data
  }

  return (
    <section className="w-full items-center justify-center py-8 md:py-16 mx-auto bg-gray-100">
      <div className="container max-w-7xl flex flex-col items-center justify-between mx-auto px-4 md:px-8">
        <SectionHeading title="업무사례" subtitle="해광의 전문 변호사들이 당신의 성공적인 문제 해결을 돕겠습니다." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {success && success.length > 0 && 
            success.map((postItem, index) => (
              <PostCard key={postItem.id} post={transformPostData(postItem)} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
