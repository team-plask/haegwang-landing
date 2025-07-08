import { PageHeader } from '@/components/page-header';
import { TeamSection, TeamMembers } from '@/sections/lawyers/team-section';
import { createClient } from '@/utils/supabase/server';
import { sortLawyers } from '@/utils/lawyer-sorting';
import type { Metadata } from 'next';

// ISR 설정: 30분마다 페이지 재생성 (변호사 정보는 가끔 업데이트됨)
export const revalidate = 1800; // 30분 = 1800초

export const metadata: Metadata = {
  title: '구성원 소개 - 법무법인 해광',
  //description: '법무법인 해광의 변호사 팀을 만나보세요. 각 분야 최고의 경력을 가진 변호사들이 여러분의 편에서 최선을 다할 것을 약속드립니다.',
};

async function getLawyersData(): Promise<TeamMembers> {
  const supabase = await createClient();
  const { data: lawyers, error } = await supabase
    .from('lawyers')
    .select('id, name, lawyer_type, profile_picture_url, slug, order');

  if (error) {
    console.error("Error fetching lawyers:", error);
    return []; // Return empty array or handle error as appropriate
  }

  // Sort lawyers according to business rules
  const sortedLawyers = sortLawyers(lawyers || []);

  return sortedLawyers as TeamMembers; 
}

export default async function LawyersPage() {
  const teamMembers = await getLawyersData();

  return (
    <>
      <PageHeader
        title="변호사 소개"
        subtitle="해광의 변호사를 만나보세요. 각 분야 최고의 변호사들이 여러분의 편입니다."
      />
      <TeamSection teamMembers={teamMembers} />
    </>
  );
}
