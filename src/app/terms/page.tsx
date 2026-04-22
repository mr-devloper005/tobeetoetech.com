import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_CONFIG } from "@/lib/site-config";
import { Gavel, Scale, Users } from "lucide-react";

const sections = [
  {
    title: "Fair use of the marketplace",
    body: "Post accurate items, honor prices you publish, and respond within a reasonable window so buyers can plan pickups.",
    icon: Users,
  },
  {
    title: "Ownership & licensing",
    body: "You keep rights to your photos and copy while granting us permission to display them for discovery, safety, and promotion.",
    icon: Scale,
  },
  {
    title: "Enforcement",
    body: "We may remove listings that violate law or community norms, and we reserve escalation paths for repeat issues.",
    icon: Gavel,
  },
];

export default function TermsPage() {
  return (
    <PageShell
      theme="classifieds"
      eyebrow="Legal"
      title="Terms of service, redesigned for readability."
      description={`The rules for using ${SITE_CONFIG.name}—presented with the same navy hero, crisp white panels, and orange accents as the rest of the classifieds experience.`}
    >
      <div className="grid gap-6 md:grid-cols-3">
        {sections.map((item) => {
          const Icon = item.icon
          return (
            <Card key={item.title} className="rounded-[1.25rem] border border-[#1A2B6D]/10 bg-white shadow-sm">
              <CardContent className="flex h-full flex-col gap-3 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1A2B6D]/8 text-[#1A2B6D]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-sans text-lg font-semibold text-[#0f1a45]">{item.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{item.body}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
      <Card className="mt-8 rounded-[1.35rem] border border-[#1A2B6D]/10 bg-white">
        <CardContent className="space-y-4 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#1A2B6D]/55">Last updated · March 16, 2026</p>
          <p className="text-sm leading-relaxed text-slate-600">
            These highlights are not a substitute for your counsel&apos;s review. They simply orient new sellers and buyers before
            they dive into the full agreement body.
          </p>
        </CardContent>
      </Card>
    </PageShell>
  );
}
