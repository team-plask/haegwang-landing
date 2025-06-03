import { Database } from "@/database.types";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export type LawyerProfileFromDB = Pick<
  Database["public"]["Tables"]["lawyers"]["Row"],
  "id" | "name" | "lawyer_type" | "profile_picture_url" | "slug" | "phone_number" | "fax_number" | "email" | "introduction"
> & {
  practice_areas: Pick<Database["public"]["Tables"]["practice_areas"]["Row"], "area_name" | "slug">[];
};

export const LawyerProfileSection = ({ lawyer }: { lawyer: LawyerProfileFromDB }) => {
  const { name, lawyer_type, profile_picture_url, phone_number, fax_number, email, practice_areas, introduction } = lawyer;

  return (
    <section className="w-full bg-brand text-white relative">
      <div className="container mx-auto max-w-7xl md:h-[500px] pt-30 md:pt-0 md:mt-20 px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold mb-2">{name}</h1>
              <p className="text-xl md:text-2xl text-gray-300">{lawyer_type}</p>
            </div>

            {introduction && (
              <p className="text-lg text-gray-200">{introduction}</p>
            )}

            {practice_areas && practice_areas.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {practice_areas.map((area) => (
                  <Badge
                    key={area.slug}
                    variant="secondary"
                    className="bg-white/20 hover:bg-blue-600 text-white px-3 py-1 text-sm"
                  >
                    #{area.area_name}
                  </Badge>
                ))}
              </div>
            )}

            <div className="space-y-3 pt-4 text-gray-300">
              {phone_number && (
                <div className="flex items-center gap-3">
                  <span className="font-semibold w-16">Tel</span>
                  <span>{phone_number}</span>
                </div>
              )}
              {email && (
                <div className="flex items-center gap-3">
                  <span className="font-semibold w-16">E-mail</span>
                  <a href={`mailto:${email}`} className="hover:text-blue-300 transition-colors">
                    {email.toLowerCase()}
                  </a>
                </div>
              )}
            </div>
          </div>

          {profile_picture_url && (
            <div className="relative w-full h-auto md:h-[500px] flex justify-center md:justify-end">
              <Image
                src={profile_picture_url}
                alt={name ?? "Lawyer profile picture"}
                width={400}
                height={600}
                className="object-cover rounded-lg max-w-xs md:max-w-none"
                priority
              />
            </div>
          )}
        </div>
        </div>
    </section>
  );
};