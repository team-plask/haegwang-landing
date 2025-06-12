import { Database } from "@/database.types";

type LawyerWithOrder = {
  lawyer_type: Database["public"]["Enums"]["lawyer_type_enum"] | null;
  order: number | null;
  name: string;
};

/**
 * Sort lawyers according to business rules:
 * 1. lawyer_type: 대표변호사 → 구성원변호사 → 소속변호사
 * 2. order: ascending (nulls last)
 * 3. name: Korean alphabetical order
 */
export function sortLawyers<T extends LawyerWithOrder>(lawyers: T[]): T[] {
  return lawyers.sort((a, b) => {
    // 1. Sort by lawyer_type priority
    const typeOrder = {
      '대표변호사': 1,
      '구성원변호사': 2,
      '소속변호사': 3
    };
    
    const aTypeOrder = typeOrder[a.lawyer_type as keyof typeof typeOrder] || 999;
    const bTypeOrder = typeOrder[b.lawyer_type as keyof typeof typeOrder] || 999;
    
    if (aTypeOrder !== bTypeOrder) {
      return aTypeOrder - bTypeOrder;
    }
    
    // 2. If lawyer_type is the same, compare by order (nulls last)
    if (a.order !== b.order) {
      if (a.order === null) return 1;
      if (b.order === null) return -1;
      return a.order - b.order;
    }
    
    // 3. If order is also the same, compare by name (Korean alphabetical)
    return a.name.localeCompare(b.name, 'ko');
  });
} 