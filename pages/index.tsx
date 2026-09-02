import Link from "next/link";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>BOF-RJ | Brigada de Operações Florestais do Rio de Janeiro</title>
        <meta
          name="description"
          content="Brigada de Operações Florestais do estado do Rio de Janeiro. Prevenção e combate a incêndios florestais, proteção da Mata Atlântica e resposta a emergências."
        />
      </Head>

      <section className="bg-forest-800 text-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="mb-4 inline-block rounded-full bg-forest-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            Protegendo o Rio de Janeiro
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            Brigada de Operações Florestais do Rio de Janeiro
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-forest-100">
            Atuamos na prevenção e no combate a incêndios florestais, na
            conservação da Mata Atlântica e na resposta a emergências
            ambientais em todo o estado.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/operacoes"
              className="rounded-lg bg-forest-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-forest-400"
            >
              Nossas Operações
            </Link>
            <Link
              href="/contato"
              className="rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Reportar Emergência
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="rounded-xl border border-forest-100 bg-white p-6 shadow-sm">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-forest-100 text-2xl">
              🚒
            </div>
            <h2 className="text-lg font-bold text-forest-900">
              Combate a Incêndios
            </h2>
            <p className="mt-2 text-sm text-forest-700">
              Equipes treinadas que respondem prontamente a focos de incêndio
              florestal em todo o território fluminense.
            </p>
          </div>

          <div className="rounded-xl border border-forest-100 bg-white p-6 shadow-sm">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-forest-100 text-2xl">
              🌳
            </div>
            <h2 className="text-lg font-bold text-forest-900">
              Proteção da Mata Atlântica
            </h2>
            <p className="mt-2 text-sm text-forest-700">
              Iniciativas de conservação e recuperação dos biomas e unidades de
              conservação do estado.
            </p>
          </div>

          <div className="rounded-xl border border-forest-100 bg-white p-6 shadow-sm">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-forest-100 text-2xl">
              🛟
            </div>
            <h2 className="text-lg font-bold text-forest-900">
              Emergências Ambientais
            </h2>
            <p className="mt-2 text-sm text-forest-700">
              Apoio técnico e operacional em desastres e situações de risco
              ambiental em todo o Rio de Janeiro.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
