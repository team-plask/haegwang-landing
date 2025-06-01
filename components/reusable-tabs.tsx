"use client";

import { useState, useEffect, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { IconComponent } from "@/components/icon-component";

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
}

export function ReusableTabs({
  tabs,
  components,
  queryParamName = "tab", // Default query parameter name
  defaultTabId,
}: ReusableTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

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

  if (!tabs || tabs.length === 0) {
    return <div className="p-4 text-center">탭을 설정해주세요.</div>;
  }

  const ActiveComponent = activeTabId ? components[activeTabId] : null;

  return (
    <div className="w-full">
      <RadioGroup
        value={activeTabId}
        onValueChange={handleTabChange}
        className="flex flex-wrap justify-center gap-2 p-4 border-b"
      >
        {tabs.map((tab) => (
          <RadioGroupItem
            key={tab.id}
            value={tab.id}
            title={tab.title}
            icon={<IconComponent name={tab.iconName} className="size-5" />}
            className="min-w-[120px] flex-col justify-between px-4 py-2 items-center data-[state=checked]:bg-primary/10 data-[state=checked]:text-primary"
            disabled={isPending}
          >
            {/* RadioGroupItem in this shadcn/ui setup does not directly take children for title. We use props. */}
          </RadioGroupItem>
        ))}
      </RadioGroup>

      <div className="mt-4">
        {ActiveComponent ? ActiveComponent : <div className="text-center">컨텐츠를 선택해주세요.</div>}
      </div>
    </div>
  );
} 