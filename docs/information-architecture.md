# Portfolio Information Architecture

## Objective

The redesign keeps the existing visual identity while making the portfolio faster to scan for recruiters and potential clients. Each piece of content has one primary owner so the homepage can establish credibility without reproducing the deeper pages.

This document is the content contract for the remaining redesign tasks. Layout and copy can evolve, but new sections should not be added without first deciding which page owns them and what decision they help a visitor make.

## Completed page migration (September 2026)

The four-region Home contract remains appropriate; its implementation now makes the distinctions between commercial work, independent projects, and professional experience explicit. Selected Work shows the logistics platform and TaskHive. Experience summarizes roles and responsibilities without repeating their technical project descriptions. Both featured summaries now link to their case studies; confidential work offers an email discussion within its case study.

- `src/content/profile.ts` owns the corrected shared identity. `src/content/home/profile.ts` owns Home evidence and summaries; `src/content/about/profile.ts` owns the professional journey, principles, capabilities, education, and languages. These public datasets are checked against the supplied master professional profile. `src/content/projects/data/` owns the six case studies and the featured summaries used by Home. Contact reads shared identity directly. The unused `src/content/site/` dataset and its obsolete types have been removed. Home and Projects render the same `ProjectCard` from the same project records.
- `SiteShell` provides one appearance provider, navigation, skip link, and footer for every route, including Contact and the static 404. Each page owns its semantic main. The provider stays mounted during navigation; content remains visible without JavaScript. The obsolete shell, theme controls, mobile menu, and opacity-based page transition are retired.
- Studio Blue and Graphite Teal apply to every route. Color mode is independent of palette and respects the device by default. Saved choices retain their original storage key; there is no second theme manager.
- The theme comparison route `/themes/` and its preview components are removed once the two themes are implemented. It is not a permanent public page.
- The old Home-only hero, About/skills/experience/personality previews, featured-project wrapper, and closing CTA are retired. Their replacements live in `HomePage.tsx`; shared components still used by other routes remain unchanged.

About uses an open editorial layout: introduction/journey, three explained working principles, four capability groups, and unboxed background metadata. Core client experience is distinct from independent exploration and supporting skills. Home keeps its four regions, with a prominent role and no decorative numbering. A full-name wordmark and compact identity/social footer serve every route (review sections 4, 13–18).

The migration matrix below records the original sources and intended destinations. Removed source paths are historical references. Design and implementation details for the theme boundary are recorded in [home-theme-decision.md](home-theme-decision.md).

## Page contracts

| Page | Visitor question | Primary content | Must not become |
| --- | --- | --- | --- |
| Home | Is this engineer relevant and worth investigating? | Positioning, availability, two selected projects, compact experience and capabilities, one contact prompt | A duplicate About page, full resume, or complete project library |
| Projects | What has this engineer built, and where is the evidence? | The complete project library and links to focused case studies | A skills directory or repeated career narrative |
| About | How does this engineer think, work, and develop professionally? | Short journey, engineering principles, grouped capabilities, education, languages, location, and availability | A wall of generic traits or a second project library |
| Contact | How can I start a relevant conversation? | Email, LinkedIn, GitHub, location, availability, and one clear email action | A marketing landing page with repeated calls to action |
| Project detail | What problem was solved, what did this engineer own, and what supports the claims? | Context, role, type, architecture, decisions, evidence, results, source, and demo when available | A larger version of the project card or an unstructured technology list |

## Final homepage sequence

The homepage will contain exactly four content regions after the shared navigation:

1. **Hero** — name, role, concise positioning, location/availability, Projects and CV actions.
2. **Selected work** — two strongest projects and one link to the complete project library.
3. **Experience and core capabilities** — a compact professional summary paired with a restrained core-stack list.
4. **Contact prompt** — one short invitation linking to Contact.

The footer terminates the page and is not treated as another content region.

## Existing-content migration matrix

| Current source | Current role | Final owner | Planned treatment | Roadmap task |
| --- | --- | --- | --- | --- |
| `components/hero/Hero.tsx` | Identity, positioning, statistics, actions, and social links | Home | Keep the left-side hierarchy; reduce actions and replace the competing statistics dashboard with compact proof | 4 |
| `components/sections/AboutPreview.tsx` | About summary and seven trait cards | About | Remove from Home; incorporate only distinct journey material into the editorial About page | 4 and 7 |
| `components/projects/FeaturedProjects.tsx` | Two featured projects | Home | Keep as the only homepage project region; simplify its cards | 4 and 5 |
| `components/sections/home/SkillsPreview.tsx` | Four capability-card groups | Home and About | Keep a compact core-capabilities summary on Home; place the fuller grouped profile on About | 4 and 7 |
| `components/sections/home/ExperiencePreview.tsx` | Experience bullets and a second project list | Home | Keep a concise career summary; remove the duplicated Key Projects region | 4 |
| `components/sections/home/PersonalityPreview.tsx` | Interests and philosophy | About | Remove from Home; rewrite as a small set of explained engineering principles | 4 and 7 |
| `components/sections/home/ContactCta.tsx` | Large closing call-to-action banner | Home | Replace with one restrained contact prompt | 4 |
| `components/projects/ProjectsPageClient.tsx` | Project library and filters | Projects | Remove filtering for the current four-project collection | 5 |
| `components/projects/ProjectCard.tsx` | Thumbnail, links, tags, result, and detail action | Home and Projects | Use a text-first summary with one proof point and progressive disclosure | 5 |
| `components/projects/ProjectDetail.tsx` | Stack and bordered result cards | Project detail | Convert to an engineering case-study structure | 6 |
| `app/about/page.tsx` | Biography, traits, skill cards, metadata cards, and CV banner | About | Convert to an open editorial layout with three principles and three or four capability groups | 7 |
| `app/contact/page.tsx` | Contact cards followed by another large CTA | Contact | Reduce to a direct, single-viewport utility page | 8 |

## Content ownership rules

1. Home previews; deeper pages explain.
2. A project appears in one homepage region only.
3. Project cards summarize; project-detail pages provide technical evidence.
4. Home contains only core capabilities; About owns the broader technical profile.
5. Home may summarize experience but does not repeat project descriptions as career entries.
6. About owns journey, interests, personality, and engineering philosophy.
7. Contact contains one invitation and one primary action.
8. Generic attributes are replaced by explained principles or supporting evidence.
9. Technology labels use pills only when their compact, categorical treatment helps scanning.
10. New content must answer a defined visitor question or it does not earn space on the site.

## Intended journeys

### Recruiter

`Home -> CV or selected project -> Contact / LinkedIn`

The first viewport must expose role, location, availability, core specialization, and direct evidence paths.

### Potential client

`Home -> project case study -> About -> Contact`

Case studies establish delivery evidence; About establishes judgment and working style; Contact removes friction.

## Definition of done for the redesign

- The homepage has no more than the four defined content regions.
- Projects appear only in Selected Work, the Projects library, and their own case studies.
- About material is not reproduced as a separate homepage section.
- Every project card defers technical depth to its detail page.
- Contact fits within a typical desktop viewport and contains no duplicate CTA.
- Navigation and sitemap routes come from one shared registry.
- Recruiters and clients can complete their intended journeys without encountering repeated sections.

## Project library migration

The library uses server-rendered text-first cards and no filters. Existing project slugs are preserved. Cards prioritize type, concise description, up to four technologies, one proof point, status, and a case-study link. Source checks distinguish TypeScript/NestJS RideFlow services from the older Python description and Java TCP sockets in Tweeter from the older WebSocket claim. The library now includes logistics and Aetheris alongside the four preserved project URLs. `src/content/projects/data/` owns all project claims, including the two featured summaries consumed by Home. See `project-evidence.md` for provenance and claim limits.

## Contact migration

Contact is a short utility page: one invitation, prominent email action, LinkedIn/GitHub links, and unboxed location/work-authorization and availability details. Its desktop composition, including navigation and footer, fits at 1440×900. Mobile stacks naturally. The shared CV link remains available on every route. This follows review sections 16–18 without adding a form or server dependency.

## Shared presentation ownership

The visual system has one palette and shared-pattern owner; the obsolete global theme and unused layout/animation wrappers are removed. See [visual-system.md](visual-system.md) for reusable patterns, intentional page variations, accessibility requirements, and visual-parity checks. Current professional copy is unchanged by this cleanup; Task 9 remains the separate content audit.
