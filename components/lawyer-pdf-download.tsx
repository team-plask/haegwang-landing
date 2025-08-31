"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { pdf } from '@react-pdf/renderer';
import { LawyerPDFTemplate } from '@/components/lawyer-pdf-template';
import { LawyerProfileFromDB } from '@/sections/lawyers/lawyer-profile-section';

interface LawyerPDFDownloadProps {
  lawyer: LawyerProfileFromDB & {
    education?: any;
    experience?: any;
    awards_publications?: any;
  };
}

export const LawyerPDFDownload = ({ lawyer }: LawyerPDFDownloadProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      // React PDF 컴포넌트를 PDF blob으로 변환
      const blob = await pdf(<LawyerPDFTemplate lawyer={lawyer} />).toBlob();
      
      // 다운로드 링크 생성 및 실행
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${lawyer.name}_소개.pdf`;
      document.body.appendChild(link);
      link.click();
      
      // 메모리 정리
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('PDF 생성 중 오류가 발생했습니다:', error);
      alert('PDF 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button 
      onClick={handleDownload}
      disabled={isGenerating}
      variant="outline"
      size="lg"
      className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white disabled:opacity-50"
    >
      <Download className="w-4 h-4" />
      {isGenerating ? '이력서 생성 중...' : `${lawyer.name} 소개 다운로드`}
    </Button>
  );
};
