"use client";
export default function Sphere({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[200]">
      <div className="relative w-[700px] h-[700px]">
        {/* ESFERA BASE */}
        <div className="absolute inset-[40px] rounded-full bg-[#111] shadow-[0_0_160px_rgba(0,0,0,0.9)] z-0" />
        {/* CONTENIDO (loader + luces) */}
        <div className="absolute inset-0 z-10">{children}</div>
      </div>
    </div>
  );
}
