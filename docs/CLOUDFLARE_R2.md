# Configuração do Cloudflare (R2 + Worker)

Este guia cobre o setup manual na conta Cloudflare necessário para o funcionamento
da **galeria "Nossos trabalhos"** e da **área de upload (`/admin`)**.

> O site em si (GitHub Pages) já funciona sem isso — estas etapas são só para a
> funcionalidade de galeria/upload.

---

## Resumo

| Componente            | O que é                               | Custo (plano free)                     |
| --------------------- | ------------------------------------- | -------------------------------------- |
| **R2 bucket**         | Armazena as imagens + `manifest.json` | 10GB, 1M Class A / 10M Class B ops/mês |
| **Cloudflare Worker** | Backend da galeria/upload (API)       | 100k req/dia, 10ms CPU                 |

---

## 1. Criar o bucket R2

1. No painel Cloudflare → **R2 Object Storage** → **Create bucket**.
2. Nome: **`bof-rj`** (deve bater com `bucket_name` em `worker/wrangler.toml`).
3. Deixe a região padrão.
4. Após criar, vá em **Settings → Public Access** e ative **"R2.dev subdomain"**.
   - Anote o domínio público gerado: **`https://pub-<hash>.r2.dev`**
   - Este valor vai em `NEXT_PUBLIC_R2_PUBLIC_BASE` no `.env.local`.

> **CORS**: como o site roda em outro domínio (GitHub Pages), pode ser necessário
> configurar CORS no bucket (Settings → CORS Policies). O Worker já envia os
> headers `Access-Control-Allow-Origin`, então na maioria dos casos não é preciso
> mexer aqui. Se a galeria der erro de CORS no navegador, adicione uma regra
> permitindo o domínio do site e métodos `GET`.

---

## 2. Deploy do Worker

O Worker já está versionado na pasta `worker/`.

### 2.1. Instalar dependências do Worker

O `wrangler` já está nas devDependencies do projeto, mas você precisa do `@cloudflare/workers-types`
para o typecheck. Já está instalado.

### 2.2. Configurar a senha do admin (`ADMIN_SECRET`)

A senha de acesso à área `/admin` é armazenada como **secret** do Worker
(nunca no código):

```bash
cd worker
npx wrangler login              # ou já esteja logado
npx wrangler secret put ADMIN_SECRET
# digite a senha quando pedir, ex: umaSenhaForteSegura
```

> Guarde essa senha — é a mesma que será digitada na tela de login de `/admin`.

### 2.3. Deploy

```bash
npm run worker:deploy
# ou: cd worker && npx wrangler deploy
```

O wrangler irá pedir para criar um **worker** chamado `bof-rj-gallery` (nome do
`wrangler.toml`) e vincular o bucket `bof-rj`. Ao final, ele mostra a URL pública:

```
https://bof-rj-gallery.<subdominio>.workers.dev
```

Anote essa URL — vai em `NEXT_PUBLIC_GALLERY_WORKER_URL` no `.env.local`.

### 2.4. Testar o Worker localmente (opcional)

```bash
npm run worker:dev
# seta a senha antes para teste local
cd worker && npx wrangler secret put ADMIN_SECRET --local
npm run worker:dev
```

---

## 3. Configurar o site (`.env.local`)

Crie um arquivo `.env.local` na raiz do projeto (não é commitado; use
`.env.example` como referência):

```bash
NEXT_PUBLIC_GALLERY_WORKER_URL=https://bof-rj-gallery.<subdominio>.workers.dev
NEXT_PUBLIC_R2_PUBLIC_BASE=https://pub-<hash>.r2.dev
```

- `NEXT_PUBLIC_GALLERY_WORKER_URL` → URL pública do Worker (deploy acima).
- `NEXT_PUBLIC_R2_PUBLIC_BASE` → domínio público do bucket R2 (passo 1).

> ⚠️ **Importante**: variáveis `NEXT_PUBLIC_*` ficam expostas no bundle JS de
> produção (o que é esperado — são URLs públicas). Nunca coloque o `ADMIN_SECRET`
> aqui.

Reinicie o `next dev` após alterar o `.env.local`.

---

## 4. Como funciona o fluxo

- **Página pública `/nossos-trabalhos`**: um client component chama
  `GET <worker>/api/gallery`, que retorna o `manifest.json` com a lista de itens.
  As imagens são carregadas direto do domínio público do R2 (lazy-load).
- **Área admin `/admin/nossos-trabalhos`**: pede a senha. Se correta, o Worker
  devolve um token curto (HMAC com expiração de 8h) via `POST /api/auth`, que é
  guardado na `sessionStorage`. Todos os uploads/edições enviam esse token no
  header `Authorization: Bearer <token>`.
- **Upload**: `POST /api/upload` (multipart) valida o token, o tipo e o tamanho
  (máx. 10MB), grava a imagem no bucket e atualiza o `manifest.json`.
- **Excluir**: `DELETE /api/item/:id` (com token) remove o objeto e atualiza o
  manifest, reordenando por data (mais novo primeiro).

---

## 5. Endpoints da API (resumo)

| Método   | Rota            | Auth           | Descrição                           |
| -------- | --------------- | -------------- | ----------------------------------- |
| `GET`    | `/api/gallery`  | —              | Retorna o manifest (lista de itens) |
| `POST`   | `/api/auth`     | —              | Valida senha → retorna token        |
| `POST`   | `/api/upload`   | `Bearer token` | Envia imagem + metadados            |
| `DELETE` | `/api/item/:id` | `Bearer token` | Remove item                         |

CORS: o Worker responde `OPTIONS` e envia `Access-Control-Allow-*` em todas as rotas.

---

## 6. Solução de problemas

- **Login dá "Senha incorreta"**: confirme que o `ADMIN_SECRET` foi definido no
  Worker (`npx wrangler secret put ADMIN_SECRET`) e que digitou exatamente a
  mesma senha.
- **Galeria vazia/erro de rede**: confira `NEXT_PUBLIC_GALLERY_WORKER_URL` e se o
  Worker foi feito deploy. Teste a URL no navegador → deve abrir `{...items:[...]}`.
- **Erro de CORS no navegador**: adicione regra de CORS no bucket R2 (Settings →
  CORS Policies) permitindo a origem do site e método `GET`.
- **Imagem não carrega**: confira `NEXT_PUBLIC_R2_PUBLIC_BASE` — as URLs das
  imagens no manifest são relativas (`/imagens/...`) e o prefixo é adicionado a
  partir dessa base.
