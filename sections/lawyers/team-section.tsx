import { Database } from "@/database.types";
import Team from "@/components/team";


export type TeamMemberFromDB = Pick<
  Database["public"]["Tables"]["lawyers"]["Row"],
  "id" | "name" | "lawyer_type" | "profile_picture_url" | "slug" | "order"
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
    <section className="w-full mx-auto py-12 md:py-32">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <Team members={mappedTeamMembers} />
      </div>
    </section>
  );
}   