import React from 'react';
import { Background } from '@/components/grid-background';
interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs: BreadcrumbItem[];
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  breadcrumbs,
}) => {

  return (
    <section className="bg-brand relative w-full py-14 sm:py-18 lg:py-28 mt-20">
      <div className="absolute inset-0 z-0">
        <Background />
      </div>
      <div className="relative z-10 items-center justify-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-4" aria-label="Breadcrumb">
            <ol role="list" className="flex items-center justify-center space-x-2 px-2">
              {breadcrumbs.map((item, index) => (
                <li key={item.name}>
                  <div className="flex">
                    {index > 0 && (
                      <svg
                        className="h-5 w-5 flex-shrink-0 text-gray-300"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                      </svg>
                    )}
                    {item.href ? (
                      <a
                        href={item.href}
                        className={`text-sm font-medium ${index > 0 ? 'ml-2 ' : ''}text-gray-200 hover:text-white`}
                      >
                        {item.name}
                      </a>
                    ) : (
                      <span className={`text-sm font-medium ${index > 0 ? 'ml-2 ' : ''}text-gray-400`}>
                        {item.name}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Title */}
        <h1 className="text-4xl text-center font-bold mx-auto tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300 sm:text-5xl lg:text-6xl">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="mt-6 max-w-3xl mx-auto text-center text-md md:text-xl text-white/50">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default PageHeader;
