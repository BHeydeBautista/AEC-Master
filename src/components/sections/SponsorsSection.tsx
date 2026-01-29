"use client";

import FlowingSponsors from "../ui/FlowingSponsors";

const sponsors: Array<{
  name: string;
  src: string;
  variant: "club" | "water" | "tech" | "default" | "featured";
  featured?: boolean;
}> = [
  { name: "Atlético Echagüe Club", src: "/img/aec.jpeg", variant: "club" },
  { name: "Máster", src: "/img/logomaster.png", variant: "water" },
  { name: "Systemium", src: "/img/systemium.jpeg", variant: "tech" },
  { name: "ER Deportes", src: "/img/ERDeportes.png", variant: "featured", featured: true },
];

export default function SponsorsSection() {
  return (
    <section
      id="sponsors"
      className="relative z-10 mx-auto max-w-7xl px-6 pb-32 pt-10 sm:px-8 lg:px-10"
    >
      {/* Background decor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        {/* Soft base wash */}
        <div className="absolute inset-0 rounded-[28px] bg-[linear-gradient(180deg,rgba(17,179,255,0.06),rgba(0,0,0,0)_38%,rgba(255,214,110,0.04))]" />

        {/* Aurora / subtle motion */}
        <div
          className="absolute -top-40 left-1/2 h-[520px] w-[980px] -translate-x-1/2 rounded-[999px] blur-3xl opacity-[0.22] mix-blend-screen"
          style={{
            background:
              "conic-gradient(from 210deg, rgba(17,179,255,0.0), rgba(17,179,255,0.22), rgba(255,214,110,0.18), rgba(17,179,255,0.0))",
            animation: "sponsorSpin 24s linear infinite",
          }}
        />

        {/* Top glow (cyan) */}
        <div className="absolute -top-24 left-1/2 h-[380px] w-[760px] -translate-x-1/2 rounded-[999px] bg-[radial-gradient(circle,rgba(17,179,255,0.12),transparent_62%)] blur-2xl" />

        {/* Floor glow (gold) to ground the carousel */}
        <div className="absolute -bottom-28 left-1/2 h-[460px] w-[980px] -translate-x-1/2 rounded-[999px] bg-[radial-gradient(circle,rgba(255,214,110,0.10),transparent_66%)] blur-2xl" />

        {/* Subtle dot pattern instead of harsh grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.22) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(circle at 50% 42%, black 0%, transparent 72%)",
            WebkitMaskImage:
              "radial-gradient(circle at 50% 42%, black 0%, transparent 72%)",
          }}
        />

        {/* Gentle vignette to hide edges / avoid 'rare' banding */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.32)_72%,rgba(0,0,0,0.55)_100%)]" />
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-[720px]">
          <p className="text-[11px] uppercase tracking-[0.26em] text-[#9a9593]">
            Sponsors
          </p>

          <h2 className="mt-4 text-[28px] font-semibold tracking-tight text-[#f6f4f2] sm:text-[34px]">
            Gracias por hacerlo posible
          </h2>

          <p className="mt-4 text-[15px] leading-[1.65] text-[#8f8a87]">
            Acompañan y apoyan la Vuelta al Islote Curupí 2026.
          </p>
        </div>
      </div>

      <FlowingSponsors data={sponsors} />
    </section>
  );
}
