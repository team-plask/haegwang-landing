import { PageHeader } from '@/components/page-header';
import { TeamSection, TeamMembers } from '@/sections/lawyers/team-section';
import { createClient } from '@/utils/supabase/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '구성원 소개 - 법무법인 해광',
  description: '법무법인 해광의 전문가 팀을 만나보세요. 각 분야 최고의 경력을 가진 변호사들이 여러분의 편에서 최선을 다할 것을 약속드립니다.',
};

async function getLawyersData(): Promise<TeamMembers> {
  const supabase = await createClient();
  const { data: lawyers, error } = await supabase
    .from('lawyers')
    .select('id, name, lawyer_type, profile_picture_url, slug');

  if (error) {
    console.error("Error fetching lawyers:", error);
    return []; // Return empty array or handle error as appropriate
  }
  // Ensure that the fetched data conforms to TeamMembers type.
  // Supabase client might return a more generic type, so casting or validation might be needed
  // depending on strictness of type checking and actual returned data structure.
  return lawyers as TeamMembers; 
}

export default async function LawyersPage() {
  const teamMembers = await getLawyersData();

  const breadcrumbs = [
    { name: '홈', href: '/' },
    { name: '구성원 소개' },
  ];

  return (
    <>
      <PageHeader
        title="구성원 소개"
        subtitle="해광의 전문가 팀을 만나보세요. 각 분야 최고의 경력을 가진 변호사들이 여러분의 편입니다."
        breadcrumbs={breadcrumbs}
      />
      <TeamSection teamMembers={teamMembers} />
    </>
  );
}
