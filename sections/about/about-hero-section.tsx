import Timeline, { TimelineItem } from "@/components/timeline";

const timeline: TimelineItem[] = [
  {
    name: "법무법인 해광 설립",
    dateTime: "2021-03-01",
    date: "2021년 3월",
    description: "이동근, 서민석, 최창영 등 전직 부장판사 18인이 참여하여 설립, 수사 및 송무 전문 로펌으로 출발",
  },
  {
    name: "유한책임법무법인 전환",
    dateTime: "2022-06-01",
    date: "2022년 6월",
    description: "임성근, 정연택, 김병민, 유영춘 변호사 등 영입으로 기업·금융·회계 자문 등 서비스 다각화 및 변호사 27명 규모로 성장",
  },
  {
    name: "전국 네트워크 구축 및 고위 인재 영입",
    dateTime: "2023-11-01",
    date: "2023년",
    description: "대구·부산 사무소 설립, 김찬돈, 구남수, 황철규, 이완희 등 전직 법원장·검사장급 인사 대거 영입으로 전국적 법률서비스 체계 완성",
  },
  {
    name: "매출 200억 돌파 및 역량 고도화",
    dateTime: "2025-01-01",
    date: "2024~2025년",
    description: "2024년 매출 200억 원, 변호사 1인당 매출 전국 2위. 전직 부장판사 5인 추가 영입 및 윤준 전 서울고법원장과 MOU 체결",
  },
];

export default function AboutHero() {
  return (
    <div>
    <div className="relative isolate -z-10 overflow-hidden bg-linear-to-b from-indigo-100/20 pt-14">
      <div
        aria-hidden="true"
  className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl ring-1 shadow-indigo-600/10 ring-indigo-50 sm:-mr-80 lg:-mr-96"
/>
<div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
  <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
    {/* <h1 class="max-w-2xl text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl lg:col-span-2 xl:col-auto">We're changing the way people connect</h1> */}
    <h1 className="max-w-2xl text-4xl/12 font-semibold text-pretty tracking-tight text-brand sm:text-6xl/20 lg:col-span-1 ">
        <span className="w-fit bg-brand py-1 px-2 rounded-lg text-white">재판</span>과 <span className="w-fit bg-brand py-1 px-2 rounded-lg text-white">수사경험</span>이 <br /> 풍부한 전문가들이 <br /> 법률문제를 해결합니다
    </h1>
    <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
      <p className="text-md lg:text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 py-2">
      법무법인(유한) 해광은 전직 부장판사 출신 변호사들이 2021년 설립한 로펌으로, 수사대응 및 송무 분야에서 탁월한 성과를 거두며 2024년 매출 200억 원, 변호사 1인당 매출 전국 2위를 달성했습니다.
      </p>
      <p className="text-md lg:text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 py-2">
      2025년에는 전직 부장판사 5인 영입과 윤준 변호사와의 MOU를 통해 송무 및 기업자문 역량을 한층 강화하며, 지적재산권, 조세, 공정거래, 금융, 부동산 등 종합 법률서비스를 제공합니다.
      </p>
    </div>
    <img
      alt=""
      src="https://images.unsplash.com/photo-1567532900872-f4e906cbf06a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80"
      className="mt-10 aspect-6/5 w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
        />
      </div>
    </div>
    <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-linear-to-t from-white sm:h-32" />
  </div>
      <Timeline timelineitems={timeline} />
    </div>
  );
}
