declare global {
  interface Window {
    kakao: {
      maps: {
        LatLng: any;
        Map: any;
        Marker: any;
        [key: string]: any;
      };
      [key: string]: any;
    };
  }
}

export {}; 