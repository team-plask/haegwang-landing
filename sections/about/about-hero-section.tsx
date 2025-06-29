import Timeline, { TimelineYear } from "@/components/timeline";

const timelineData: TimelineYear[] = [
  {
    year: "2021년",
    months: [
      {
        month: "3월",
        events: [
          "법무법인 해광 설립",
          "서민석 前 서울중앙지법 부장판사 등 前 부장판사 3명을 주축으로 수사대응 및 송무 전문 로펌 설립"
        ]
      },
      {
        month: "9월",
        events: [
          "김후균 前 울산지검 차장검사를 대표변호사로 영입"
        ]
      }
    ]
  },
  {
    year: "2022년",
    months: [
      {
        month: "1월",
        events: [
          "임성근 前 부산고법 부장판사를 대표변호사로 영입"
        ]
      },
      {
        month: "3월",
        events: [
          "정연택 前 사법연수원 교수를 구성원변호사로 영입"
        ]
      },
      {
        month: "6월",
        events: [
          "유영춘 변호사를 구성원변호사로 영입",
          "법무법인(유한) 전환"
        ]
      }
    ]
  },
  {
    year: "2023년",
    months: [
      {
        month: "2월",
        events: [
          "황철규 前 부산고검장, 이완희 서울고법 판사를 대표변호사로 영입"
        ]
      },
      {
        month: "3월",
        events: [
          "김찬돈 前 대구고법원장, 구남수 前 울산지법원장을 대표변호사로 영입",
          "대구사무소 및 부산사무소 개소"
        ]
      },
      {
        month: "10월",
        events: [
          "최임열 前 청주지검 충주지청장을 대표변호사로 영입"
        ]
      }
    ]
  },
  {
    year: "2024년",
    months: [
      {
        month: "1월",
        events: [
          "송태원 변호사 구성원변호사로 영입"
        ]
      },
      {
        month: "2월",
        events: [
          "민병훈 前 서울중앙지법 부장판사를 대표변호사로 영입",
          "조동화 변호사를 구성원 변호사로 영입"
        ]
      },
      {
        month: "3월",
        events: [
          "유헌종 前 서울고법 판사를 대표변호사로 영입"
        ]
      }
    ]
  },
  {
    year: "2025년",
    months: [
      {
        month: "3월",
        events: [
          "함석천 前 대전지법 부장판사, 박영호 前 부산지법 부장판사, 김동규 前 수원고법 판사, 손철 前 수원지법 부장판사, 권순엽 前 대구지법 부장판사를 대표변호사로 영입"
        ]
      },
      {
        month: "4월",
        events: [
          "박재영 前 서울고법 판사를 대표변호사로 영입"
        ]
      },
      {
        month: "5월",
        events: [
          "김형욱 前 부산지검 부부장검사를 대표변호사로 영입"
        ]
      }
    ]
  }
];

export default function AboutHero() {
  return (
    <div>
    <div className="relative isolate -z-10 overflow-hidden bg-linear-to-b from-indigo-100/20 pt-14">
      <div
        aria-hidden="true"
  className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl ring-1 shadow-indigo-600/10 ring-indigo-50 sm:-mr-80 lg:-mr-96"
/>
<div className="mx-auto max-w-7xl py-32 sm:py-40 px-4 md:px-0">
  <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
    {/* <h1 class="max-w-2xl text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl lg:col-span-2 xl:col-auto">We're changing the way people connect</h1> */}
    <h1 className="max-w-2xl text-4xl/12 font-semibold text-pretty tracking-tight text-brand sm:text-6xl/20 lg:col-span-1 ">
        <span className="w-fit bg-brand py-1 px-2 rounded-lg text-white">재판</span>과 <span className="w-fit bg-brand py-1 px-2 rounded-lg text-white">수사경험</span>이 <br /> 풍부한 전문가들이 <br /> 법률문제를 해결합니다
    </h1>
    <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
      <p className="text-md lg:text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 py-2">
      민사, 형사, 상사, 가사 송무와 수사대응 부문에서 놀라운 성과를 거두어 온 법무법인(유한) 해광이 각 분야의 전문가를 대거 영입하여 지적재산권, 공정거래, 조세, 금융, 회생, 파산, 부동산, 건설, 입법, 대관업무 분야까지 종합적인 법률 서비스를 제공하고자 합니다. 
      </p>
      <p className="text-md lg:text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 py-2">
      서울고등법원, 서울중앙지방법원 부장판사 출신의 변호사들이 의기투합하여 2021년 설립한 후 송무와 수사대응 분야에서 인정받아 온 법무법인(유한) 해광은 그동안 눈부신 성장을 계속하여 2024년에는 매출액 200억 원을 돌파하고 변호사 1인당 매출액 전국 2위를 차지하는 쾌거를 올렸습니다. 
      </p>
      <p className="text-md lg:text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 py-2">
      이에 힘입어 법무법인(유한) 해광은 2025년 새롭게 변호사로 출발하는 전직 부장판사 5인을 새로 영입하고 서울고등법원장을 역임한 윤준 변호사와 MOU를 체결하여 협력하기로 하는 등 송무 및 기업자문 역량을 더욱 강화하였습니다. 
      </p>
    </div>
    <img
      alt=""
      src="/logo_mockup2_expand.png"
      className="mt-10 aspect-6/5 w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
        />
      </div>
    </div>
    <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-linear-to-t from-white sm:h-32" />
  </div>
      <Timeline data={timelineData} />
    </div>
  );
}
