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
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
