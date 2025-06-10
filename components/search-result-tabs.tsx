'use client';

import { cn } from '@/lib/utils';

type Tab = {
  key: string;
  label: string;
};

interface SearchResultTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabKey: string) => void;
  getResultCount: (tabKey: string) => number;
}

export function SearchResultTabs({ 
  tabs, 
  activeTab, 
  onTabChange, 
  getResultCount 
}: SearchResultTabsProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => {
          const count = getResultCount(tab.key);
          const isActive = activeTab === tab.key;
          
          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={cn(
                "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors",
                isActive
                  ? "border-brand text-brand"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              {tab.label}
              {count > 0 && (
                <span className={cn(
                  "ml-2 py-0.5 px-2 rounded-full text-xs",
                  isActive 
                    ? "bg-brand text-white" 
                    : "bg-gray-100 text-gray-600"
                )}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
} 