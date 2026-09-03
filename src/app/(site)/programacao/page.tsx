import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programação",
  description:
    "Acompanhe a programação de operações, treinamentos e atividades da 1 Brigada de Operações Florestais RJ.",
};

export default function ProgramacaoPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-forest-900">Programação</h1>
      <p className="mt-4 text-forest-700">
        Em breve, a programação de ações, treinamentos e atividades da brigada.
      </p>
    </section>
  );
}
