import * as LucideIcons from "lucide-react";

export const IconComponent = ({ name, className }: { name: string | null; className?: string }) => {
  if (!name) return null; // Or a default icon like <LucideIcons.HelpCircle className={className} />
  const LucideIcon = (LucideIcons as any)[name];
  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found in lucide-react. Ensure the name is a valid Lucide icon name.`);
    return null; // Or a default icon
  }
  return <LucideIcon className={className} />;
}; 