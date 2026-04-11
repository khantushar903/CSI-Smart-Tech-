#!/usr/bin/env node

/**
 * Generate blog placeholder images using Unsplash Dynamic Image API
 * These are real stock images cached locally-friendly URLs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogImagesDir = path.join(__dirname, "../public/images/blog");

// Create directory if it doesn't exist
if (!fs.existsSync(blogImagesDir)) {
  fs.mkdirSync(blogImagesDir, { recursive: true });
}

// Image mapping - using Unsplash URLs that are high-quality
const blogImages = {
  "digital-transformation.jpg":
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=500&fit=crop&q=80",
  "cloud-native.jpg":
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=500&fit=crop&q=80",
  "data-security.jpg":
    "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&h=500&fit=crop&q=80",
  "rise-of-sustainable-technology.jpg":
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop&q=80",
  "ai-future.jpg":
    "https://images.unsplash.com/photo-1677442d019cecf8025308e2cdc7a46c?w=800&h=500&fit=crop&q=80",
};

console.log("Blog Image Configuration:");
console.log("========================\n");
console.log("These images use Unsplash Dynamic URLs (no download needed).\n");
console.log("Update your blog posts to use these URLs directly:\n");

Object.entries(blogImages).forEach(([filename, url]) => {
  const key = filename.replace(".jpg", "");
  console.log(`${key}:`);
  console.log(`  URL: ${url}`);
  console.log(`  Use: image: "${url}"`);
  console.log();
});

console.log("\nTo use real images in your blog posts:");
console.log("1. Update the YAML frontmatter in your MDX files");
console.log('2. Replace "image: /images/blog/filename.jpg" with the URL above');
console.log(
  "3. Ensure Next.js Image component has the domain in next.config.mjs\n",
);

// Create a config file
const config = {
  images: blogImages,
  note: "These are Unsplash Dynamic Image URLs that do not require storage of image files",
};

fs.writeFileSync(
  path.join(blogImagesDir, "images.json"),
  JSON.stringify(config, null, 2),
);

console.log("✓ Image configuration saved to public/images/blog/images.json");
