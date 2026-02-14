import { useQuery } from '@tanstack/react-query';
import { blogPosts as staticBlogPosts, BlogPost } from '@/data/blogs';
import { caseStudies as staticCaseStudies, CaseStudy } from '@/data/caseStudies';

// ============================================================
// CONFIGURATION
// ============================================================
// Use your Netlify function endpoint for live Notion data
// Example: https://your-site-name.netlify.app/.netlify/functions/notion-proxy
const WORKER_URL = 'https://clickszy.com/.netlify/functions/notion-proxy';

// ============================================================
// TYPES
// ============================================================
export type { BlogPost, CaseStudy };

// ============================================================
// FETCH FUNCTIONS
// ============================================================

async function fetchBlogs(): Promise<BlogPost[]> {
  if (!WORKER_URL) {
    console.log('[Notion] No Worker URL configured, using static data');
    return staticBlogPosts;
  }

  try {
    const response = await fetch(`${WORKER_URL}?type=blogs`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch blogs: ${response.status}`);
    }
    
    const data = await response.json();
    return data as BlogPost[];
  } catch (error) {
    console.error('[Notion] Failed to fetch blogs, falling back to static data:', error);
    return staticBlogPosts;
  }
}

async function fetchCaseStudies(): Promise<CaseStudy[]> {
  if (!WORKER_URL) {
    console.log('[Notion] No Worker URL configured, using static data');
    return staticCaseStudies;
  }

  try {
    const response = await fetch(`${WORKER_URL}?type=case-studies`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch case studies: ${response.status}`);
    }
    
    const data = await response.json();
    return data as CaseStudy[];
  } catch (error) {
    console.error('[Notion] Failed to fetch case studies, falling back to static data:', error);
    return staticCaseStudies;
  }
}

// ============================================================
// REACT QUERY HOOKS
// ============================================================

/**
 * Hook to fetch blog posts from Notion via Cloudflare Worker
 * Falls back to static data if the API is unavailable
 */
export function useNotionBlogs() {
  return useQuery({
    queryKey: ['notion-blogs'],
    queryFn: fetchBlogs,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes (formerly cacheTime)
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook to fetch case studies from Notion via Cloudflare Worker
 * Falls back to static data if the API is unavailable
 */
export function useNotionCaseStudies() {
  return useQuery({
    queryKey: ['notion-case-studies'],
    queryFn: fetchCaseStudies,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook to get a single blog post by slug
 * Returns the post from the cached blog data
 */
export function useNotionBlogPost(slug: string | undefined) {
  const { data: blogs, isLoading, error } = useNotionBlogs();
  
  const post = slug ? blogs?.find((p) => p.slug === slug) : undefined;
  
  return {
    data: post,
    isLoading,
    error,
    notFound: !isLoading && !post && !!slug,
  };
}

/**
 * Hook to get a single case study by slug
 * Returns the study from the cached case studies data
 */
export function useNotionCaseStudy(slug: string | undefined) {
  const { data: studies, isLoading, error } = useNotionCaseStudies();
  
  const study = slug ? studies?.find((s) => s.slug === slug) : undefined;
  
  return {
    data: study,
    isLoading,
    error,
    notFound: !isLoading && !study && !!slug,
  };
}
