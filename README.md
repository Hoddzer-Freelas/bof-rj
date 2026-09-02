# BOF-RJ — Brigada de Operações Florestais do Rio de Janeiro

Site estático da Brigada de Operações Florestais do Rio de Janeiro, construído com **Next.js** (App Router), **TypeScript**, **Tailwind CSS** e deploy automático no **GitHub Pages**.

## Stack

- [Next.js 16](https://nextjs.org) — App Router, exportação estática
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Vitest](https://vitest.dev) + [React Testing Library](https://testing-library.com) — testes unitários
- [gray-matter](https://www.npmjs.com/package/gray-matter) + [marked](https://marked.js.org) — conteúdo em Markdown
- [Prettier](https://prettier.io) — formatação
- [Husky](https://typicode.github.io/husky) + [lint-staged](https://github.com/lint-staged/lint-staged) — hooks de pré-commit

## Começando

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando                 | Descrição                                 |
| ----------------------- | ----------------------------------------- |
| `npm run dev`           | Servidor de desenvolvimento               |
| `npm run build`         | Build de produção (gera a pasta `out/`)   |
| `npm run start`         | Executa o build de produção               |
| `npm run lint`          | Verifica o código com ESLint              |
| `npm run lint:fix`      | Corrige automaticamente o ESLint          |
| `npm run typecheck`     | Verifica os tipos com TypeScript          |
| `npm run format`        | Formata o código com Prettier             |
| `npm run format:check`  | Verifica a formatação                     |
| `npm run test`          | Roda os testes unitários                  |
| `npm run test:watch`    | Roda os testes em modo watch              |
| `npm run test:coverage` | Roda os testes com relatório de cobertura |

Ao commitar, o hook de pré-commit (Husky + lint-staged) roda ESLint e Prettier automaticamente nos arquivos alterados.

## Estrutura

```
├── src/
│   ├── app/             # Rotas (App Router)
│   │   ├── (system)/    # Grupo system: home, contato
│   │   └── (docs)/      # Grupo docs: documentação (/docs)
│   ├── components/      # Componentes reutilizáveis (kebab-case)
│   ├── content/docs/    # Conteúdo em Markdown (.md com frontmatter)
│   ├── styles/          # Estilos globais / tema Tailwind
│   └── tests/           # Testes unitários centralizados (espelha src/)
├── public/              # Assets estáticos
├── docs/                # Documentação de padrões do projeto
└── .github/workflows/   # CI/CD (GitHub Pages)
```

## Convenções

- **Arquivos em kebab-case** (`footer.tsx`, `page.tsx`, `o-que-e.md`), exceto convenções do framework (`layout.tsx`, `page.tsx`, `_app.tsx`).
- **Testes centralizados** em `src/tests/` espelhando a estrutura de `src/`. Ver [docs/TESTING.md](docs/TESTING.md).
- **Conteúdo documental** em Markdown com frontmatter (`src/content/docs/**/*.md`), renderizado via `gray-matter` + `marked`.

## Deploy

O deploy é feito automaticamente pelo **GitHub Actions** ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) a cada push na branch `main`, publicando a pasta `out/` no GitHub Pages.

Passos para ativar:

1. Faça push das alterações para `main`.
2. No GitHub: **Settings → Pages → Source: GitHub Actions**.
3. O site ficará disponível em `https://Hoddzer-Freelas.github.io/bof-rj/`.

## Documentação

- [Testes](docs/TESTING.md) — convenções e como escrever testes
