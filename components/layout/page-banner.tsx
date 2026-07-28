import Image from "next/image";
import { Container } from "@/components/layout/container";

export function PageBanner({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <div className="relative h-[34dvh] min-h-64 w-full overflow-hidden">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
      <Container className="relative flex h-full flex-col justify-end pb-10">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-wide text-white/80">{eyebrow}</p>
        )}
        <h1 className="mt-2 max-w-2xl font-heading text-3xl font-semibold text-white sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-xl text-sm text-white/85 sm:text-base">{description}</p>
        )}
      </Container>
    </div>
  );
}
