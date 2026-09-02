# BOF-RJ — Brigada de Operações Florestais do Rio de Janeiro

Site estático da Brigada de Operações Florestais do Rio de Janeiro, construído com **Next.js** (Pages Router), **TypeScript**, **Tailwind CSS** e deploy automático no **GitHub Pages**.

## Stack

- [Next.js 16](https://nextjs.org) — Pages Router, exportação estática
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Vitest](https://vitest.dev) + [React Testing Library](https://testing-library.com) — testes unitários
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
│   ├── components/   # Componentes reutilizáveis (testes junto ao arquivo)
│   ├── pages/        # Rotas do site
│   │   ├── _app.tsx      # Setup global (fontes, layout)
│   │   ├── _document.tsx # Documento HTML
│   │   └── ...
│   └── styles/       # Estilos globais / tema Tailwind
├── public/           # Assets estáticos
├── docs/             # Documentação de padrões do projeto
└── .github/workflows/  # CI/CD (GitHub Pages)
```

## Deploy

O deploy é feito automaticamente pelo **GitHub Actions** ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) a cada push na branch `main`, publicando a pasta `out/` no GitHub Pages.

Passos para ativar:

1. Faça push das alterações para `main`.
2. No GitHub: **Settings → Pages → Source: GitHub Actions**.
3. O site ficará disponível em `https://Hoddzer-Freelas.github.io/bof-rj/`.

## Documentação

- [Testes](docs/TESTING.md) — convenções e como escrever testes
