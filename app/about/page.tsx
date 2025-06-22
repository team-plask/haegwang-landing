import AboutHero from "@/sections/about/about-hero-section";
import ValuesSection from "@/sections/about/value-section";
import PeopleSection from "@/sections/about/people-section";
import type { Metadata } from 'next';

// ISR 설정: 1시간마다 페이지 재생성 (자주 변하지 않는 페이지)
export const revalidate = 3600; // 1시간 = 3600초

export const metadata: Metadata = {
  title: '해광 소개 - 법무법인 해광',
  description: '법무법인 해광의 설립 배경, 연혁, 핵심 가치, 그리고 구성원들을 소개합니다. 저희는 고객 중심의 법률 서비스를 제공합니다.',
};

export default function AboutPage() {
  return (
    <>
    <AboutHero />
    <ValuesSection />
    <PeopleSection />
    </>
  );
}