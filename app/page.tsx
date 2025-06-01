import { HeroSection } from "@/sections/hero-section";
import { PracticeSection, PracticeAreas } from "@/sections/practice-section";
import { createClient } from "@/utils/supabase/server";
import { TeamSection, TeamMembers } from "@/sections/team-section";
import { MediaSection, MediaProps } from "@/sections/media-section";
import ContactSection from "@/sections/contact-section";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '법무법인 해광 - 신뢰와 전문성으로 법률문제를 해결합니다',
  description: '풍부한 재판 및 수사 경험을 갖춘 전문가들이 송무, 기업자문, 형사, 가사, 행정 등 다양한 법률 분야에서 최상의 솔루션을 제공합니다.',
};


export default async function Home() {
  const supabase = await createClient();
  const { data: practiceAreas, error } = await supabase
    .from("practice_areas")
    .select("id, area_name, introduction, slug, icon, image_url");

  if (error) {
    console.error("Error fetching practice areas:", error);
    // 에러 처리 로직 (예: 에러 페이지 표시)
  }

  const { data: teamMembers, error: teamMembersError } = await supabase
    .from("lawyers")
    .select("id, name, lawyer_type, profile_picture_url, slug")
    .order("lawyer_type", { ascending: true })
    .neq("lawyer_type", "소속변호사");

  if (teamMembersError) {
    console.error("Error fetching team members:", teamMembersError);
  }

  const { data: rawMedia, error: mediaError } = await supabase
    .from("posts")
    .select("id, title, content_payload, thumbnail_url, external_link, practice_area:practice_areas(area_name), post_authors(lawyers(name, profile_picture_url))")
    .eq("post_type", "언론보도")
    .limit(3);
  console.log("rawMedia Error:", mediaError);
  console.log("rawMedia Data:", JSON.stringify(rawMedia, null, 2));

  if (mediaError) {
    console.error("Error fetching media:", mediaError);
  }

  const media = rawMedia
    ?.map(item => {
      let paObject = null;
      if (Array.isArray(item.practice_area)) {
        paObject = item.practice_area.length > 0 ? item.practice_area[0] : null;
      } else if (item.practice_area) { // It's an object
        paObject = item.practice_area;
      }

      if (!paObject || !paObject.area_name) { 
        console.log("Filtering out item due to invalid practice_area object or area_name:", JSON.stringify(item.practice_area, null, 2));
        return null;
      }
      return {
        ...item,
        practice_area: paObject, // Ensure the final object has the correctly shaped practice_area
      };
    })
    .filter(item => item !== null) as MediaProps | undefined;

  console.log("Processed media Data:", JSON.stringify(media, null, 2));

  return (
    <div className="">
      <HeroSection />
      {practiceAreas && practiceAreas.length > 0 && (
        <PracticeSection practiceAreas={practiceAreas as PracticeAreas} />
      )}
      {teamMembers && teamMembers.length > 0 && (
        <TeamSection teamMembers={teamMembers as TeamMembers} />
      )}
      {media && media.length > 0 && (
        <MediaSection media={media} />
      )}
      <ContactSection />
    </div>
  );
}
