import { cn } from "@/lib/utils";
import Link from "next/link";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:gap-8 md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  slug,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  slug: string;
}) => {
  return (
    <Link
      href={slug}
      className={cn(
        "cursor-pointer row-span-1 block",
        className,
      )}
    >
      <div
        className={cn(
          "group/bento shadow-input relative overflow-hidden flex flex-col justify-between rounded-xl bg-white transition duration-200 hover:shadow-[0_2px_10px_rgba(0,0,0,0.02)] dark:border-white/[0.2] dark:bg-black dark:shadow-none dark:hover:shadow-[0_4px_20px_rgba(255,255,255,0.05)] h-full min-h-[280px] md:min-h-[320px]"
        )}
      >
        {/* 이미지 영역 */}
        {header && (
          <div className="absolute inset-x-0 top-0 w-full h-[60%]">
            {header}
            {/* 추가 그라데이션 레이어로 더 부드러운 전환 */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/100 from-0% via-white/70 via-30% via-white/20 via-50% to-transparent to-100% dark:from-black/100 dark:from-0% dark:via-black/75 dark:via-30% dark:via-black/35 dark:via-60% dark:to-transparent dark:to-90%" />
          </div>
        )}
        
        {/* 콘텐츠 영역 */}
        <div className="relative z-10 flex flex-col justify-end h-full p-4 md:p-8">
          <div className="transition duration-200 group-hover/bento:translate-x-2">
            {icon}
            <div className="mt-2 mb-2 font-sans font-bold text-neutral-600 dark:text-neutral-200 md:text-xl">
              {title}
            </div>
            <div className="line-clamp-3 font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300 md:text-sm">
              {description}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
