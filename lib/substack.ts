const SUBSTACK_FEED = "https://aminmyhead.substack.com/feed";

export type SubstackPost = {
  title: string;
  link: string;
  pubDate: string;
  description: string;
};

function stripCdata(text: string): string {
  return text.replace(/<!\[CDATA\[|\]\]>/g, "").trim();
}

function getTag(xml: string, tag: string): string {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i");
  const m = xml.match(re);
  return m ? stripCdata(m[1]) : "";
}

export async function getSubstackPosts(limit = 10): Promise<SubstackPost[]> {
  const res = await fetch(SUBSTACK_FEED, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];
  const xml = await res.text();
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  const items: SubstackPost[] = [];
  let match;
  while ((match = itemRegex.exec(xml)) !== null && items.length < limit) {
    const block = match[1];
    const title = getTag(block, "title");
    const link = getTag(block, "link");
    const pubDate = getTag(block, "pubDate");
    let description = getTag(block, "description") || getTag(block, "content:encoded");
    if (description) {
      description = description.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160) + (description.length > 160 ? "…" : "");
    }
    if (title && link) {
      items.push({ title, link, pubDate, description });
    }
  }
  return items;
}
