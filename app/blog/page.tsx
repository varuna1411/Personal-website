import { getSubstackPosts } from "@/lib/substack";
import BlogContent from "@/components/BlogContent";

export default async function BlogPage() {
  const posts = await getSubstackPosts(12);
  return <BlogContent posts={posts} />;
}
