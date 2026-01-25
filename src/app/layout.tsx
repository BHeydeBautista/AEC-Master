import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { IBM_Plex_Sans } from "next/font/google";
import { ScrollProvider } from "@/contexts/ScrollContext";

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Atlético Echagüe Club",
  description: "Inscripción a la vuelta de la Isla Curupí",
  icons: {
    icon: [{ url: "/img/aec.jpeg", type: "image/png" }],
    apple: [{ url: "/img/aec.jpeg", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`
          ${plex.className}
          bg-[#252423]
          text-[#dddcda]
          antialiased
          overflow-x-hidden
        `}
      >
        <ScrollProvider>
          <Navbar />
          {children}
          <Footer />
        </ScrollProvider>
      </body>
    </html>
  );
}
