'use client';

import { useEffect, useState } from 'react';

export function useIsEmployee() {
  // 개발 환경에서만 true, 프로덕션에서는 false
  const [isEmployee, setIsEmployee] = useState(false);

  useEffect(() => {
    // 개발 환경에서만 Vercel Toolbar 표시
    setIsEmployee(process.env.NODE_ENV === 'development');
  }, []);

  return isEmployee;
} 