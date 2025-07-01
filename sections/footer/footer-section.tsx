import React from 'react';
import { FooterWithGrid, LinkSection } from '@/components/footer';
import { Logo } from '@/components/logo';

const footerLinkSections: LinkSection[] = [
  {
    title: "해광안내",
    links: [
      { title: "해광 소개", href: "/about" },
      { title: "구성원 소개", href: "/lawyers" },
      { title: "오시는 길", href: "/contact" },
    ],
  },
  {
    title: "업무분야",
    links: [
      { title: "업무 분야", href: "/areas" },
      { title: "업무사례", href: "/success" },
    ],
  },
  {
    title: "소식",
    links: [
      { title: "언론 보도", href: "/media" },
    ],
  },
  {
    title: "기타",
    links: [
      { title: "검색", href: "/search" },
      { title: "문의하기", href: "/contact" },
    ],
  },
];



const footerCopyrightNotices: string[] = [
  "*광고책임변호사* 이완희  *사업자등록번호* 753-81-01984  *주소* 서울특별시 서초구 서초대로320, 6,7,9층 (케이타워서초)  *대표번호* 02-535-0090",
  "",
  "© 2025 법무법인(유한) 해광 All Rights Reserved.",
];

export default function FooterSection() {
  return (
    <FooterWithGrid 
      logo={<Logo width={200} height={60} className=" mb-4 md:mb-6" />}
      linkSections={footerLinkSections}
      copyrightNotices={footerCopyrightNotices}
    />
  );
} 