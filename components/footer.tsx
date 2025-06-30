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
  logo: React.ReactNode;
  linkSections: LinkSection[];
  copyrightNotices: string[];
  addressBlocks: AddressBlock[];
}

export function FooterWithGrid({
  logo,
  linkSections: _linkSections, // eslint-disable-line @typescript-eslint/no-unused-vars
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

        {logo}

        {/* 대표변호사 정보를 로고 바로 아래에 배치 */}
        {copyrightNotices && copyrightNotices[0] && (
          <div className="mb-4">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              <span dangerouslySetInnerHTML={{ 
                __html: copyrightNotices[0]
                  .replace(/\*(.*?)\*/g, "<strong>$1</strong>")
                  .replace(/\s{2,}/g, '<span class="mx-4"></span>') 
              }} />
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 pt-4 pb-6 text-xs/5 text-neutral-500 dark:text-neutral-400 space-y-2 md:space-y-0">
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

        {/* Copyright는 맨 아래에 별도로 배치 */}
        {copyrightNotices && copyrightNotices[2] && (
          <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {copyrightNotices[2].includes("{year}") ? copyrightNotices[2].replace("{year}", new Date().getFullYear().toString()) : copyrightNotices[2]}
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 