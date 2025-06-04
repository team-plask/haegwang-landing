'use client'
import { useState, useEffect } from 'react'
import { BackgroundVideo } from "@/components/background-video";
import { TextBorderEffect } from "@/components/text-border-effect";
import HeroBadge from "@/components/ui/hero-badge";
import { Searchbar } from "@/components/searchbar";
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export function HeroSection() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300) // 0.3초 후에 로딩 상태 해제
    
    return () => clearTimeout(timer)
  }, [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 검색 기능 구현
  };

  return (
    <section className="relative h-screen w-full bg-brand">
      <BackgroundVideo 
        videoSource="https://gjfljnsvnrortuzjykdi.supabase.co/storage/v1/object/public/source/8.mp4"
        isLoading={isLoading}
      />
      <div className="relative flex flex-col items-center justify-center z-10 h-full w-full">   
          <div className={cn(
            " sm:flex sm:justify-center transition-all duration-1000 ease-out transform delay-500",
            isLoading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          )}>
              <div className="relative rounded-full px-3 py-1 text-xs md:text-sm/6 text-white/40 ring-1 ring-white/30 hover:ring-white/80 bg-brand/10">
                  검사장 출신들로 이루어진 전문가 팀{' '}
                <a href="#" className="font-semibold text-white">
                  <span aria-hidden="true" className="absolute inset-0" />
                  변호사 보러가기 <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isLoading ? 0 : 1, 
              y: isLoading ? 20 : 0 
            }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="w-full max-w-7xl px-4 flex justify-center"
          >
            <TextBorderEffect text="법무법인(유한) 해광" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isLoading ? 0 : 1, 
              y: isLoading ? 20 : 0 
            }}
            transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
            className="w-full max-w-4xl px-4"
          >
            <Searchbar 
              placeholders={[
                "검색어를 입력하세요...",
                "예: 형사 전문 변호사",
                "예: 부동산 분쟁 해결",
                "예: 기업 법률 자문"
              ]} 
              onChange={handleSearchChange} 
              onSubmit={handleSubmit} 
            />
          </motion.div>
      </div>

      {/* Scroll Down Icon */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1.0, delay: 1.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.svg
          animate={{
            y: [0, 8, 0],
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
  );
}