import Image from "next/image";
import { format } from "date-fns";

export interface BlogInfoProps {
  id: string;
  title: string;
  post_type: string;
  created_at: string | null;
  published_at: string | null;
  thumbnail_url: string | null;
  practice_area_name?: string | null;
}

export default function BlogInfoCard({ blogInfo }: { blogInfo: BlogInfoProps }) {
  const displayDate = blogInfo.published_at || blogInfo.created_at || Date.now();
  const hasThumbnail = blogInfo.thumbnail_url && blogInfo.thumbnail_url !== '';

  return (
    <div className="relative mb-12 overflow-hidden rounded-3xl">
      {/* Background - either image or solid color */}
      <div className="absolute inset-0">
        {hasThumbnail ? (
          <>
            <Image
              src={blogInfo.thumbnail_url!}
              alt={blogInfo.title}
              className="h-full w-full object-cover"
              fill
              priority
              quality={90}
            />
            {/* Dark gradient overlay for better text visibility on images */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
          </>
        ) : (
          /* Solid color background with gradient when no thumbnail */
          <div className="absolute inset-0 bg-gradient-to-br from-brand/90 to-brand dark:from-brand/80 dark:to-brand/60" />
        )}
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10 flex min-h-[40vh] flex-col justify-end p-6 md:p-12">
        {/* Practice Area Badge */}
        {blogInfo.practice_area_name && (
          <div className="mb-4">
            <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-white border border-white/20">
              {blogInfo.practice_area_name}
            </span>
          </div>
        )}
        
        {/* Title */}
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-5xl md:leading-tight">
          {blogInfo.title}
        </h1>
        
        {/* Publication date */}
        <p className="mb-6 text-sm text-white/80">
          게시일: {format(new Date(displayDate), "yyyy년 MM월 dd일")}
        </p>
      </div>
    </div>
  );
} 