import { Link } from 'react-router-dom';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import type { BlogPost } from '@/data/blogs';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      <article className="card-elevated h-full flex flex-col overflow-hidden">
        {/* Featured Image */}
        <div className="overflow-hidden rounded-t-lg -mx-6 -mt-6 mb-4">
          <AspectRatio ratio={16 / 9}>
            <img
              src={post.featuredImage}
              alt={post.title}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </AspectRatio>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1">
          {/* Category */}
          <Badge 
            variant="secondary" 
            className="w-fit mb-3 bg-primary/10 text-primary hover:bg-primary/20"
          >
            {post.category}
          </Badge>

          {/* Title */}
          <h3 className="font-serif text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-slate line-clamp-3 mb-4 flex-1">
            {post.excerpt}
          </p>

          {/* Author and Date */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-auto pt-4 border-t border-border">
            <span className="font-medium">{post.author.name}</span>
            <span>•</span>
            <time dateTime={post.publishedDate}>
              {new Date(post.publishedDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
