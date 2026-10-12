# Sunpeak Energy Solutions — concept website

Portfolio concept for a **fictional** Kenyan solar company. Projects, team profiles and contact details are illustrative, and the photography is stock imagery (see `/image-credits`).

Built with Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS v4 and lucide-react.

## Scripts

```bash
npm run dev        # local development
npm run build      # production build
npm start          # serve the production build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm test           # unit tests (Node test runner): calculator + form validation
```

## Configuration

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public origin used for canonical URLs, Open Graph, sitemap and robots. Defaults to `https://sunpeak.belion.co.ke`. |
| `LEAD_WEBHOOK_URL` | Optional. When set, validated quote/contact submissions are POSTed here as JSON (`{ kind, reference, submittedAt, data }`). When unset, forms run in an honest **demo mode** and nothing is sent or stored. Set it at **build time** too, so the demo-mode notice is left out of the prerendered pages. |

## Structure

- `src/app` — routes, server action for leads (`actions.ts`), sitemap and robots
- `src/lib` — content data (solutions, projects, FAQs), calculator logic (`savings.ts`) and form validation (`leads.ts`), both unit tested
- `src/components` — layout, UI primitives, forms, calculator, project filters
- `src/assets/images` — locally stored photography
