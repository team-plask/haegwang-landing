"use client";

import { useRef, useState, useEffect } from 'react';

export default function PeopleSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 300);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 300);
    }
  };

  useEffect(() => {
    // 컴포넌트 마운트 후 초기 스크롤 상태 체크
    setTimeout(checkScrollButtons, 100);
  }, []);

  return (
    <section className="w-full mx-auto py-16 md:py-32">
      {/* Webkit 브라우저용 스크롤바 숨김 스타일 */}
      <style jsx>{`
        .carousel-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:max-w-none lg:min-w-full lg:flex-none lg:gap-y-8">
          <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
            <h2 className="text-4xl font-bold tracking-tight text-brand sm:text-5xl py-3 lg:py-6">해광의 변호사들은</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
            법무법인(유한) 해광은 대구고등법원장을 역임한 김찬돈 변호사, 울산지방법원장을 역임한 구남수 변호사, 서울고등법원 부장판사를 역임한 임성근 변호사, 서울고등법원 고법판사를 역임한 유헌종, 이완희 변호사, 특허법원과 수원고등법원 고법판사를 역임한 김동규 변호사, 서울중앙지방법원 등 경향각지의 부장판사를 역임한 민병훈, 서민석, 함석천, 손병준, 박영호, 권성우, 박재영, 정연택, 손철, 권순엽 변호사 등 각급 법원 부장판사 출신 변호사 16인과 부산고검장을 역임한 황철규 변호사, 부산지검 차장검사를 역임한 김후균 변호사, 충주지청장을 역임한 최임렬 변호사, 대검 중수부 연구관을 역임한 김형욱 변호사 등 각급 검사 출신 변호사 4인을 주축으로 하여 그 외 구성원변호사 4인, 소속변호사 25인으로 구성되었습니다. 
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
            법무법인(유한) 해광의 변호사들은 법원과 검찰에 근무하면서 또는 변호사 업무를 수행하면서 민사, 형사, 가사 소송, 특수, 강력 수사는 물론 행정, 조세, 공정거래, 지식재산권, 회생, 파산, 부동산, 건설, 금융 등 각 분야에서 두각을 나타낸 베테랑 들입니다. 
            </p>
          </div>

          {/* 모바일 전용 이미지 그리드 */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:hidden">
            <div className="space-y-4 sm:space-y-6">
              <img
                alt="이완희 변호사"
                src="https://gjfljnsvnrortuzjykdi.supabase.co/storage/v1/object/public/lawyers/about/4.png"
                className="w-full aspect-4/5 object-cover rounded-xl shadow-lg"
              />
              <img
                alt="소속 변호사들"
                src="https://gjfljnsvnrortuzjykdi.supabase.co/storage/v1/object/public/lawyers/about/2.png"
                className="w-full aspect-4/3 object-cover rounded-xl shadow-lg"
              />
            </div>
            <div className="space-y-4 sm:space-y-6">
              <img
                alt="황철규, 김후균 변호사"
                src="https://gjfljnsvnrortuzjykdi.supabase.co/storage/v1/object/public/lawyers/about/6.png"
                className="w-full aspect-4/3 object-cover rounded-xl shadow-lg"
              />
              <img
                alt="상담 장면"
                src="https://gjfljnsvnrortuzjykdi.supabase.co/storage/v1/object/public/lawyers/about/1.png"
                className="w-full aspect-4/3 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>

          {/* 데스크톱 전용 - 기존 구조 완전 복원 */}
          <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
            <div className="hidden lg:block lg:w-0 lg:flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
              <img
                alt=""
                src="https://gjfljnsvnrortuzjykdi.supabase.co/storage/v1/object/public/lawyers/about/4.png"
                className="aspect-7/5 w-148 max-w-none rounded-2xl bg-gray-50 object-cover"
              />
            </div>
            <div className="hidden lg:contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-148 lg:items-start lg:justify-end lg:gap-x-8">
              <div className="order-first flex w-64 flex-none justify-end self-end lg:w-auto">
                <img
                  alt=""
                  src="https://gjfljnsvnrortuzjykdi.supabase.co/storage/v1/object/public/lawyers/about/6.png"
                  className="aspect-4/3 w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                />
              </div>
              <div className="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                <img
                  alt=""
                  src="https://gjfljnsvnrortuzjykdi.supabase.co/storage/v1/object/public/lawyers/about/2.png"
                  className="aspect-7/5 w-148 max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                />
              </div>
              <div className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                <img
                  alt=""
                  src="https://gjfljnsvnrortuzjykdi.supabase.co/storage/v1/object/public/lawyers/about/1.png"
                  className="aspect-4/3 w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 캐러셀 갤러리 섹션 */}
      <div className="mx-auto max-w-7xl px-6 mt-20 lg:mt-32">
        
        {/* 캐러셀 컨테이너 */}
        <div className="relative">
          {/* 좌측 네비게이션 버튼 */}
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full shadow-lg transition-all duration-200 ${
              canScrollLeft 
                ? 'bg-white hover:bg-gray-50 text-gray-700 hover:shadow-xl' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* 우측 네비게이션 버튼 */}
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full shadow-lg transition-all duration-200 ${
              canScrollRight 
                ? 'bg-white hover:bg-gray-50 text-gray-700 hover:shadow-xl' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* 스크롤 가능한 캐러셀 */}
          <div 
            ref={scrollRef}
            className="overflow-x-auto carousel-container"
            style={{
              scrollbarWidth: 'none', // Firefox
              msOverflowStyle: 'none', // IE and Edge
            }}
            onScroll={checkScrollButtons}
          >
            <div className="flex gap-6 pb-4 px-16">
              {/* 추가 이미지들 */}
              <div className="flex-none">
                <img
                  alt="임성근, 이완희 변호사"
                  src="https://gjfljnsvnrortuzjykdi.supabase.co/storage/v1/object/public/lawyers/about/5.png"
                  className="h-80 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
              </div>
              <div className="flex-none">
                <img
                  alt="유헌종 변호사"
                  src="https://gjfljnsvnrortuzjykdi.supabase.co/storage/v1/object/public/lawyers/about/7.png"
                  className="h-80 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
              </div>
              <div className="flex-none">
                <img
                  alt="황철규, 김형욱, 최임열 변호사"
                  src="https://gjfljnsvnrortuzjykdi.supabase.co/storage/v1/object/public/lawyers/about/8.png"
                  className="h-80 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
              </div>
              <div className="flex-none">
                <img
                  alt="임성근 변호사" 
                  src="https://gjfljnsvnrortuzjykdi.supabase.co/storage/v1/object/public/lawyers/about/3.png"
                  className="h-80 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      
      </div>

    </section>
  )
}