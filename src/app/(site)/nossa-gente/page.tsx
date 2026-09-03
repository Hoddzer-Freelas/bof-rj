import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nossa gente",
  description:
    "Conheça os voluntários e integrantes da 1 Brigada de Operações Florestais RJ.",
};

export default function NossaGentePage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-forest-900">Nossa gente</h1>
      <p className="mt-4 text-forest-700">
        Um espaço para apresentar os integrantes e voluntários da brigada.
      </p>
    </section>
  );
}
