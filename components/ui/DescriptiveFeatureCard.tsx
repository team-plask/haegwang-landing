import Image from "next/image";
import React, { ReactNode, cloneElement, isValidElement, HTMLAttributes } from 'react';
import { Badge } from "@/components/ui/badge";

interface DescriptiveFeatureCardProps {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt?: string;
  icon?: ReactNode;
  keyServices?: string[];
}

function DescriptiveFeatureCard({
  title,
  description,
  imageUrl,
  imageAlt = "Feature image",
  icon,
  keyServices,
}: DescriptiveFeatureCardProps) {
  
  let styledIcon = null;
  if (icon && isValidElement(icon)) {
    const currentProps = icon.props as HTMLAttributes<HTMLElement>;
    const existingClassName = currentProps.className || '';
    styledIcon = cloneElement(icon as React.ReactElement<any>, {
      className: `${existingClassName} text-white`,
    });
  }

  return (
      <div className="container mx-auto w-full">
        <div className="flex flex-col-reverse lg:flex-row gap-10 lg:items-center">
          <div className="flex gap-4 flex-col flex-1">
            {styledIcon && (
              <div className="bg-brand border-2 border-brand/70 rounded-md inline-flex items-center justify-center w-6 h-6 md:w-10 md:h-10">
                {styledIcon}
              </div>
            )}
            <div className="flex gap-2 flex-col">
              <h2 className="text-brand text-xl md:text-4xl tracking-tighter lg:max-w-xl font-bold text-left">
                {title}
              </h2>
              <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground mt-4 md:mt-6 text-left">
                {description}
              </p>
              {keyServices && keyServices.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2 md:mt-4">
                  {keyServices.map((service, index) => (
                    <Badge key={index} variant="secondary" className="text-sm font-light">
                      #{service}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="w-full aspect-video h-full flex-1 relative overflow-hidden rounded-md">
            <Image
              src={imageUrl}
              alt={imageAlt}
              layout="fill"
              objectFit="cover"
              className="bg-muted" // Add bg-muted as a fallback
            />
          </div>
        </div>
      </div>
  );
}

export { DescriptiveFeatureCard }; 