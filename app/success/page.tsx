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
  //description: '법무법인 해광의 주요 승소 사례 및 성공적인 업무 수행 결과를 소개합니다. 저희의 전문성과 실력을 실제 사례를 통해 확인하세요.',
};

// Interface for the raw post structure from Supabase, where practice_area might be an array
interface RawSuccessPostFromSupabase extends Omit<PostCardFromDB, 'practice_area' | 'post_authors'> {
  // practice_area might be null when using !left join
  practice_area: Pick<Database["public"]["Tables"]["practice_areas"]["Row"], "id" | "area_name" | "slug"> | null;
  // post_authors might be null or empty when using !left join
  post_authors: {
    lawyers: Pick<Database["public"]["Tables"]["lawyers"]["Row"], "name" | "profile_picture_url" | "profile_original_url" | "id" | "slug"> | null;
  }[] | null;
}

export default async function SuccessStoriesPage() {
  const supabase = await createClient();

  // 1. Fetch all practice areas for tabs
  const { data: practiceAreasData, error: practiceAreasError } = await supabase
    .from("practice_areas")
    .select("id, area_name, icon, slug") // Fetch fields needed for tabs
    .order("display_order", { ascending: true });

  // 2. Fetch all success story posts
  const { data: allSuccessPostsData, error: postsError } = await supabase
    .from("posts")
    .select(`
      id, title, content_payload, external_link, post_type, slug,
      practice_area: practice_area_id!left(id, area_name, slug),
      post_authors!left(
        lawyers!left(name, profile_picture_url, profile_original_url, id, slug)
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
  const allSuccessPosts: PostCardFromDB[] = rawSuccessPosts
    .filter(rawPost => rawPost.practice_area !== null) // Only filter out posts that truly have no practice area
    .map(rawPost => {
      // Since we're using !left join, practice_area might be null
      // Also handle post_authors that might have null lawyers
      const validPostAuthors = (rawPost.post_authors || [])
        .filter(pa => pa.lawyers !== null)
        .map(pa => ({ lawyers: pa.lawyers! }));
      
      return {
        ...rawPost,
        practice_area: rawPost.practice_area!, // We know it's not null from the filter above
        post_authors: validPostAuthors // Filtered array with non-null lawyers
      };
    });
 
  if (practiceAreas.length === 0) {
    return (
      <>
        <PageHeader
          title="업무사례"
          subtitle="해광의 성공적인 업무 수행 사례들을 살펴보세요."
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
        <SuccessSection success={areaSuccessStories} showHeading={false} />
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
      />
      {practiceAreas.length > 0 && allSuccessPosts.length > 0 ? (
        <ReusableTabs
          tabs={tabDefinitions}
          components={tabComponents}
          queryParamName={queryParamName}
          defaultTabId={defaultInitialTabId}
          layout="grid"
        />
      ) : (
         <div className="p-4 text-center">등록된 업무사례가 없습니다.</div>
      )}
    </>
  );
}
