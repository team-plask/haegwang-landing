import React from "react";
import { Timeline } from "@/components/ui/timeline";

export default function TimelineDemo() {
  const data = [
    {
      title: "2021년",
      content: (
        <div>
          <p className="mb-4 text-lg font-semibold text-brand md:text-xl">
            법무법인 해광 설립
          </p>
          <p className="mb-8 text-md font-normal text-neutral-800 md:text-lg dark:text-neutral-200">
            서민석 등 전직 부장판사 18인이 참여하여 설립, 수사 및 송무 전문 로펌으로 출발
          </p>
          <p className="mb-4 text-lg font-semibold text-brand md:text-xl">
            핵심 인재 영입
          </p>
          <p className="mb-8 text-md font-normal text-neutral-800 md:text-lg dark:text-neutral-200">
            김후균 전 차장검사를 대표로 영입하여 수사 대응 역량 강화
          </p>
        </div>
      ),
    },
    {
      title: "2022년",
      content: (
        <div>
          <p className="mb-4 text-lg font-semibold text-brand md:text-xl">
            유한책임법무법인 전환
          </p>
          <p className="mb-8 text-md font-normal text-neutral-800 md:text-lg dark:text-neutral-200">
            임성근, 정연택, 유영춘 변호사 등 영입으로 기업·금융·회계 자문 등 서비스 다각화 및 변호사 27명 규모로 성장
          </p>
        </div>
      ),
    },
    {
      title: "2023년",
      content: (
        <div>
          <p className="mb-4 text-lg font-semibold text-brand md:text-xl">
            전국 네트워크 구축 및 고위 인재 영입
          </p>
          <p className="mb-8 text-md font-normal text-neutral-800 md:text-lg dark:text-neutral-200">
            대구·부산 사무소 설립, 김찬돈, 구남수, 황철규, 이완희 등 전직 법원장·검사장급 인사 대거 영입으로 전국적 법률서비스 체계 완성
          </p>
        </div>
      ),
    },
    {
      title: "2024년",
      content: (
        <div>
          <p className="mb-4 text-lg font-semibold text-brand md:text-xl">
            매출 200억 돌파
          </p>
          <p className="mb-8 text-md font-normal text-neutral-800 md:text-lg dark:text-neutral-200">
            2024년 매출 200억 원 달성, 변호사 1인당 매출 전국 2위 기록
          </p>
        </div>
      ),
    },
    {
      title: "2025년",
      content: (
        <div>
          <p className="mb-4 text-lg font-semibold text-brand md:text-xl">
            전직 부장판사 대표 영입
          </p>
          <p className="mb-8 text-md font-normal text-neutral-800 md:text-lg dark:text-neutral-200">
            함석천, 박영호, 김동규, 손철, 권순엽 전 부장판사를 대표로 영입하여 송무 및 기업자문 역량을 더욱 강화
          </p>
        </div>
      ),
    },
  ];
  
  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
} 