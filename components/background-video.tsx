"use client";
import React, { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BackgroundVideoProps {
  videoSource: string;
  isLoading?: boolean;
  onVideoLoaded?: () => void;
}

export function BackgroundVideo({ videoSource, isLoading = false, onVideoLoaded }: BackgroundVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleLoadedData = () => {
      onVideoLoaded?.();
    };

    const handleCanPlay = () => {
      onVideoLoaded?.();
    };

    const checkVideoLoaded = useCallback(() => {
      const video = videoRef.current;
      if (video && video.readyState >= 3) { // HAVE_FUTURE_DATA or better
        onVideoLoaded?.();
      }
    }, [onVideoLoaded]);

    useEffect(() => {
      // 컴포넌트 마운트 시 비디오가 이미 로드되어 있는지 확인
      checkVideoLoaded();
    }, [checkVideoLoaded]);

    return (
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={handleLoadedData}
          onCanPlay={handleCanPlay}
          onLoadStart={() => {
            // 로드 시작 시에도 체크
            setTimeout(checkVideoLoaded, 100);
          }}
          className={cn(
            "h-full w-full object-cover transition-opacity duration-500 ease-in-out",
            isLoading ? "opacity-100" : "opacity-100",
          )}
        >
          <source
            src={videoSource}
            type="video/mp4"
          />
        </video>
        <motion.div
          className="absolute inset-0 h-full w-full"
          style={{
            background: `linear-gradient(to bottom, transparent 70%, var(--color-brand) 100%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: isLoading ? 0 : 0.8 }}
        />
      </motion.div>
    );
  }