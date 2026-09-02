import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export interface Doc {
  slug: string;
  title: string;
  description: string;
  /** Segments da rota, ex. ["prevencao", "risco"] -> /docs/prevencao/risco */
  segments: string[];
  content: string;
  /** HTML renderizado do conteúdo markdown */
  html: string;
}

const contentRoot = path.join(process.cwd(), "src", "content", "docs");

function walk(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
    } else if (
      entry.isFile() &&
      entry.name.endsWith(".md") &&
      entry.name !== "README.md"
    ) {
      files.push(fullPath);
    }
  }

  return files;
}

function toSegments(relativeFile: string): string[] {
  const relative = path.relative(contentRoot, relativeFile);
  const parsed = path.parse(relative);
  const parts = parsed.dir ? parsed.dir.split(path.sep) : [];

  if (parsed.name === "index") {
    return parts;
  }

  return [...parts, parsed.name];
}

function toSlug(segments: string[]): string {
  return segments.join("/");
}

export const docs: Doc[] = walk(contentRoot).map((file) => {
  const raw = fs.readFileSync(file, "utf-8");
  const { data, content } = matter(raw);
  const segments = toSegments(file);

  return {
    slug: toSlug(segments),
    title: String(data.title ?? toSlug(segments)),
    description: String(data.description ?? ""),
    segments,
    content,
    html: marked.parse(content) as string,
  };
});

export function getDocsByPath(segments: string[] | undefined): Doc[] {
  if (!segments || segments.length === 0) {
    return docs;
  }
  return docs.filter((doc) => doc.segments.join("/") === segments.join("/"));
}

export function getDocPaths(): string[][] {
  return docs.map((doc) => doc.segments);
}
