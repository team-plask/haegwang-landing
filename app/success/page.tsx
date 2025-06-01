import { PageHeader } from "@/components/page-header";
import { createClient } from "@/utils/supabase/server";
import { ReusableTabs, type TabDefinition } from "@/components/reusable-tabs";
import React from "react";
import { SuccessSection, type PostCardFromDB } from "@/sections/areas/success-section";
import { type PracticeInfo } from "@/sections/areas/practice-info-section"; // For practice area type
import { type Database } from "@/database.types";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '성공 사례 - 법무법인 해광',
  description: '법무법인 해광의 주요 승소 사례 및 성공적인 업무 수행 결과를 소개합니다. 저희의 전문성과 실력을 실제 사례를 통해 확인하세요.',
};

// Interface for the raw post structure from Supabase, where practice_area might be an array
interface RawSuccessPostFromSupabase extends Omit<PostCardFromDB, 'practice_area'> {
  // practice_area should be a single object as per the !inner join, not an array
  practice_area: Pick<Database["public"]["Tables"]["practice_areas"]["Row"], "id" | "area_name" | "slug">;
}

export default async function SuccessStoriesPage() {
  const supabase = await createClient();

  // 1. Fetch all practice areas for tabs
  const { data: practiceAreasData, error: practiceAreasError } = await supabase
    .from("practice_areas")
    .select("id, area_name, icon, slug") // Fetch fields needed for tabs
    .order("id", { ascending: true });

  // 2. Fetch all success story posts
  const { data: allSuccessPostsData, error: postsError } = await supabase
    .from("posts")
    .select(`
      id, title, content_payload, external_link, post_type,
      practice_area: practice_area_id!inner(id, area_name, slug),
      post_authors!inner(
        lawyers!inner(name, profile_picture_url, id, slug)
      )
    `)
    .eq("post_type", "승소사례") // Filter for success stories
    .order("published_at", { ascending: false });

  if (practiceAreasError || postsError) {
    return <div className="p-4 text-center text-red-500">데이터를 불러오는데 실패했습니다. (상세 내용은 서버 콘솔 확인)</div>;
  }


  const practiceAreas = (practiceAreasData as PracticeInfo[]) || [];
  // Cast to the raw type first
  const rawSuccessPosts = (allSuccessPostsData as unknown as RawSuccessPostFromSupabase[]) || [];


  // Transform raw posts to match PostCardFromDB
  const allSuccessPosts: PostCardFromDB[] = rawSuccessPosts.map(rawPost => {
    // Since !inner join guarantees practice_area exists and is an object, direct assignment is fine.
    // The RawSuccessPostFromSupabase type now reflects this.
    return {
      ...rawPost,
      practice_area: rawPost.practice_area, 
    };
  }).filter(post => { // This filter should ideally not remove anything if data is consistent
    const hasPracticeArea = post.practice_area !== undefined && post.practice_area !== null;
    if (!hasPracticeArea) {
      console.log("Filtering out post due to undefined/null practice_area:", post.id, post.title);
    }
    return hasPracticeArea;
  });
 
  if (practiceAreas.length === 0) {
    return (
      <>
        <PageHeader
          title="업무사례"
          subtitle="해광의 성공적인 업무 수행 사례들을 살펴보세요."
          breadcrumbs={[{ name: "홈", href: "/" }, { name: "업무사례", href: "/success" }]}
        />
        <div className="p-4 text-center">등록된 업무 분야가 없습니다. 업무사례를 표시할 수 없습니다.</div>
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
    // Filter success posts for the current practice area using practice_area.slug
    const areaSuccessStories = allSuccessPosts.filter(
      post => post.practice_area?.slug === area.slug
    );

    // Only add component if there are stories for this area
    if (areaSuccessStories.length > 0) {
      tabComponents[area.slug] = (
        <SuccessSection success={areaSuccessStories} />
      );
    } else {
      // Optionally, display a message if no stories for this specific tab
      tabComponents[area.slug] = (
        <div className="p-4 text-center">해당 분야의 업무사례가 아직 없습니다.</div>
      );
    }
  });
  
  // Determine a default tab: either the first one with content, or the very first one.
  let defaultInitialTabId = practiceAreas.length > 0 ? practiceAreas[0].slug : "";
  const firstTabWithContent = practiceAreas.find(area => 
    (allSuccessPosts.filter(post => post.practice_area?.slug === area.slug)).length > 0
  );
  if (firstTabWithContent) {
    defaultInitialTabId = firstTabWithContent.slug;
  }


  const queryParamName = "practice_area_slug"; // Using a more specific query param name

  return (
    <>
      <PageHeader
        title="업무사례"
        subtitle="해광의 성공적인 업무 수행 사례들을 살펴보세요."
        breadcrumbs={[{ name: "홈", href: "/" }, { name: "업무사례", href: "/success" }]}
      />
      {practiceAreas.length > 0 && allSuccessPosts.length > 0 ? (
        <ReusableTabs
          tabs={tabDefinitions}
          components={tabComponents}
          queryParamName={queryParamName}
          defaultTabId={defaultInitialTabId}
        />
      ) : (
         <div className="p-4 text-center">등록된 업무사례가 없습니다.</div>
      )}
    </>
  );
}
