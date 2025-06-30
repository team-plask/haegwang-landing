"use client";
import React from "react";
import { motion } from "motion/react";

interface TextBorderEffectProps {
  text: string;
  duration?: number;
  onAnimationComplete?: () => void;
  initialDelay?: number;
  letterSpacing?: number; // 글자 간격 조정
  justifiedLayout?: boolean; // 양쪽 정렬 옵션
}

export const TextBorderEffect = ({
  text,
  duration = 5,
  onAnimationComplete,
  initialDelay = 1,
  letterSpacing = 0,
  justifiedLayout = false,
}: TextBorderEffectProps) => {
  const strokeColor = "rgb(255, 255, 255)";
  const fillColor = "rgb(255, 255, 255)";
  const initialFillColor = fillColor.replace("rgb(", "rgba(").replace(")", ", 0)");
  const strokeWidth = 0.3;
  const fontFamilyClassName = "font-sans";
  const fontWeightClassName = "font-bold";
  const className = "";

  const finalInitialFillColor = initialFillColor;

  // 애니메이션 지연 및 지속 시간 계산
  const strokeAnimationDuration = duration * 0.7; // 전체 duration의 70%
  const fillAnimationDelay = strokeAnimationDuration * 0.3; // stroke 애니메이션 중간부터 시작
  const fillAnimationDuration = duration * 0.2; // 전체 duration의 50%

  // 반응형 fontSize와 viewBox 설정
  const [isMobile, setIsMobile] = React.useState(false);
  
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 모바일과 데스크톱에 따른 설정
  const fontSize = isMobile ? 36 : 40; // 모바일에서는 36px, 데스크톱에서는 40px
  const viewBoxWidth = isMobile ? 200 : 180;
  const viewBoxHeight = isMobile ? 60 : 80;

  // letterSpacing이 있거나 justifiedLayout이 true인 경우 개별 글자 렌더링
  if ((letterSpacing > 0 || justifiedLayout) && text.length > 1) {
    const characters = text.split('').filter(char => char.trim() !== ''); // 공백 제거
    
    let spacing, startX;
    
    if (justifiedLayout) {
      // 양쪽 정렬: 전체 너비에 균등 분배
      const totalWidth = viewBoxWidth * 0.8;
      startX = viewBoxWidth * 0.1;
      spacing = characters.length > 1 ? totalWidth / (characters.length - 1) : 0;
    } else {
      // 중앙 정렬: letterSpacing을 기준으로 중앙에서 시작
      const totalTextWidth = (characters.length - 1) * letterSpacing;
      startX = (viewBoxWidth - totalTextWidth) / 2;
      spacing = letterSpacing;
    }

    return (
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        xmlns="http://www.w3.org/2000/svg"
        className={`select-none ${className}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {characters.map((char, index) => (
          <motion.text
            key={index}
            x={startX + (index * spacing)}
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            strokeWidth={strokeWidth}
            fontSize={fontSize}
            className={`${fontFamilyClassName} ${fontWeightClassName} dark:stroke-neutral-800`}
            initial={{
              strokeDashoffset: 1000,
              strokeDasharray: 1000,
              fill: finalInitialFillColor,
              stroke: strokeColor,
            }}
            animate={{
              strokeDashoffset: 0,
              fill: fillColor,
            }}
            transition={{
              strokeDashoffset: {
                duration: strokeAnimationDuration,
                ease: "easeInOut",
                delay: initialDelay + (justifiedLayout ? index * 0.2 : 0), // justifiedLayout일 때만 순차 애니메이션
              },
              fill: {
                duration: fillAnimationDuration,
                delay: fillAnimationDelay + initialDelay + (justifiedLayout ? index * 0.2 : 0),
                ease: "easeInOut",
              },
            }}
            onAnimationComplete={index === characters.length - 1 ? onAnimationComplete : undefined}
          >
            {char}
          </motion.text>
        ))}
      </svg>
    );
  }

  // 기본 단일 텍스트 렌더링 (letterSpacing이 0일 때)
  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth={strokeWidth}
        fontSize={fontSize}
        className={`${fontFamilyClassName} ${fontWeightClassName} dark:stroke-neutral-800`}
        initial={{
          strokeDashoffset: 1000,
          strokeDasharray: 1000,
          fill: finalInitialFillColor,
          stroke: strokeColor,
        }}
        animate={{
          strokeDashoffset: 0,
          fill: fillColor,
        }}
        transition={{
          strokeDashoffset: {
            duration: strokeAnimationDuration,
            ease: "easeInOut",
            delay: initialDelay,
          },
          fill: {
            duration: fillAnimationDuration,
            delay: fillAnimationDelay + initialDelay,
            ease: "easeInOut",
          },
        }}
        onAnimationComplete={onAnimationComplete}
      >
        {text}
      </motion.text>
    </svg>
  );
};