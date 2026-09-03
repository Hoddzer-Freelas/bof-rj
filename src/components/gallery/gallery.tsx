"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import PhotoAlbum from "react-photo-album";
import "react-photo-album/masonry.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { fetchGallery } from "@/lib/api";
import {
  CATEGORIES,
  type GalleryCategory,
  type GalleryItem,
  itemImageUrl,
} from "@/lib/gallery";

type Filter = "todas" | GalleryCategory;

interface Album {
  title: string;
  category: GalleryCategory;
  items: GalleryItem[];
  src: string;
  width: number;
  height: number;
}

const PHOTO_RATIO = { width: 4, height: 3 };

function groupByTitle(items: GalleryItem[]): Album[] {
  const map = new Map<string, GalleryItem[]>();
  for (const item of items) {
    const key = item.title || "Sem título";
    map.set(key, [...(map.get(key) ?? []), item]);
  }
  const albums: Album[] = [];
  for (const [title, list] of map) {
    const sortedList = [...list].sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt)
    );
    const first = sortedList[0];
    albums.push({
      title,
      category: first.category,
      items: sortedList,
      src: itemImageUrl(first),
      width: PHOTO_RATIO.width,
      height: PHOTO_RATIO.height,
    });
  }
  albums.sort((a, b) =>
    b.items[0].createdAt.localeCompare(a.items[0].createdAt)
  );
  return albums;
}

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [filter, setFilter] = useState<Filter>("todas");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [open, setOpen] = useState(false);
  const [lightboxSlides, setLightboxSlides] = useState<string[]>([]);
  const [photoIndex, setPhotoIndex] = useState(0);

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

  const visibleItems =
    filter === "todas" ? items : items.filter((i) => i.category === filter);

  const albums = useMemo(() => groupByTitle(visibleItems), [visibleItems]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-forest-600">
        Galeria
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

      {!loading && !error && visibleItems.length === 0 && (
        <p className="mt-8 text-sm text-forest-700">
          Nenhuma imagem nesta categoria.
        </p>
      )}

      {!loading && albums.length > 0 && (
        <div className="mt-10 space-y-12">
          {albums.map((album) => (
            <section key={album.title} aria-label={album.title}>
              <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-xl font-bold text-forest-900">
                  {album.title}
                </h2>
                <div className="flex items-center gap-3 text-xs text-forest-600">
                  <span>{CATEGORIES[album.category].label}</span>
                  <span aria-hidden="true">·</span>
                  <span>
                    {album.items.length}{" "}
                    {album.items.length === 1 ? "foto" : "fotos"}
                  </span>
                </div>
              </div>
              <PhotoAlbum
                layout="masonry"
                columns={(containerWidth) => {
                  if (containerWidth < 560) return 2;
                  if (containerWidth < 900) return 3;
                  return 4;
                }}
                spacing={12}
                photos={album.items.map((item) => ({
                  src: itemImageUrl(item),
                  width: 4,
                  height: 3,
                  key: item.id,
                }))}
                onClick={({ index: photoIdx }) => {
                  const slides = album.items.map((i) => itemImageUrl(i));
                  setLightboxSlides(slides);
                  setPhotoIndex(photoIdx);
                  setOpen(true);
                }}
              />
            </section>
          ))}
        </div>
      )}

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={photoIndex}
        slides={lightboxSlides.map((src) => ({ src }))}
      />
    </section>
  );
}
