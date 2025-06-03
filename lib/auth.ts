'use client';

import { useEffect, useState } from 'react';

export function useIsEmployee() {
  // 모든 환경에서 true로 설정 (테스트용)
  const [isEmployee, setIsEmployee] = useState(true);

  useEffect(() => {
    // 모든 환경에서 항상 true
    setIsEmployee(true);
  }, []);

  return isEmployee;
} 