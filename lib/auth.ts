'use client';

import { useEffect, useState } from 'react';

export function useIsEmployee() {
  // 개발 환경에서는 초기값을 true로 설정
  const [isEmployee, setIsEmployee] = useState(
    typeof window !== 'undefined' && window.location.hostname === 'localhost'
  );

  useEffect(() => {
    // localhost에서는 항상 true
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      setIsEmployee(true);
      return;
    }

    // 프로덕션에서는 환경 변수나 쿠키를 통해 확인
    const checkEmployeeStatus = async () => {
      // TODO: 실제 인증 로직 구현
      setIsEmployee(false);
    };

    checkEmployeeStatus();
  }, []);

  return isEmployee;
} 