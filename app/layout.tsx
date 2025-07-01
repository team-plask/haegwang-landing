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
import type { Metadata } from "next";
import { StructuredData } from "@/components/structured-data";

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

export const metadata: Metadata = {
  metadataBase: new URL('https://lawlsc.co.kr'),
  title: {
    default: '법무법인(유한) 해광',
    template: '%s | 법무법인(유한) 해광'
  },
  description: '신뢰할 수 있는 법률 서비스, 법무법인(유한) 해광입니다. 기업법무, 민사소송, 형사변호, 가정법무 등 전문적인 법률 서비스를 제공합니다.',
  keywords: ['법무법인', '해광', '변호사', '법률상담', '소송', '기업법무', '민사소송', '형사변호', '가정법무', '법률서비스'],
  authors: [{ name: '법무법인(유한) 해광' }],
  creator: '법무법인(유한) 해광',
  publisher: '법무법인(유한) 해광',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://lawlsc.co.kr',
    title: '법무법인(유한) 해광',
    description: '신뢰할 수 있는 법률 서비스, 법무법인(유한) 해광입니다. 기업법무, 민사소송, 형사변호, 가정법무 등 전문적인 법률 서비스를 제공합니다.',
    siteName: '법무법인(유한) 해광',
    images: [
      {
        url: 'https://gjfljnsvnrortuzjykdi.supabase.co/storage/v1/object/public/lawyers/media_thumnails/default.png',
        width: 1200,
        height: 630,
        alt: '법무법인(유한) 해광',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '법무법인(유한) 해광',
    description: '신뢰할 수 있는 법률 서비스, 법무법인(유한) 해광입니다.',
    images: ['https://gjfljnsvnrortuzjykdi.supabase.co/storage/v1/object/public/lawyers/media_thumnails/default.png'],
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: {
      'naver-site-verification': process.env.NAVER_SITE_VERIFICATION || '',
    },
  },
  alternates: {
    canonical: 'https://lawlsc.co.kr',
  },
  category: 'business',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/logo/logo.ico',
  },
};

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
        <StructuredData type="organization" />
        <StructuredData type="website" />
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
