import { Database } from "@/database.types"
import { BentoGrid, BentoGridItem } from "@/components/bento-grid"
import Image from "next/image"
import { IconComponent } from "@/components/icon-component"
import { Heading } from "@/components/heading"
import { InView } from "@/components/ui/in-view";

export type PracticeAreasFromDB = Pick<
  Database["public"]["Tables"]["practice_areas"]["Row"],
  "id" | "area_name" | "introduction" | "icon" | "image_url"
> & { slug: string };

export type PracticeAreas = PracticeAreasFromDB[]

export function PracticeSection({ practiceAreas }: { practiceAreas: PracticeAreas }) {
  return (
    <section className="w-full items-center justify-center py-12 md:py-32 mx-auto bg-brand relative overflow-hidden">
        {/* 배경 장식 로고 */}
        <InView 
          viewOptions={{ once: true, amount: 0.1 }} 
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="absolute top-20 -left-20 md:-bottom-32 md:-right-32 w-[300px] h-[300px] md:w-[700px] md:h-[700px] opacity-[0.08]">
            <Image
              src="/logo/Asset 3.png"
              alt=""
              fill
              className="filter brightness-0 invert object-contain"
            />
          </div>
        </InView>
        
        <div className="container max-w-7xl flex flex-col items-center justify-between mx-auto px-4 md:px-8 relative z-10">
            <Heading badge="업무분야" title="기업부터 법안까지" description="법무법인(유한) 해광은 기업부터 법안까지 다양한 업무를 진행합니다." textColor="white"/>
            <InView viewOptions={{ once: true, amount: 0.1 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <BentoGrid>
                  {practiceAreas.map((area: PracticeAreasFromDB) => (
                  <BentoGridItem
                  key={area.id}
                  title={area.area_name}
                  description={area.introduction}
                  header={
                      area.image_url ? (
                      <div className="relative w-full h-full">
                          <Image
                          src={area.image_url}
                          alt={area.area_name}
                          fill
                          className="object-cover"
                          />
                      </div>
                      ) : undefined
                  }
                  icon={<IconComponent name={area.icon} className="w-4 h-4 text-neutral-500" />}
                  slug={`/areas?slug=${area.slug}`}
                  />
              ))}
              </BentoGrid>
            </InView>
        </div>
    </section>
  )
}
