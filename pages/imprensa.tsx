import Head from "next/head";

export default function Imprensa() {
  return (
    <>
      <Head>
        <title>Imprensa | BOF-RJ</title>
      </Head>
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-bold text-forest-900">Imprensa</h1>
        <p className="mt-4 text-forest-700">
          Materiais para a imprensa, comunicados oficiais e relatórios de
          atividades da brigada.
        </p>
      </section>
    </>
  );
}
