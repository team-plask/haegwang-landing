import * as LucideIcons from "lucide-react";
import { type LucideIcon } from "lucide-react";

type IconComponents = {
  [K in keyof typeof LucideIcons]: typeof LucideIcons[K] extends LucideIcon ? K : never;
}[keyof typeof LucideIcons];

export const IconComponent = ({ name, className }: { name: string | null; className?: string }) => {
  if (!name) return null; // Or a default icon like <LucideIcons.HelpCircle className={className} />
  
  // Type guard to check if the name is a valid icon name
  const isValidIconName = (name: string): name is IconComponents => {
    return name in LucideIcons && typeof (LucideIcons as Record<string, unknown>)[name] === 'function';
  };
  
  if (!isValidIconName(name)) {
    console.warn(`Icon "${name}" not found in lucide-react. Ensure the name is a valid Lucide icon name.`);
    return null; // Or a default icon
  }
  
  const LucideIcon = LucideIcons[name] as LucideIcon;
  return <LucideIcon className={className} />;
}; 