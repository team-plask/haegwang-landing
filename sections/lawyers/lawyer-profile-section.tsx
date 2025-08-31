"use client";

import { Database } from "@/database.types";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { LawyerPDFDownload } from "@/components/lawyer-pdf-download";

export type LawyerProfileFromDB = Pick<
  Database["public"]["Tables"]["lawyers"]["Row"],
  "id" | "name" | "lawyer_type" | "profile_original_url" | "slug" | "phone_number" | "fax_number" | "email" | "introduction"
> & {
  practice_areas: Pick<Database["public"]["Tables"]["practice_areas"]["Row"], "area_name" | "slug">[];
};

interface LawyerProfileSectionProps {
  lawyer: LawyerProfileFromDB;
  lawyerSpecs?: {
    education: any;
    experience: any;
    awards_publications: any;
  };
  successStories?: Array<{
    id: string;
    title: string;
    practice_area?: {
      id: string;
      area_name: string;
      slug: string;
    } | null;
  }>;
}

export const LawyerProfileSection = ({ lawyer, lawyerSpecs, successStories }: LawyerProfileSectionProps) => {
  const { name, lawyer_type, profile_original_url, phone_number, fax_number, email, practice_areas, introduction } = lawyer;

  // PDF용 데이터 준비
  const pdfLawyerData = lawyerSpecs ? {
    ...lawyer,
    ...lawyerSpecs,
    cases: successStories || [],
  } : lawyer;

  return (
    <section className="w-full bg-brand text-white relative overflow-hidden">
      <div className="container mx-auto max-w-7xl md:h-[500px] pt-30 md:pt-0 md:mt-20 px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center h-full">
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
                  <Link key={area.slug} href={`/areas?slug=${area.slug}`}>
                    <Badge
                      variant="secondary"
                      className="bg-white/20 hover:bg-white/50 text-white px-3 py-1 text-sm cursor-pointer transition-all duration-200 hover:scale-105"
                    >
                      #{area.area_name}
                    </Badge>
                  </Link>
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

            {/* PDF 다운로드 버튼 추가 */}
            {lawyerSpecs && (
              <div className="pt-4">
                <LawyerPDFDownload lawyer={pdfLawyerData} />
              </div>
            )}
          </div>

          <div className="relative w-full flex justify-center md:justify-end items-end h-full max-h-[450px] md:max-h-[500px]">
            {profile_original_url ? (
              <div className="relative max-w-xs md:max-w-none h-full flex items-end">
                <Image
                  src={profile_original_url}
                  alt={name ?? "Lawyer profile picture"}
                  width={350}
                  height={480}
                  className="object-cover object-top rounded-lg max-h-[400px] md:max-h-[480px]"
                  priority
                />
              </div>
            ) : (
              <div className="w-[280px] h-[400px] md:w-[350px] md:h-[480px] rounded-lg bg-white/10 flex items-center justify-center">
                <span className="text-white/50 text-lg">No Image</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};