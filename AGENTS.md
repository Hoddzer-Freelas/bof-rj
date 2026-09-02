<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Convenções do projeto

## Comandos de verificação
Sempre rode estes comandos após concluir tarefas de código:
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run format:check`

Build de produção: `npm run build` (gera exportação estática em `out/`).

## Stack
- Next.js 16 (Pages Router) com exportação estática para GitHub Pages — `next.config.ts` já define `output: "export"`, `basePath` e `assetPrefix` para `/bof-rj`.
- Código da aplicação em `src/` (`src/pages`, `src/components`, `src/styles`), com alias `@/` apontando para `./src/*`.
- TypeScript estrito.
- Tailwind CSS v4 com tema customizado (`forest-*`, `emergency-*`) em `src/styles/globals.css`.
- Testes: Vitest + React Testing Library, colocados junto ao componente. Ver `docs/TESTING.md`.
- Formatação: Prettier.

## Regras
- Não criar rotas de API (`pages/api`) — não suportadas na exportação estática.
- Não usar `getServerSideProps` nem ISR — incompatíveis com `output: "export"`.
- Testes unitários colocalizados: `<Nome>.test.tsx`.

