import { MetadataRoute } from 'next'
import { createClient } from '@/utils/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()
  const baseUrl = 'https://lawlsc.co.kr'

  // 정적 페이지들
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/lawyers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/areas`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/success`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/media`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // 변호사 개별 페이지들
  const { data: lawyers } = await supabase
    .from('lawyers')
    .select('slug, updated_at')
    .eq('is_active', true)

  const lawyerPages: MetadataRoute.Sitemap = lawyers?.map((lawyer) => ({
    url: `${baseUrl}/lawyers/${lawyer.slug}`,
    lastModified: new Date(lawyer.updated_at),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  })) || []

  // 성공사례 개별 페이지들
  const { data: successStories } = await supabase
    .from('posts')
    .select('slug, updated_at')
    .eq('post_type', '승소사례')
    .eq('is_published', true)

  const successPages: MetadataRoute.Sitemap = successStories?.map((story) => ({
    url: `${baseUrl}/success/${story.slug}`,
    lastModified: new Date(story.updated_at),
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  })) || []

  return [...staticPages, ...lawyerPages, ...successPages]
} 