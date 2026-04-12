"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContentRendererProps {
  content: string;
  className?: string;
}

function renderInlineText(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|__[^_]+__|\*[^*]+\*|_[^_]+_)/g;
  let lastIndex = 0;

  for (const match of text.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      nodes.push(text.slice(lastIndex, index));
    }

    const token = match[0];
    const value = token.slice(
      token.startsWith("**") || token.startsWith("__") ? 2 : 1,
      token.length - (token.startsWith("**") || token.startsWith("__") ? 2 : 1),
    );

    if (token.startsWith("**") || token.startsWith("__")) {
      nodes.push(
        <strong
          key={`${keyPrefix}-${index}-strong`}
          className="font-semibold text-foreground"
        >
          {value}
        </strong>,
      );
    } else {
      nodes.push(
        <em key={`${keyPrefix}-${index}-em`} className="italic text-foreground">
          {value}
        </em>,
      );
    }

    lastIndex = index + token.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function renderParagraph(text: string, key: string): ReactNode {
  const lines = text.split("\n");

  return (
    <p key={key} className="whitespace-pre-wrap">
      {lines.flatMap((line, index) => {
        const lineNodes = renderInlineText(line, `${key}-line-${index}`);
        return index === 0
          ? lineNodes
          : [<br key={`${key}-br-${index}`} />, ...lineNodes];
      })}
    </p>
  );
}

function renderList(items: string[], ordered: boolean, key: string): ReactNode {
  const ListTag = ordered ? "ol" : "ul";

  return (
    <ListTag key={key} className="space-y-3 pl-5">
      {items.map((item, index) => (
        <li key={`${key}-${index}`} className="pl-1">
          {renderInlineText(item, `${key}-item-${index}`)}
        </li>
      ))}
    </ListTag>
  );
}

export function ContentRenderer({ content, className }: ContentRendererProps) {
  const blocks = content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <div
      className={cn(
        "space-y-6 text-sm leading-7 text-muted-foreground",
        className,
      )}
    >
      {blocks.map((block, index) => {
        if (block.startsWith("### ")) {
          return (
            <h3
              key={`block-${index}`}
              className="text-xl font-semibold text-foreground"
            >
              {block.slice(4)}
            </h3>
          );
        }

        if (block.startsWith("## ")) {
          return (
            <h2
              key={`block-${index}`}
              className="text-2xl font-semibold text-foreground"
            >
              {block.slice(3)}
            </h2>
          );
        }

        if (block.startsWith("# ")) {
          return (
            <h1
              key={`block-${index}`}
              className="text-3xl font-semibold text-foreground"
            >
              {block.slice(2)}
            </h1>
          );
        }

        const lines = block
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean);

        if (
          lines.length > 1 &&
          lines.every((line) => /^(-|\*|\d+\.)\s+/.test(line))
        ) {
          const ordered = /^\d+\./.test(lines[0]);
          const items = lines.map((line) =>
            line.replace(/^(-|\*|\d+\.)\s+/, ""),
          );

          return renderList(items, ordered, `block-${index}`);
        }

        return renderParagraph(block, `block-${index}`);
      })}
    </div>
  );
}
