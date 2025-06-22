'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function usePageLoading() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 페이지나 검색 파라미터가 변경되면 로딩 완료 및 스크롤 리셋
    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
      setLoadingTimeout(null);
    }
    setIsLoading(false);
    
    // 페이지 이동 시 맨 위로 스크롤 (이미 맨 위에 있지 않은 경우에만)
    if (window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, searchParams, loadingTimeout]);

  const startLoading = () => {
    setIsLoading(true);
    // 5초 후에는 강제로 로딩 상태 해제 (안전장치)
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    setLoadingTimeout(timeout);
  };

  return { isLoading, startLoading };
} 