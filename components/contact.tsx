export default function ContactSection() {
    return (
      <div className="bg-white">
        <div className="container bg-gray-100/50 border rounded-2xl lg:rounded-3xl py-10 mx-auto max-w-7xl px-8 lg:px-12 lg:py-16">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-brand sm:text-5xl">Contact</h2>
            <p className="mt-4 text-lg/8 text-gray-600">
              법무법인(유한) 해광은 서울, 대구, 부산에 위치하고 있습니다. 
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-8 text-base/7 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <div>
              <h3 className="border-l border-indigo-600 pl-6 font-semibold text-gray-900">서울 사무소</h3>
              <address className="border-l border-gray-200 pt-2 pl-6 text-gray-600 not-italic">
                <p>서울특별시 서초구 서초대로320</p>
                <p>02-3487-0097</p>
              </address>
            </div>
            <div>
              <h3 className="border-l border-indigo-600 pl-6 font-semibold text-gray-900">대구 사무소</h3>
              <address className="border-l border-gray-200 pt-2 pl-6 text-gray-600 not-italic">
                <p>대구광역시 동대구로 348-13</p>
                <p>053-751-8338</p>
              </address>
            </div>
            <div>
              <h3 className="border-l border-indigo-600 pl-6 font-semibold text-gray-900">부산 사무소</h3>
              <address className="border-l border-gray-200 pt-2 pl-6 text-gray-600 not-italic">
                <p>부산광역시 연제구 법원로 34</p>
                <p>051-714-2103</p>
              </address>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  