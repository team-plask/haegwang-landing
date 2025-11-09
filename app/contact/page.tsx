import ContactSection from "@/sections/contact/contact-section";
import PageHeader from "@/components/page-header";
import { ReusableTabs, TabDefinition } from "@/components/reusable-tabs";
import { Suspense } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '오시는 길 - 법무법인 해광',
  //description: '법무법인 해광의 서울, 대구, 부산 사무소 위치와 연락처를 안내합니다. 각 사무소의 상세 위치와 대중교통 이용 방법을 확인하세요.',
};

const officesData = [
  {
    title: "서울 주사무소",
    subtitle: "서울 주사무소 주소와 연락처를 안내해드립니다.",
    address: "서울특별시 서초구 서초대로320\n6층, 7층, 9층 (서초동, 케이타워서초)",
    subwayInfo: {
      lines: [
        { line: "2호선", color: "text-green-800", bgColor: "bg-green-100" },
        { line: "3호선", color: "text-orange-800", bgColor: "bg-orange-100" }
      ],
      description: "교대역 1번 출구에서 100m 직진"
    },
    phone: "02-535-0090 (6층)\n02-3487-0991 (7층)\n02-525-2292 (9층)",
    fax: "02-535-0091 (6층)\n02-3487-0997 (7층)\n02-525-2293 (9층)",
    parking: "다이소, 하나은행 건물 지하 주차장",
    mapCenter: { lat: 37.4942200198785, lng: 127.01657607757 }
  },
  {
    title: "대구 분사무소",
    subtitle: "대구 분사무소 주소와 연락처를 안내해드립니다.",
    address: "대구광역시 동대구로 348-13\n602호, 702호 (범어동, 청담빌딩)",
    subwayInfo: {
      lines: [
        { line: "2호선", color: "text-green-800", bgColor: "bg-green-100" }
      ],
      description: "범어역 10번 출구에서 300m"
    },
    phone: "053-751-8338",
    fax: "053-751-8339",
    parking: "건물 지하 주차장",
    mapCenter: { lat: 35.8616365285967, lng: 128.628627402457 }
  },
  {
    title: "부산 분사무소",
    subtitle: "부산 분사무소 주소와 연락처를 안내해드립니다.",
    address: "부산광역시 연제구 법원로 34\n1303호, 1304호 (거제동, 정림빌딩)",
    subwayInfo: {
      lines: [
        { line: "3호선", color: "text-orange-800", bgColor: "bg-orange-100" },
        { line: "동해선", color: "text-blue-800", bgColor: "bg-blue-100" }
      ],
      description: "거제역(법원, 검찰청) 10번 출구에서 300m"
    },
    phone: "051-714-2103",
    fax: "051-714-2104",
    parking: "건물 후면 주차장",
    mapCenter: { lat: 35.1918406080859, lng: 129.074690763385 }
  },
  {
    title: "청주 분사무소",
    subtitle: "청주 분사무소 주소와 연락처를 안내해드립니다.",
    address: "충청북도 청주시 서원구 구룡산로 366\n3층 (수곡동, 세명빌딩)",
    phone: "043-288-3441",
    fax: "043-288-3446",
    parking: "건물 후면 주차장",
    mapCenter: { lat: 36.6181394772341, lng: 127.485042328829 }
  }
];

const tabs: TabDefinition[] = [
  { id: "seoul", title: "서울", iconName: "Building" },
  { id: "daegu", title: "대구", iconName: "MapPin" },
  { id: "busan", title: "부산", iconName: "Anchor" },
  { id: "chuncheon", title: "청주", iconName: "Building" }
];

const tabComponents = {
  seoul: <ContactSection officeInfo={officesData[0]} />,
  daegu: <ContactSection officeInfo={officesData[1]} />,
  busan: <ContactSection officeInfo={officesData[2]} />,
  chuncheon: <ContactSection officeInfo={officesData[3]} />
};

export default function ContactPage() {
  return (
    <div>
      <PageHeader
        title="오시는 길"
        subtitle="법무법인(유한) 해광의 주소를 확인하고 연락주세요."
      />
      <Suspense fallback={<div className="flex justify-center py-12"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand"></div></div>}>
        <ReusableTabs
          tabs={tabs}
          components={tabComponents}
          queryParamName="office"
          defaultTabId="seoul"
          layout="grid"
        />
      </Suspense>
    </div>
  );
}