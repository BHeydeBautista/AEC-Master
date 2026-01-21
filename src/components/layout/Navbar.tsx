export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="max-w-7xl mx-auto px-10 py-6 flex items-center justify-between">
        <span className="text-sm font-medium text-[#f6f4f2]">
          Isla Curupí
        </span>

        <ul className="flex items-center gap-8 text-xs tracking-wide text-[#9a9593]">
          <li className="hover:text-[#dddcda] cursor-pointer">
            Reglamento
          </li>
          <li className="hover:text-[#dddcda] cursor-pointer">
            Recorridos
          </li>
          <li className="hover:text-[#dddcda] cursor-pointer">
            Inscripción
          </li>
          <li>
            <button className="px-4 py-2 rounded-md bg-[#ff4b4b] text-[#252423] font-medium hover:bg-[#bf3e3e] transition">
              Sponsor
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
