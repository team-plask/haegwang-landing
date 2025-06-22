export default function PeopleSection() {
  return (
    <section className="w-full mx-auto py-16 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:max-w-none lg:min-w-full lg:flex-none lg:gap-y-8">
          <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
            <h2 className="text-4xl font-bold tracking-tight text-brand sm:text-5xl py-3 lg:py-6">해광의 변호사들은</h2>
            <p className="mt-6 text-xl leading-8 text-gray-600">
              법무법인(유한) 해광의 대표변호사 및 구성원 변호사들은 민사, 형사, 행정, 가사 등 다양한 분야에서
              재판장과 대법원 재판연구관으로서 오랜 기간 재판업무를 담당했으며, 고등법원장, 지방법원장, 대법원
              양형위원회 상임위원, 형사수석부장판사, 법원행정처 및 사법연수원 교수 등 사법행정 전반을 두루
              경험했습니다. 또한 검찰에서도 형사, 특수, 강력, 마약 등 다양한 분야의 수사와 공판을 이끌었으며,
              고검장, 검사장, 차장검사, 지청장, 법무부 및 연수원 교수 등 주요 직책을 두루 역임한 전문가들입니다.
            </p>
            <p className="mt-6 text-base leading-7 text-gray-600">
              이러한 법원·검찰 출신의 변호사들이 모여 경찰·검찰의 수사 대응, 민사·형사 소송뿐 아니라 기업, 공정거래,
              금융, 지적재산권, 건설, 부동산, 조세, 가사, 행정 등 전방위적 분야에서 전문적이고 종합적인 법률서비스를
              제공합니다. 주요 팀은 다음과 같습니다:
              {/* <br /><br />
              <strong>◯ 수사대응팀</strong> (압수수색, 사기, 횡령, 배임, 자본시장법 위반, 중대재해처벌법 위반 등),<br />
              <strong>◯ 기업형사팀</strong> (기업범죄·재산범죄·금융범죄·고위공직자 범죄 등),<br />
              <strong>◯ 기업상사팀</strong> (주주총회, 신주발행, 회사채 등 관련 본안 및 보전소송),<br />
              <strong>◯ 금융팀</strong> (자본시장 제재, 가상자산, 금융소비자 보호 등),<br />
              <strong>◯ 지식재산권팀</strong> (특허·저작권·영업비밀, 개인정보보호 등),<br />
              <strong>◯ 부동산/건설팀</strong> (건설소송, 재개발·재건축, 토지수용 등),<br />
              <strong>◯ 공정거래·조세팀</strong> (시장지배적지위 남용, 방문판매, 하도급, 조세불복 등),<br />
              <strong>◯ 행정팀</strong> (도시정비, 헌법소송, 의료·환경·방위산업 분야 등),<br />
              <strong>◯ 회생·파산팀</strong> (법인회생, 파산, 가처분·항고 등 신청 사건),<br />
              <strong>◯ 가사팀</strong> (상속, 후견, 소년보호 등 가사 사건) */}
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
        <div className="text-left mb-12">
          <h3 className="text-3xl font-bold text-brand md:text-5xl mb-4">더 많은 모습들</h3>
          <p className="text-lg text-gray-600">법무법인(유한) 해광의 다양한 활동과 구성원들의 모습을 만나보세요</p>
        </div>
        
        {/* 캐러셀 컨테이너 */}
        <div className="relative">
          {/* 좌측 그라데이션 */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          {/* 우측 그라데이션 */}
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
          
          {/* 스크롤 가능한 캐러셀 */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-6 pb-4" style={{ width: 'max-content' }}>
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
        
        {/* 스크롤 힌트 */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l4-4m0 0l4 4m-4-4v12" />
            </svg>
            좌우로 스크롤하여 더 많은 사진을 확인하세요
            <svg className="h-4 w-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l4-4m0 0l4 4m-4-4v12" />
            </svg>
          </p>
        </div>
      </div>

    </section>
  )
}