export type SearchResults = {
  all: SearchItem[];
  lawyers: LawyerSearchResult[];
  cases: CaseSearchResult[];
  media: MediaSearchResult[];
  practiceAreas: PracticeAreaSearchResult[];
};

export type SearchItem = LawyerSearchResult | CaseSearchResult | MediaSearchResult | PracticeAreaSearchResult;

export type LawyerSearchResult = {
  type: 'lawyer';
  id: string;
  name: string;
  lawyer_type: string | null;
  introduction: string | null;
  profile_picture_url: string | null;
  slug: string | null;
  order: number | null;
  practice_areas?: string[];
};

export type CaseSearchResult = {
  type: 'case';
  id: string;
  title: string;
  content_payload: any;
  thumbnail_url: string | null;
  slug: string | null;
  practice_area?: string;
  authors?: string[];
};

export type MediaSearchResult = {
  type: 'media';
  id: string;
  title: string;
  content_payload: any;
  thumbnail_url: string | null;
  external_link: string | null;
  slug?: string | null;
  practice_area?: string;
  authors?: string[];
};

export type PracticeAreaSearchResult = {
  type: 'practiceArea';
  id: string;
  area_name: string;
  introduction: string | null;
  slug: string;
  icon: string | null;
  image_url: string | null;
}; 