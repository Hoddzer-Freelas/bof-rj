import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDocPaths, getDocsByPath } from "@/content/docs";

interface PageParams {
  params: Promise<{ slug?: string[] }>;
}

export function generateStaticParams() {
  return getDocPaths().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const [doc] = getDocsByPath(slug);
  if (!doc) {
    return {};
  }
  return {
    title: doc.title,
    description: doc.description,
  };
}

export default async function DocsPage({ params }: PageParams) {
  const { slug } = await params;
  const docs = getDocsByPath(slug);

  if (slug && docs.length === 0) {
    notFound();
  }

  if (slug) {
    const [doc] = docs;
    return (
      <div>
        <Link
          href="/docs"
          className="text-sm font-medium text-forest-700 hover:text-forest-900"
        >
          ← Ver todos
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-forest-900">{doc.title}</h1>
        <p className="mt-3 text-forest-700">{doc.description}</p>
        <div
          className="docs-content mt-6 text-forest-800"
          dangerouslySetInnerHTML={{ __html: doc.html }}
        />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-forest-900">Documentação</h1>
      <p className="mt-3 text-forest-700">
        Guias e informações sobre a atuação da Brigada de Operações Florestais.
      </p>
      <div className="mt-8 grid gap-4">
        {docs.map((doc) => (
          <Link
            key={doc.slug}
            href={`/docs/${doc.segments.join("/")}`}
            className="rounded-xl border border-forest-100 bg-white p-6 shadow-sm transition-colors hover:border-forest-300"
          >
            <h2 className="text-lg font-bold text-forest-900">{doc.title}</h2>
            <p className="mt-2 text-sm text-forest-700">{doc.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
