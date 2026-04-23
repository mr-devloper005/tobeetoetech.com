import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle2, Megaphone, Shield, Sparkles } from "lucide-react";
import { mockTeamMembers } from "@/data/mock-data";
import { SITE_CONFIG } from "@/lib/site-config";

const highlights = [
  { label: "Live classified rows", value: "50k+" },
  { label: "Neighborhood searches / day", value: "10k+" },
  { label: "Avg. time to publish an ad", value: "< 4 min" },
];

const pillars = [
  {
    title: "Neighborhood-first listings",
    description:
      "Categories, photos, and price cues are tuned for how people actually shop locally—without noisy feeds from unrelated products.",
    icon: Megaphone,
  },
  {
    title: "Safety baked into the flow",
    description:
      "Clear reporting paths, reminders about in-person meetups, and help articles keep trust high for buyers and sellers alike.",
    icon: Shield,
  },
  {
    title: "Room to grow your ad",
    description:
      "Start free, add photos when you need them, and upgrade when you want more visibility—simple plans that match real seller needs.",
    icon: Sparkles,
  },
];

const timeline = [
  { year: "2024", detail: "Launched a calmer classifieds experience focused on fewer, higher-quality surfaces." },
  { year: "2025", detail: "Added richer media, faster search, and smarter category routing for busy metros." },
  { year: "2026", detail: "Shipping fresher layouts city-by-city while keeping the same navy + orange brand rhythm." },
];

export default function AboutPage() {
  return (
    <PageShell
      theme="classifieds"
      eyebrow="Why we exist"
      title={`${SITE_CONFIG.name} is built for local ads that feel human.`}
      description={`We combine ${SITE_CONFIG.name}'s marketplace focus with editorial clarity—so every visit feels purposeful, whether you are selling a desk or hunting for your next role.`}
      actions={
        <>
          <Button
            variant="outline"
            className="border-[#1A2B6D]/20 bg-white text-[#1A2B6D] hover:bg-[#f4f6fb]"
            asChild
          >
            <Link href="/classifieds">Browse ads</Link>
          </Button>
          <Button className="bg-[#F06529] font-semibold text-white hover:bg-[#e55a24]" asChild>
            <Link href="/create/classified">Post an ad</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <Card className="overflow-hidden rounded-[1.35rem] border border-[#1A2B6D]/10 bg-white shadow-[0_24px_60px_rgba(26,43,109,0.08)]">
          <CardContent className="space-y-6 p-7 sm:p-8">
            <Badge className="border-[#1A2B6D]/15 bg-[#1A2B6D]/8 text-[#1A2B6D]">Our story</Badge>
            <h2 className="font-sans text-2xl font-bold tracking-tight text-[#0f1a45] sm:text-3xl">
              Classifieds should feel as polished as any consumer app—without losing the grit of a yard sign.
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              {SITE_CONFIG.name} keeps the product ruthlessly focused: find what you need nearby, message sellers safely, and
              publish faster than digging through forums or group chats. We obsess over typography, spacing, and contrast so
              reading an ad never feels like homework.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-[#1A2B6D]/10 bg-[#f6f8fc] p-4 text-center sm:text-left"
                >
                  <div className="font-sans text-2xl font-bold text-[#1A2B6D]">{item.value}</div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">{item.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {pillars.map((pillar) => (
            <Card
              key={pillar.title}
              className="rounded-[1.25rem] border border-[#1A2B6D]/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <CardContent className="flex gap-4 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1A2B6D]/8 text-[#1A2B6D]">
                  <pillar.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-sans text-lg font-semibold text-[#0f1a45]">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{pillar.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-12 rounded-[1.35rem] border border-[#1A2B6D]/10 bg-[#1A2B6D] p-8 text-white shadow-[0_28px_70px_rgba(26,43,109,0.25)] sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">Roadmap pulse</p>
            <h3 className="mt-3 font-sans text-2xl font-bold tracking-tight">Momentum you can feel in the product.</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              We ship iteratively with the same palette you see on the homepage—deep navy anchors, orange calls-to-action,
              and airy white cards—so every surface feels like part of one story.
            </p>
          </div>
          <ul className="w-full max-w-md space-y-4 text-sm text-white/85">
            {timeline.map((item) => (
              <li key={item.year} className="flex gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#F06529]" />
                <div>
                  <span className="font-semibold text-white">{item.year}</span>
                  <p className="mt-1 text-white/75">{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1A2B6D]/55">People behind the scenes</p>
            <h3 className="font-sans text-2xl font-bold text-[#0f1a45]">Meet the crew keeping listings honest.</h3>
          </div>
          <Button variant="ghost" className="w-fit text-[#F06529] hover:text-[#e55a24]" asChild>
            <Link href="/team">Open team directory</Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {mockTeamMembers.map((member) => (
            <Card
              key={member.id}
              className="rounded-[1.25rem] border border-[#1A2B6D]/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border border-[#1A2B6D]/10">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-[#0f1a45]">{member.name}</p>
                    <p className="text-xs text-slate-500">{member.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{member.bio}</p>
                <p className="mt-3 text-xs font-medium uppercase tracking-wide text-[#1A2B6D]/60">{member.location}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
