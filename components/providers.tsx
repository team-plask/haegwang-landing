"use client";
import { PageLoadingProvider } from "@/components/page-loading-provider";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <PageLoadingProvider>
      {children}
    </PageLoadingProvider>
  );
}