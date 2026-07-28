"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BedDouble, Car, Compass, Plane, Search, Ship } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SearchField {
  key: string;
  label: string;
  placeholder?: string;
  type?: "text" | "date" | "number";
}

interface SearchTab {
  value: string;
  label: string;
  icon: typeof Plane;
  href: string;
  fields: SearchField[];
}

const searchTabs: SearchTab[] = [
  {
    value: "flights",
    label: "Flights",
    icon: Plane,
    href: "/flight-booking",
    fields: [
      { key: "from", label: "From", placeholder: "Delhi (DEL)" },
      { key: "to", label: "To", placeholder: "Dubai (DXB)" },
      { key: "depart", label: "Departure", type: "date" },
      { key: "travellers", label: "Travellers", placeholder: "1 Adult" },
    ],
  },
  {
    value: "hotels",
    label: "Hotels",
    icon: BedDouble,
    href: "/hotel-booking",
    fields: [
      { key: "city", label: "City", placeholder: "Goa" },
      { key: "checkin", label: "Check in", type: "date" },
      { key: "checkout", label: "Check out", type: "date" },
      { key: "guests", label: "Guests", placeholder: "2 Adults" },
    ],
  },
  {
    value: "tours",
    label: "Tours",
    icon: Compass,
    href: "/packages",
    fields: [
      { key: "destination", label: "Destination", placeholder: "Kerala, Rajasthan…" },
      { key: "date", label: "Travel date", type: "date" },
      { key: "travellers", label: "Travellers", placeholder: "2 Adults" },
    ],
  },
  {
    value: "cruise",
    label: "Cruise",
    icon: Ship,
    href: "/contact",
    fields: [
      { key: "destination", label: "Destination", placeholder: "Where to?" },
      { key: "date", label: "Sailing date", type: "date" },
      { key: "guests", label: "Guests", placeholder: "2 Adults" },
    ],
  },
  {
    value: "cars",
    label: "Cars",
    icon: Car,
    href: "/contact",
    fields: [
      { key: "pickup", label: "Pickup city", placeholder: "Jaipur" },
      { key: "date", label: "Pickup date", type: "date" },
      { key: "days", label: "No. of days", placeholder: "e.g. 3", type: "number" },
    ],
  },
];

export function QuickSearch() {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>({});

  function handleSearch(tab: SearchTab) {
    const params = new URLSearchParams();
    for (const field of tab.fields) {
      const value = values[field.key];
      if (value) params.set(field.key, value);
    }
    const qs = params.toString();
    router.push(qs ? `${tab.href}?${qs}` : tab.href);
  }

  return (
    <Tabs defaultValue="flights" className="w-full gap-0">
      <TabsList className="no-scrollbar h-auto w-full justify-start gap-1 overflow-x-auto rounded-t-2xl rounded-b-none bg-foreground p-2 sm:gap-1.5">
        {searchTabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="shrink-0 gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold text-background/70 data-active:bg-gold data-active:text-gold-foreground sm:text-sm"
          >
            <tab.icon className="size-3.5 sm:size-4" />
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {searchTabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-0">
          <div className="flex flex-col gap-3 rounded-b-2xl bg-card p-4 shadow-2xl shadow-black/20 ring-1 ring-foreground/5 sm:p-5 lg:flex-row lg:items-end">
            <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {tab.fields.map((field) => (
                <SearchField
                  key={field.key}
                  field={field}
                  value={values[field.key] ?? ""}
                  onChange={(v) => setValues((prev) => ({ ...prev, [field.key]: v }))}
                />
              ))}
            </div>
            <Button
              size="lg"
              className="h-11 w-full shrink-0 gap-2 rounded-xl bg-gold px-6 text-sm text-gold-foreground hover:bg-gold/90 lg:w-auto"
              onClick={() => handleSearch(tab)}
            >
              <Search className="size-4" />
              Search
            </Button>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}

function SearchField({
  field,
  value,
  onChange,
}: {
  field: SearchField;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="min-w-0">
      <Label htmlFor={`qs-${field.key}`} className="mb-1 text-[11px] uppercase tracking-wide text-muted-foreground">
        {field.label}
      </Label>
      <Input
        id={`qs-${field.key}`}
        type={field.type ?? "text"}
        inputMode={field.type === "number" ? "numeric" : undefined}
        placeholder={field.placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10"
      />
    </div>
  );
}
