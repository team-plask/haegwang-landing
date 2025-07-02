"use client"
import { Timeline } from "@/components/ui/timeline";
import { useState } from "react";

const timelineData = [
  {
    title: "2021년",
    content: (
      <div className="space-y-6">
        <div>
          <div className="flex items-center mb-3">
            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded">3월</span>
          </div>
          <div className="space-y-3">
            <div className="text-gray-900 leading-relaxed text-md md:text-lg">
              법무법인 해광 설립
            </div>
            <div className="text-gray-900 leading-relaxed text-md md:text-lg">
              서민석(전 서울중앙지법 부장판사) 등 부장판사 출신 3명의 변호사를 주축으로 수사대응 및 송무 전문 로펌 설립
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center mb-3">
            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded">9월</span>
          </div>
          <div className="space-y-3">
            <div className="text-gray-900 leading-relaxed text-md md:text-lg">
              김후균(전 울산지검 차장검사) 대표변호사 영입
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "2022년",
    content: (
      <div className="space-y-6">
        <div>
          <div className="flex items-center mb-3">
            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded">1월</span>
          </div>
          <div className="space-y-3">
            <div className="text-gray-900 leading-relaxed text-md md:text-lg">
              임성근(전 부산고등법원 부장판사) 대표변호사 영입
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center mb-3">
            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded">3월</span>
          </div>
          <div className="space-y-3">
            <div className="text-gray-900 leading-relaxed text-md md:text-lg">
              정연택(전 사법연수원 교수) 구성원변호사 영입
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center mb-3">
            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded">6월</span>
          </div>
          <div className="space-y-3">
            <div className="text-gray-900 leading-relaxed text-md md:text-lg">
              유영춘 구성원변호사 영입
            </div>
            <div className="text-gray-900 leading-relaxed text-md md:text-lg">
              법무법인(유한) 전환
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "2023년",
    content: (
      <div className="space-y-6">
        <div>
          <div className="flex items-center mb-3">
            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded">2월</span>
          </div>
          <div className="space-y-3">
            <div className="text-gray-900 leading-relaxed text-md md:text-lg">
              황철규(전 부산고등검찰청 검사장), 이완희(전 서울고등법원 고법판사) 대표변호사 영입
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center mb-3">
            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded">3월</span>
          </div>
          <div className="space-y-3">
            <div className="text-gray-900 leading-relaxed text-md md:text-lg">
              김찬돈(전 대구고등법원장), 구남수(전 울산지방법원장) 대표변호사 영입
            </div>
            <div className="text-gray-900 leading-relaxed text-md md:text-lg">
              대구 분사무소 및 부산 분사무소 개소
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center mb-3">
            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded">10월</span>
          </div>
          <div className="space-y-3">
            <div className="text-gray-900 leading-relaxed text-md md:text-lg">
              최임열(전 청주지방검찰청 충주지청장) 대표변호사 영입
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "2024년",
    content: (
      <div className="space-y-6">
        <div>
          <div className="flex items-center mb-3">
            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded">1월</span>
          </div>
          <div className="space-y-3">
            <div className="text-gray-900 leading-relaxed text-md md:text-lg">
              송태원 구성원변호사 영입
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center mb-3">
            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded">2월</span>
          </div>
          <div className="space-y-3">
            <div className="text-gray-900 leading-relaxed text-md md:text-lg">
              민병훈(전 서울중앙지방법원 부장판사) 대표변호사 영입
            </div>
            <div className="text-gray-900 leading-relaxed text-md md:text-lg">
              조동화 구성원변호사 영입
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center mb-3">
            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded">3월</span>
          </div>
          <div className="space-y-3">
            <div className="text-gray-900 leading-relaxed text-md md:text-lg">
              유헌종(전 서울고등법원 고법판사) 대표변호사 영입
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "2025년",
    content: (
      <div className="space-y-6">
        <div>
          <div className="flex items-center mb-3">
            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded">3월</span>
          </div>
          <div className="space-y-3">
            <div className="text-gray-900 leading-relaxed text-md md:text-lg">
              함석천(전 대전지방법원 부장판사), 박영호(전 부산지방법원 부장판사), 김동규(전 수원고등법원 고법판사), 손철(전 수원지방법원 부장판사), 권순엽(전 대구지방법원 부장판사) 대표변호사 영입
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center mb-3">
            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded">4월</span>
          </div>
          <div className="space-y-3">
            <div className="text-gray-900 leading-relaxed text-md md:text-lg">
              박재영(전 서울고등법원 고법판사) 대표변호사 영입
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center mb-3">
            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded">5월</span>
          </div>
          <div className="space-y-3">
            <div className="text-gray-900 leading-relaxed text-md md:text-lg">
              김형욱(전 대검 중수부 연구관) 대표변호사 영입
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center mb-3">
            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded">7월</span>
          </div>
          <div className="space-y-3">
            <div className="text-gray-900 leading-relaxed text-md md:text-lg">
              손병준(전 대전지법 부장판사) 대표변호사 영입
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

export default function AboutHero() {
  const [isTimelineExpanded, setIsTimelineExpanded] = useState(false);

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
          <span className="w-fit bg-brand py-1 px-2 rounded-lg text-white">재판 · 수사 경험</span>이 <br /> 풍부한 전문가들이 <br /> 법률문제를 해결합니다
      </h1>
      <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
        <p className="text-md lg:text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 py-2">
        민사, 형사, 상사, 가사 송무와 수사대응 부문에서 놀라운 성과를 거두어 온 법무법인(유한) 해광이 각 분야의 전문가를 대거 영입하여 지식재산권, 공정거래, 조세, 금융, 회생, 파산, 부동산, 건설, 입법, 대관업무 분야까지 종합적인 법률 서비스를 제공하고자 합니다. 
        </p>
        <p className="text-md lg:text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 py-2">
        서울고등법원, 서울중앙지방법원 부장판사 출신의 변호사들이 의기투합하여 2021년 설립한 후 송무와 수사대응 분야에서 인정받아 온 법무법인(유한) 해광은 그동안 눈부신 성장을 계속하여 2024년에는 매출액 200억 원을 돌파하는 성과를 거두었습니다. 
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
  {/* Brochure Download Section */}
  <div className="mx-auto max-w-7xl pb-16 px-4 md:px-0">
        <div className="bg-gradient-to-r from-brand/5 to-brand/10 rounded-3xl p-8 md:p-12">
          <div className="text-center">
            
            <h3 className="text-2xl md:text-3xl font-bold text-brand mb-4">
              법무법인(유한) 해광 소개서
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              법무법인(유한) 해광의 소개, 전문 분야, 구성원 정보를 담은 소개서를 다운받아 보세요.
            </p>
            <a
              href="https://gjfljnsvnrortuzjykdi.supabase.co/storage/v1/object/public/source//Haegwang%20Brochure%202025.pdf"
              download="법무법인_해광_브로슈어_2025.pdf"
              className="inline-flex items-center gap-3 bg-brand hover:bg-brand/90 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-200 hover:shadow-lg hover:scale-105 group"
            >
              <svg className="h-5 w-5 transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              소개서 다운받기

            </a>
          </div>
        </div>
      </div>

  
      
      {/* Timeline section with toggle */}
      <div className="mx-auto max-w-7xl py-4 md:py-8 px-4 md:px-0">
        <div className="mb-8 md:mb-16">
          <button
            onClick={() => setIsTimelineExpanded(!isTimelineExpanded)}
            className="flex items-center justify-between text-left group mb-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-brand">주요 연혁</h2>
            <svg
              className={`w-6 h-6 text-gray-500 ml-4 transition-transform duration-200 ${
                isTimelineExpanded ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        

        {isTimelineExpanded && (
          <div className="animate-in slide-in-from-top-4 duration-300">
            <Timeline data={timelineData} />
          </div>
        )}
      </div>

      
    </div>
  );
}
