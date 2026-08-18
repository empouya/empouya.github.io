# Portfolio Information Architecture

## Objective

The redesign keeps the existing visual identity while making the portfolio faster to scan for recruiters and potential clients. Each piece of content has one primary owner so the homepage can establish credibility without reproducing the deeper pages.

This document is the content contract for the remaining redesign tasks. Layout and copy can evolve, but new sections should not be added without first deciding which page owns them and what decision they help a visitor make.

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
