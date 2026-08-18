# Portfolio Redesign Roadmap

## How to use this roadmap

This file is the implementation tracker for the redesign requested in [`portfolio-review.md`](portfolio-review.md). Page ownership and content boundaries are defined in [`information-architecture.md`](information-architecture.md). Repository workflow and handoff requirements are defined in [`../AGENTS.md`](../AGENTS.md).

Tasks must be completed in order unless the user explicitly changes the priority. A checked task is implemented, validated, documented, and committed. An unchecked task must not be treated as complete based on partial work in another task.

## Progress

- [x] Task 1 — Lock the information architecture and content boundaries
- [ ] Task 2 — Simplify the shared visual system
- [ ] Task 3 — Simplify the site shell
- [ ] Task 4 — Rebuild the homepage around rapid credibility
- [ ] Task 5 — Redesign project cards and remove filtering
- [ ] Task 6 — Convert project details into engineering case studies
- [ ] Task 7 — Simplify the About page
- [ ] Task 8 — Reduce Contact to a one-viewport utility page
- [ ] Task 9 — Rewrite and normalize the content
- [ ] Task 10 — Complete responsive, accessibility, and usability QA

---

## [x] Task 1 — Lock the information architecture and content boundaries

### Goal

Give each piece of content one primary owner so Home can establish credibility without reproducing About, Projects, Contact, or project-detail content.

### Scope

- Define the purpose and boundaries of Home, Projects, About, Contact, and project-detail pages.
- Define the final four-region homepage sequence.
- Map every existing major section to its final owner and later roadmap task.
- Define recruiter and potential-client journeys.
- Centralize primary navigation, CV, and sitemap route definitions.

### Acceptance criteria

- The repository contains a durable information-architecture contract.
- Every existing major homepage and page section has a documented disposition.
- Home, Projects, About, Contact, CV, and sitemap routes share an agreed typed registry where appropriate.
- Existing UI and route behavior remain visually unchanged.
- Lint, TypeScript, and static production export checks pass.

### Completion record

Implemented in [`information-architecture.md`](information-architecture.md) and `src/lib/routes.ts`. Navbar, mobile navigation, and sitemap generation consume the shared route definitions. No visual redesign was introduced. Automated lint and TypeScript checks passed, and all static routes were generated successfully through the supported Webpack build path; the managed execution sandbox blocked Turbopack's local CSS worker port.

---

## [ ] Task 2 — Simplify the shared visual system

### Goal

Reduce the review's central problem—visual fragmentation—without replacing the portfolio's strong black/white/blue identity, typography, content width, or restrained aesthetic.

### Scope

- Audit reusable layout and presentation components before changing pages.
- Establish open-layout patterns using typography, spacing, columns, and dividers.
- Restrict bordered cards to genuinely independent objects.
- Restrict pills primarily to interactive filters, statuses, and a small number of project technologies.
- Strengthen muted body-text contrast if needed.
- Standardize quieter section spacing and separator behavior.
- Preserve light/dark themes, focus states, and reduced-motion behavior.

### Acceptance criteria

- Shared primitives support both open editorial layouts and true cards.
- Ordinary prose, metadata, skills, principles, and result lists no longer require card styling.
- Pills and buttons have unambiguous interactive/noninteractive treatments.
- Existing pages remain functional while later tasks adopt the new patterns.
- No new palette, decorative effects, or wholesale design-system replacement is introduced.

### Review references

Review sections 1–4 and 12: cardification, pill overuse, preservation of the palette and typography, text contrast, and calmer result presentation.

---

## [ ] Task 3 — Simplify the site shell

### Goal

Make shared navigation and footer feel like lightweight orientation rather than additional page sections.

### Scope

- Keep Home, Projects, About, Contact, CV, and the working theme toggle.
- Consider replacing the generic “Portfolio” label with the person's name or initials.
- Preserve clear active-page indication, including Projects on project-detail routes.
- Reduce footer vertical padding by approximately 20–30%.
- Keep only identity, concise positioning, social links, and copyright in the footer.
- Verify desktop and mobile navigation behavior.

### Acceptance criteria

- Navigation remains immediately understandable to recruiters and clients.
- The CV remains directly accessible.
- Mobile navigation remains keyboard- and touch-accessible.
- The footer reads as page termination, not another content block.

### Review references

Review sections 17–18: smaller footer, preserved navbar, useful CV action, and optional identity-label simplification.

---

## [ ] Task 4 — Rebuild the homepage around rapid credibility

### Goal

Reduce the homepage to the minimum information needed for a recruiter or client to decide whether to investigate further.

### Scope

- Keep exactly four regions: Hero, Selected Work, Experience/Core Capabilities, and Contact.
- Remove About Preview from Home.
- Remove seven trait cards from Home.
- Remove Mindset/Philosophy from Home and leave that content for About.
- Remove duplicated Key Projects from the experience region.
- Reduce the hero to two prominent actions: Projects and CV.
- Replace or remove the competing right-side statistics dashboard.
- Keep only two featured projects and one link to the library.
- Replace the large closing CTA banner with a restrained contact prompt.

### Acceptance criteria

- The homepage contains one project region and no duplicate About or philosophy region.
- Its visual length is reduced by roughly 40–50% without removing essential decision-making information.
- The first viewport exposes identity, role, specialization, location/availability, Projects, and CV.
- The page remains coherent at mobile, tablet, and desktop widths.

### Review references

Review sections 5–8, 19–20, “The homepage I would build,” and the recruiter/client journey analysis.

---

## [ ] Task 5 — Redesign project cards and remove filtering

### Goal

Make the four-project library faster to scan and remove controls and visual areas that do not solve a current user problem.

### Scope

- Remove project filters while the library contains only four projects.
- Remove the large single-letter thumbnail areas.
- Use text-first cards or restrained project-specific visuals only when they add evidence.
- Limit cards to project name/type, one-sentence description, three or four technologies, one proof point, and a case-study link.
- Ensure important actions are usable without hover.
- Preserve featured-project selection and project-detail routing.

### Acceptance criteria

- A card can be understood in a few seconds.
- Cards no longer behave like miniature detail pages.
- No fake or placeholder-looking thumbnail region remains.
- Projects are accessible on touch, keyboard, and pointer devices.

### Review references

Review sections 8–10: featured work as the centerpiece, removal of unnecessary filters, text-first backend project presentation, and progressive disclosure.

---

## [ ] Task 6 — Convert project details into engineering case studies

### Goal

Present projects as credible engineering evidence rather than expanded résumé bullets or technology inventories.

### Scope

- Extend the project content model with role, project type, status, context/problem, architecture/approach, engineering decisions, evidence/results, and source/demo information.
- Clearly distinguish production, freelance, independent, academic, simulation, and experimental work.
- Reorganize detail pages into Overview, At a Glance, Context, Architecture/Approach, Key Decisions, Evidence/Results, and Source/Demo.
- Replace bordered result cards with an open list and dividers.
- Visually emphasize only one or two defensible quantitative results.

### Acceptance criteria

- Every case study explains the problem, personal contribution, technical judgment, and supporting evidence.
- Project type and status are unambiguous.
- Technology lists support the narrative instead of dominating it.
- All project slugs remain statically generated and metadata remains valid.

### Review references

Review sections 11–12: case-study structure, engineering decisions, evidence, calmer result lists, and reduced pill/card usage.

---

## [ ] Task 7 — Simplify the About page

### Goal

Turn About from a collection of cards and generic traits into an editorial professional profile that explains journey, judgment, and working style.

### Scope

- Keep a concise introduction and professional journey.
- Replace seven trait pills with three explained principles, such as engineering judgment, maintainability, and collaboration/ownership.
- Compress eight technical-profile cards into three or four open capability groups.
- Present technologies as prioritized text lists rather than pill collections.
- Present education, languages, location, and availability as unboxed metadata.
- Keep one restrained CV action.

### Acceptance criteria

- The page reads continuously rather than as a dashboard.
- Generic attributes are replaced by specific, credible explanations.
- Core expertise is distinguishable from supporting familiarity.
- About owns philosophy and personality content removed from Home.

### Review references

Review sections 13–15: fewer boxes, fewer and more meaningful principles, compact technical groups, and unboxed metadata.

---

## [ ] Task 8 — Reduce Contact to a one-viewport utility page

### Goal

Remove repeated invitations and make contact information immediately actionable.

### Scope

- Keep a short heading and one introductory sentence.
- Make email the prominent primary action.
- Retain LinkedIn, GitHub, location, and availability.
- Remove the four large contact cards.
- Remove the second “Ready to work together?” CTA section.
- Keep the page useful without introducing a contact form or backend.

### Acceptance criteria

- All unique contact information fits within a typical desktop viewport.
- There is one invitation and one primary action.
- Email, LinkedIn, and GitHub remain accessible on desktop and mobile.
- The page no longer repeats “contact me” through multiple visual sections.

### Review references

Review section 16: the Contact page is already the CTA and should become a short utility page.

---

## [ ] Task 9 — Rewrite and normalize the content

### Goal

Make professional positioning consistent, concise, defensible, and appropriate to both recruiter scanning and client trust.

### Scope

- Reconcile role, specialization, availability, location, dates, and career framing across all pages.
- Remove generic claims unless a concrete explanation or example supports them.
- Replace exhaustive technology inventories with prioritized expertise.
- Rewrite project and experience descriptions around responsibility, decisions, and outcomes.
- Distinguish professional, independent, freelance, simulation, and academic work accurately.
- Verify all quantitative claims and remove any that cannot be defended.
- Eliminate repeated claims and summaries across page boundaries.

### Acceptance criteria

- Every important claim appears once in its primary location.
- The first viewport communicates role, specialization, location, and availability consistently.
- Project evidence and professional experience are not conflated.
- Copy is concise enough for recruiter scanning and specific enough for client trust.

### Review references

The review's final recommendation to lock UI structure first and perform the professional-positioning/content rewrite as a separate pass.

---

## [ ] Task 10 — Complete responsive, accessibility, and usability QA

### Goal

Verify that the complete redesign works as a coherent production portfolio for its two intended audiences.

### Scope

- Test the recruiter journey: Home to CV/project to Contact/LinkedIn.
- Test the client journey: Home to case study to About to Contact.
- Test navigation, touch, keyboard, focus, screen-size changes, light/dark themes, and reduced motion.
- Verify text contrast, readable sizes, semantic headings, link names, and external-link behavior.
- Validate internal links, project slugs, metadata, sitemap, robots, static export, and GitHub Pages compatibility.
- Run lint, type-checking, production build, and dependency audit.
- Perform a final duplication and unnecessary-component audit.

### Acceptance criteria

- Both audience journeys can be completed without confusion or repeated sections.
- No route, interaction, theme, or responsive layout regresses.
- Accessibility checks reveal no known blocking issue.
- The production static export contains every expected route and asset.
- Remaining cards, pills, sections, and CTAs each serve a clear user decision.

### Review references

The complete review, especially the overall verdict, priority order, recruiter/client UX analysis, and final requirement for a quieter and more selective site.
