import { rawPosts, defaultOgImage } from "@/data/blogPostsData.js";

export const blogPosts = rawPosts.map((post) => ({
  ...post,
  image: post.image || defaultOgImage,
}));
