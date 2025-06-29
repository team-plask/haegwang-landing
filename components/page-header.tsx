import React from 'react';
import { Background } from '@/components/grid-background';
interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
}) => {

  return (
    <section className="bg-brand relative w-full py-14 sm:py-18 lg:py-28 mt-20">
      <div className="absolute inset-0 z-0">
        <Background />
      </div>
      <div className="relative z-10 items-center justify-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
