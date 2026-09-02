import Head from "next/head";

export default function Operacoes() {
  return (
    <>
      <Head>
        <title>Operações | BOF-RJ</title>
      </Head>
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-bold text-forest-900">Nossas Operações</h1>
        <p className="mt-4 text-forest-700">
          Acompanhe as ações recentes da brigada no combate a incêndios e na
          proteção ambiental.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <article className="rounded-xl border border-forest-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-forest-900">
              Prevenção de Incêndios
            </h2>
            <p className="mt-2 text-sm text-forest-700">
              Campanhas de conscientização e manejo preventivo de vegetação.
            </p>
          </article>
          <article className="rounded-xl border border-forest-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-forest-900">
              Resposta Rápida
            </h2>
            <p className="mt-2 text-sm text-forest-700">
              Equipes de prontidão para atuação imediata em emergências.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
