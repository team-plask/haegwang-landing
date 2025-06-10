import React from 'react';
import { Map, MapMarker } from "react-kakao-maps-sdk";

interface MapProps {
  center: { lat: number; lng: number };
}

function KakaoMap({ center }: MapProps){
    return (
      <Map
        center={center}
        style={{ width: "100%", height: "600px" , borderRadius: "10px"}}
      >
        <MapMarker position={center}>
        </MapMarker>
      </Map>
    )
  }

export default KakaoMap;