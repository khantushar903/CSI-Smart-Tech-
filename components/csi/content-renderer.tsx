"use client";

import { cn } from "@/lib/utils";

interface ContentRendererProps {
  content: string;
  className?: string;
}

type ContentBlock =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "quote"; text: string };

function cleanInline(text: string): string {
  return text
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .replace(/~~([^~]+)~~/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function parseContent(content: string): ContentBlock[] {
  const sanitized = content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\r\n/g, "\n")
    .trim();

  const lines = sanitized.split("\n");
  const blocks: ContentBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i]?.trim() ?? "";

    if (!line) {
      i += 1;
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      blocks.push({
        type: "heading",
        level: headingMatch[1].length,
        text: cleanInline(headingMatch[2]),
      });
      i += 1;
      continue;
    }

    const quoteMatch = line.match(/^>\s?(.+)$/);
    if (quoteMatch) {
      const quoteLines: string[] = [cleanInline(quoteMatch[1])];
      i += 1;
      while (i < lines.length) {
        const nextLine = (lines[i] ?? "").trim();
        const nextQuoteMatch = nextLine.match(/^>\s?(.+)$/);
        if (!nextQuoteMatch) {
          break;
        }
        quoteLines.push(cleanInline(nextQuoteMatch[1]));
        i += 1;
      }
      blocks.push({ type: "quote", text: quoteLines.join(" ") });
      continue;
    }

    const orderedMatch = line.match(/^\d+\.\s+(.+)$/);
    const unorderedMatch = line.match(/^[-*+]\s+(.+)$/);
    if (orderedMatch || unorderedMatch) {
      const ordered = Boolean(orderedMatch);
      const items: string[] = [
        cleanInline((orderedMatch ?? unorderedMatch)?.[1] ?? ""),
      ];
      i += 1;

      while (i < lines.length) {
        const nextLine = (lines[i] ?? "").trim();
        const nextItemMatch = ordered
          ? nextLine.match(/^\d+\.\s+(.+)$/)
          : nextLine.match(/^[-*+]\s+(.+)$/);

        if (!nextItemMatch) {
          break;
        }

        items.push(cleanInline(nextItemMatch[1]));
        i += 1;
      }

      blocks.push({ type: "list", ordered, items });
      continue;
    }

    const paragraphLines: string[] = [cleanInline(line)];
    i += 1;

    while (i < lines.length) {
      const nextLine = (lines[i] ?? "").trim();
      if (!nextLine) {
        break;
      }
      if (
        /^(#{1,6})\s+/.test(nextLine) ||
        /^>\s?/.test(nextLine) ||
        /^\d+\.\s+/.test(nextLine) ||
        /^[-*+]\s+/.test(nextLine)
      ) {
        break;
      }
      paragraphLines.push(cleanInline(nextLine));
      i += 1;
    }

    blocks.push({ type: "paragraph", text: paragraphLines.join(" ") });
  }

  return blocks.filter((block) => {
    if (block.type === "list") {
      return block.items.length > 0;
    }
    return block.text.length > 0;
  });
}

export function ContentRenderer({ content, className }: ContentRendererProps) {
  const blocks = parseContent(content);

  return (
    <div
      className={cn(
        "space-y-5 text-sm leading-7 text-muted-foreground",
        className,
      )}
    >
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          const headingClass =
            block.level === 1
              ? "text-2xl font-semibold tracking-tight text-foreground"
              : block.level === 2
                ? "text-xl font-semibold tracking-tight text-foreground"
                : block.level === 3
                  ? "text-lg font-semibold text-foreground"
                  : "text-base font-semibold text-foreground";

          return (
            <h3 key={`heading-${index}`} className={cn("pt-1", headingClass)}>
              {block.text}
            </h3>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote
              key={`quote-${index}`}
              className="rounded-r-md border-l-2 border-accent/40 pl-4 italic text-foreground/80"
            >
              {block.text}
            </blockquote>
          );
        }

        if (block.type === "list") {
          const ListTag = block.ordered ? "ol" : "ul";
          return (
            <ListTag
              key={`list-${index}`}
              className={cn(
                "space-y-2 pl-5 text-muted-foreground marker:text-accent",
                block.ordered ? "list-decimal" : "list-disc",
              )}
            >
              {block.items.map((item, itemIndex) => (
                <li key={`item-${index}-${itemIndex}`}>{item}</li>
              ))}
            </ListTag>
          );
        }

        return (
          <p
            key={`paragraph-${index}`}
            className="leading-7 text-muted-foreground"
          >
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
