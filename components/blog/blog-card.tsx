import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { urlForImage } from "@/lib/sanity/image";
import type { SanityPostSummary } from "@/lib/sanity/queries";

export function BlogCard({ post, priority = false }: { post: SanityPostSummary; priority?: boolean }) {
  const imageUrl = post.mainImage
    ? urlForImage(post.mainImage)?.width(800).height(600).fit("crop").url()
    : null;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm shadow-black/5 transition-shadow hover:shadow-lg hover:shadow-black/10"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={post.mainImage?.alt ?? post.title}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {post.categories?.[0] && (
          <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-foreground backdrop-blur-sm">
            {post.categories[0].title}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs text-muted-foreground">
          {format(new Date(post.publishedAt), "MMM d, yyyy")}
          {post.author?.name ? ` · ${post.author.name}` : ""}
        </p>
        <h3 className="font-heading text-base font-semibold leading-snug text-foreground group-hover:text-primary">
          {post.title}
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
        <span className="mt-auto pt-2 text-sm font-semibold text-primary">Read article →</span>
      </div>
    </Link>
  );
}
