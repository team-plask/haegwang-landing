"use client";

import React from 'react';
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useKakaoMaps } from '@/hooks/useKakaoMaps';

interface MapProps {
  center: { lat: number; lng: number };
}

function KakaoMap({ center }: MapProps) {
  const { isLoaded, isError, retry } = useKakaoMaps();

  if (isError) {
    return (
      <div 
        className="flex items-center justify-center bg-gray-100 rounded-lg"
        style={{ width: "100%", height: "600px" }}
      >
        <div className="text-center">
          <p className="text-gray-600 mb-2">지도를 불러올 수 없습니다</p>
          <p className="text-sm text-gray-500 mb-4">
            Kakao Maps API가 로드되지 않았습니다.
          </p>
          <button 
            onClick={retry}
            className="px-4 py-2 bg-brand text-white rounded hover:bg-brand/90 transition-colors"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div 
        className="flex items-center justify-center bg-gray-100 rounded-lg"
        style={{ width: "100%", height: "600px" }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto mb-4"></div>
          <p className="text-gray-600">지도를 불러오는 중...</p>
          <p className="text-sm text-gray-500 mt-2">
            Kakao Maps API를 초기화하고 있습니다.
          </p>
        </div>
      </div>
    );
  }

  try {
    return (
      <Map
        center={center}
        style={{ width: "100%", height: "600px", borderRadius: "10px" }}
      >
        <MapMarker position={center} />
      </Map>
    );
  } catch (error) {
    console.error('Map rendering error:', error);
    return (
      <div 
        className="flex items-center justify-center bg-gray-100 rounded-lg"
        style={{ width: "100%", height: "600px" }}
      >
        <div className="text-center">
          <p className="text-red-600 mb-2">지도 렌더링 오류</p>
          <button 
            onClick={retry}
            className="px-4 py-2 bg-brand text-white rounded hover:bg-brand/90 transition-colors"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }
}

export default KakaoMap;