import { Database } from "@/database.types";
import Team from "@/components/team";
import { SectionHeading } from "@/components/section-heading";
export type LawyerList = Pick<
  Database["public"]["Tables"]["lawyers"]["Row"],
  "id" | "name" | "lawyer_type" | "profile_picture_url" | "slug" | "order"
>;

export function LawyerSection({ lawyers }: { lawyers: LawyerList[] | null | undefined }) {
    if (!lawyers || lawyers.length === 0) {
        return null;
    }

    const mappedTeamMembers = lawyers.map((member) => ({
        name: member.name,
        role: member.lawyer_type,
        avatar: member.profile_picture_url,
        slug: member.slug || undefined,
      }));
      
    return (
        <section className="w-full mx-auto py-8 md:py-16">
          <div className="container mx-auto max-w-7xl px-4 md:px-8">
            <SectionHeading title="업무 담당 변호사" subtitle=" " />
            <Team members={mappedTeamMembers} />
          </div>
        </section>
      );
}
