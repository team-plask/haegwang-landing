import { Database, Json } from "@/database.types";
import VerticalTabs from "@/components/vertical-tab";
import React from "react";
import { SectionHeading } from "@/components/section-heading";
export type LawyerSpecFromDB = Pick<
  Database["public"]["Tables"]["lawyers"]["Row"],
  "education" | "experience" | "awards_publications"
>;

export type LawyerSpecs = LawyerSpecFromDB[];

// Define interfaces for the specific JSON structures
interface EducationEntry {
  major?: string | null;
  degree: string;
  school?: string | null;
  graduation_year: string;
}

interface ExperienceEntry {
  end_date: string;
  position: string;
  start_date: string;
  organization: string;
}

interface AwardPublicationEntry {
  type: "award" | "book" | "article"; // Assuming 'article' could be a type
  year: string;
  title: string;
  issuer_or_publisher: string;
}

// Helper functions to format the data
const formatEducation = (data: Json | undefined | null): React.ReactNode => {
  if (!data || !Array.isArray(data)) return <p className="text-muted-foreground px-4 py-3 text-xs">학력 정보 없음</p>;
  const entries = data as unknown as EducationEntry[];
  return (
    <ul className="list-disc space-y-2 pr-4 text-sm md:text-lg text-muted-foreground">
      {entries.map((entry, index) => (
        <li key={index}>
          {entry.school || "학교 정보 없음"}{entry.major ? ` ${entry.major}` : ""} - {entry.degree} ({entry.graduation_year})
        </li>
      ))}
    </ul>
  );
};

const formatExperience = (data: Json | undefined | null): React.ReactNode => {
  if (!data || !Array.isArray(data)) return <p className="text-muted-foreground px-4 py-3 text-xs">경력 정보 없음</p>;
  const entries = data as unknown as ExperienceEntry[];
  return (
    <ul className="list-disc space-y-2 pr-4 text-sm md:text-lg text-muted-foreground">
      {entries.map((entry, index) => (
        <li key={index}>
          {entry.organization}: {entry.position} ({entry.start_date} ~ {entry.end_date})
        </li>
      ))}
    </ul>
  );
};

const formatAwardsPublications = (data: Json | undefined | null): React.ReactNode => {
  if (!data || !Array.isArray(data)) return <p className="text-muted-foreground px-4 py-3 text-xs">수상/저서 정보 없음</p>;
  const entries = data as unknown as AwardPublicationEntry[];
  return (
    <ul className="list-disc space-y-2 pr-4 text-sm md:text-lg text-muted-foreground">
      {entries.map((entry, index) => (
        <li key={index}>
          <strong>{entry.type === "award" ? "수상" : entry.type === "book" ? "저서" : "논문/활동"}:</strong> {entry.title} ({entry.issuer_or_publisher}, {entry.year})
        </li>
      ))}
    </ul>
  );
};

export function LawyerSpecSection({ lawyerSpecs }: { lawyerSpecs: LawyerSpecs }) {
  const spec = lawyerSpecs[0];

  const tabs = [
    { value: "education", label: "학력" },
    { value: "experience", label: "주요경력" },
    { value: "awards_publications", label: "논문/저서" },
  ];

  const contents: Record<string, React.ReactNode> = {
    education: formatEducation(spec?.education),
    experience: formatExperience(spec?.experience),
    awards_publications: formatAwardsPublications(spec?.awards_publications),
  };

  return (
    <section className="w-full mx-auto py-6 md:py-12">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading title="주요이력" subtitle="Experience" />   
        <VerticalTabs tabs={tabs} contents={contents} defaultValue="education" />
      </div>
    </section>
  );
}
