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
          
          <div className="mx-auto mt-6 grid max-w-2xl grid-cols-1 gap-8 text-sm sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <div>
                <h3 className="border-l border-indigo-600 pl-6 font-semibold text-gray-900">서울 주사무소</h3>
                <address className="border-l border-gray-200 pt-2 pl-6 text-gray-600 not-italic">
                  <p>서울특별시 서초구 서초대로320, 6,7,9층 (케이타워서초)</p>
                  <p>TEL. 02-535-0090 / 02-3487-0991 / 02-525-2292</p>
                  <p>FAX. 02-535-0091 / 02-3487-0997 / 02-525-2293</p>
                </address>
            </div>
            <div>
              <h3 className="border-l border-indigo-600 pl-6 font-semibold text-gray-900">대구 분사무소</h3>
              <address className="border-l border-gray-200 pt-2 pl-6 text-gray-600 not-italic">
                <p>대구광역시 수성구 동대구로 348-13 602, 702호 (청담빌딩)</p>
                <p>TEL. 053-751-8338</p>
                <p>FAX. 053-751-8339</p>
              </address>
            </div>
            <div>
              <h3 className="border-l border-indigo-600 pl-6 font-semibold text-gray-900">부산 분사무소</h3>
              <address className="border-l border-gray-200 pt-2 pl-6 text-gray-600 not-italic">
                <p>부산광역시 연제구 법원로 34, 1303호, 1304호 (정림빌딩)</p>
                <p>TEL. 051-714-2103</p>
                <p>FAX. 051-714-2104</p>
              </address>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  