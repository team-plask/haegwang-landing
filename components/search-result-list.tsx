'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { UserIcon, DocumentTextIcon, NewspaperIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import { 
  SearchItem, 
  LawyerSearchResult, 
  CaseSearchResult, 
  MediaSearchResult, 
  PracticeAreaSearchResult 
} from '@/types/search';

interface SearchResultListProps {
  results: SearchItem[];
  query: string;
}

function LawyerCard({ lawyer, query }: { lawyer: LawyerSearchResult; query: string }) {
  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
    >
      <Link href={`/lawyers/${lawyer.slug || lawyer.id}`} prefetch={true} className="block">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            {lawyer.profile_picture_url ? (
              <Image
                src={lawyer.profile_picture_url}
                alt={lawyer.name}
                width={60}
                height={60}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-15 h-15 bg-gray-200 rounded-full flex items-center justify-center">
                <UserIcon className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 
              className="text-lg font-semibold text-gray-900 mb-1"
              dangerouslySetInnerHTML={{ __html: highlightText(lawyer.name, query) }}
            />
            {lawyer.lawyer_type && (
              <p className="text-sm text-brand font-medium mb-2">{lawyer.lawyer_type}</p>
            )}
            {lawyer.introduction && (
              <p 
                className="text-gray-600 text-sm line-clamp-2"
                dangerouslySetInnerHTML={{ __html: highlightText(lawyer.introduction, query) }}
              />
            )}
            {lawyer.practice_areas && lawyer.practice_areas.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {lawyer.practice_areas.map((area, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                  >
                    {area}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function CaseCard({ caseItem, query }: { caseItem: CaseSearchResult; query: string }) {
  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
  };

  const getContentText = (content: unknown) => {
    if (typeof content === 'string') return content;
    if (content && typeof content === 'object') {
      return JSON.stringify(content).slice(0, 200) + '...';
    }
    return '';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
    >
      <Link href={`/success/${caseItem.slug}`} prefetch={true} className="block">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            {caseItem.thumbnail_url ? (
              <Image
                src={caseItem.thumbnail_url}
                alt={caseItem.title}
                width={80}
                height={60}
                className="rounded object-cover"
              />
            ) : (
              <div className="w-20 h-15 bg-gray-200 rounded flex items-center justify-center">
                <DocumentTextIcon className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-2">
                승소사례
              </span>
              {caseItem.practice_area && (
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                  {caseItem.practice_area}
                </span>
              )}
            </div>
            <h3 
              className="text-lg font-semibold text-gray-900 mb-2"
              dangerouslySetInnerHTML={{ __html: highlightText(caseItem.title, query) }}
            />
            <p 
              className="text-gray-600 text-sm line-clamp-2"
              dangerouslySetInnerHTML={{ __html: highlightText(getContentText(caseItem.content_payload), query) }}
            />
            {caseItem.authors && caseItem.authors.length > 0 && (
              <div className="mt-3">
                <p className="text-xs text-gray-500">담당 변호사: {caseItem.authors.join(', ')}</p>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function MediaCard({ media, query }: { media: MediaSearchResult; query: string }) {
  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
  };

  const getContentText = (content: unknown) => {
    if (typeof content === 'string') return content;
    if (content && typeof content === 'object') {
      return JSON.stringify(content).slice(0, 200) + '...';
    }
    return '';
  };

  const href = media.external_link || '#';
  const isExternalLink = !!media.external_link;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
    >
      <Link 
        href={href} 
        className="block" 
        target={isExternalLink ? '_blank' : undefined}
        rel={isExternalLink ? 'noopener noreferrer' : undefined}
      >
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            {media.thumbnail_url ? (
              <Image
                src={media.thumbnail_url}
                alt={media.title}
                width={80}
                height={60}
                className="rounded object-cover"
              />
            ) : (
              <div className="w-20 h-15 bg-gray-200 rounded flex items-center justify-center">
                <NewspaperIcon className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">
                언론보도
              </span>
              {media.practice_area && (
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                  {media.practice_area}
                </span>
              )}
            </div>
            <h3 
              className="text-lg font-semibold text-gray-900 mb-2"
              dangerouslySetInnerHTML={{ __html: highlightText(media.title, query) }}
            />
            <p 
              className="text-gray-600 text-sm line-clamp-2"
              dangerouslySetInnerHTML={{ __html: highlightText(getContentText(media.content_payload), query) }}
            />
            {media.authors && media.authors.length > 0 && (
              <div className="mt-3">
                <p className="text-xs text-gray-500">관련 변호사: {media.authors.join(', ')}</p>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function PracticeAreaCard({ area, query }: { area: PracticeAreaSearchResult; query: string }) {
  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
    >
      <Link href={`/areas?area=${area.slug}`} prefetch={true} className="block">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            {area.image_url ? (
              <Image
                src={area.image_url}
                alt={area.area_name}
                width={80}
                height={60}
                className="rounded object-cover"
              />
            ) : (
              <div className="w-20 h-15 bg-gray-200 rounded flex items-center justify-center">
                <BuildingOfficeIcon className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="mb-2">
              <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                업무분야
              </span>
            </div>
            <h3 
              className="text-lg font-semibold text-gray-900 mb-2"
              dangerouslySetInnerHTML={{ __html: highlightText(area.area_name, query) }}
            />
            {area.introduction && (
              <p 
                className="text-gray-600 text-sm line-clamp-2"
                dangerouslySetInnerHTML={{ __html: highlightText(area.introduction, query) }}
              />
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function SearchResultList({ results, query }: SearchResultListProps) {
  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto max-w-md">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.08-2.33"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">검색 결과가 없습니다</h3>
          <p className="mt-1 text-sm text-gray-500">
            다른 검색어로 다시 시도해보세요.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {results.map((result) => {
        switch (result.type) {
          case 'lawyer':
            return <LawyerCard key={result.id} lawyer={result} query={query} />;
          case 'case':
            return <CaseCard key={result.id} caseItem={result} query={query} />;
          case 'media':
            return <MediaCard key={result.id} media={result} query={query} />;
          case 'practiceArea':
            return <PracticeAreaCard key={result.id} area={result} query={query} />;
          default:
            return null;
        }
      })}
    </div>
  );
} 