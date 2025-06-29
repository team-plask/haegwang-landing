"use client";

import { useState, useEffect, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { IconComponent } from "@/components/icon-component";
import { cn } from "@/lib/utils";

// Add custom scrollbar styles
const scrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    height: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
  .dark .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #4b5563;
  }
  .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #6b7280;
  }
`;

export interface TabDefinition {
  id: string;
  title: string;
  iconName: string | null;
}

interface ReusableTabsProps {
  tabs: TabDefinition[];
  components: Record<string, React.ReactNode>;
  queryParamName?: string;
  defaultTabId?: string;
  layout?: 'scroll' | 'grid'; // Add layout option
}

export function ReusableTabs({
  tabs,
  components,
  queryParamName = "tab", // Default query parameter name
  defaultTabId,
  layout = 'grid', // Default to grid layout
}: ReusableTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const getActiveTabId = () => {
    const currentQueryTab = searchParams.get(queryParamName);
    if (currentQueryTab && tabs.find(t => t.id === currentQueryTab)) {
      return currentQueryTab;
    }
    if (defaultTabId && tabs.find(t => t.id === defaultTabId)) {
      return defaultTabId;
    }
    return tabs.length > 0 ? tabs[0].id : undefined;
  };

  const [activeTabId, setActiveTabId] = useState<string | undefined>(getActiveTabId);

  useEffect(() => {
    // Update activeTabId if searchParams change (e.g., browser back/forward)
    const currentQueryTab = searchParams.get(queryParamName);
    if (currentQueryTab && tabs.find(t => t.id === currentQueryTab)) {
      if (activeTabId !== currentQueryTab) {
        setActiveTabId(currentQueryTab);
      }
    } else {
      // If query param is not set or invalid, try default or first tab
      const newFallbackId = (defaultTabId && tabs.find(t => t.id === defaultTabId)) ? defaultTabId : (tabs.length > 0 ? tabs[0].id : undefined);
      if (activeTabId !== newFallbackId) {
        setActiveTabId(newFallbackId);
        // Optionally, update URL if it was invalid/missing to reflect the actual active tab
        // const newUrl = new URL(window.location.href);
        // if (newFallbackId) newUrl.searchParams.set(queryParamName, newFallbackId);
        // else newUrl.searchParams.delete(queryParamName);
        // router.replace(newUrl.pathname + newUrl.search, { scroll: false });
      }
    }
  }, [searchParams, queryParamName, tabs, defaultTabId, activeTabId]);

  const handleTabChange = (newTabId: string) => {
    setActiveTabId(newTabId); // Optimistic update for immediate UI feedback
    startTransition(() => {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set(queryParamName, newTabId);
      router.push(newUrl.pathname + newUrl.search, { scroll: false });
    });
  };

  const handleTabPrefetch = (tabId: string) => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set(queryParamName, tabId);
    router.prefetch(newUrl.pathname + newUrl.search);
  };

  if (!tabs || tabs.length === 0) {
    return <div className="p-4 text-center">탭을 설정해주세요.</div>;
  }

  const ActiveComponent = activeTabId ? components[activeTabId] : null;

  return (
    <div className="w-full">
      <style jsx>{scrollbarStyles}</style>
      <div className="bg-gradient-to-b from-gray-50 to-gray-100/50 dark:from-neutral-900/30 dark:to-neutral-900/10 border-b border-gray-200 dark:border-neutral-800">
        <div className={cn(
          layout === 'scroll' 
            ? 'w-full overflow-x-auto relative custom-scrollbar pb-2' 
            : 'container max-w-7xl mx-auto'
        )}>
          <RadioGroup
            value={activeTabId}
            onValueChange={handleTabChange}
            className={
              layout === 'scroll' 
                ? "flex flex-nowrap gap-4 py-8 px-4 min-w-max snap-x snap-mandatory" // Scroll layout with snap
                : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 py-8 px-4" // Grid layout
            }
          >
            {tabs.map((tab) => (
              <RadioGroupItem
                key={tab.id}
                value={tab.id}
                title={tab.title}
                icon={
                  <IconComponent 
                    name={tab.iconName} 
                    className="size-6 transition-colors duration-200 
                               text-gray-500 dark:text-gray-400
                               group-hover:text-brand/70 
                               group-data-[state=checked]:text-brand" 
                  />
                }
                className={cn(
                  "group rounded-2xl border-2",
                  "bg-white dark:bg-neutral-800/50",
                  "hover:border-brand/30 hover:bg-brand/5 dark:hover:bg-brand/5",
                  "data-[state=checked]:border-brand",
                  "data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-brand/10 data-[state=checked]:to-brand/5",
                  "dark:data-[state=checked]:from-brand/20 dark:data-[state=checked]:to-brand/10",
                  "data-[state=checked]:shadow-lg data-[state=checked]:shadow-brand/20",
                  "transition-all duration-300 ease-out",
                  layout === 'scroll' ? "min-w-[150px] snap-center" : "w-full"
                )}
                onMouseEnter={() => handleTabPrefetch(tab.id)}
              />
            ))}
          </RadioGroup>
          {/* Scroll indicator for scroll layout */}
          {layout === 'scroll' && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none md:hidden">
              <svg 
                className="w-6 h-6 text-gray-400 animate-pulse"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </div>
          )}
        </div>
      </div>

      <div className="min-h-[400px]">
        {ActiveComponent ? (
          <div className="animate-in fade-in duration-300">{ActiveComponent}</div>
        ) : (
          <div className="flex items-center justify-center h-[400px] text-gray-500">
            컨텐츠를 선택해주세요.
          </div>
        )}
      </div>
    </div>
  );
} 