import { describe, expect, it } from "vitest";
import { docs, getDocPaths, getDocsByPath } from "@/content/docs";

describe("content/docs", () => {
  it("carrega documentos markdown dos diretórios de conteúdo", () => {
    expect(docs.length).toBeGreaterThan(0);
    for (const doc of docs) {
      expect(doc.slug).toBeTruthy();
      expect(doc.title).toBeTruthy();
      expect(doc.content).toBeTruthy();
      expect(doc.html).toContain("<p>");
      expect(doc.segments.length).toBeGreaterThan(0);
    }
  });

  it("gera caminhos únicos para cada documento", () => {
    const paths = getDocPaths();
    const serialized = paths.map((p) => p.join("/"));
    expect(new Set(serialized).size).toBe(serialized.length);
  });

  it("retorna todos os docs quando o caminho é vazio", () => {
    expect(getDocsByPath(undefined)).toEqual(docs);
    expect(getDocsByPath([])).toEqual(docs);
  });

  it("filtra docs por caminho de rota", () => {
    const found = getDocsByPath(["o-que-e"]);
    expect(found).toHaveLength(1);
    expect(found[0].slug).toBe("o-que-e");
  });

  it("encontra docs em subdiretórios (seguimentos aninhados)", () => {
    const found = getDocsByPath(["prevencao", "risco"]);
    expect(found).toHaveLength(1);
    expect(found[0].slug).toBe("prevencao/risco");
  });

  it("retorna lista vazia para caminho inexistente", () => {
    expect(getDocsByPath(["nao-existe"])).toHaveLength(0);
  });
});
