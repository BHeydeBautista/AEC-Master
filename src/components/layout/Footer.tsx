"use client";

import Image from "next/image";
import type { MouseEvent } from "react";

export default function Footer() {
  const year = new Date().getFullYear();

  const navLinks = [
    { name: "Inicio", href: "#hero" },
    { name: "Reglamento", href: "#reglamento" },
    { name: "Recorridos", href: "#distancias" },
    { name: "Inscripción", href: "#inscripcion" },
    { name: "Sponsors", href: "#sponsors" },
    { name: "Contacto", href: "#contacto" },
  ];

  const onNavClick = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith("#")) return;
    event.preventDefault();
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "start" });

    // Keep URL hash in sync for share/back button.
    history.pushState(null, "", href);
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0b0b0b]/70">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_-10%,rgba(17,179,255,0.16),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--brand)] to-transparent opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10">
        <div className="grid gap-8 md:grid-cols-12">
          {/* Brand / credits */}
          <div className="md:col-span-6">
            <div className="flex items-center gap-5">
              <div
                className="group relative h-32 w-32 overflow-hidden rounded-full sm:h-44 sm:w-44"
                
              >
                
                <Image
                  src="/img/systemium.jpeg"
                  alt="Systemium"
                  fill
                  sizes="(min-width: 640px) 176px, 128px"
                  className="rounded-full object-cover object-center transition-transform duration-300 will-change-transform group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex flex-col justify-center -translate-y-3 sm:-translate-y-4">
                <div className="text-[12px] uppercase tracking-[0.26em] text-[#9a9593] leading-none">
                  Sitio web
                </div>
                <div className="mt-1 text-[20px] font-semibold tracking-tight text-[#f6f4f2] leading-none">
                  Isla <span className="text-[var(--brand)] italic">Curupí</span>
                </div>
                
              </div>
            </div>
          </div>

          {/* Nav */}
          <div className="md:col-span-6 md:flex md:justify-end">
            <div className="md:text-right md:max-w-[420px]">
              <div className="text-[11px] uppercase tracking-[0.26em] text-[#9a9593]">
                Navegación
              </div>
              <nav className="mt-4" aria-label="Navegación del sitio">
                <ul className="grid grid-cols-2 gap-x-10 gap-y-3 text-[13px] sm:grid-cols-3 md:grid-cols-2 md:justify-items-end">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        onClick={onNavClick(link.href)}
                        className="pointer-events-auto group inline-flex items-center gap-2 text-[#9a9593] transition-colors hover:text-[var(--brand)] focus:outline-none focus-visible:text-[var(--brand)]"
                      >
                        <span className="h-[7px] w-[7px] rounded-full bg-white/10 ring-1 ring-white/10 transition group-hover:bg-[var(--brand)] group-hover:ring-[var(--brand)]/40 group-hover:shadow-[0_0_12px_rgba(17,179,255,0.35)] group-focus-visible:bg-[var(--brand)] group-focus-visible:ring-[var(--brand)]/40" />
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

        </div>

        {/* Signature bar */}
        <div className="mt-10 rounded-2xl bg-black/20 p-5 ring-1 ring-white/8 backdrop-blur-md sm:flex sm:items-center sm:justify-between sm:gap-6">
          <p className="text-[13px] leading-[1.7] text-[#8f8a87]">
            © {year} <span className="text-[#dddcda]">Systemium</span>. Todos los derechos reservados.
          </p>
          <p className="mt-2 text-[12px] leading-[1.7] text-[#9a9593] sm:mt-0 sm:text-right">
            Diseño & desarrollo web: <span className="text-[#dddcda] whitespace-nowrap">Bautista Heyde</span>
            <span className="mx-2 text-[#dddcda]/30">•</span>
             bautistaheyde@hotmail.com
          </p>
        </div>

        <div className="mt-10 text-center text-[11px] uppercase tracking-[0.26em] text-[#9a9593]">
          Atlético Echagüe Club · Subcomisión Natación Máster
        </div>
      </div>
    </footer>
  );
}
