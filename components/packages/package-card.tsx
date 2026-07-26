import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Star } from "lucide-react";
import type { TourPackage } from "@/lib/types";
import { packageCategories } from "@/lib/constants/site";

export function PackageCard({ pkg, priority = false }: { pkg: TourPackage; priority?: boolean }) {
  const category = packageCategories.find((c) => c.slug === pkg.category);

  return (
    <Link
      href={`/packages/${pkg.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm shadow-black/5 transition-shadow hover:shadow-lg hover:shadow-black/10"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={pkg.heroImage.url}
          alt={pkg.heroImage.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
        {category && (
          <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-foreground backdrop-blur-sm">
            {category.label}
          </span>
        )}
        <span className="absolute bottom-3 left-3 flex items-center gap-1 text-xs font-medium text-white">
          <Clock className="size-3.5" />
          {pkg.duration.nights}N / {pkg.duration.days}D
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <h3 className="font-heading text-base font-semibold leading-snug text-foreground group-hover:text-primary">
          {pkg.title}
        </h3>

        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="size-3.5 shrink-0" />
          <span className="truncate">{pkg.destinations.join(" · ")}</span>
        </p>

        <div className="flex items-center gap-1 text-xs font-medium text-foreground">
          <Star className="size-3.5 fill-gold text-gold" />
          {pkg.rating.toFixed(1)}
          <span className="font-normal text-muted-foreground">({pkg.reviewCount})</span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            <p className="text-[11px] text-muted-foreground">Starting from</p>
            <p className="font-heading text-lg font-semibold text-foreground">
              ₹{pkg.price.amount.toLocaleString("en-IN")}
              <span className="text-xs font-normal text-muted-foreground"> /{pkg.price.unit}</span>
            </p>
          </div>
          <span className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
            View details
          </span>
        </div>
      </div>
    </Link>
  );
}
