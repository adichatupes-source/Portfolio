import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { BlogPostSkeleton } from '@/components/ContentSkeleton';
import { useNotionBlogPost } from '@/hooks/useNotionContent';

// ---- Types ----
interface NotionTextItem {
  type: 'text';
  text: {
    content: string;
    link: { url: string } | null; // ✅ fixed from string | null
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href: string | null;
}

// ---- Annotated Span ----
function AnnotatedSpan({ item }: { item: NotionTextItem }) {
  const { bold, italic, strikethrough, underline, code, color } = item.annotations;

  const colorMap: Record<string, string> = {
    red: 'text-red-500', blue: 'text-blue-500', green: 'text-green-500',
    yellow: 'text-yellow-500', orange: 'text-orange-500', purple: 'text-purple-500',
    pink: 'text-pink-500', gray: 'text-gray-500', default: '',
  };

  // Preserve content exactly — never trim
  let node: React.ReactNode = item.text.content;

  if (code)          node = <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono border border-border">{node}</code>;
  if (bold)          node = <strong className="font-semibold text-foreground">{node}</strong>;
  if (italic)        node = <em className="italic">{node}</em>;
  if (strikethrough) node = <s>{node}</s>;
  if (underline)     node = <u>{node}</u>;

  const colorClass = color !== 'default' ? (colorMap[color] ?? '') : '';

  // ✅ Check text.link.url first, fallback to href
  const linkUrl = item.text.link?.url || item.href;

  if (linkUrl) {
    // ✅ Internal link — use React Router Link
    const isInternal = linkUrl.startsWith('/') || linkUrl.includes('clickszy.com');

    if (isInternal) {
      return (
        <Link
          to={linkUrl.replace(/^https?:\/\/clickszy\.com/, '')}
          className={`underline text-primary hover:opacity-80 transition-opacity ${colorClass}`}
        >
          {node}
        </Link>
      );
    }

    // ✅ External link
    return (
      <a
        href={linkUrl}
        className={`underline text-primary hover:opacity-80 transition-opacity ${colorClass}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {node}
      </a>
    );
  }

  return <span className={colorClass || undefined}>{node}</span>;
}

// ---- Full Notion Rich Text Renderer ----
function NotionRichTextRenderer({ content }: { content: NotionTextItem[] }) {
  if (!content?.length) return null;

  // Flatten into tokens split by \n
  type Token = { type: 'span'; item: NotionTextItem } | { type: 'newline' };
  const tokens: Token[] = [];

  content.forEach((item) => {
    const parts = item.text.content.split('\n');
    parts.forEach((part, index) => {
      if (index > 0) tokens.push({ type: 'newline' });
      if (part !== '') {
        tokens.push({
          type: 'span',
          item: { ...item, text: { ...item.text, content: part }, plain_text: part },
        });
      }
    });
  });

  // Group tokens into lines
  const lines: NotionTextItem[][] = [];
  let currentLine: NotionTextItem[] = [];
  tokens.forEach((token) => {
    if (token.type === 'newline') {
      lines.push(currentLine);
      currentLine = [];
    } else {
      currentLine.push(token.item);
    }
  });
  if (currentLine.length) lines.push(currentLine);

  return (
    <div className="space-y-1">
      {lines.map((line, lineIndex) => {
        // Empty line = paragraph spacing
        if (line.length === 0) {
          return <div key={lineIndex} className="h-4" />;
        }

        const lineText = line.map((i) => i.plain_text).join('');
        const isBullet = lineText.startsWith('•');
        const isHeading = line.every((i) => i.annotations.bold) && line.length > 0;

        if (isBullet) {
          const bulletContent = line.map((item, i) => ({
            ...item,
            text: {
              ...item.text,
              content: i === 0 ? item.text.content.replace(/^•\s*/, '') : item.text.content,
            },
            plain_text: i === 0 ? item.plain_text.replace(/^•\s*/, '') : item.plain_text,
          }));

          return (
            <div key={lineIndex} className="flex items-start gap-3 pl-2 py-0.5">
              <span className="text-primary mt-2 text-xs flex-shrink-0">●</span>
              <p className="text-base text-slate leading-relaxed" style={{ textAlign: 'justify' }}>
                {bulletContent.map((item, i) => <AnnotatedSpan key={i} item={item} />)}
              </p>
            </div>
          );
        }

        if (isHeading) {
          return (
            <h2
              key={lineIndex}
              className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-2 pt-4"
            >
              {line.map((item, i) => (
                <span key={i}>{item.text.content}</span>
              ))}
            </h2>
          );
        }

        // Regular paragraph — no flex, inline spans, justified
        return (
          <p
            key={lineIndex}
            className="text-base text-slate leading-relaxed mb-1"
            style={{ textAlign: 'justify' }}
          >
            {line.map((item, i) => <AnnotatedSpan key={i} item={item} />)}
          </p>
        );
      })}
    </div>
  );
}

// ---- Blog Post Page ----
export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, notFound } = useNotionBlogPost(slug);

  const isRichContent = Array.isArray(post?.content);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <BlogPostSkeleton />
        </main>
        <Footer />
      </div>
    );
  }

  if (notFound || !post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero */}
        <section className="pt-32 pb-12 bg-gradient-to-b from-primary/5 to-background">
          <div className=" mx-auto px-6 md:px-24">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Insights
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge
                variant="secondary"
                className="mb-4 bg-primary/10 text-primary hover:bg-primary/20"
              >
                {post.category}
              </Badge>

              <h1 className="heading-display text-primary mb-6">{post.title}</h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author.name}</span>
                </div>
                <span>•</span>
                <time dateTime={post.publishedDate}>
                  {new Date(post.publishedDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readingTime}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="pb-8">
          <div className=" mx-auto px-6 md:px-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-xl overflow-hidden shadow-lg"
            >
              <AspectRatio ratio={16 / 9}>
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-8 pb-20">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto px-6 md:px-24"
          >
            {/* Excerpt as styled intro */}
            {post.excerpt && (
              <p
                className="text-lg text-slate leading-relaxed font-medium mb-8 "
                style={{ textAlign: 'justify' }}
              >
                {post.excerpt}
              </p>
            )}

            {/* Rich Notion Content */}
            {isRichContent ? (
              <NotionRichTextRenderer content={post.content as unknown as NotionTextItem[]} />
            ) : (
              <p
                className="text-base text-slate leading-relaxed"
                style={{ textAlign: 'justify' }}
              >
                {post.content as unknown as string}
              </p>
            )}
          </motion.article>
        </section>
      </main>

      <Footer />
    </div>
  );
}
