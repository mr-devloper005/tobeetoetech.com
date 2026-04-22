import { PageShell } from "@/components/shared/page-shell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Sparkles, MapPin, Tag } from "lucide-react";
import { fetchSiteFeed } from "@/lib/site-connector";
import { buildPostUrl, getPostTaskKey } from "@/lib/task-data";
import { getMockPostsForTask } from "@/lib/mock-posts";
import { SITE_CONFIG } from "@/lib/site-config";
import { TaskPostCard } from "@/components/shared/task-post-card";

export const revalidate = 3;

const matchText = (value: string, query: string) =>
  value.toLowerCase().includes(query);

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, " ");

const compactText = (value: unknown) => {
  if (typeof value !== "string") return "";
  return stripHtml(value).replace(/\s+/g, " ").trim().toLowerCase();
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }>;
}) {
  const resolved = (await searchParams) || {};
  const query = (resolved.q || "").trim();
  const normalized = query.toLowerCase();
  const category = (resolved.category || "").trim().toLowerCase();
  const task = (resolved.task || "").trim().toLowerCase();
  const useMaster = resolved.master !== "0";
  const feed = await fetchSiteFeed(
    useMaster ? 1000 : 300,
    useMaster
      ? { fresh: true, category: category || undefined, task: task || undefined }
      : undefined
  );
  const posts =
    feed?.posts?.length
      ? feed.posts
      : useMaster
        ? []
        : SITE_CONFIG.tasks.flatMap((task) => getMockPostsForTask(task.key));

  const filtered = posts.filter((post) => {
    const content = post.content && typeof post.content === "object" ? post.content : {};
    const typeText = compactText((content as any).type);
    if (typeText === "comment") return false;
    const description = compactText((content as any).description);
    const body = compactText((content as any).body);
    const excerpt = compactText((content as any).excerpt);
    const categoryText = compactText((content as any).category);
    const tags = Array.isArray(post.tags) ? post.tags.join(" ") : "";
    const tagsText = compactText(tags);
    const derivedCategory = categoryText || tagsText;
    if (category && !derivedCategory.includes(category)) return false;
    if (task && typeText && typeText !== task) return false;
    if (!normalized.length) return true;
    return (
      matchText(compactText(post.title || ""), normalized) ||
      matchText(compactText(post.summary || ""), normalized) ||
      matchText(description, normalized) ||
      matchText(body, normalized) ||
      matchText(excerpt, normalized) ||
      matchText(tagsText, normalized)
    );
  });

  const results = normalized.length > 0 ? filtered : filtered.slice(0, 24);

  return (
    <PageShell
      theme="classifieds"
      eyebrow="Discovery"
      title="Search the whole marketplace—in one glance."
      description={
        query
          ? `Showing matches for “${query}” with the same navy, white, and orange rhythm as the homepage.`
          : "Peek across the newest posts, then tighten filters when you know exactly what you want."
      }
      actions={
        <form action="/search" className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
          <input type="hidden" name="master" value="1" />
          {category ? <input type="hidden" name="category" value={category} /> : null}
          {task ? <input type="hidden" name="task" value={task} /> : null}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1A2B6D]/50" />
            <Input
              name="q"
              defaultValue={query}
              placeholder="Try “road bike”, “studio lease”, or a neighborhood…"
              className="h-11 border-[#1A2B6D]/15 bg-[#f6f8fc] pl-9 text-[#0f1a45] placeholder:text-slate-400 focus-visible:ring-[#F06529]/40"
            />
          </div>
          <Button
            type="submit"
            className="h-11 bg-[#F06529] px-6 font-semibold text-white hover:bg-[#e55a24]"
          >
            Search
          </Button>
        </form>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_280px] lg:items-start">
        <div>
          {results.length ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((post) => {
                const taskKey = getPostTaskKey(post);
                const href = taskKey ? buildPostUrl(taskKey, post.slug) : `/posts/${post.slug}`;
                return <TaskPostCard key={post.id} post={post} href={href} />;
              })}
            </div>
          ) : (
            <div className="rounded-[1.35rem] border border-dashed border-[#1A2B6D]/20 bg-[#f6f8fc] px-8 py-14 text-center">
              <p className="font-sans text-lg font-semibold text-[#0f1a45]">No matches yet</p>
              <p className="mt-2 text-sm text-slate-600">
                Loosen a filter or try a shorter keyword—our index refreshes often.
              </p>
            </div>
          )}
        </div>
        <aside className="space-y-4 rounded-[1.25rem] border border-[#1A2B6D]/10 bg-white p-5 shadow-sm lg:sticky lg:top-28">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1A2B6D]/55">Search tips</p>
          <ul className="space-y-4 text-sm text-slate-600">
            <li className="flex gap-3">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#F06529]" />
              Add the item type plus a neighborhood (“vintage desk capitol hill”) for tighter matches.
            </li>
            <li className="flex gap-3">
              <Tag className="mt-0.5 h-4 w-4 shrink-0 text-[#F06529]" />
              Category chips inherit from listing copy—try synonyms if a niche term returns nothing.
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#F06529]" />
              Sellers often embed location inside descriptions; skim cards visually before ruling anything out.
            </li>
          </ul>
        </aside>
      </div>
    </PageShell>
  );
}
