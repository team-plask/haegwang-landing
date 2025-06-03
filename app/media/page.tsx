import { PageHeader } from "@/components/page-header";
import { createClient } from "@/utils/supabase/server";
import { ReusableTabs, type TabDefinition } from "@/components/reusable-tabs";
import React from "react";
import { MediaListSection, type PostCardFromDB } from "@/sections/media-list-section";
import { type PracticeInfo } from "@/sections/areas/practice-info-section"; // For practice area type
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '언론 보도 - 법무법인 해광',
  description: '법무법인 해광 및 소속 변호사들의 언론 보도 내용을 확인하세요. 저희의 전문성과 활동을 다양한 미디어를 통해 소개합니다.',
};

export default async function MediaPage() {
  const supabase = await createClient();

  // 1. Fetch all practice areas for tabs
  const { data: practiceAreasData, error: practiceAreasError } = await supabase
    .from("practice_areas")
    .select("id, area_name, icon, slug") // Fetch fields needed for tabs
    .order("id", { ascending: true });

  // 2. Fetch all media posts
  const { data: allMediaPostsData, error: postsError } = await supabase
    .from("posts")
    .select(`
      id, title, content_payload, external_link, post_type, thumbnail_url,
      practice_area: practice_area_id!inner(area_name, slug)
    `)
    .eq("post_type", "언론보도") // Filter for media posts
    .order("published_at", { ascending: false });

  if (practiceAreasError || postsError) {
    return <div className="p-4 text-center text-red-500">데이터를 불러오는데 실패했습니다. (상세 내용은 서버 콘솔 확인)</div>;
  }

  const practiceAreas = (practiceAreasData as PracticeInfo[]) || [];
  const allMediaPosts = (allMediaPostsData as unknown as PostCardFromDB[]) || [];

  // Filter out posts without practice area
  const filteredMediaPosts = allMediaPosts.filter((post: PostCardFromDB) => {
    if (!post.practice_area || !post.practice_area.area_name) {
      return false;
    }
    return true;
  });
 
  if (practiceAreas.length === 0) {
    return (
      <>
        <PageHeader
          title="언론 보도"
          subtitle="법무법인 해광 관련 언론 보도 내용을 확인해보세요."
          breadcrumbs={[{ name: "홈", href: "/" }, { name: "언론 보도", href: "/media" }]}
        />
        <div className="p-4 text-center">등록된 업무 분야가 없습니다. 언론 보도를 표시할 수 없습니다.</div>
      </>
    );
  }

  const tabDefinitions: TabDefinition[] = practiceAreas.map(area => ({
    id: area.slug, // Use slug for tab ID
    title: area.area_name ?? "제목 없음",
    iconName: area.icon,
  }));

  const tabComponents: Record<string, React.ReactNode> = {};
  practiceAreas.forEach(area => {
    // Filter media posts for the current practice area using practice_area.slug
    const areaMediaPosts = filteredMediaPosts.filter(
      post => post.practice_area?.slug === area.slug
    );

    // Only add component if there are posts for this area
    if (areaMediaPosts.length > 0) {
      tabComponents[area.slug] = (
        <MediaListSection media={areaMediaPosts} />
      );
    } else {
      // Optionally, display a message if no posts for this specific tab
      tabComponents[area.slug] = (
        <div className="p-4 text-center">해당 분야의 언론 보도가 아직 없습니다.</div>
      );
    }
  });
  
  // Determine a default tab: either the first one with content, or the very first one.
  let defaultInitialTabId = practiceAreas.length > 0 ? practiceAreas[0].slug : "";
  const firstTabWithContent = practiceAreas.find(area => 
    (filteredMediaPosts.filter(post => post.practice_area?.slug === area.slug)).length > 0
  );
  if (firstTabWithContent) {
    defaultInitialTabId = firstTabWithContent.slug;
  }


  const queryParamName = "practice_area_slug"; // Using a more specific query param name

  return (
    <>
      <PageHeader
        title="언론 보도"
        subtitle="법무법인 해광 관련 언론 보도 내용을 확인해보세요."
        breadcrumbs={[{ name: "홈", href: "/" }, { name: "언론 보도", href: "/media" }]}
      />
      {practiceAreas.length > 0 && filteredMediaPosts.length > 0 ? (
        <ReusableTabs
          tabs={tabDefinitions}
          components={tabComponents}
          queryParamName={queryParamName}
          defaultTabId={defaultInitialTabId}
        />
      ) : (
         <div className="p-4 text-center">등록된 언론 보도가 없습니다.</div>
      )}
    </>
  );
}
