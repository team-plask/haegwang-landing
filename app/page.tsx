import { PracticeAreas } from "@/sections/practice-section";
import { createClient } from "@/utils/supabase/server";
import { TeamMembers } from "@/sections/team-section";
import { MediaProps } from "@/sections/media-section";
import { sortLawyers } from "@/utils/lawyer-sorting";
import { HomeContent } from "@/components/home-content";
import type { Metadata } from 'next';
import { Database } from "@/database.types";

export const metadata: Metadata = {
  title: '법무법인 해광 - 신뢰와 전문성으로 법률문제를 해결합니다',
  description: '풍부한 재판 및 수사 경험을 갖춘 전문가들이 송무, 기업자문, 형사, 가사, 행정 등 다양한 법률 분야에서 최상의 솔루션을 제공합니다.',
};

// Supabase Posts 테이블의 rawMedia 아이템 타입을 정의합니다.
// Supabase 쿼리 결과에 따라 타입 조정
type RawMediaItemFromQuery = {
  id: string;
  title: string | null;
  content_payload: Database["public"]["Tables"]["posts"]["Row"]["content_payload"];
  thumbnail_url: string | null;
  external_link: string | null;
  practice_area: { area_name: string } | { area_name: string }[] | null; // 쿼리에서 단일 객체 또는 배열로 올 수 있음
  post_authors: { lawyers: { name: string; profile_picture_url: string | null } | null }[] | null; // lawyers가 null일 수 있음
};

export default async function Home() {
  const supabase = await createClient();

  const practiceAreasPromise = supabase
    .from("practice_areas")
    .select("id, area_name, introduction, slug, icon, image_url")
    .order("display_order", { ascending: true });

  const teamMembersPromise = supabase
    .from("lawyers")
    .select("id, name, lawyer_type, profile_picture_url, slug, order")
    .neq("lawyer_type", "소속변호사");

  const rawMediaPromise = supabase
    .from("posts")
    .select("id, title, content_payload, thumbnail_url, external_link, practice_area:practice_areas(area_name), post_authors(lawyers(name, profile_picture_url))")
    .eq("post_type", "언론보도")
    .limit(3);

  const [
    { data: practiceAreas, error: practiceAreasError },
    { data: teamMembers, error: teamMembersError },
    { data: rawMediaResult, error: rawMediaError } // 변수명 변경 rawMediaResult
  ] = await Promise.all([
    practiceAreasPromise,
    teamMembersPromise,
    rawMediaPromise
  ]);

  if (practiceAreasError) {
    console.error("Error fetching practice areas:", practiceAreasError);
  }
  if (teamMembersError) {
    console.error("Error fetching team members:", teamMembersError);
  }
  if (rawMediaError) {
    console.error("Error fetching media:", rawMediaError);
  }

  const typedRawMedia = rawMediaResult as RawMediaItemFromQuery[] | null;

  const media = typedRawMedia
    ?.map((item: RawMediaItemFromQuery) => {
      let paObject: { area_name: string } | null = null;
      if (Array.isArray(item.practice_area)) {
        paObject = item.practice_area.length > 0 ? item.practice_area[0] : null;
      } else if (item.practice_area) { 
        paObject = item.practice_area;
      }

      if (!paObject || !paObject.area_name) { 
        return null;
      }
      // post_authors 내부의 lawyers가 null이 아닌 경우만 필터링
      const validAuthors = item.post_authors?.filter(pa => pa.lawyers !== null) || [];

      return {
        ...item,
        practice_area: paObject, 
        post_authors: validAuthors as unknown as { lawyers: { name: string; profile_picture_url: string | null } }[] // 타입 단언
      };
    })
    // Filter out nulls from the map operation and ensure practice_area is valid for MediaProps
    .filter((item): item is Omit<RawMediaItemFromQuery, 'practice_area' | 'post_authors'> & { practice_area: { area_name: string }; post_authors: { lawyers: { name: string; profile_picture_url: string | null } }[] } => 
      item !== null && item.practice_area !== null
    ) as MediaProps | undefined;

  // Sort team members according to business rules
  const sortedTeamMembers = teamMembers ? sortLawyers(teamMembers) : null;

  return (
    <HomeContent 
      practiceAreas={practiceAreas as PracticeAreas}
      teamMembers={sortedTeamMembers as TeamMembers}
      media={media as MediaProps}
    />
  );
}
