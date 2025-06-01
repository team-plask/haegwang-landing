import { createClient } from '@/utils/supabase/server';
import { LawyerProfileSection, type LawyerProfileFromDB } from '@/sections/lawyers/lawyer-profile-section';
import { notFound } from 'next/navigation';
import { LawyerSpecSection, type LawyerSpecFromDB } from '@/sections/lawyers/lawyer-spec-section';
import { SuccessSection, type PostCardFromDB } from '@/sections/areas/success-section';
import type { Database } from '@/database.types'; // Import Database type
import type { Metadata } from 'next';

export const revalidate = 3600; // Revalidate at most every hour

// export async function generateStaticParams() {
//   const supabase = createClient();
//   const { data: lawyers } = await supabase.from('lawyers').select('slug').filter('slug', 'not.is', null);
//   return lawyers?.map(({ slug }) => ({
//     slug,
//   })) || [];
// }

interface LawyerPageData extends LawyerProfileFromDB, LawyerSpecFromDB {
  success_stories: PostCardFromDB[];
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: lawyer } = await supabase
    .from('lawyers')
    .select('name, lawyer_type, introduction')
    .eq('slug', slug)
    .maybeSingle();

  if (!lawyer) {
    return {
      title: '변호사 정보를 찾을 수 없습니다 - 법무법인 해광',
      description: '요청하신 변호사 정보를 찾을 수 없습니다.',
    };
  }

  const title = `${lawyer.name} ${lawyer.lawyer_type || '변호사'} - 법무법인 해광`;
  const description = lawyer.introduction 
    ? lawyer.introduction.substring(0, 150) + '...' 
    : `${lawyer.name} 변호사의 상세 프로필입니다. 법무법인 해광의 전문 변호사 정보를 확인하세요.`;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      // Add other Open Graph tags if needed, e.g., images
    },
  };
}

async function getLawyerBySlug(slug: string): Promise<LawyerPageData | null> {
  const supabase = await createClient();
  console.log('[getLawyerBySlug] Fetching lawyer with slug:', slug);
  
  const { data, error } = await supabase
    .from('lawyers')
    .select(`
      id, name, lawyer_type, profile_picture_url, slug,
      phone_number, fax_number, email, introduction,
      education, experience, awards_publications,
      practice_areas:lawyer_practice_areas!left(
        practice_areas!inner(area_name, slug)
      ),
      authored_posts:post_authors!left(
        post:posts!inner(
          id, title, content_payload, external_link, post_type, slug,
          practice_area:practice_area_id!left(id, area_name, slug),
          all_authors_for_post:post_authors!inner(
            lawyers!inner(name, profile_picture_url, id, slug)
          )
        )
      )
    `)
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    console.error('[getLawyerBySlug] Supabase error:', error);
    return null;
  }
  if (!data) {
    console.log('[getLawyerBySlug] No data found for slug:', slug);
    return null;
  }

  console.log('[getLawyerBySlug] Found lawyer:', data.name);
  console.log('[getLawyerBySlug] Practice areas count:', data.practice_areas?.length || 0);
  console.log('[getLawyerBySlug] Authored posts count:', data.authored_posts?.length || 0);

  // Transform practice areas from join table structure
  // The query returns an array of { practice_areas: { area_name, slug } }
  const transformedPracticeAreas = Array.isArray(data.practice_areas) && data.practice_areas.length > 0
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? data.practice_areas.map((pa_join: any) => pa_join.practice_areas).filter(pa => pa) // Filter out any null/undefined
    : [];

  let transformedSuccessStories: PostCardFromDB[] = [];
  if (data.authored_posts && Array.isArray(data.authored_posts) && data.authored_posts.length > 0) {
    transformedSuccessStories = data.authored_posts
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map((authoredPostEntry: any) => {
        const postData = authoredPostEntry.post;
        if (!postData || postData.post_type !== "승소사례") {
          return null;
        }

        const allAuthorsForThisPost = (postData.all_authors_for_post && Array.isArray(postData.all_authors_for_post)) 
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ? postData.all_authors_for_post.map((authorLink: any) => ({ lawyers: authorLink.lawyers })) 
          : [];

        return {
          id: postData.id,
          title: postData.title,
          content_payload: postData.content_payload,
          external_link: postData.external_link,
          slug: postData.slug,
          post_type: postData.post_type as Database["public"]["Enums"]["post_type_enum"],
          practice_area: postData.practice_area,
          post_authors: allAuthorsForThisPost,
        };
      })
      .filter((post): post is PostCardFromDB => post !== null);
  }

  // Exclude original 'authored_posts' and 'practice_areas' before spreading, then add transformed versions
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { authored_posts, practice_areas, ...restOfLawyerData } = data;
  
  const finalData: LawyerPageData = {
    ...(restOfLawyerData as Omit<typeof data, 'authored_posts' | 'practice_areas' | 'id' | 'name' | 'lawyer_type' | 'profile_picture_url' | 'slug' | 'phone_number' | 'fax_number' | 'email' | 'introduction' | 'education' | 'experience' | 'awards_publications'>), // Ensure correct base type for spread
    // Explicitly map known fields from restOfLawyerData to ensure type safety for LawyerProfileFromDB and LawyerSpecFromDB parts
    id: restOfLawyerData.id,
    name: restOfLawyerData.name,
    lawyer_type: restOfLawyerData.lawyer_type,
    profile_picture_url: restOfLawyerData.profile_picture_url,
    slug: restOfLawyerData.slug,
    phone_number: restOfLawyerData.phone_number,
    fax_number: restOfLawyerData.fax_number,
    email: restOfLawyerData.email,
    introduction: restOfLawyerData.introduction,
    education: restOfLawyerData.education,
    experience: restOfLawyerData.experience,
    awards_publications: restOfLawyerData.awards_publications,
    practice_areas: transformedPracticeAreas, // Use transformed practice_areas
    success_stories: transformedSuccessStories,
  };

  return finalData;
}

export default async function LawyerProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  await Promise.resolve();

  const { slug } = await params;
  const lawyerData = await getLawyerBySlug(slug);

  if (!lawyerData) {
    notFound();
  }

  const { success_stories, ...lawyerProfileAndSpecs } = lawyerData;

  const lawyerSpecsArray: LawyerSpecFromDB[] = [{
    education: lawyerProfileAndSpecs.education,
    experience: lawyerProfileAndSpecs.experience,
    awards_publications: lawyerProfileAndSpecs.awards_publications,
  }];


  return (
    <>
      <LawyerProfileSection lawyer={lawyerProfileAndSpecs} />
      <LawyerSpecSection lawyerSpecs={lawyerSpecsArray} />
      {success_stories && success_stories.length > 0 && (
        <SuccessSection success={success_stories} />
      )}
      {/* You might want to add more sections here, like detailed experience, education, etc. */}
    </>
  );
} 