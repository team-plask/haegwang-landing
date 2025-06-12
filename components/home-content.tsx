"use client";
import { useState, useEffect } from "react";
import { HeroSection } from "@/sections/hero-section";
import { PracticeSection, PracticeAreas } from "@/sections/practice-section";
import { TeamSection, TeamMembers } from "@/sections/team-section";
import { MediaSection, MediaProps } from "@/sections/media-section";
import ContactSection from "@/sections/contact-section";
import { BrandLoading } from "@/components/ui/brand-loading";
import { usePageLoading } from "@/components/page-loading-provider";

interface HomeContentProps {
  practiceAreas: PracticeAreas;
  teamMembers: TeamMembers;
  media: MediaProps | undefined;
}

export function HomeContent({ 
  practiceAreas, 
  teamMembers, 
  media 
}: HomeContentProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const { setLoading } = usePageLoading();

  // 홈페이지에서는 전역 로딩을 즉시 끄고 비디오 로딩만 처리
  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  return (
    <>
      {/* 홈페이지 전용 비디오 로딩 */}
      <BrandLoading 
        message="페이지를 불러오는 중..." 
        isVisible={!isVideoLoaded}
        onTimeout={handleVideoLoaded}
        maxWaitTime={4000}
      />
      
      <div className={`transition-opacity duration-500 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <HeroSection onVideoLoaded={handleVideoLoaded} />
        {practiceAreas && practiceAreas.length > 0 && (
          <PracticeSection practiceAreas={practiceAreas} />
        )}
        {teamMembers && teamMembers.length > 0 && (
          <TeamSection teamMembers={teamMembers} />
        )}
        {media && media.length > 0 && (
          <MediaSection media={media as MediaProps} />
        )}
        <ContactSection />
      </div>
    </>
  );
} 