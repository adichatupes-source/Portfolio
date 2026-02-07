

# Cloudflare Worker Integration for Notion API

## Overview
Setting up a Cloudflare Worker to act as a secure proxy between your portfolio and Notion's API. This keeps your API key secret while allowing the frontend to fetch dynamic content.

---

## Architecture

```text
+------------------+       +----------------------+       +------------------+
|   React App      |  -->  |  Cloudflare Worker   |  -->  |   Notion API     |
|   (Frontend)     |       |  (Free Tier)         |       |   (Databases)    |
+------------------+       +----------------------+       +------------------+
        |                           |                            |
   React Query              Stores API key                Blog DB + 
   caches data              as secret                     Case Studies DB
```

---

## What You'll Need to Do (Outside Lovable)

### Step 1: Create Cloudflare Account
1. Go to dash.cloudflare.com and sign up (free)
2. Navigate to Workers & Pages
3. Click "Create Worker"
4. Name it: `notion-proxy`

### Step 2: Add Worker Code
I'll provide the exact code to paste into the Cloudflare Worker editor

### Step 3: Add Your Notion API Key
1. In the Worker settings, go to "Variables"
2. Add a secret: `NOTION_API_KEY` = your key
3. Also add: `BLOG_DATABASE_ID` = `5f5ac7e317784a0893c08fb21adeec08`
4. And: `CASE_STUDIES_DATABASE_ID` = `2fc0b3d316a080dfad8a00a9ff73a0d1`

### Step 4: Deploy the Worker
Click "Deploy" - you'll get a URL like: `https://notion-proxy.YOUR-SUBDOMAIN.workers.dev`

---

## Cloudflare Worker Code (Copy This)

```javascript
export default {
  async fetch(request, env) {
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const type = url.searchParams.get('type'); // 'blogs' or 'case-studies'

    if (!type || !['blogs', 'case-studies'].includes(type)) {
      return new Response(JSON.stringify({ error: 'Invalid type parameter' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const databaseId = type === 'blogs' 
      ? env.BLOG_DATABASE_ID 
      : env.CASE_STUDIES_DATABASE_ID;

    try {
      // Build filter for published items
      const filter = {
        property: 'Status',
        select: { equals: 'Published' },
      };

      // Build sorts (newest first for blogs)
      const sorts = type === 'blogs' 
        ? [{ property: 'Published Date', direction: 'descending' }]
        : [];

      const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filter, sorts }),
      });

      if (!response.ok) {
        const error = await response.text();
        return new Response(JSON.stringify({ error: 'Notion API error', details: error }), {
          status: response.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const data = await response.json();
      
      // Transform Notion response to our format
      const items = data.results.map(page => {
        if (type === 'blogs') {
          return transformBlog(page);
        } else {
          return transformCaseStudy(page);
        }
      });

      return new Response(JSON.stringify(items), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  },
};

// Helper to extract text from Notion rich text
function getRichText(property) {
  if (!property?.rich_text?.length) return '';
  return property.rich_text.map(t => t.plain_text).join('');
}

// Helper to get title
function getTitle(property) {
  if (!property?.title?.length) return '';
  return property.title.map(t => t.plain_text).join('');
}

// Transform blog page
function transformBlog(page) {
  const props = page.properties;
  return {
    id: page.id,
    slug: getRichText(props.Slug) || page.id,
    title: getTitle(props.Title),
    excerpt: getRichText(props.Excerpt),
    content: getRichText(props.Content),
    featuredImage: props['Featured Image']?.url || props['Featured Image']?.files?.[0]?.file?.url || '',
    category: props.Category?.select?.name || '',
    author: {
      name: getRichText(props.Author) || 'Aditya Chatterjee',
    },
    publishedDate: props['Published Date']?.date?.start || new Date().toISOString().split('T')[0],
    readingTime: getRichText(props['Reading Time']) || '5 min read',
  };
}

// Transform case study page
function transformCaseStudy(page) {
  const props = page.properties;
  
  // Split multi-line text into arrays
  const splitLines = (text) => text.split('\n').map(s => s.trim()).filter(Boolean);
  
  return {
    id: getRichText(props.ID) || page.id,
    slug: getRichText(props.Slug) || page.id,
    icon: props.Icon?.select?.name || 'Building2',
    industry: getRichText(props.Industry),
    company: getRichText(props.Company),
    title: getTitle(props.Title),
    context: getRichText(props.Context),
    challenge: splitLines(getRichText(props.Challenges)),
    approach: getRichText(props.Approach),
    actions: splitLines(getRichText(props.Actions)),
    outcomes: splitLines(getRichText(props.Outcomes)),
    proves: getRichText(props['What This Proves']),
    featuredImage: props['Featured Image']?.url || props['Featured Image']?.files?.[0]?.file?.url,
  };
}
```

---


| File | Purpose |
|------|---------|
| `src/hooks/useNotionContent.ts` | React Query hooks for fetching from Cloudflare Worker |


| File | Changes |
|------|---------|
| `src/pages/Blog.tsx` | Use `useNotionBlogs()` hook with fallback to static data |
| `src/pages/BlogPost.tsx` | Use dynamic data with fallback |
| `src/pages/CaseStudies.tsx` | Use `useNotionCaseStudies()` hook with fallback |
| `src/pages/CaseStudyDetail.tsx` | Use dynamic data with fallback |
| `src/components/BlogPreviewSection.tsx` | Use dynamic data for homepage preview |
| `src/components/CaseStudiesSection.tsx` | Use dynamic data for homepage section |

---

## React Hooks Implementation

The `useNotionContent.ts` hook will:

1. **Fetch from Cloudflare Worker** using the worker URL
2. **Cache with React Query** (5-minute stale time)
3. **Fall back to static data** if the API fails
4. **Provide loading and error states** for UI feedback

Example usage in components:
```typescript
const { data: blogs, isLoading, error } = useNotionBlogs();
// Falls back to static blogPosts if API fails
```

---

## Configuration

You'll need to provide your Cloudflare Worker URL after deployment. The implementation will use an environment-friendly approach where:

1. During development: Uses static data files
2. In production: Fetches from Cloudflare Worker with static fallback

---

## Notion Database Property Names

Make sure your Notion databases use these exact property names:

**Blog Database:**
- Title (Title type)
- Slug (Text)
- Excerpt (Text)
- Content (Text)
- Featured Image (URL or Files)
- Category (Select: Fintech, Growth Strategy, Leadership)
- Author (Text)
- Published Date (Date)
- Reading Time (Text)
- Status (Select: Published, Draft)

**Case Studies Database:**
- Title (Title type)
- ID (Text)
- Slug (Text)
- Icon (Select: Building2, GraduationCap, Globe)
- Industry (Text)
- Company (Text)
- Context (Text)
- Challenges (Text - each item on new line)
- Approach (Text)
- Actions (Text - each item on new line)
- Outcomes (Text - each item on new line)
- What This Proves (Text)
- Featured Image (URL or Files)
- Status (Select: Published, Draft)

---

## Implementation Order

1. Create the `useNotionContent.ts` hook with placeholder Worker URL
2. Update all pages to use the hooks with fallback logic
3. You deploy the Cloudflare Worker externally
4. Update the Worker URL in the code
5. Test end-to-end with your Notion content

---

## Free Tier Limits (Very Generous)

Cloudflare Workers free tier includes:
- 100,000 requests/day
- No credit card required
- Global edge deployment (fast everywhere)

For a portfolio site, you'll likely use less than 1% of this limit.

