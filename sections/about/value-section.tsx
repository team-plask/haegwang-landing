import { ShieldCheck, Handshake, Scale, Star } from 'lucide-react'

const values = [
  {
    name: '직접 상담과 수행',
    description:
      '전직 부장판사, 부장검사 출신 대표변호사들이 직접 의뢰인을 상담하고, 수사 및 소송의 모든 단계에 걸쳐 신속하고 전략적인 대응을 수행하며, 각종 서면 작성 및 최종 검토, 법정 출석까지 직접 수행합니다.',
    icon: ShieldCheck,
  },
  {
    name: '공감과 적극적 대응',
    description:
      '재판 및 수사 실무 경험을 바탕으로 의뢰인의 고통에 공감하며, 함께 해결책을 모색하고 최종 목표 달성을 위해 최선을 다하는 동반자로서의 법률서비스를 제공합니다.',
    icon: Handshake,
  },
  {
    name: '설득과 논쟁을 두려워하지 않는 자세',
    description:
      '의뢰인의 이익을 위해 상대방을 설득하거나 필요할 경우 치열한 논쟁도 마다하지 않으며, 깊은 이해와 공감 위에서 고객의 신뢰를 얻고자 끊임없이 노력합니다.',
    icon: Scale,
  },
  {
    name: '신뢰받는 법무법인',
    description:
      '전문성과 진정성을 바탕으로, 의뢰인에게 최적의 법률서비스를 제공하고 함께 성공하며 고객의 신뢰를 받는 로펌이 되기 위해 끊임없이 정진합니다.',
    icon: Star,
  },
]

export default function ValuesSection() {
  return (
    <section className="relative mx-auto mt-32 w-full px-6 py-16 md:py-32 lg:px-8 bg-brand/10">
        <div className="container mx-auto max-w-7xl py-1 md:py-3">
            <h2 className="relative text-brand text-4xl md:text-5xl tracking-tighter lg:max-w-xl font-bold text-left w-fit">
                    고객과의 약속
                    <img 
                        src="/logo/logo_symbol.png" 
                        alt="Logo Symbol"
                        className="absolute top-0 right-0 h-3 w-3 md:h-4 md:w-4 -mt-3 -mr-5" // Adjust size and position as needed
                    />
                </h2>
                <p className="text-muted-foreground max-w-xl text-left text-lg font-light md:text-xl py-2 md:py-6">
                    법무법인(유한) 해광은 의뢰인에게 전문적인 법률서비스를 제공하고 의뢰인과 함께 성공하며 의뢰인의 신뢰를 얻을 수 있는 로펌이 될 것을 약속드립니다.  
                </p>
            <dl className="mx-auto mt-6 md:mt-12 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {values.map((value) => (
          <div
            key={value.name}
            className="relative rounded-2xl bg-white shadow-md ring-1 ring-gray-200 p-6 transition hover:shadow-lg"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand ring-1 ring-inset ring-brand/20">
              <value.icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <dt className="mt-4 text-lg font-semibold text-gray-900">{value.name}</dt>
            <dd className="mt-2 text-gray-600">{value.description}</dd>
          </div>
            ))}
        </dl>
        </div>
    </section>
  )
}