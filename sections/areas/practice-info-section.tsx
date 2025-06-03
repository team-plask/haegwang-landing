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

interface KeyServiceCategory {
  category_name: string;
  services: KeyServiceItem[];
}

// Helper function to safely parse key_services
const parseKeyServices = (services: Json | null): KeyServiceCategory[] => {
  if (!services) return [];
  try {
    const parsedServices = typeof services === 'string' ? JSON.parse(services) : services;
    if (Array.isArray(parsedServices)) {
      return parsedServices.filter(
        (category: any): category is KeyServiceCategory => 
          typeof category === 'object' && 
          category !== null && 
          typeof category.category_name === 'string' &&
          Array.isArray(category.services)
      );
    }
  } catch (error) {
    console.error("Error parsing key_services:", error);
  }
  return [];
};

export const PracticeInfoSection = ({ practiceInfo }: { practiceInfo: PracticeInfo }) => {
  const serviceCategories = parseKeyServices(practiceInfo.key_services);

  return (
    <section className="bg-white relative w-full py-6 sm:py-8 lg:py-12 lg:mb-6">
      <div className="container relative z-10 flex flex-col items-center justify-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <DescriptiveFeatureCard
          title={practiceInfo.area_name}
          description={practiceInfo.introduction ?? ""}
          imageUrl={practiceInfo.image_url ?? ""}
          icon={<IconComponent name={practiceInfo.icon} className="w-6 h-6" />}
        />
        {serviceCategories && serviceCategories.length > 0 && (
          <div className="flex flex-col items-start mt-8 mx-auto w-full max-w-7xl">
            {/* Render Key Services by Category */}
            <div className="w-full space-y-6">
              {serviceCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="flex flex-col space-y-3">
                  <h3 className="text-base font-medium text-gray-900 md:text-lg">{category.category_name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.services.map((service, serviceIndex) => (
                      <Badge key={serviceIndex} variant="secondary" className="text-sm font-light">
                        {service.service_name}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};