# pedido-integrale

App de **pedidos por WhatsApp** de Integrale VG. El cliente arma su pedido (productos, sabores, cantidades, datos de contacto) y al enviarlo se abre WhatsApp con el mensaje ya armado. Sin backend en producción: es una SPA estática.

Web hermana: [`integrale-vg`](https://www.integralevg.com.ar) (catálogo).

## Stack

- **Vite** + **React 18** + **TypeScript** + **Tailwind CSS v3**
- **wouter** (router) · **TanStack Query** · **shadcn/ui** + Radix
- **Drizzle + PostgreSQL** opcional (`server/`) para una API futura: hoy no se usa en producción

## Scripts

```bash
npm install
npm run dev      # desarrollo (server de Vite con HMR)
npm run build    # build de producción → dist/ (cliente) + dist/index.cjs (server)
npm run check    # typecheck con tsc
npm start        # sirve dist/index.cjs en modo producción
npm run db:push  # empuja el schema de Drizzle a DATABASE_URL (opcional)
```

En desarrollo `npm run dev` levanta Express + Vite en el puerto `5000` (o `PORT`).

## Deploy (Vercel)

`vercel.json` define `outputDirectory: dist/public` y el **rewrite SPA** `/(.*) → /index.html`, necesario para que rutas como `/pedido` no devuelvan 404 al refrescar.

El build también compila `server/` a `dist/index.cjs` (se ignora en Vercel, sólo se publica `dist/public`).

## Personalización rápida

| Qué | Dónde |
|---|---|
| **Número de WhatsApp** y mensaje por defecto | `client/src/utils/whatsapp.ts` (`PHONE_NUMBER`) |
| **Productos, categorías y precios** | `client/src/data/products.ts` |
| **Sabores por producto** | `client/src/data/flavors.ts` |
| **Colores y tipografías** | `client/src/index.css` (variables `--*`) y `tailwind.config.ts` |
| **Logo** | `client/public/logo.jpeg` |

## Estructura

```
pedido-integrale/
├── vercel.json           # build + rewrite SPA
├── vite.config.ts
├── tailwind.config.ts
├── client/
│   ├── index.html
│   └── src/
│       ├── App.tsx           # rutas: / y /pedido → PedidoPage
│       ├── pages/PedidoPage.tsx
│       ├── components/       # RowItem, CustomerForm, OrderSummaryBar, ui/
│       ├── data/             # products, flavors
│       ├── hooks/            # use-products, use-toast
│       └── utils/            # whatsapp, money
├── shared/                   # tipos compartidos (schema) y rutas de API
├── server/                   # Express + Drizzle (opcional, no se despliega en Vercel)
└── script/build.ts           # build de cliente (Vite) + server (esbuild)
```

## Notas

- Los precios están en pesos argentinos (ARS) y se muestran formateados con `client/src/utils/money.ts`.
- El pedido vive en memoria: si el usuario refresca la página, se pierde (ver hallazgos pendientes).
