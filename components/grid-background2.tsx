import { cn } from "@/lib/utils";

export function GridPatternContainer({ className }: { className?: string }) {
    return (
      <div
        className={cn(
          "absolute inset-0 pointer-events-none",
          className
        )}
      >
        {/* Light mode grid */}
        <div 
          className="absolute inset-0 bg-gray-50 dark:hidden"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(209, 213, 219) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(209, 213, 219) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        {/* Dark mode grid */}
        <div 
          className="absolute inset-0 bg-neutral-950 hidden dark:block"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(64, 64, 64) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(64, 64, 64) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        {/* Gradient mask */}
        <div 
          className="absolute inset-0 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,white,transparent)]"
        />
      </div>
    );
  }
  
  export function GridPattern() {
    return null;  // Not used anymore
  }
  
  