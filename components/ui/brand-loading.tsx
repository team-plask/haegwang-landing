import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect } from "react";

interface BrandLoadingProps {
  message?: string;
  isVisible: boolean;
  onTimeout?: () => void;
  maxWaitTime?: number;
}

export function BrandLoading({ 
  message = "법무법인(유한) 해광", 
  isVisible,
  onTimeout,
  maxWaitTime = 5000 // 5초 기본값
}: BrandLoadingProps) {
  // 최대 대기 시간 후 강제 종료
  useEffect(() => {
    if (isVisible && onTimeout) {
      const timeoutTimer = setTimeout(() => {
        console.log('BrandLoading: Maximum wait time exceeded, forcing completion');
        onTimeout();
      }, maxWaitTime);

      return () => clearTimeout(timeoutTimer);
    }
  }, [isVisible, onTimeout, maxWaitTime]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-white z-50 flex items-center justify-center"
    >
      <div className="text-center">
        {/* 로고 애니메이션 */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.6,
            ease: "easeOut"
          }}
          className="mb-8"
        >
          <Image
            src="/logo/logo_symbol.png"
            alt="법무법인 해광"
            width={80}
            height={80}
            className="mx-auto"
            priority
          />
        </motion.div>

        {/* 로딩 애니메이션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5,
            delay: 0.3 
          }}
          className="space-y-4"
        >
          {/* 점 애니메이션 */}
          <div className="flex justify-center space-x-1">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0.3 }}
                animate={{ 
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut"
                }}
                className="w-2 h-2 bg-brand rounded-full"
              />
            ))}
          </div>

          {/* 메시지 */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-600 text-sm font-medium"
          >
            {message}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}
