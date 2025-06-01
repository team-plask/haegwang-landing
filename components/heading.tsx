'use client'
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InView } from "@/components/ui/in-view";

interface HeadingProps {
  badge?: string;
  title: string;
  description?: string;
  headingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  buttonText?: string;
  buttonLink?: string;
  textColor?: string;
  textAlign?: "left" | "center" | "right";
}

export function Heading({
  badge,
  title,
  description,
  headingLevel = "h2",
  buttonText,
  buttonLink,
  textColor,
  textAlign = "center",
}: HeadingProps) {
  const HeadingTag = headingLevel;

  return (
    <InView viewOptions={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}>
      <div className={`flex flex-col items-${textAlign === 'center' ? 'center' : textAlign === 'left' ? 'start' : 'end'} justify-between py-8 md:py-16`}>
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="mb-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm md:mb-4 font-semibold text-brand w-fit"
          >
            {badge}
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <HeadingTag
            className={`mb-3 text-brand text-3xl font-bold md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-6xl text-${textAlign}`}
            style={{ color: textColor }}
          >
            {title}
          </HeadingTag>
          {description && (
            <p
              className={`mb-8 text-${textAlign} text-muted-foreground md:text-base lg:max-w-2xl lg:text-xl`}
              style={{ color: textColor }}
            >
              {description}
            </p>
          )}
        </motion.div>
        {buttonText && buttonLink && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button variant="default" className="w-full sm:w-auto" asChild>
              <a href={buttonLink} target="_self">
                {buttonText}
                <ArrowRight className="ml-2 size-4" />
              </a>
            </Button>
          </motion.div>
        )}
      </div>
    </InView>
  );
} 