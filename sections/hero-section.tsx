'use client'
import { useState, useEffect, useRef } from 'react'
import { BackgroundVideo } from "@/components/background-video";
import { TextBorderEffect } from "@/components/text-border-effect";
import { Searchbar } from "@/components/searchbar";
import { BrandLoading } from "@/components/ui/brand-loading";
import { usePageLoading } from "@/components/page-loading-provider";
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export function HeroSection() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [searchValue, setSearchValue] = useState('');
  const isVideoLoadedRef = useRef(false);
  const { setLoading } = usePageLoading();
  const router = useRouter();

  // 홈페이지에서는 전역 로딩을 즉시 끄고 비디오 로딩만 처리
  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  // 비디오 로딩 완료 후 콘텐츠 애니메이션 시작
  useEffect(() => {
    if (isVideoLoaded) {
      const timer = setTimeout(() => {
        setShowContent(true)
      }, 500) // 비디오 로딩 후 0.5초 딜레이
      
      return () => clearTimeout(timer)
    }
  }, [isVideoLoaded])

  // 컴포넌트 마운트 시 즉시 체크 및 안전장치 타이머
  useEffect(() => {
    // 즉시 체크 (캐시된 비디오를 위해)
    const immediateCheck = setTimeout(() => {
      if (!isVideoLoadedRef.current) {
        // BackgroundVideo 컴포넌트가 체크할 수 있도록 약간의 딜레이
      }
    }, 100);

    // 안전장치: 3초 후에는 강제로 로딩 완료
    const fallbackTimer = setTimeout(() => {
      if (!isVideoLoadedRef.current) {
        handleVideoLoaded();
      }
    }, 5000);

    return () => {
      clearTimeout(immediateCheck);
      clearTimeout(fallbackTimer);
    };
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  const handleVideoLoaded = () => {
    if (!isVideoLoadedRef.current) {
      isVideoLoadedRef.current = true;
      setIsVideoLoaded(true);
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  return (
    <>
      {/* 홈페이지 전용 비디오 로딩 */}
      <BrandLoading 
        message="법무법인(유한) 해광" 
        isVisible={!isVideoLoaded}
        onTimeout={handleVideoLoaded}
        maxWaitTime={5000}
      />
      
      <section className="relative h-screen w-full bg-brand">
        <BackgroundVideo 
          videoSource="https://gjfljnsvnrortuzjykdi.supabase.co/storage/v1/object/public/source//8_11.mp4"
          isLoading={!isVideoLoaded}
          onVideoLoaded={handleVideoLoaded}
        />
        <div className="relative flex flex-col items-center justify-center z-10 h-full w-full">   

            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: showContent ? 1 : 0, 
                y: showContent ? 0 : 20 
              }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-full max-w-xl px-4 flex justify-center"
            >
              <TextBorderEffect 
                text="해광" 
                letterSpacing={65}
              />
            </motion.div>

        </div>

        {/* Scroll Down Icon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 1.0, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.svg
            animate={{
              y: showContent ? [0, 8, 0] : 0,
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 text-white/90"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
          </motion.svg>
        </motion.div>
      </section>
    </>
  );
}