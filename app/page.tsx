import { getSubstackPosts } from "@/lib/substack";
import HomeContent from "@/components/HomeContent";

export default async function HomePage() {
  const posts = await getSubstackPosts(6);
  return <HomeContent posts={posts} />;
}
