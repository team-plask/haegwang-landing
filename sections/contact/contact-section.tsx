'use client';

import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { SectionHeading } from '@/components/section-heading';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';

interface OfficeInfo {
  title: string;
  subtitle: string;
  address: string;
  subwayInfo: {
    lines: Array<{ line: string; color: string; bgColor: string }>;
    description: string;
  };
  phone: string;
  fax: string;
  parking: string;
  mapCenter: { lat: number; lng: number };
}

interface ContactSectionProps {
  officeInfo: OfficeInfo;
}

const ContactSection: React.FC<ContactSectionProps> = ({ officeInfo }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  });

  if (loadError) {
    return <div>지도를 로드하는 중 오류가 발생했습니다.</div>;
  }

  return (
    <section className="w-full py-16">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading title={officeInfo.title} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* 지도 */}
          <div className="h-full order-1 lg:order-1 flex justify-center items-center">
            {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "600px", borderRadius: "12px" }}
                  center={officeInfo.mapCenter}
                  zoom={17}
                >
                  <Marker position={officeInfo.mapCenter} />
                </GoogleMap>
            ) : (
              <div className="w-full h-[600px] bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-gray-500">지도 로딩 중...</div>
              </div>
            )}
          </div>

          {/* 사무소 정보 */}
          <div className="order-2 lg:order-2 space-y-4">
            {/* 주소 정보 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-brand mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">주소</h3>
                  <p className="text-gray-700 whitespace-pre-line">{officeInfo.address}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-brand mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">주차 안내</h3>
                  <p className="text-gray-700 whitespace-pre-line">{officeInfo.parking}</p>
                </div>
              </div>
            </div>

            {/* 지하철 정보 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-brand mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">지하철</h3>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      {officeInfo.subwayInfo.lines.map((line, index) => (
                        <span 
                          key={index}
                          className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${line.bgColor} ${line.color}`}
                        >
                          {line.line}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-700">{officeInfo.subwayInfo.description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 연락처 정보 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-brand mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">연락처</h3>
                  <div className="flex gap-12">
                    <div className='flex gap-4'>
                      <h4 className="text-sm font-medium text-gray-900 mb-1">전화</h4>
                      <p className="text-gray-700 whitespace-pre-line">{officeInfo.phone}</p>
                    </div>
                    <div className='flex gap-4'>
                      <h4 className="text-sm font-medium text-gray-900 mb-1">FAX</h4>
                      <p className="text-gray-700 whitespace-pre-line">{officeInfo.fax}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
