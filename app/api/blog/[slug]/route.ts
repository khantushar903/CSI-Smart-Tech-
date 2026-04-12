import { NextResponse } from "next/server";
import { getBlogPostBySlug } from "@/lib/blog";

interface RouteContext {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}
