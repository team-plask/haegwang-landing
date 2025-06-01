import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import PostDetailSection from "@/sections/success/post-detail-section";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function SuccessDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  
  // Fetch post data with authors
  const { data: post, error } = await supabase
    .from("posts")
    .select(`
      *,
      practice_area:practice_area_id(
        id,
        area_name,
        slug
      ),
      post_authors!inner(
        lawyer_id,
        lawyer:lawyers(*)
      )
    `)
    .eq("slug", slug)
    .eq("post_type", "승소사례")
    .single();

  if (error || !post) {
    notFound();
  }

  // Transform the data structure for PostDetailSection
  const authors = post.post_authors?.map((pa: {
    lawyer_id: string;
    lawyer: {
      id: string;
      name: string;
      lawyer_type: string | null;
      profile_picture_url: string | null;
      slug: string | null;
    };
  }) => ({
    lawyer_id: pa.lawyer_id,
    post_id: post.id,
    lawyer: pa.lawyer
  })) || [];

  return <PostDetailSection post={post} authors={authors} />;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  
  const { data: post } = await supabase
    .from("posts")
    .select("title, content_payload")
    .eq("slug", slug)
    .eq("post_type", "승소사례")
    .single();

  if (!post) {
    return {
      title: "승소사례 | 법무법인 해광",
    };
  }

  // Extract description from content_payload
  const contentPayload = post.content_payload as {
    main_markdown_content?: string;
    case_overview_markdown?: string;
  };
  const description = contentPayload?.main_markdown_content?.slice(0, 160) || 
                     contentPayload?.case_overview_markdown?.slice(0, 160) || "";

  return {
    title: `${post.title} | 승소사례 | 법무법인 해광`,
    description: description,
  };
}
