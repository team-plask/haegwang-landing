import React from 'react';
import { FooterWithGrid, LinkSection, AddressBlock } from '@/components/footer';

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

const footerAddressBlocks: AddressBlock[] = [
  {
    lines: [
      "*서울 사무소*",
      "서울특별시 서초구 서초대로320, 6층, 7층, 9층 (서초동, 케이타워서초)",
      "TEL. 6층 02-535-0090 / 7층 02-3487-0991 / 9층 02-525-2292",
      "FAX. 6층 02-535-0091 / 7층 02-3487-0997 / 9층 02-525-2293",
    ],
  },
  {
    lines: [
      "*대구 사무소*",
      "대구광역시 수성구 동대구로 348-13, 602호, 702호 (범어동, 청담빌딩)",
      "TEL. 053-751-8338", 
      "FAX. 053-751-8339",
    ],
  },
  {
    lines: [
      "*부산 사무소*",
      "부산광역시 연제구 법원로 34, 1303호, 1304호 (거제동, 정림빌딩)",
      "TEL. 051-714-2103", 
      "FAX. 051-714-2104",
    ],
  },
];

const footerCopyrightNotices: string[] = [
  "© {year} 법무법인(유한) 해광 All Rights Reserved.",
];

export default function FooterSection() {
  return (
    <FooterWithGrid 
      logoSrc="https://gjfljnsvnrortuzjykdi.supabase.co/storage/v1/object/public/source//logo.png"
      logoAlt="법무법인 해광 로고"
      logoWidth={160}
      logoHeight={40}
      linkSections={footerLinkSections}
      addressBlocks={footerAddressBlocks}
      copyrightNotices={footerCopyrightNotices}
    />
  );
} 