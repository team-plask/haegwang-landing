import { useState, useEffect } from 'react';

interface UseKakaoMapsReturn {
  isLoaded: boolean;
  isError: boolean;
  retry: () => void;
}

const KAKAO_MAP_SCRIPT_URL = '//dapi.kakao.com/v2/maps/sdk.js?appkey=fe4424642665c3fb7a7bc599e71a8205&libraries=services,clusterer';

export function useKakaoMaps(): UseKakaoMapsReturn {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const loadKakaoMaps = () => {
    // Reset states
    setIsLoaded(false);
    setIsError(false);

    // Check if already loaded
    if (
      typeof window !== 'undefined' && 
      window.kakao && 
      window.kakao.maps && 
      window.kakao.maps.LatLng && 
      typeof window.kakao.maps.LatLng === 'function'
    ) {
      setIsLoaded(true);
      return;
    }

    // Check if script already exists
    const existingScript = document.querySelector(`script[src*="dapi.kakao.com"]`);
    if (existingScript) {
      // Script exists, wait for it to load
      let checkCount = 0;
      const maxChecks = 50; // 5 seconds with 100ms intervals
      
      const checkLoaded = () => {
        checkCount++;
        if (
          window.kakao && 
          window.kakao.maps && 
          window.kakao.maps.LatLng && 
          typeof window.kakao.maps.LatLng === 'function'
        ) {
          setIsLoaded(true);
        } else if (checkCount < maxChecks) {
          setTimeout(checkLoaded, 100);
        } else {
          setIsError(true);
        }
      };
      checkLoaded();
      return;
    }

    // Create and load script
    const script = document.createElement('script');
    script.src = KAKAO_MAP_SCRIPT_URL;
    script.async = true;

    script.onload = () => {
      // Wait a bit for the script to fully initialize
      setTimeout(() => {
        if (
          window.kakao && 
          window.kakao.maps && 
          window.kakao.maps.LatLng && 
          typeof window.kakao.maps.LatLng === 'function'
        ) {
          console.log('Kakao Maps loaded successfully');
          setIsLoaded(true);
        } else {
          console.error('Kakao Maps script loaded but APIs not available');
          setIsError(true);
        }
      }, 100);
    };

    script.onerror = () => {
      console.error('Failed to load Kakao Maps script');
      setIsError(true);
    };

    document.head.appendChild(script);
  };

  useEffect(() => {
    loadKakaoMaps();
  }, []);

  const retry = () => {
    loadKakaoMaps();
  };

  return { isLoaded, isError, retry };
} 