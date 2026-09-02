import Head from "next/head";

export default function Sobre() {
  return (
    <>
      <Head>
        <title>Sobre | BOF-RJ</title>
      </Head>
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-bold text-forest-900">Sobre a BOF-RJ</h1>
        <div className="mt-6 space-y-4 text-forest-800">
          <p>
            A Brigada de Operações Florestais do Rio de Janeiro (BOF-RJ) é uma
            equipe dedicada à proteção das florestas e ao combate a incêndios
            florestais no estado do Rio de Janeiro.
          </p>
          <p>
            Nossa missão é preservar a Mata Atlântica, proteger a
            biodiversidade e garantir a segurança das comunidades frente às
            emergências ambientais.
          </p>
        </div>
      </section>
    </>
  );
}
