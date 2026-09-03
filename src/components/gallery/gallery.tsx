"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchGallery } from "@/lib/api";
import {
  CATEGORIES,
  type GalleryCategory,
  type GalleryItem,
  itemImageUrl,
} from "@/lib/gallery";

type Filter = "todas" | GalleryCategory;

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [filter, setFilter] = useState<Filter>("todas");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const load = useCallback(async () => {
    try {
      const manifest = await fetchGallery();
      setItems(manifest.items);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Falha ao carregar a galeria."
      );
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- data fetching assíncrono
    void load();
  }, [load]);

  const visible =
    filter === "todas" ? items : items.filter((i) => i.category === filter);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-forest-600">
        Nossa gente
      </p>
      <h1 className="mt-2 text-2xl font-bold text-forest-900 sm:text-3xl">
        Nossos trabalhos
      </h1>
      <p className="mt-3 max-w-2xl text-forest-700">
        Cursos, eventos, resgates e ações de proteção ambiental realizadas pela
        brigada.
      </p>

      <div
        className="mt-6 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filtrar por categoria"
      >
        <button
          type="button"
          onClick={() => setFilter("todas")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            filter === "todas"
              ? "bg-forest-700 text-white"
              : "bg-forest-100 text-forest-800 hover:bg-forest-200"
          }`}
        >
          Todas
        </button>
        {Object.entries(CATEGORIES).map(([value, c]) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value as GalleryCategory)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === value
                ? "bg-forest-700 text-white"
                : "bg-forest-100 text-forest-800 hover:bg-forest-200"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {error && (
        <p className="mt-8 rounded-lg border border-emergency-200 bg-emergency-50 p-4 text-sm text-emergency-700">
          {error}
        </p>
      )}

      {loading && <p className="mt-8 text-sm text-forest-700">Carregando...</p>}

      {!loading && !error && visible.length === 0 && (
        <p className="mt-8 text-sm text-forest-700">
          Nenhuma imagem nesta categoria.
        </p>
      )}

      {!loading && visible.length > 0 && (
        <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setSelected(item)}
                className="group block w-full overflow-hidden rounded-xl border border-forest-100 bg-white text-left shadow-sm transition-colors hover:border-forest-300"
              >
                <img
                  src={itemImageUrl(item)}
                  alt={item.title}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="p-4">
                  <p className="truncate text-sm font-semibold text-forest-900">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-xs text-forest-600">
                    {CATEGORIES[item.category].label}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
        >
          <div className="max-h-[90vh] max-w-3xl overflow-auto rounded-xl bg-white p-2 shadow-xl">
            <img
              src={itemImageUrl(selected)}
              alt={selected.title}
              className="max-h-[70vh] w-full object-contain"
            />
            <div className="flex items-center justify-between gap-4 p-3">
              <div>
                <p className="font-semibold text-forest-900">
                  {selected.title}
                </p>
                {selected.description && (
                  <p className="mt-0.5 text-sm text-forest-700">
                    {selected.description}
                  </p>
                )}
                <p className="mt-1 text-xs text-forest-600">
                  {CATEGORIES[selected.category].label}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Fechar"
                className="rounded-md px-3 py-1.5 text-sm font-medium text-forest-800 transition-colors hover:bg-forest-100"
              >
                Fechar ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
