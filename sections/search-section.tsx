'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { PageHeader } from '@/components/page-header';
import { motion } from 'framer-motion';
import { SearchResultTabs } from '@/components/search-result-tabs';
import { SearchResultList } from '@/components/search-result-list';
import { Searchbar } from '@/components/searchbar';
import { SearchResults } from '@/types/search';

const tabs = [
  { key: 'all', label: '전체' },
  { key: 'lawyers', label: '구성원' },
  { key: 'cases', label: '업무 사례' },
  { key: 'media', label: '미디어' },
  { key: 'practiceAreas', label: '업무분야' }
];

export function SearchSection() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchValue, setSearchValue] = useState(query);
  const [activeTab, setActiveTab] = useState('all');
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSearchResults = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error('검색에 실패했습니다.');
      }
      const results = await response.json();
      setSearchResults(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : '검색 중 오류가 발생했습니다.');
      setSearchResults(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      fetchSearchResults(query);
    }
  }, [query]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      fetchSearchResults(searchValue);
      // URL 업데이트
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('q', searchValue);
      window.history.pushState({}, '', newUrl.toString());
    }
  };

  const getCurrentResults = () => {
    if (!searchResults) return [];
    return searchResults[activeTab as keyof SearchResults] || [];
  };

  const getResultCount = (tabKey: string) => {
    if (!searchResults) return 0;
    return searchResults[tabKey as keyof SearchResults]?.length || 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 lg:mt-16">
          <div className="flex items-center justify-center mx-auto py-6">
            <div className="flex-1 max-w-2xl mx-8">
              <Searchbar
                placeholders={["검색어를 입력하세요..."]}
                onChange={handleSearchChange}
                onSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {query && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* 검색 키워드 표시 */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                '<span className="text-brand">{query}</span>' 검색 결과
              </h1>
              {searchResults && !loading && (
                <p className="text-gray-600 mt-2">
                  총 {searchResults.all.length}개의 결과를 찾았습니다.
                </p>
              )}
            </div>

            {/* 탭 */}
            <SearchResultTabs
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              getResultCount={getResultCount}
            />

            {/* 검색 결과 */}
            <div className="mt-8">
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand"></div>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-600">{error}</p>
                </div>
              ) : (
                <SearchResultList
                  results={getCurrentResults()}
                  query={query}
                />
              )}
            </div>
          </motion.div>
        )}

        {!query && (
          <div className="text-center py-20">
            <h2 className="text-xl text-gray-600">검색어를 입력해주세요.</h2>
          </div>
        )}
      </div>
    </div>
  );
} 