"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface BackgroundVideoProps {
  videoSource: string;
  overlayColor?: string; // Optional: if you want to control the overlay color via props
  isLoading?: boolean; // 로딩 상태 prop 추가
}

export function BackgroundVideo({ videoSource, overlayColor="brand", isLoading = false }: BackgroundVideoProps) {
    return (
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className={cn(
            "h-full w-full object-cover transition-opacity duration-500 ease-in-out",
            isLoading ? "opacity-100" : "opacity-80",
            "[mask-image:linear-gradient(to_bottom,white_80%,transparent)] dark:[mask-image:radial-gradient(circle_at_center,white,transparent),linear-gradient(to_bottom,white_80%,transparent)]"
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
            background: `linear-gradient(to bottom, transparent 0%, var(--color-brand) 100%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: isLoading ? 0 : 0.8 }}
        />
      </motion.div>
    );
  };