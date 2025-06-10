import ContactSection from "@/sections/contact/contact-section";
import PageHeader from "@/components/page-header";
import { ReusableTabs, TabDefinition } from "@/components/reusable-tabs";

const officesData = [
  {
    title: "서울 사무소",
    subtitle: "서울 사무소 주소와 연락처를 안내해드립니다.",
    address: "서울특별시 서초구 서초대로320\n6층, 7층, 9층 (서초동, 케이타워서초)",
    subwayInfo: {
      lines: [
        { line: "2호선", color: "text-green-800", bgColor: "bg-green-100" },
        { line: "3호선", color: "text-orange-800", bgColor: "bg-orange-100" }
      ],
      description: "교대역 1번 출구에서 100m 직진"
    },
    phone: "02-535-0090\n02-3487-0991\n02-525-2292",
    fax: "02-535-0091\n02-3487-0997\n02-525-2293",
    mapCenter: { lat: 37.4942200198785, lng: 127.01657607757 }
  },
  {
    title: "대구 사무소",
    subtitle: "대구 사무소 주소와 연락처를 안내해드립니다.",
    address: "대구광역시 동대구로 348-13\n602호, 702호 (범어동, 청담빌딩)",
    subwayInfo: {
      lines: [
        { line: "2호선", color: "text-green-800", bgColor: "bg-green-100" }
      ],
      description: "범어역 10번 출구에서 300m"
    },
    phone: "053-751-8338",
    fax: "053-751-8339",
    mapCenter: { lat: 35.8714354, lng: 128.6014445 }
  },
  {
    title: "부산 사무소",
    subtitle: "부산 사무소 주소와 연락처를 안내해드립니다.",
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
    mapCenter: { lat: 35.1587485, lng: 129.0534328 }
  }
];

const tabs: TabDefinition[] = [
  { id: "seoul", title: "서울", iconName: "Building" },
  { id: "daegu", title: "대구", iconName: "MapPin" },
  { id: "busan", title: "부산", iconName: "Anchor" }
];

const tabComponents = {
  seoul: <ContactSection officeInfo={officesData[0]} />,
  daegu: <ContactSection officeInfo={officesData[1]} />,
  busan: <ContactSection officeInfo={officesData[2]} />
};

export default function ContactPage() {
  return (
    <div>
      <PageHeader
        title="오시는 길"
        subtitle="해광의 전문 변호사들이 당신의 성공적인 문제 해결을 돕겠습니다."
        breadcrumbs={[{ name: "홈", href: "/" }, { name: "오시는 길", href: "/contact" }]}
      />
      <ReusableTabs
        tabs={tabs}
        components={tabComponents}
        queryParamName="office"
        defaultTabId="seoul"
        layout="grid"
      />
    </div>
  );
}