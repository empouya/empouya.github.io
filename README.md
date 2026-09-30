# Eid Mohammad Ahmadi — Portfolio

A backend engineering portfolio built with Next.js, React, TypeScript, CSS Modules, and Tailwind CSS. It exports static files for GitHub Pages.

[Live site](https://empouya.github.io/)

## Development and validation

```bash
npm ci
npm run dev
```

Open http://localhost:3000. Before committing:

```bash
npm run lint
npx tsc --noEmit
node --test tests/*.test.mjs
npm run build
```

The production build writes `out/`. Preview it with `python3 -m http.server 8766 --directory out`. If a restricted environment prevents Turbopack from opening its CSS-worker port, use `npm run build -- --webpack`. Do not run the build and standalone type-check concurrently.

## Code and content owners

| Area | Owner |
| --- | --- |
| Pages, metadata, static case-study routes | `src/app/` |
| Palette tokens, shared typography, spacing, cards, and actions | `src/components/appearance/portfolio.module.css` |
| Appearance persistence and first paint | `src/lib/appearance.ts`, `src/components/appearance/AppearanceProvider.tsx` |
| Navigation, footer, skip link, shared appearance boundary | `src/components/layout/` |
| Project card used by Home and Projects; case-study presentation | `src/components/projects/` |
| Shared identity, contact destinations, availability | `src/content/profile.ts` |
| Home and About narratives | `src/content/home/profile.ts`, `src/content/about/profile.ts` |
| Project facts, evidence, featured selection | `src/content/projects/data/`, `src/content/projects/index.ts` |
| Navigation and CV destinations | `src/lib/routes.ts` |

Project JSON must satisfy `Project` in `src/content/types.ts`. Follow an existing case study when adding one; keep published slugs stable and record supporting sources in [project evidence](docs/project-evidence.md). The private master profile is not a build dependency.

## Design and maintenance

- [Visual-system guardrails](docs/visual-system.md): reusable patterns, intentional variations, accessibility, and parity checks.
- [Information architecture](docs/information-architecture.md): which page owns each kind of content.
- [Appearance decision](docs/home-theme-decision.md): Studio Blue, Graphite Teal, and independent system/light/dark modes.
- [Original review](docs/portfolio-review.md) and [roadmap](docs/roadmap.md): rationale, scope, and completion status.

The default palette is Studio Blue. Preferences persist across routes and refreshes; content remains visible without JavaScript. Avoid adding a second theme system or animation library for ordinary page rendering.

## Deployment

`.github/workflows/deploy.yml` builds and publishes `out/` when changes are pushed to `main`, or when manually dispatched. Configure GitHub Pages to use GitHub Actions. Local commits alone do not deploy the site.
