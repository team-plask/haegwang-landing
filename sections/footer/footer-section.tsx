import React from 'react';
import { FooterWithGrid, LinkSection, AddressBlock } from '@/components/footer';

const footerLinkSections: LinkSection[] = [
  {
    title: "해광안내",
    links: [
      { title: "인사말", href: "/about" },
      { title: "구성원", href: "/members" },
      { title: "오시는길", href: "/contact" },
    ],
  },
  {
    title: "업무분야",
    links: [
      { title: "송무", href: "/practice/litigation" },
      { title: "기업자문", href: "/practice/corporate-advisory" },
      { title: "형사", href: "/practice/criminal" },
      { title: "가사", href: "/practice/family" },
      { title: "행정", href: "/practice/administrative" },
    ],
  },
  {
    title: "소식",
    links: [
      { title: "해광소식", href: "/news" },
      { title: "판례해설", href: "/insights/case-studies" },
      { title: "법률정보", href: "/insights/legal-info" },
    ],
  },
  {
    title: "인재채용",
    links: [
      { title: "채용안내", href: "/recruit" },
      { title: "문의", href: "/contact" },
    ],
  },
];

const footerAddressBlocks: AddressBlock[] = [
  {
    lines: [
      "*ADD.* 서울특별시 서초구 서초대로320, 6층, 7층, 9층 (서초동, 케이타워서초)",
      "*TEL.* 6층 02-535-0090 / 7층 02-3487-0091 / 9층 02-525-2292",
      "*FAX.* 6층 02-535-0091 / 7층 02-3487-0097 / 9층 02-525-2293",
    ],
  },
  {
    lines: [
      "*ADD.* 대구광역시 동대구로 348-13, 602호, 702호 (범어동,청담빌딩)",
      "*TEL.* 053-751-8338", 
      "*FAX.* 053-751-8339",
    ],
  },
  {
    lines: [
      "*ADD.* 부산광역시 연제구 법원로 34, 1303호,1304호 (거제동,정림빌딩)",
      "*TEL.* 051-714-2103", 
      "*FAX.* 051-714-2104",
    ],
  },
];

const footerCopyrightNotices: string[] = [
  "© {year} 법무법인(유한) 해광 All Rights Reserved.",
  "Copyright. 2021. HAEGWANG . ALL RIGHTS RESERVED."
];

export default function FooterSection() {
  return (
    <FooterWithGrid 
      logoSrc="https://gjfljnsvnrortuzjykdi.supabase.co/storage/v1/object/public/source//logo.png"
      logoAlt="법무법인 해광 로고"
      logoWidth={160} // Adjusted for better visibility, assuming a rectangular logo
      logoHeight={40} // Adjusted for better visibility
      linkSections={footerLinkSections}
      addressBlocks={footerAddressBlocks}
      copyrightNotices={footerCopyrightNotices}
    />
  );
} 