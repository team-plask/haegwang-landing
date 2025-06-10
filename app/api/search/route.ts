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


    // 결과 변환
    const lawyers: LawyerSearchResult[] = (lawyersResult.data || []).map(lawyer => ({
      type: 'lawyer' as const,
      id: lawyer.id,
      name: lawyer.name,
      lawyer_type: lawyer.lawyer_type,
      introduction: lawyer.introduction,
      profile_picture_url: lawyer.profile_picture_url,
      slug: lawyer.slug,
      practice_areas: lawyer.lawyer_practice_areas
        ?.map((lpa: any) => lpa.practice_areas?.area_name)
        .filter(Boolean) || []
    }));

    const cases: CaseSearchResult[] = (casesResult.data || []).map(post => ({
      type: 'case' as const,
      id: post.id,
      title: post.title,
      content_payload: post.content_payload,
      thumbnail_url: post.thumbnail_url,
      slug: post.slug,
      practice_area: (post.practice_areas as any)?.area_name,
      authors: post.post_authors?.map((pa: any) => pa.lawyers?.name).filter(Boolean) || []
    }));

    const media: MediaSearchResult[] = (mediaResult.data || []).map(post => ({
      type: 'media' as const,
      id: post.id,
      title: post.title,
      content_payload: post.content_payload,
      thumbnail_url: post.thumbnail_url,
      external_link: post.external_link,
      slug: post.slug,
      practice_area: (post.practice_areas as any)?.area_name,
      authors: post.post_authors?.map((pa: any) => pa.lawyers?.name).filter(Boolean) || []
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
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 