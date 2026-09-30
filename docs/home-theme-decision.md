# Shared appearance and staged redesign

## Decision

Use CSS custom properties scoped to the shared site wrapper, a small React preference store, and browser local storage. The default palette is Studio Blue; Graphite Teal is the alternative. Palette and color mode are separate preferences; `system` is the default mode.

| Approach considered | Fit for GitHub Pages | Trade-off |
| --- | --- | --- |
| Scoped CSS variables and a small preference store — selected | All assets are static; no server, cookie processing, or extra dependency | We own validation, persistence, and first-paint tests |
| `next-themes` and CSS variables | Supports static sites, persisted choices, and system mode | Document-level theme handling is less convenient during a Home-only migration |
| Separate CSS stylesheets selected in the browser | Simple static assets | Duplicated styles, additional loading coordination, and harder palette/mode combinations |

References: [CSS variable scoping](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties), [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports), [next-themes](https://github.com/pacocoursey/next-themes).

## Implementation boundaries

- `src/lib/appearance.ts`: supported values, validation, and pre-paint initialization.
- `src/components/appearance/AppearanceProvider.tsx`: hydration-safe external store, same-tab updates, cross-tab storage events, and a session fallback if storage is unavailable.
- `src/components/appearance/portfolio.module.css`: the two palettes, their light/dark colors, typography, and responsive styles. No global palette overrides.
- `src/components/layout/PortfolioNavigation.tsx`: native appearance controls and navigation that stays visible on mobile. Escape, focus leaving the panel, and outside pointer interaction close the appearance disclosure.
- `src/components/layout/SiteShell.tsx`: all routes, including the static 404, share one provider, navigation, skip link, and footer. The legacy shell and opacity animation are removed.
- `src/content/profile.ts`: shared public identity; Home and About each own their page-specific content under `src/content/`; Contact reads shared identity, and project data owns case-study claims and featured Home summaries. Do not import the private master profile at build time or copy unsupported claims from legacy content.

The namespaced storage key remains `portfolio.home-appearance.v1` for backward compatibility with saved Home choices. Invalid values fall back to Studio Blue / system. The obsolete `theme` storage key is ignored; the old document-class bootstrap and provider are removed. The initial script sets only allowlisted attributes on `#portfolio-appearance` before its contents are parsed; CSS resolves system mode, including changes while the page is open. Without JavaScript, the server-rendered Studio Blue pages remain visible and follow system color preference.

The full-name navigation wordmark identifies the person without a generic logo. The shared footer groups identity, positioning, social/contact links, and copyright; neither adds a second CTA section. About-specific layout lives in `src/app/about/about.module.css`, using shared palette tokens.

## Content and scope

Home follows four regions: Hero, Selected Work, Experience/Core Capabilities, Contact. Its selected work distinguishes paid production delivery from an independent, locally operational project. Local test coverage and performance testing must not be described as production traffic measurements. Professional chronology starts in 2022.

The supplied valid CV uses the existing resume route. Home metadata uses backend positioning and omits the empty legacy share image. About shares appearance, identity, and the footer, with corrected journey/background data and its own canonical metadata. Projects, all six case studies, Contact, and the 404 now share the same appearance boundary. Project metadata and the root defaults also omit the empty legacy share image. Tasks 5, 6, and 8 complete this page migration; the broader shared-system, shell, content, and final-QA roadmap audits remain separate.

## Verification

Run `npm run lint`, `node --test tests/*.test.mjs`, `npx tsc --noEmit`, and `npm run build` sequentially. Type generation and standalone type-checking should not run concurrently. If the execution environment blocks Turbopack's CSS-worker port, use `npm run build -- --webpack` and report the restriction.

Serve the generated `out/` directory and inspect `/`, `/about/`, `/projects/`, each library case-study link, `/contact/`, and `/404.html` at 390×844, 768×1024, and 1440×900; also check 320px width. Verify both themes with Light, Dark, and Match device, refresh persistence, malformed/blocked storage, first paint before hydration, JavaScript disabled, keyboard use, and reduced motion. Every route must retain the same choice through client navigation and refresh, with the correct active navigation link (Projects stays active on case studies). Check direct loading and client navigation. Contact must fit at 1440×900; smaller screens may scroll without horizontal overflow. Enter opens Appearance; Escape closes it and restores summary focus. The skip link must focus each page’s main content.

The removed `/themes/` route must not appear in the export or sitemap. The CV must open as a valid PDF, and project/email links must have real destinations.
