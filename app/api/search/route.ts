import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

import { 
  SearchResults, 
  SearchItem, 
  LawyerSearchResult, 
  CaseSearchResult, 
  MediaSearchResult, 
  PracticeAreaSearchResult 
} from "@/types/search";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
  }

  try {
    const supabase = await createClient();

    // 검색어를 이용해 각 카테고리별로 검색
    const [lawyersResult, casesResult, mediaResult, practiceAreasResult] = await Promise.all([
      // 구성원 검색 - 이름, 소개글로 검색
      supabase
        .from('lawyers')
        .select(`
          id, name, lawyer_type, introduction, profile_picture_url, slug,
          lawyer_practice_areas(practice_areas(area_name))
        `)
        .or(`name.ilike.%${query}%,introduction.ilike.%${query}%`)
        .neq('lawyer_type', '소속변호사'),

      // 승소사례 검색 - 제목으로만 검색 (content_payload 제외하고 단순화)
      supabase
        .from('posts')
        .select(`
          id, title, content_payload, thumbnail_url, slug,
          practice_areas!practice_area_id(area_name),
          post_authors(lawyers(name))
        `)
        .eq('post_type', '승소사례')
        .ilike('title', `%${query}%`),

      // 언론보도 검색 - 제목으로만 검색 (content_payload 제외하고 단순화)
      supabase
        .from('posts')
        .select(`
          id, title, content_payload, thumbnail_url, external_link, slug,
          practice_areas!practice_area_id(area_name),
          post_authors(lawyers(name))
        `)
        .eq('post_type', '언론보도')
        .ilike('title', `%${query}%`),

      // 업무분야 검색 - 분야명, 소개글로 검색
      supabase
        .from('practice_areas')
        .select('id, area_name, introduction, slug, icon, image_url')
        .or(`area_name.ilike.%${query}%,introduction.ilike.%${query}%`)
    ]);

    // Helper function to safely extract practice area names
    const extractPracticeAreas = (relations: unknown): string[] => {
      if (!Array.isArray(relations)) return [];
      return relations
        .map((relation: unknown) => {
          if (relation && typeof relation === 'object' && 'practice_areas' in relation) {
            const practiceAreas = (relation as { practice_areas: unknown }).practice_areas;
            if (practiceAreas && typeof practiceAreas === 'object' && 'area_name' in practiceAreas) {
              return (practiceAreas as { area_name: string }).area_name;
            }
          }
          return null;
        })
        .filter((area): area is string => area !== null);
    };

    // Helper function to safely extract author names
    const extractAuthors = (relations: unknown): string[] => {
      if (!Array.isArray(relations)) return [];
      return relations
        .map((relation: unknown) => {
          if (relation && typeof relation === 'object' && 'lawyers' in relation) {
            const lawyers = (relation as { lawyers: unknown }).lawyers;
            if (lawyers && typeof lawyers === 'object' && 'name' in lawyers) {
              return (lawyers as { name: string }).name;
            }
          }
          return null;
        })
        .filter((name): name is string => name !== null);
    };

    // Helper function to safely extract practice area name
    const extractPracticeAreaName = (practiceAreas: unknown): string | undefined => {
      if (practiceAreas && typeof practiceAreas === 'object' && 'area_name' in practiceAreas) {
        return (practiceAreas as { area_name: string }).area_name;
      }
      return undefined;
    };

    // 결과 변환
    const lawyers: LawyerSearchResult[] = (lawyersResult.data || []).map(lawyer => ({
      type: 'lawyer' as const,
      id: lawyer.id,
      name: lawyer.name,
      lawyer_type: lawyer.lawyer_type,
      introduction: lawyer.introduction,
      profile_picture_url: lawyer.profile_picture_url,
      slug: lawyer.slug,
      practice_areas: extractPracticeAreas(lawyer.lawyer_practice_areas)
    }));

    const cases: CaseSearchResult[] = (casesResult.data || []).map(post => ({
      type: 'case' as const,
      id: post.id,
      title: post.title,
      content_payload: post.content_payload,
      thumbnail_url: post.thumbnail_url,
      slug: post.slug,
      practice_area: extractPracticeAreaName(post.practice_areas),
      authors: extractAuthors(post.post_authors)
    }));

    const media: MediaSearchResult[] = (mediaResult.data || []).map(post => ({
      type: 'media' as const,
      id: post.id,
      title: post.title,
      content_payload: post.content_payload,
      thumbnail_url: post.thumbnail_url,
      external_link: post.external_link,
      slug: post.slug,
      practice_area: extractPracticeAreaName(post.practice_areas),
      authors: extractAuthors(post.post_authors)
    }));

    const practiceAreas: PracticeAreaSearchResult[] = (practiceAreasResult.data || []).map(area => ({
      type: 'practiceArea' as const,
      id: area.id,
      area_name: area.area_name,
      introduction: area.introduction,
      slug: area.slug,
      icon: area.icon,
      image_url: area.image_url
    }));

    // 전체 결과 합치기
    const all: SearchItem[] = [...lawyers, ...cases, ...media, ...practiceAreas];

    const results: SearchResults = {
      all,
      lawyers,
      cases,
      media,
      practiceAreas
    };

    return NextResponse.json(results);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 