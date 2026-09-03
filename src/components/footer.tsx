export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-forest-100 bg-forest-50">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-8 text-center text-sm text-forest-700 sm:flex-row sm:justify-between sm:px-6 sm:text-left">
        <p>
          <span className="font-semibold text-forest-900">
            1 Brigada de Operações Florestais RJ (Brigada Ivan Moraes)
          </span>
        </p>
        <p>© {year} BOF-RJ. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
