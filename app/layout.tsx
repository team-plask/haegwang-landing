import { Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import HeroHeader from "@/components/header";
import FooterSection from "@/sections/footer/footer-section";
import { Suspense } from "react";
import { StaffToolbar } from "@/components/staff-toolbar";
import { Providers } from "@/components/providers";
import { PageLoadingIndicator } from "@/components/page-loading-indicator";
import Script from "next/script";

const pretendard = localFont({
  src: "../public/font/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${pretendard.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=617032173ca1f64853d20794c26e2b90&libraries=services,clusterer&autoload=false"
          strategy="beforeInteractive"
        />
        <Script
          src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=qb1hpg1q8y"
          strategy="beforeInteractive"
        />
        <Providers>
          <PageLoadingIndicator />
          <HeroHeader />
          {children}
          <FooterSection />
          <Suspense>
            <StaffToolbar />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
