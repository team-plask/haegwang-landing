import { DescriptiveFeatureCard } from "@/components/ui/DescriptiveFeatureCard";
import { Database, Json } from "@/database.types"; // Combined Json import
import { Badge } from "@/components/ui/badge"; // Import Badge for direct use
import { IconComponent } from "@/components/icon-component";

export type PracticeInfo = Pick<
  Database["public"]["Tables"]["practice_areas"]["Row"],
  "id" | "area_name" | "introduction" | "icon" | "image_url" | "key_services" | "slug"
>;


interface KeyServiceItem {
  service_name: string;
  description?: string;
}

// Helper function to safely parse key_services
const parseKeyServices = (services: Json | null): KeyServiceItem[] => {
  if (!services) return [];
  try {
    const parsedServices = typeof services === 'string' ? JSON.parse(services) : services;
    if (Array.isArray(parsedServices)) {
      return parsedServices.filter(
        (service: any): service is KeyServiceItem => 
          typeof service === 'object' && service !== null && typeof service.service_name === 'string'
      );
    }
  } catch (error) {
    console.error("Error parsing key_services:", error);
  }
  return [];
};

export const PracticeInfoSection = ({ practiceInfo }: { practiceInfo: PracticeInfo }) => {
  const services = parseKeyServices(practiceInfo.key_services);

  return (
    <section className="bg-white relative w-full py-6 sm:py-8 lg:py-12 lg:mb-6">
      <div className="container relative z-10 flex flex-col items-center justify-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <DescriptiveFeatureCard
          title={practiceInfo.area_name}
          description={practiceInfo.introduction ?? ""}
          imageUrl={practiceInfo.image_url ?? ""}
          icon={<IconComponent name={practiceInfo.icon} className="w-6 h-6" />}
        />
        <div className="flex flex-col items-start mt-8 mx-auto w-full max-w-7xl">
          <div className="text-muted-foreground text-left text-lg font-semibold md:text-2xl">주요 서비스</div>
          {/* Render Key Services as Badges directly in the section */}
          {services && services.length > 0 && (
            <div className="mt-2 md:mt-6 flex flex-wrap justify-start gap-2">
              {services.map((service, index) => (
                <Badge key={index} variant="secondary" className="text-sm font-light">
                  #{service.service_name}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};