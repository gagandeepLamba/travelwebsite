import type { PortableTextBlock } from "@portabletext/types";

const WORDS_PER_MINUTE = 200;

export function estimateReadingTime(body: PortableTextBlock[] = []) {
  const wordCount = body
    .filter((block) => block._type === "block")
    .flatMap((block) => (block.children ?? []) as { text?: string }[])
    .reduce((count, child) => count + (child.text?.split(/\s+/).filter(Boolean).length ?? 0), 0);

  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
}
