# Testes

## Estrutura

- Testes de componentes são **colocados junto ao componente** (`Footer.test.tsx` ao lado de `Footer.tsx`).
- Para páginas, testes ficam na pasta `__tests__/` na raiz.

## Framework

Usamos **Vitest** + **React Testing Library** + **@testing-library/jest-dom** com ambiente `jsdom`.

## Scripts

| Comando                 | Descrição                                |
| ----------------------- | ---------------------------------------- |
| `npm run test`          | Roda os testes uma vez (CI / pré-commit) |
| `npm run test:watch`    | Modo watch durante o desenvolvimento     |
| `npm run test:coverage` | Gera relatório de cobertura de código    |

## Como escrever testes

O Vitest está configurado com `globals: true`, então `describe`, `it`, `expect`, etc. são globais (não é necessário importar).

Sempre prefira consultar **pela semântica** (roles, texto, labels) em vez de testar por classe CSS ou tag:

```tsx
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("exibe o nome da brigada", () => {
    render(<Footer />);
    expect(
      screen.getByText("Brigada de Operações Florestais de Rio de Janeiro")
    ).toBeInTheDocument();
  });
});
```

## Convenções

- Nome do arquivo: `<Nome>.test.tsx`.
- Um `describe` por componente/módulo.
- Testar o **comportamento**, não a implementação.
- Mockar chamadas externas (fetch, API) e limites de módulo do Next.js quando necessário.
