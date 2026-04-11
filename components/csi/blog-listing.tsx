import { getAllBlogPosts, getAllTags } from "@/lib/blog";
import BlogListingClient from "./blog-listing-client";
import type { BlogMeta } from "@/lib/blog";

export default async function BlogListing() {
  let posts: BlogMeta[] = [];
  let tags: string[] = [];

  try {
    const [allPosts, allTags] = await Promise.all([
      getAllBlogPosts(),
      getAllTags(),
    ]);
    posts = allPosts;
    tags = allTags;
  } catch (error) {
    console.error("Failed to load blog posts:", error);
  }

  return <BlogListingClient initialPosts={posts} initialTags={tags} />;
}
