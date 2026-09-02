import Head from "next/head";

export default function Contato() {
  return (
    <>
      <Head>
        <title>Contato | BOF-RJ</title>
      </Head>
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-bold text-forest-900">Contato</h1>
        <p className="mt-4 text-forest-700">
          Em caso de incêndio florestal ou emergência ambiental, entre em
          contato imediatamente.
        </p>
        <div className="mt-8 rounded-xl border border-emergency-600 bg-red-50 p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-emergency-700">
            Emergência
          </p>
          <p className="mt-2 text-2xl font-bold text-emergency-700">193</p>
          <p className="mt-1 text-sm text-emergency-700">
            Corpo de Bombeiros Militar do Estado do Rio de Janeiro
          </p>
        </div>
      </section>
    </>
  );
}
