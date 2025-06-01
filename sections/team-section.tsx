import { Database } from "@/database.types";
import Team from "@/components/team";
import { Heading } from "@/components/heading";
import { InView } from "@/components/ui/in-view";
import { GridPatternContainer } from "@/components/grid-background2";

export type TeamMemberFromDB = Pick<
  Database["public"]["Tables"]["lawyers"]["Row"],
  "id" | "name" | "lawyer_type" | "profile_picture_url" | "slug"
>;

export type TeamMembers = TeamMemberFromDB[];
export function TeamSection({ teamMembers }: { teamMembers: TeamMembers }) {
  const mappedTeamMembers = teamMembers.map((member) => ({
    name: member.name,
    role: member.lawyer_type,
    avatar: member.profile_picture_url,
    slug: member.slug || undefined,
  }));
  return (
    <section className="w-full mx-auto py-12 md:py-32 relative overflow-hidden">
      <GridPatternContainer className="opacity-10" />
      <div className="container mx-auto max-w-7xl px-4 md:px-8 relative z-10">
        <Heading badge="구성원 소개" title="전문가들이 함께 합니다" description="부장판사부터 차장검사까지 전관 출신의 전문가들이 함께 합니다" textAlign="center" />
        <InView viewOptions={{ once: true, amount: 0.1 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <Team members={mappedTeamMembers} />
        </InView>
      </div>
    </section>
  );  
}   