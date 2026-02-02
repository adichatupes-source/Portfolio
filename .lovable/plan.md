
# Blog Section & Dynamic Content Architecture

## Overview
Adding a blog system and restructuring case studies to support dynamic content with pagination. The blog design will match the existing portfolio's Classic Navy & White aesthetic — using the same typography (Playfair Display headings, Inter body), card styles, and color palette already established.

---

## Design Approach

The blog will feel like a natural extension of the portfolio, using:
- Same navy (#1e3a5f) headers and accents
- Same `card-elevated` styling for blog cards
- Same section headers and spacing patterns
- Consistent button styles (`btn-primary`, `btn-secondary`)

---

## New Pages Structure

| Route | Purpose |
|-------|---------|
| `/` | Homepage with preview sections |
| `/blog` | Blog listing page with pagination |
| `/blog/:slug` | Individual blog post detail |
| `/case-studies` | Case studies listing with pagination |
| `/case-studies/:slug` | Individual case study detail |

---

## Homepage Updates

### New Blog Preview Section
Positioned between Philosophy and Credibility sections:
- Section title: "Insights & Perspectives"
- Subtitle: "Thoughts on growth, GTM strategy, and building revenue engines"
- Display 3 latest blog posts in a responsive grid
- "See All Insights" button linking to `/blog`

### Case Studies Section Update
- Keep existing expandable preview (3 cases)
- Add "See All Case Studies" button below, linking to `/case-studies`

---

## Blog Card Design (Matching Portfolio Style)

```text
+------------------------------------------+
|  [Featured Image - 16:9 AspectRatio]     |
|  object-cover, rounded-lg                |
+------------------------------------------+
|  CATEGORY TAG (primary/10 bg)            |
|                                          |
|  Blog Title (Playfair Display)           |
|                                          |
|  Short excerpt text in slate color       |
|  limited to 2-3 lines...                 |
|                                          |
|  📷 Author Name  •  Jan 15, 2024         |
+------------------------------------------+
```

Uses existing `card-elevated` class with hover shadow effect.

---

## Blog Listing Page (`/blog`)

### Header Section
- Navy gradient background (matching hero)
- Large serif title: "Insights & Perspectives"
- Subtitle describing the blog focus

### Content Grid
- Responsive: 1 column mobile, 2 columns tablet, 3 columns desktop
- Blog cards with featured images
- Pagination controls at bottom

### Pagination Component
- "Previous" / "Next" buttons
- Page numbers for quick navigation
- Shows 6 posts per page

---

## Blog Detail Page (`/blog/:slug`)

### Layout
- Back navigation: "← Back to Insights"
- Category tag
- Large serif title
- Author info with avatar and date
- Full-width featured image (16:9 ratio)
- Content area: centered, max-width 720px for readability
- Proper typography for headings, paragraphs, lists

---

## Case Studies Pages

### Listing Page (`/case-studies`)
- Similar hero header style
- Cards showing: industry icon, company, title, brief context
- Each card links to detail page

### Detail Page (`/case-studies/:slug`)
- Full structured layout matching current expandable content
- Sections: Context, Challenge, Approach, Actions, Outcomes, What This Proves
- Professional presentation with clear visual hierarchy

---

## Navigation Updates

Current:
```
What I Do | Case Studies | Philosophy | About
```

Updated:
```
What I Do | Case Studies | Blog | Philosophy | About
```

- "Case Studies" links to `/case-studies`
- "Blog" links to `/blog`

---

## Dynamic Data Architecture (Notion-Ready)

### Data Interfaces

**BlogPost:**
- id, slug, title, excerpt
- content (markdown)
- featuredImage, category
- author (name, avatar)
- publishedDate, readingTime

**CaseStudy:**
- id, slug, icon, industry, company
- title, context, challenge[], approach
- actions[], outcomes[], proves
- featuredImage (optional)

### Data Files
- `src/data/blogs.ts` — Sample blog posts array
- `src/data/caseStudies.ts` — Case studies extracted from current component

### Pagination Hook
Reusable `usePagination` hook:
- Current page state
- Items per page configuration
- Total pages calculation
- Navigation functions

---

## Notion Integration Guide

After the portfolio is live, you can connect to Notion for dynamic content:

### Step 1: Create Notion Databases

**Blog Database:**
| Property | Type |
|----------|------|
| Title | Title |
| Slug | Text |
| Excerpt | Text |
| Content | Text (Markdown) |
| Featured Image | Files |
| Category | Select |
| Author | Text |
| Published Date | Date |
| Status | Select (Draft/Published) |

**Case Studies Database:**
| Property | Type |
|----------|------|
| Title | Title |
| Slug | Text |
| Industry | Select |
| Company | Text |
| Context | Text |
| Challenges | Text |
| Approach | Text |
| Actions | Text |
| Outcomes | Text |
| What This Proves | Text |
| Featured Image | Files |
| Status | Select |

### Step 2: Set Up Notion Integration
1. Create integration at notion.so/my-integrations
2. Share databases with the integration
3. Note the Integration Token and Database IDs

### Step 3: Create Backend Function
A Supabase Edge Function will:
- Fetch data from Notion API
- Transform to your data structure
- Cache for performance

### Step 4: Connect Frontend
Replace static data imports with API calls using React Query:
```typescript
const { data: blogs } = useQuery({
  queryKey: ['blogs', page],
  queryFn: () => fetchBlogsFromNotion(page)
});
```

---

## Files to Create

| File | Purpose |
|------|---------|
| `src/data/blogs.ts` | Sample blog posts with placeholder content |
| `src/data/caseStudies.ts` | Case studies data extracted from current component |
| `src/hooks/usePagination.ts` | Reusable pagination logic |
| `src/components/BlogCard.tsx` | Blog card component |
| `src/components/BlogPreviewSection.tsx` | Homepage blog preview |
| `src/components/Pagination.tsx` | Pagination controls component |
| `src/pages/Blog.tsx` | Blog listing page |
| `src/pages/BlogPost.tsx` | Individual blog post page |
| `src/pages/CaseStudies.tsx` | Case studies listing page |
| `src/pages/CaseStudyDetail.tsx` | Individual case study page |

## Files to Modify

| File | Changes |
|------|---------|
| `src/App.tsx` | Add new routes |
| `src/components/Header.tsx` | Add Blog link, update Case Studies link |
| `src/components/CaseStudiesSection.tsx` | Add "See All" button |
| `src/pages/Index.tsx` | Add BlogPreviewSection |

---

## Sample Blog Content

Three sample posts matching the WCT Pay content style:
1. "The Enterprise Shift to OTC Settlement" — Fintech/payments focus
2. "Building Predictable Demand Engines" — Growth strategy
3. "Why GTM Thinking Matters Before Execution" — Thought leadership

---

## Implementation Order

1. Create data files with sample content
2. Build pagination hook
3. Create BlogCard and Pagination components
4. Build Blog listing and detail pages
5. Build CaseStudies listing and detail pages
6. Update App.tsx with new routes
7. Update Header navigation
8. Add BlogPreviewSection to homepage
9. Add "See All" buttons to homepage sections
