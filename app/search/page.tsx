import { Suspense } from 'react';
import { SearchSection } from '@/sections/search-section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '검색 - 법무법인 해광',
  //description: '법무법인 해광의 변호사, 업무 분야, 성공 사례, 언론 보도 등 모든 콘텐츠를 검색하실 수 있습니다.',
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchSection />
    </Suspense>
  );
} 