"use client";
import { createContext, useContext, useState, useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { BrandLoading } from "@/components/ui/brand-loading";

interface PageLoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

const PageLoadingContext = createContext<PageLoadingContextType | undefined>(undefined);

export function usePageLoading() {
  const context = useContext(PageLoadingContext);
  if (context === undefined) {
    throw new Error('usePageLoading must be used within a PageLoadingProvider');
  }
  return context;
}

interface PageLoadingProviderProps {
  children: React.ReactNode;
}

function PageLoadingProviderInner({ children }: PageLoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  // 페이지 변경 감지
  useEffect(() => {
    // 초기 로드는 건너뛰기
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }

    // 페이지 변경 시 로딩 시작
    setIsLoading(true);
    
    // 페이지 로딩 완료 시뮬레이션 (실제로는 컴포넌트가 완전히 렌더링된 후 호출)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // 0.8초 후 자동 종료

    return () => clearTimeout(timer);
  }, [pathname, searchParams, isInitialLoad]);

  // 최대 대기 시간 안전장치
  useEffect(() => {
    if (isLoading) {
      const maxWaitTimer = setTimeout(() => {
        console.log('PageLoading: Maximum wait time exceeded, forcing completion');
        setIsLoading(false);
      }, 3000);

      return () => clearTimeout(maxWaitTimer);
    }
  }, [isLoading]);

  return (
    <PageLoadingContext.Provider value={{ isLoading, setLoading }}>
      <BrandLoading 
        message="페이지를 불러오는 중..." 
        isVisible={isLoading}
        onTimeout={() => setIsLoading(false)}
        maxWaitTime={2500}
      />
      {children}
    </PageLoadingContext.Provider>
  );
}

export function PageLoadingProvider({ children }: PageLoadingProviderProps) {
  return (
    <Suspense fallback={<BrandLoading message="페이지를 불러오는 중..." isVisible={true} />}>
      <PageLoadingProviderInner>
        {children}
      </PageLoadingProviderInner>
    </Suspense>
  );
} 