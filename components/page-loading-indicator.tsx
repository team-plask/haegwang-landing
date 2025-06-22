'use client';

import { usePageLoading } from '@/hooks/use-page-loading';

export function PageLoadingIndicator() {
  const { isLoading } = usePageLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[9999] bg-gray-200/50">
      <div className="h-full bg-gradient-to-r from-brand via-brand-foreground to-brand 
                      animate-[shimmer_1.5s_ease-in-out_infinite] 
                      w-full origin-left"></div>
    </div>
  );
}

// Tailwind config에 추가할 애니메이션 정의 (globals.css에 추가)
// @keyframes shimmer {
//   0% { transform: translateX(-100%) scaleX(0); }
//   50% { transform: translateX(0%) scaleX(1); }
//   100% { transform: translateX(100%) scaleX(0); }
// } 