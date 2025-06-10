import { 
  Home, 
  Settings, 
  User, 
  Mail, 
  FileText, 
  Scale, 
  Shield, 
  Building,
  Briefcase,
  Gavel,
  Landmark,
  ShieldCheck,
  Lightbulb,
  Users,
  Recycle,
  Library,
  HelpCircle,
  MapPin,
  Globe,
  Anchor,
  type LucideIcon 
} from "lucide-react";

// Create a mapping of icon names to components
const iconMap: Record<string, LucideIcon> = {
  Home,
  Settings,
  User,
  Mail,
  FileText,
  Scale,
  Shield,
  Building,
  Briefcase,
  Gavel,
  Landmark,
  ShieldCheck,
  Lightbulb,
  Users,
  Recycle,
  Library,
  HelpCircle,
  MapPin,
  Globe,
  Anchor,
};

export const IconComponent = ({ name, className }: { name: string | null; className?: string }) => {
  if (!name) return null;
  
  const LucideIcon = iconMap[name];
  
  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found. Available icons:`, Object.keys(iconMap));
    return <HelpCircle className={className} />; // Return a default icon
  }
  
  return <LucideIcon className={className} />;
}; 