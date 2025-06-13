"use client";
import { createContext, useContext, useState, useEffect, Suspense, useRef } from "react";
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
  const lastNavigationRef = useRef<string>("");
  const navigationStartTimeRef = useRef<number>(0);
  const loadingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const minimumLoadingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  // 페이지 변경 감지 및 스마트 로딩 제어
  useEffect(() => {
    const currentPath = pathname + searchParams.toString();
    
    // 초기 로드는 건너뛰기
    if (isInitialLoad) {
      setIsInitialLoad(false);
      lastNavigationRef.current = currentPath;
      return;
    }

    // 같은 페이지면 건너뛰기
    if (lastNavigationRef.current === currentPath) {
      return;
    }

    // 네비게이션 시작 시간 기록
    navigationStartTimeRef.current = Date.now();
    lastNavigationRef.current = currentPath;

    // 짧은 지연 후 로딩 시작 (빠른 네비게이션 감지용)
    const loadingStartTimer = setTimeout(() => {
      // 네비게이션이 이미 완료되었는지 확인
      const navigationTime = Date.now() - navigationStartTimeRef.current;
      
      // 네비게이션이 150ms 이내에 완료되면 로딩 화면 건너뛰기
      if (navigationTime < 150) {
        console.log('Fast navigation detected, skipping loading screen');
        return;
      }

      setIsLoading(true);
      
      // 최소 로딩 시간 보장 (깜빡임 방지)
      minimumLoadingTimerRef.current = setTimeout(() => {
        setIsLoading(false);
      }, 200); // 최소 200ms 로딩 표시

      // 최대 로딩 시간 제한
      loadingTimerRef.current = setTimeout(() => {
        setIsLoading(false);
      }, 300); // 최대 300ms
      
    }, 100); // 100ms 후 로딩 여부 결정

    return () => {
      clearTimeout(loadingStartTimer);
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
      }
      if (minimumLoadingTimerRef.current) {
        clearTimeout(minimumLoadingTimerRef.current);
      }
    };
  }, [pathname, searchParams, isInitialLoad]);

  // 최대 대기 시간 안전장치
  useEffect(() => {
    if (isLoading) {
      const maxWaitTimer = setTimeout(() => {
        console.log('PageLoading: Maximum wait time exceeded, forcing completion');
        setIsLoading(false);
      }, 1000); // 1초 최대 대기

      return () => clearTimeout(maxWaitTimer);
    }
  }, [isLoading]);

  // 컴포넌트 언마운트 시 모든 타이머 정리
  useEffect(() => {
    return () => {
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
      }
      if (minimumLoadingTimerRef.current) {
        clearTimeout(minimumLoadingTimerRef.current);
      }
    };
  }, []);

  return (
    <PageLoadingContext.Provider value={{ isLoading, setLoading }}>
      <BrandLoading 
        message="페이지를 불러오는 중..." 
        isVisible={isLoading}
        onTimeout={() => setIsLoading(false)}
        maxWaitTime={800}
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