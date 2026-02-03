

# Notion API Integration for Dynamic Blog & Case Studies

## Overview
Connecting your Notion databases to the portfolio so blog posts and case studies are fetched dynamically. This requires storing your API key securely, creating an Edge Function to fetch from Notion, and updating the frontend to use React Query.

---

## Security First: Storing Your Notion API Key

Your Notion Integration Key must be stored as a secret (never in code). After this plan is approved:
1. I'll prompt you to add the secret securely via a button
2. The key will be stored encrypted and only accessible to the Edge Function

---

## Architecture

```text
+------------------+       +----------------------+       +------------------+
|   React App      |  -->  |  Supabase Edge       |  -->  |   Notion API     |
|   (Frontend)     |       |  Function            |       |   (Databases)    |
+------------------+       +----------------------+       +------------------+
        |                           |                            |
   React Query              Fetches & transforms          Blog DB + 
   caches data              Notion responses              Case Studies DB
```

---

## Notion Database Structure Required

Your Notion databases should have these properties:

### Blog Database (ID: 5f5ac7e317784a0893c08fb21adeec08)
| Property | Notion Type | Maps To |
|----------|-------------|---------|
| Title | Title | title |
| Slug | Text | slug |
| Excerpt | Text | excerpt |
| Content | Text (Markdown) | content |
| Featured Image | URL or Files | featuredImage |
| Category | Select | category |
| Author | Text | author.name |
| Published Date | Date | publishedDate |
| Reading Time | Text | readingTime |
| Status | Select | (filter: Published only) |

### Case Studies Database (ID: 2fc0b3d316a080dfad8a00a9ff73a0d1)
| Property | Notion Type | Maps To |
|----------|-------------|---------|
| Title | Title | title |
| Slug | Text | slug |
| Icon | Select | icon (Building2, GraduationCap, Globe) |
| Industry | Text | industry |
| Company | Text | company |
| Context | Text | context |
| Challenges | Text (multi-line) | challenge[] |
| Approach | Text | approach |
| Actions | Text (multi-line) | actions[] |
| Outcomes | Text (multi-line) | outcomes[] |
| What This Proves | Text | proves |
| Featured Image | URL or Files | featuredImage |
| Status | Select | (filter: Published only) |

**Note**: Multi-line text fields (Challenges, Actions, Outcomes) should use newlines to separate items.

---

## Implementation Steps

### Step 1: Store Notion Secret
Add `NOTION_API_KEY` as an encrypted secret

### Step 2: Create Edge Function
Create `supabase/functions/fetch-notion-content/index.ts`:
- Accepts `type` parameter (blogs or case-studies)
- Fetches from appropriate Notion database
- Transforms Notion response to our data structure
- Returns formatted JSON

### Step 3: Create React Hooks
Create custom hooks that wrap React Query:
- `useNotionBlogs()` - fetches blog posts
- `useNotionCaseStudies()` - fetches case studies
- Both handle loading states, caching, and errors

### Step 4: Update Pages
Modify existing pages to use dynamic data:
- `Blog.tsx` - use `useNotionBlogs()`
- `BlogPost.tsx` - use `useNotionBlogs()` and find by slug
- `CaseStudies.tsx` - use `useNotionCaseStudies()`
- `CaseStudyDetail.tsx` - use `useNotionCaseStudies()` and find by slug
- `BlogPreviewSection.tsx` - use `useNotionBlogs()` for homepage preview

---

## Files to Create

| File | Purpose |
|------|---------|
| `supabase/functions/fetch-notion-content/index.ts` | Edge Function to fetch from Notion |
| `supabase/config.toml` | Configure the edge function |
| `src/hooks/useNotionContent.ts` | React Query hooks for fetching content |

## Files to Modify

| File | Changes |
|------|---------|
| `src/pages/Blog.tsx` | Use `useNotionBlogs()` instead of static import |
| `src/pages/BlogPost.tsx` | Use `useNotionBlogs()` for single post |
| `src/pages/CaseStudies.tsx` | Use `useNotionCaseStudies()` |
| `src/pages/CaseStudyDetail.tsx` | Use `useNotionCaseStudies()` for single study |
| `src/components/BlogPreviewSection.tsx` | Use `useNotionBlogs()` |
| `src/components/CaseStudiesSection.tsx` | Use `useNotionCaseStudies()` |

---

## Edge Function Details

The Edge Function will:

1. **Authenticate** with Notion using your API key
2. **Query** the appropriate database based on the `type` parameter
3. **Filter** to only return items with Status = "Published"
4. **Sort** by Published Date (newest first for blogs)
5. **Transform** Notion's complex response format to our simple interfaces
6. **Handle** errors gracefully with meaningful messages

### Notion API Specifics
- Uses `@notionhq/client` for type-safe API calls
- Handles Notion's nested property structure
- Extracts text from rich text arrays
- Parses multi-line fields into arrays

---

## Fallback Strategy

Keep the static data files as fallbacks:
- If Notion API fails, show cached/static data
- Display loading skeletons while fetching
- Show error message if both fail

---

## Caching Strategy

React Query configuration:
- `staleTime`: 5 minutes (data considered fresh)
- `cacheTime`: 30 minutes (keep in memory)
- Automatic refetch on window focus (optional)

This reduces API calls while keeping content relatively fresh.

---

## Testing After Implementation

1. Add test content to your Notion databases
2. Verify the Edge Function returns correct data
3. Check blog listing page loads dynamically
4. Verify case studies page loads dynamically
5. Test individual detail pages
6. Confirm homepage previews work

---

## Setting Up Your Notion Databases

If you haven't already set up your Notion databases with the exact properties:

### For Blog Database:
1. Create properties matching the table above
2. Add a "Status" select with "Published" and "Draft" options
3. Add a test blog post with Status = "Published"

### For Case Studies Database:
1. Create properties matching the table above
2. For Challenges/Actions/Outcomes, put each item on a new line
3. Add a test case study with Status = "Published"

