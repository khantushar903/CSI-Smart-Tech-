"use server";

import { readdir, readFile } from "fs/promises";
import { join } from "path";
import matter from "gray-matter";

export interface BlogMeta {
  title: string;
  date: string;
  author: string;
  tags: string[];
  excerpt: string;
  image?: string;
  slug: string;
}

export interface BlogPost extends BlogMeta {
  content: string;
}

const BLOG_DIR = join(process.cwd(), "content/blog");

/**
 * Get all blog posts, sorted by date (newest first)
 */
export async function getAllBlogPosts(): Promise<BlogMeta[]> {
  try {
    const files = await readdir(BLOG_DIR);
    const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

    const posts = await Promise.all(
      mdxFiles.map(async (file) => {
        const slug = file.replace(/\.mdx$/, "");
        const filePath = join(BLOG_DIR, file);
        const fileContent = await readFile(filePath, "utf-8");
        const { data } = matter(fileContent);

        return {
          title: data.title || "Untitled",
          date: data.date || new Date().toISOString(),
          author: data.author || "CSI Team",
          tags: data.tags || [],
          excerpt: data.excerpt || "",
          image: data.image,
          slug,
        };
      }),
    );

    // Sort by date, newest first
    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
}

/**
 * Get a single blog post by slug with full content
 */
export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  try {
    const filePath = join(BLOG_DIR, `${slug}.mdx`);
    const fileContent = await readFile(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    return {
      title: data.title || "Untitled",
      date: data.date || new Date().toISOString(),
      author: data.author || "CSI Team",
      tags: data.tags || [],
      excerpt: data.excerpt || "",
      image: data.image,
      slug,
      content,
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

/**
 * Get all unique tags from blog posts
 */
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllBlogPosts();
  const tagSet = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

/**
 * Get blog posts filtered by a specific tag
 */
export async function getBlogPostsByTag(tag: string): Promise<BlogMeta[]> {
  const posts = await getAllBlogPosts();
  return posts.filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase()),
  );
}

/**
 * Get related posts by matching tags
 */
export async function getRelatedPosts(
  slug: string,
  limit: number = 3,
): Promise<BlogMeta[]> {
  const currentPost = await getBlogPostBySlug(slug);
  if (!currentPost) return [];

  const allPosts = await getAllBlogPosts();

  // Filter out current post and sort by number of matching tags
  const related = allPosts
    .filter((post) => post.slug !== slug)
    .map((post) => ({
      post,
      matchCount: post.tags.filter((tag) =>
        currentPost.tags
          .map((t) => t.toLowerCase())
          .includes(tag.toLowerCase()),
      ).length,
    }))
    .sort((a, b) => b.matchCount - a.matchCount)
    .filter((item) => item.matchCount > 0)
    .map((item) => item.post)
    .slice(0, limit);

  return related;
}

/**
 * Search blog posts by title, excerpt, or tags
 */
export async function searchBlogPosts(query: string): Promise<BlogMeta[]> {
  const posts = await getAllBlogPosts();
  const lowerQuery = query.toLowerCase();

  return posts.filter((post) => {
    const matchTitle = post.title.toLowerCase().includes(lowerQuery);
    const matchExcerpt = post.excerpt.toLowerCase().includes(lowerQuery);
    const matchTags = post.tags.some((tag) =>
      tag.toLowerCase().includes(lowerQuery),
    );
    const matchAuthor = post.author.toLowerCase().includes(lowerQuery);

    return matchTitle || matchExcerpt || matchTags || matchAuthor;
  });
}
