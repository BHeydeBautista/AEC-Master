"use client";

import FlowingSponsors from "../ui/FlowingSponsors";

const sponsors = [
  { name: "Atlético Echagüe Club", src: "/img/aec.jpeg" },
  { name: "Máster", src: "/img/logomaster.png" },
  { name: "Systemium", src: "/img/systemium.jpeg" },
  { name: "ER Deportes", src: "/img/ERDeportes.jpeg", featured: true },
];

export default function SponsorsSection() {
  return (
    <section
      id="sponsors"
      className="relative z-10 mx-auto max-w-7xl px-6 pb-32 pt-10 sm:px-8 lg:px-10"
    >
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

      <FlowingSponsors data={sponsors} />
    </section>
  );
}
