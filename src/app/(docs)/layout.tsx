import Link from "next/link";
import { docs } from "@/content/docs";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="grid gap-10 md:grid-cols-[240px_1fr]">
        <aside className="md:sticky md:top-24 md:self-start">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-forest-700">
            Documentação
          </h2>
          <nav className="space-y-1">
            <Link
              href="/docs"
              className="block rounded-md px-3 py-2 text-sm font-medium text-forest-800 transition-colors hover:bg-forest-100"
            >
              Visão geral
            </Link>
            {docs.map((doc) => (
              <Link
                key={doc.slug}
                href={`/docs/${doc.segments.join("/")}`}
                className="block rounded-md px-3 py-2 text-sm font-medium text-forest-800 transition-colors hover:bg-forest-100"
              >
                {doc.title}
              </Link>
            ))}
          </nav>
        </aside>
        <article className="min-w-0">{children}</article>
      </div>
    </div>
  );
}
