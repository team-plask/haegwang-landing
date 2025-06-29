import { PageHeader } from "@/components/page-header";
import { createClient } from "@/utils/supabase/server";
import { MediaListSection, type PostCardFromDB } from "@/sections/media-list-section";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '언론 보도 - 법무법인 해광',
  description: '법무법인 해광 및 소속 변호사들의 언론 보도 내용을 확인하세요. 저희의 전문성과 활동을 다양한 미디어를 통해 소개합니다.',
};

const POSTS_PER_PAGE = 10;

export default async function MediaPage(props: {
  searchParams: Promise<{ page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const supabase = await createClient();
  const currentPage = Number(searchParams.page) || 1;
  const offset = (currentPage - 1) * POSTS_PER_PAGE;

  // Get total count of media posts
  const { count: totalCount, error: countError } = await supabase
    .from("posts")
    .select("*", { count: "exact", head: true })
    .eq("post_type", "언론보도");

  // Fetch paginated media posts with author information
  const { data: allMediaPostsData, error: postsError } = await supabase
    .from("posts")
    .select(`
      id, title, content_payload, external_link, post_type, thumbnail_url,
      practice_area: practice_area_id(area_name, slug),
      post_authors(
        lawyers(
          name,
          profile_picture_url
        )
      )
    `)
    .eq("post_type", "언론보도") // Filter for media posts
    .order("published_at", { ascending: false })
    .range(offset, offset + POSTS_PER_PAGE - 1);

  if (postsError || countError) {
    return <div className="p-4 text-center text-red-500">데이터를 불러오는데 실패했습니다. (상세 내용은 서버 콘솔 확인)</div>;
  }

  const allMediaPosts = (allMediaPostsData as unknown as PostCardFromDB[]) || [];
  const totalPages = Math.ceil((totalCount || 0) / POSTS_PER_PAGE);

  return (
    <>
      <PageHeader
        title="언론 보도"
        subtitle="법무법인 해광 관련 언론 보도 내용을 확인해보세요."
      />
      {allMediaPosts.length > 0 ? (
        <MediaListSection 
          media={allMediaPosts} 
          currentPage={currentPage}
          totalPages={totalPages}
        />
      ) : (
        <div className="p-4 text-center">등록된 언론 보도가 없습니다.</div>
      )}
    </>
  );
}
