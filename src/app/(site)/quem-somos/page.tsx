import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quem somos",
  description:
    "Conheça a 1 Brigada de Operações Florestais RJ (Brigada Ivan Moraes): história, missão e valores.",
};

export default function QuemSomosPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-forest-900">Quem somos</h1>
      <div className="mt-6 space-y-4 text-forest-800">
        <p>
          A 1 Brigada de Operações Florestais RJ (Brigada Ivan Moraes) é uma
          equipe dedicada à proteção das florestas e ao combate a incêndios
          florestais no estado do Rio de Janeiro.
        </p>
        <p>
          Nossa missão é preservar a Mata Atlântica, proteger a biodiversidade e
          garantir a segurança das comunidades frente às emergências ambientais.
        </p>
      </div>
    </section>
  );
}
