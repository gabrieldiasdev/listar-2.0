# Listar

Lista de mercado: um PWA para marcar o que falta em casa e fazer a compra pelo celular.

## Funcionalidades

- **Casa:** catálogo com tudo que a casa costuma comprar, agrupado por seção do mercado. Um toque marca "precisa comprar". Cada item pode ter quantidade e observação.
- **Mercado:** mostra só o que está marcado, na ordem dos corredores. Um toque coloca o item no carrinho. "Finalizar compra" tira da lista o que foi comprado (com opção de desfazer).
- **Compartilhamento:** a lista é de uma "casa" com vários membros, entra-se por link de convite e tudo sincroniza em tempo real.
- **Offline:** funciona sem sinal (cache persistente do Firestore + service worker) e sincroniza ao reconectar.

## Stack

React 19 + TypeScript + Vite · Tailwind CSS 4 · React Router · Firebase (Auth com Google, Firestore) · vite-plugin-pwa · Vitest

## Desenvolvimento

```bash
npm install
npm run dev              # app contra o Firebase real (.env.local)
```

Para desenvolver sem tocar nos dados reais, use os emuladores:

```bash
npm run emulators        # Auth + Firestore locais (UI em http://localhost:4000)
npm run dev:emulators    # app apontando para os emuladores (.env.emulators)
```

### Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha com a configuração do app web do Firebase.

### Qualidade

```bash
npm run typecheck
npm run lint
npm test                 # testes de unidade
npm run test:rules       # testes das regras do Firestore (sobe o emulador)
```

## Deploy

```bash
npx firebase login       # uma vez
npm run deploy           # build + hosting + regras/índices do Firestore
```

O app roda no projeto `listar-2-eu` (Firestore em `europe-southwest1`, Madrid). O projeto antigo,
`listar-2-5fed2`, serve apenas `legacy-redirect/`: um service worker que se desinstala e uma página que
redireciona para o endereço novo mantendo o caminho, para que apps instalados e links de convite antigos
continuem a funcionar (`npm run deploy:legacy-redirect`).

## Arquitetura

```
src/
  app/            roteamento, layout com abas e guards (auth, casa ativa)
  components/     UI compartilhada (botões, campos, sheet, toast)
  features/
    auth/         login com Google
    household/    casa, membros, convite, ajustes
    items/        catálogo, importação, sugestão de seção
    shopping/     modo mercado
  lib/            Firebase, formatação, utilitários
```

- Cada feature tem um `model.ts` (tipos de domínio) e um `*Repository.ts` (único ponto que conhece o Firestore).
- A UI não espera as escritas terminarem: com o cache persistente, elas se aplicam localmente na hora e a promise só resolve quando o servidor confirma, o que nunca acontece offline. Falhas aparecem como toast (`useBackgroundWrite`).
- `HouseholdProvider` mantém casa e itens em tempo real para todas as abas.

### Modelo de dados

```
users/{uid}                          activeHouseholdId
households/{id}                      name, ownerId, memberIds[], members{}, sections[], inviteCode
households/{id}/items/{id}           name, section, needed, quantity, note, inCart, flaggedBy
```
