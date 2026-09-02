import Link from "next/link";

const navItems = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Operações", href: "/operacoes" },
  { label: "Imprensa", href: "/imprensa" },
  { label: "Contato", href: "/contato" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-forest-100 bg-forest-50/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-forest-700 text-sm font-bold text-white">
            BOF
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-sm font-bold text-forest-900">
              Brigada de Operações Florestais
            </span>
            <span className="text-xs text-forest-600">Rio de Janeiro</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-forest-800 transition-colors hover:bg-forest-100 hover:text-forest-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
