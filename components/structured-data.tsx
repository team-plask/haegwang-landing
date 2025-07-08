import Script from 'next/script'

interface StructuredDataProps {
  type?: 'organization' | 'website' | 'lawyer' | 'article'
  data?: Record<string, unknown>
}

export function StructuredData({ type = 'organization', data = {} }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseData = {
      organization: {
        "@context": "https://schema.org",
        "@type": "LegalService",
        "name": "법무법인(유한) 해광",
        "alternateName": "해광 법무법인",
        "url": "https://lawlsc.co.kr",
        "logo": "https://gjfljnsvnrortuzjykdi.supabase.co/storage/v1/object/public/lawyers/media_thumnails/default.png",
        //"description": "신뢰할 수 있는 법률 서비스, 법무법인(유한) 해광입니다. 기업법무, 민사소송, 형사변호, 가정법무 등 다양한 법률 서비스를 제공합니다.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "서울특별시 서초구 서초대로320, 6층, 7층, 9층 (서초동, 케이타워서초)",
          "addressLocality": "서울",
          "addressRegion": "서초구",
          "addressCountry": "KR"
        },
        "telephone": "02-535-0090",
        "faxNumber": "02-535-0091",
        "email": "info@lawlsc.co.kr",
        "foundingDate": "2010",
        "areaServed": "KR",
        "serviceType": [
          "기업법무",
          "민사소송",
          "형사변호",
          "가정법무",
          "부동산법무",
          "노동법무",
          "지적재산권"
        ],
        "priceRange": "$$",
        "openingHours": "Mo-Fr 09:00-18:00",
        "sameAs": [
          "https://lawlsc.co.kr"
        ]
      },
      website: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "법무법인(유한) 해광",
        "url": "https://lawlsc.co.kr",
        //"description": "신뢰할 수 있는 법률 서비스를 제공하는 법무법인 해광의 공식 웹사이트입니다.",
        "inLanguage": "ko-KR",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://lawlsc.co.kr/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      lawyer: {
        "@context": "https://schema.org",
        "@type": "Person",
        "jobTitle": "변호사",
        "worksFor": {
          "@type": "LegalService",
          "name": "법무법인(유한) 해광"
        },
        ...data
      },
      article: {
        "@context": "https://schema.org",
        "@type": "Article",
        "publisher": {
          "@type": "LegalService",
          "name": "법무법인(유한) 해광",
          "logo": "https://gjfljnsvnrortuzjykdi.supabase.co/storage/v1/object/public/lawyers/media_thumnails/default.png"
        },
        ...data
      }
    }

    return baseData[type]
  }

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData())
      }}
    />
  )
} 