# Shared visual system

## Purpose

Preserve the current UI while keeping one maintained set of visual patterns. Review sections 1–4 and 12 call for open layouts, fewer containers and pills, readable text, and restrained styling. The migrated pages already follow that direction; Task 2 removes the obsolete implementation alongside them.

## Ownership

- `src/app/globals.css` owns Tailwind's reset, font utility mapping, document rendering, smooth scrolling, and the reduced-motion override. It does not define another palette.
- `src/components/appearance/portfolio.module.css` owns both palettes, their modes, width, shared typography, section spacing/dividers, actions, project cards, focus/skip-link styling, and the existing Home/shell composition.
- About, Contact, and project CSS Modules own only their page-specific compositions and supporting styles. Use `--portfolio-*` tokens for color; avoid hard-coded page colors and legacy `.dark` variants.
- `ProjectCard` owns the summary markup for both Home and Projects. Use `headingLevel={3}` within Home's Selected Work section; the library defaults to H2. Data comes directly from the shared project registry.
- `icons.tsx` contains only the four used icons. They are decorative and hidden from assistive technology; their enclosing links provide readable labels. An icon-only control would need its own accessible name.

## Reuse before adding a component

| Need | Existing pattern | Guardrail |
| --- | --- | --- |
| Content width | `container` | Keep the 1152px outer maximum and 32px/20px gutters. |
| Page introduction | `pageIntro`, `pageTitle`, `lead` | Use the existing hierarchy; Home and About retain their intentional introductory variations. |
| Open content section | `section`, `sectionHeading`, `body` | Use whitespace and dividers, not a surrounding card. Sections share desktop/mobile spacing and sticky-header anchor offsets. |
| Independent project summary | `ProjectCard`, `projectGrid` | One short description, up to four technologies, one proof point, status, one visible case-study link. |
| Main/secondary action | `primaryButton`, `secondaryButton` | Keep clear action hierarchy and keyboard focus. |
| Supporting action | `textLink` | Use actual links; do not style ordinary labels as buttons. |
| Facts, skills, principles, results | Semantic `dl`, headings/prose, or `ul` in the owning page module | Prefer open columns or simple dividers. Do not introduce generic card or pill wrappers. |

There are no current filter controls or technology pills. Reintroduce a filter only when the library size and a real visitor need justify it. Cards are for independently navigable projects; borders on inputs, navigation, and section dividers serve different functions.

## Intentional variations

Home and library project headings keep their existing sizes and semantic levels. About and case studies have slightly different editorial column ratios and mobile gaps to suit their content. These differences are retained rather than hidden behind a configurable layout framework. Add a shared abstraction only when it removes real repeated implementation.

## Accessibility and theme contract

- Keep Studio Blue as the default; retain Graphite Teal and independent Light, Dark, and Match device options.
- Keep the existing storage key and pre-paint bootstrap. CSS handles system color changes without requiring JavaScript.
- Use the existing ink/muted/accent tokens on their intended surfaces. Recheck normal-text contrast against 4.5:1 when editing a palette.
- Preserve semantic heading levels, descriptive link text, visible keyboard focus, native appearance selects, Escape/focus return, and the skip link.
- Keep reduced-motion handling in globals; content must not depend on animation to become visible.
- Keep all routes statically exported. Do not add a server dependency for presentation or preferences.

## Verification after shared changes

Run `npm run lint`, `npx tsc --noEmit`, `node --test tests/*.test.mjs`, and `npm run build` sequentially. Use the documented Webpack fallback only if the environment blocks the normal build. TypeScript flags unused local variables/imports and parameters; it does not detect every orphaned file or export, so confirm consumers before removal.

Compare the current local UI before and after the change at 320×844, 390×844, 768×1024, and 1440×900. Inspect `/`, `/about/`, `/projects/`, all six linked case studies, `/contact/`, and `/404.html` in both palettes and light/dark modes. Exercise Match device, refresh/navigation persistence, Appearance with Enter/Escape, the skip link, reduced motion, and JavaScript disabled.

This cleanup expects visual parity with the previous local redesign; any layout, typography, copy, or color change is a regression. The earlier reductions in cards, filters, placeholder images, and Contact's repeated CTA should remain visible when compared with the older deployed site. Focus on programmatically focused main content now uses the active palette instead of the removed legacy blue token.
