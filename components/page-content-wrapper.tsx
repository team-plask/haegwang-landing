"use client";
import { useEffect } from "react";
import { usePageLoading } from "@/components/page-loading-provider";

interface PageContentWrapperProps {
  children: React.ReactNode;
  isReady?: boolean; // 페이지가 준비되었는지
  autoComplete?: boolean; // 자동으로 로딩 완료 처리할지 (기본값: true)
  delay?: number; // 로딩 완료까지 딜레이 (ms)
}

export function PageContentWrapper({ 
  children, 
  isReady = true, 
  autoComplete = true,
  delay = 300 
}: PageContentWrapperProps) {
  const { setLoading } = usePageLoading();

  useEffect(() => {
    if (autoComplete && isReady) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, delay);

      return () => clearTimeout(timer);
    } else if (!autoComplete && isReady) {
      setLoading(false);
    }
  }, [isReady, autoComplete, delay, setLoading]);

  return (
    <div className="transition-opacity duration-300">
      {children}
    </div>
  );
}