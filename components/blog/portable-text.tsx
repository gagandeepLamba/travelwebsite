import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { urlForImage } from "@/lib/sanity/image";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 font-heading text-2xl font-semibold text-foreground">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 font-heading text-xl font-semibold text-foreground">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 font-heading text-lg font-semibold text-foreground">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-4 border-primary/40 pl-4 text-lg italic text-muted-foreground">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mt-4 leading-relaxed text-foreground/90">{children}</p>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <Link
        href={value?.href ?? "#"}
        className="text-primary underline underline-offset-2 hover:text-primary/80"
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </Link>
    ),
  },
  types: {
    image: ({ value }) => {
      const url = urlForImage(value)?.width(1200).fit("max").url();
      if (!url) return null;
      return (
        <span className="mt-6 block overflow-hidden rounded-2xl">
          <Image
            src={url}
            alt={value.alt ?? ""}
            width={1200}
            height={800}
            className="h-auto w-full object-cover"
          />
        </span>
      );
    },
  },
};

export function BlogPortableText({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
