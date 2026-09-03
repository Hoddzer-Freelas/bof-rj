import Link from "next/link";

const whatsappUrl =
  "https://api.whatsapp.com/send/?phone=5521966956140&text=Ol%C3%A1%21+Vi+o+site+da+1+Brigada+de+Opera%C3%A7%C3%B5es+Florestais+RJ+%28Brigada+Ivan+Moraes%29+e+quero+saber+mais.&type=phone_number&app_absent=0";

export default function Home() {
  return (
    <>
      <section className="bg-forest-800 text-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="mb-4 inline-block rounded-full bg-forest-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            Protegendo o Rio de Janeiro
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            1 Brigada de Operações Florestais RJ (Brigada Ivan Moraes)
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-forest-100">
            Atuamos na prevenção e no combate a incêndios florestais, na
            conservação da Mata Atlântica e na resposta a emergências ambientais
            em todo o estado do Rio de Janeiro.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/quem-somos"
              className="rounded-lg bg-forest-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-forest-400"
            >
              Conheça a Brigada
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Falar com a Brigada
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <Link
            href="/quem-somos"
            className="rounded-xl border border-forest-100 bg-white p-6 shadow-sm transition-colors hover:border-forest-300"
          >
            <h2 className="text-lg font-bold text-forest-900">Quem somos</h2>
            <p className="mt-2 text-sm text-forest-700">
              Conheça a história, a missão e os valores da Brigada Ivan Moraes.
            </p>
          </Link>

          <Link
            href="/programacao"
            className="rounded-xl border border-forest-100 bg-white p-6 shadow-sm transition-colors hover:border-forest-300"
          >
            <h2 className="text-lg font-bold text-forest-900">Programação</h2>
            <p className="mt-2 text-sm text-forest-700">
              Acompanhe as operações, treinamentos e atividades da brigada.
            </p>
          </Link>

          <Link
            href="/nossa-gente"
            className="rounded-xl border border-forest-100 bg-white p-6 shadow-sm transition-colors hover:border-forest-300"
          >
            <h2 className="text-lg font-bold text-forest-900">Nossa gente</h2>
            <p className="mt-2 text-sm text-forest-700">
              Os voluntários e integrantes que formam a nossa brigada.
            </p>
          </Link>
        </div>
      </section>
    </>
  );
}
