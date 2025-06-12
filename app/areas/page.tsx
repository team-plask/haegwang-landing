import { PageHeader } from "@/components/page-header";
import { createClient } from "@/utils/supabase/server";
import { PracticeInfoSection, type PracticeInfo } from "@/sections/areas/practice-info-section";
import { ReusableTabs, type TabDefinition } from "@/components/reusable-tabs";
import React from "react"; // Import React for JSX
import { LawyerSection, type LawyerList } from "@/sections/areas/lawyer-section";
import { SuccessSection, type PostCardFromDB } from "@/sections/areas/success-section";
import { sortLawyers } from "@/utils/lawyer-sorting";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '업무 분야 - 법무법인 해광',
  description: '법무법인 해광의 주요 업무 분야를 소개합니다. 각 분야별 전문 변호사 팀이 맞춤형 법률 서비스를 제공하여 최적의 해결책을 찾아드립니다.',
};

// Define the structure as returned by Supabase for the lawyers part
interface SupabasePracticeAreaLawyer {
  lawyers: LawyerList; // The actual lawyer details are nested
}

// 각 practice area에 lawyers와 posts를 포함하는 새로운 타입을 정의합니다.
// This type reflects the structure AFTER we process/map the lawyers.
interface PracticeAreaWithDetails extends PracticeInfo {
  lawyers: LawyerList[]; 
  posts: PostCardFromDB[];
}

// This type reflects the raw structure from Supabase more accurately for the lawyers part
interface RawPracticeAreaFromSupabase extends Omit<PracticeInfo, 'key_services' | 'lawyers'> { // Omit fields that need special handling or have different structure initially
  key_services: string[] | null; // Fix any type - assuming it's an array of strings based on usage
  lawyers: SupabasePracticeAreaLawyer[]; // Array of objects, each with a 'lawyers' key
  posts: PostCardFromDB[];
}

export default async function AreasPage() {
  const supabase = await createClient();

  const { data: practiceAreasData, error } = await supabase
    .from("practice_areas")
    .select(`
      id, area_name, introduction, icon, image_url, key_services, slug,
      lawyers: lawyer_practice_areas!left(lawyers!inner(id, name, lawyer_type, profile_picture_url, slug, order)),
      posts!left ( 
        id, title, content_payload, external_link, post_type, slug,
        practice_area: practice_area_id!inner(id, area_name, slug),
        post_authors!left(
          lawyers!inner(name, profile_picture_url, id, slug)
        )
      )
    `)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching practice areas with details:", error);
    return <div className="p-4 text-center text-red-500">업무 분야 정보를 불러오는데 실패했습니다. 상세 정보 로딩 오류.</div>;
  }
  
  // 타입 단언을 사용하여 Supabase 응답을 우리가 정의한 타입으로 간주합니다.
  // 실제 데이터 구조와 타입이 일치하는지 주의해야 합니다.
  const rawPracticeAreas = (practiceAreasData as unknown as RawPracticeAreaFromSupabase[]) || [];

  if (rawPracticeAreas.length === 0) {
    return (
      <>
        <PageHeader
          title="업무 영역"
          subtitle="해광의 전문 변호사들이 당신의 성공적인 문제 해결을 돕겠습니다."
          breadcrumbs={[{ name: "홈", href: "/" }, { name: "업무 영역", href: "/areas" }]}
        />
        <div className="p-4 text-center">등록된 업무 분야 정보가 없습니다.</div>
      </>
    );
  }

  // Transform rawPracticeAreas to the PracticeAreaWithDetails structure
  const practiceAreas: PracticeAreaWithDetails[] = rawPracticeAreas.map(rawArea => {
    const lawyers = rawArea.lawyers ? rawArea.lawyers.map(item => item.lawyers) : [];
    const sortedLawyers = sortLawyers(lawyers);
    
    return {
      ...rawArea,
      lawyers: sortedLawyers,
      // Ensure key_services is handled if its type in PracticeInfo is more specific than 'any'
      // For now, assuming PracticeInfo's key_services can handle 'any' or it's correctly typed there.
    };
  });

  const tabDefinitions: TabDefinition[] = practiceAreas.map(area => ({
    id: area.slug,
    title: area.area_name ?? "제목 없음",
    iconName: area.icon,
  }));

  const tabComponents: Record<string, React.ReactNode> = {};
  practiceAreas.forEach(area => {
    const areaLawyers = area.lawyers || []; // Now area.lawyers is correctly LawyerList[]
    const areaSuccessStories = area.posts ? area.posts.filter(post => post.post_type === '승소사례') : [];

    tabComponents[area.slug] = (
      <>
        <PracticeInfoSection practiceInfo={area} />
        {areaSuccessStories.length > 0 && <SuccessSection success={areaSuccessStories} />}
        {areaLawyers.length > 0 && <LawyerSection lawyers={areaLawyers} />}
      </>
    );
  });

  const defaultInitialTabId = practiceAreas.length > 0 ? practiceAreas[0].slug : "";
  const queryParamName = "slug";

  return (
    <>
      <PageHeader
        title="업무 영역"
        subtitle="해광의 전문 변호사들이 당신의 성공적인 문제 해결을 돕겠습니다."
        breadcrumbs={[{ name: "홈", href: "/" }, { name: "업무 영역", href: "/areas" }]}
      />
      <ReusableTabs
        tabs={tabDefinitions}
        components={tabComponents}
        queryParamName={queryParamName}
        defaultTabId={defaultInitialTabId}
        layout="grid"
      />
    </>
  );
}