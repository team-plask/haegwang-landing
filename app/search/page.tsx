import { Suspense } from 'react';
import { SearchSection } from '@/sections/search-section';

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchSection />
    </Suspense>
  );
} 