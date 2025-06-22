import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface LinkItem {
  title: string;
  href: string;
}

export interface LinkSection {
  title: string;
  links: LinkItem[];
}

export interface AddressBlock {
  lines: string[];
}

export interface FooterProps {
  logoSrc: string;
  logoAlt: string;
  logoWidth?: number;
  logoHeight?: number;
  linkSections: LinkSection[];
  copyrightNotices: string[];
  addressBlocks: AddressBlock[];
}

export function FooterWithGrid({
  logoSrc,
  logoAlt,
  logoWidth = 100, // Default width
  logoHeight = 50, // Default height
  linkSections,
  copyrightNotices,
  addressBlocks,
}: FooterProps) {
  return (
    <div className="bg-gray-50 dark:bg-neutral-800">
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        {/* {linkSections && linkSections.length > 0 && (
          <div className="grid grid-cols-2 gap-10 border-b border-neutral-200 pb-10 pt-10 md:grid-cols-4 dark:border-neutral-700">
            {linkSections.map((section, sectionIdx) => (
              <ul
                key={sectionIdx}
                className="text-base font-medium text-neutral-800 dark:text-neutral-200"
              >
                <li className="mb-4 text-sm font-bold text-black dark:text-white">
                  {section.title}
                </li>
                {section.links.map((item, idx) => (
                  <li key={idx} className="mb-4 text-sm font-normal">
                    <Link
                      href={item.href}
                      prefetch={true}
                      className="text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        )} */}

        <Image 
          src={logoSrc} 
          alt={logoAlt} 
          width={logoWidth} 
          height={logoHeight} 
          className="justify-start mb-4 md:mb-6 pt-10" 
        />
        {copyrightNotices && copyrightNotices.map((notice, idx) => (
          <p key={idx} className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
            {notice.includes("{year}") ? notice.replace("{year}", new Date().getFullYear().toString()) : notice}
          </p>
        ))}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 pt-4 text-xs/5 text-neutral-500 dark:text-neutral-400 space-y-2 md:space-y-0">
          {addressBlocks && addressBlocks.map((block, idx) => (
            <p key={idx}>
              {block.lines.map((line, lineIdx) => (
                <React.Fragment key={lineIdx}>
                  <span dangerouslySetInnerHTML={{ __html: line.replace(/\*(.*?)\*/g, "<strong>$1</strong>") }} />
                  <br />
                </React.Fragment>
              ))}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
} 