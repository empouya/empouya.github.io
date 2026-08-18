Your instinct is correct: **the site is visually clean, but the homepage in particular is too busy for its purpose.** The problem is not bad typography, bad spacing, or ugly styling. The problem is **too many visual units competing for attention**: cards, pills, mini-cards, repeated section headers, duplicated project information, capability groups, philosophy blocks, and CTAs.

I also checked the live structure in addition to the screenshots. The homepage currently goes through hero → About → Featured Projects → Skills → Experience → Key Projects → Mindset → CTA → footer. ([[EID MOHAMMAD AHMADI Portfolio](https://empouya.github.io/)][1]) That is the main source of the feeling you're describing.

I would **not rebuild the visual system from scratch**. The design language is already professional. I would simplify the information architecture and reduce the number of containers by roughly 35–45%.

## Overall verdict

| Area                     |    Current | Assessment                               |
| ------------------------ | ---------: | ---------------------------------------- |
| Visual polish            |     8.5/10 | Strong                                   |
| Consistency              |       9/10 | Very strong                              |
| Typography               |       8/10 | Strong                                   |
| Spacing                  |       8/10 | Generally good                           |
| Visual hierarchy         |       7/10 | Good locally, weaker page-wide           |
| Scanability              |     6.5/10 | Too much to process                      |
| Information architecture |     6.5/10 | Too much duplication                     |
| Recruiter efficiency     |       7/10 | Good first impression, slower afterward  |
| Client impression        |       7/10 | Professional, but somewhat template-like |
| Overall UI/UX            | **7.5/10** | Good foundation; needs simplification    |

Most importantly: **I do not think a recruiter would visit this site and think "bad developer because bad website."** Quite the opposite—the first impression is competent and polished.

The risk is subtler: after that good first impression, the site starts requiring too much attention. A recruiter who intended to spend 20–30 seconds can end up facing a page that feels like it wants five minutes.

---

# 1. The fundamental problem: too much "cardification"

This is the biggest UI issue across the site.

You use bordered rounded cards for:

- statistics
- personality/work traits
- project cards
- capability groups
- experience bullets
- key projects
- interests
- philosophy
- contact methods
- skills
- education
- languages
- availability
- project results

Individually, each card looks good.

Collectively, they make the interface fragmented.

The human eye interprets a bordered container as:

> "This is a separate object. Process it independently."

So instead of reading one continuous portfolio, the visitor repeatedly has to process:

**object → object → object → object → object**

That is why the site feels busy **despite having lots of whitespace**.

You don't have a whitespace problem. You have a **visual fragmentation problem**.

### Recommendation

Keep cards where they represent genuinely independent entities:

**Keep cards for:**

- projects
- perhaps 2–3 factual highlights
- contact options if you retain the contact page

Use open layouts, dividers, columns, and plain typography for most other information.

This single change would make the site feel substantially more mature.

---

# 2. You are also overusing pills

The pill component appears everywhere:

- project filters
- technology tags
- skill tags
- How I Work traits
- tech-stack indicators
- status indicators

This creates two issues.

First, **visual noise**.

Second, **affordance ambiguity**.

On the Projects page, pills such as `Python` are interactive filters. ([[EID MOHAMMAD AHMADI Portfolio](https://empouya.github.io/projects/)][2])

On other pages, almost identical pills are just labels.

Users normally expect visually identical UI elements to behave similarly. Having some clickable and others not weakens that mental model.

### Better approach

Reserve pill styling primarily for:

- filters
- statuses
- perhaps 3–5 important technology tags on project cards

For ordinary skills, use clean text lists.

For example, instead of:

`Python` `Django` `DRF` `FastAPI` `Celery` `WebSockets`

use something closer to:

**Backend**
Python · Django · DRF · FastAPI · Celery · WebSockets

Much calmer.

---

# 3. The blue + black + white visual language is good

I would **keep this**.

The palette communicates:

- technical
- modern
- restrained
- professional

without looking like a typical flashy frontend-designer portfolio.

That is appropriate for a backend/software engineer.

The light blue surfaces also work nicely as subtle emphasis.

Don't introduce:

- gradients everywhere
- multiple accent colors
- neon developer aesthetics
- animated backgrounds
- glassmorphism
- excessive shadows

Your restraint is one of the stronger parts of the current design.

---

# 4. Typography is one of the strongest elements

Your headline typography is good.

Especially the homepage name:

**EID MOHAMMAD
AHMADI**

It produces an immediate focal point.

Your typography hierarchy is also internally consistent:

blue eyebrow → large heading → secondary description → body content.

The issue is that you repeat that same pattern too many times.

For example:

ABOUT
SELECTED WORK
CAPABILITIES
EXPERIENCE
KEY PROJECTS
MINDSET

The pattern itself is good.

There are simply too many sections.

So I would **not redesign the typography system**. I would reduce how often it needs to appear.

One thing I would check during implementation is body-text contrast. Some of the small grey copy appears fairly light in the screenshots. I cannot establish its WCAG contrast ratio without checking the actual CSS values, but visually I would slightly increase either font weight or contrast for secondary body text.

---

# 5. Homepage — this is where most of the redesign should happen

The homepage is the only page I would consider **structurally overdesigned**.

The live page includes the hero, About preview, seven work-style characteristics, selected work, four capability groups, a large experience section, another Key Projects section, a philosophy section, another CTA, and footer. ([[EID MOHAMMAD AHMADI Portfolio](https://empouya.github.io/)][1])

That's too much.

## Hero: strong, with one problem

The left half is excellent.

You immediately expose:

- identity
- role
- short positioning
- projects
- contact
- CV
- social links

That's exactly what the first viewport needs.

The problem is the right-hand side.

You currently have:

- Quick Bio
- Years Experience
- Projects Completed
- Location

That creates a second information hierarchy competing with the first.

The user doesn't know whether to read:

**your name and description**

or

**your résumé-stat dashboard**.

### Recommendation

Reduce the right side to a **very compact proof panel**, or remove it entirely.

For example:

> **Barcelona, Spain**
> Backend-focused software engineer
> Open to opportunities

Later, once the content is rewritten, one genuinely strong quantitative proof point could be included if useful.

You don't need four widgets.

---

# 6. Your CTA hierarchy is actually good

The hero currently gives clear routes into Projects, Contact, and CV. ([[EID MOHAMMAD AHMADI Portfolio](https://empouya.github.io/)][1])

The black primary button works well.

I would keep a maximum of two visually prominent CTAs:

**View Projects** — primary
**Download CV** — secondary

Then make Contact less visually dominant:

`Contact →`

or move it into the navbar.

A recruiter has one primary question:

> "Is this person worth investigating?"

Projects and CV answer that better than Contact.

Contact becomes important **after** you've established credibility.

---

# 7. Delete the homepage About section

This is probably my strongest homepage recommendation.

You already have an entire About page.

The homepage currently has another substantial About section with a heading, paragraph and seven numbered capability cards. ([[EID MOHAMMAD AHMADI Portfolio](https://empouya.github.io/)][1])

It doesn't add enough new information to justify the vertical space and cognitive load.

I would remove essentially the whole block.

At most, put one short line under the hero or following the projects:

> Focused on maintainable backend systems, API design, testing, and reliable production delivery.

But don't build another component around it.

The homepage should **preview**, not reproduce, your About page.

This is progressive disclosure:

Homepage → overview
About → deeper professional context
Projects → evidence
Project page → technical depth

Your current homepage tries to perform all four jobs.

---

# 8. Featured Projects should become the centerpiece

This is arguably the most important area after the hero.

The two-column layout is good.

The card proportions are also basically good.

But the **large pale-blue thumbnail with a single letter is hurting the design**.

The `R`, `T`, `X`, etc. look like placeholders.

This is probably the one visual element that lowers perceived quality rather than merely increasing density.

For a backend portfolio, you don't need artificial website screenshots.

Better possibilities are:

- a miniature architecture diagram
- a small database/system topology illustration
- a very restrained project-specific icon
- a code/architecture visual
- or **no thumbnail at all**

I'd actually prefer a beautifully designed text-first card over the current fake-thumbnail area.

For example:

> **TASKHIVE**
> Backend Platform
>
> **TaskHive — Team & Project Management Platform**
>
> Django · DRF · PostgreSQL · Redis
>
> One concise explanation.
>
> **100+ tests · 90%+ coverage**
>
> View case study →

That would look considerably more mature for a backend engineer.

---

# 9. The Projects page has a good layout but unnecessary controls

The two-column project grid works well visually.

But currently there are only four project entries, while the page contains filter controls for All, Featured, React, Next.js, Python and Java. ([[EID MOHAMMAD AHMADI Portfolio](https://empouya.github.io/projects/)][2])

For four projects, filtering is unnecessary UI.

It creates interaction without solving a real navigation problem.

I'd remove the filters until you have something like **8–10+ projects**.

Then filtering becomes useful.

For the current number:

**Project Library**

[Project] [Project]
[Project] [Project]

is completely sufficient.

That would also immediately make the page look cleaner.

---

# 10. Project cards contain slightly too much internal structure

Each project currently contains roughly:

title
description
technology pills
divider
KEY RESULTS
result text
View Details

This is understandable, but every card becomes a miniature webpage.

I'd simplify the cards to:

**Project title**

One-sentence description.

`Python · Django · PostgreSQL · +4`

One strong proof point.

**View case study →**

That's enough.

The detail page is where everything else belongs.

Again: **progressive disclosure.**

---

# 11. Project detail is probably your strongest page

The TaskHive page is structurally much simpler than the homepage:

title → explanation → source → tech stack → key results. ([[EID MOHAMMAD AHMADI Portfolio](https://empouya.github.io/projects/taskhive-backend/)][3])

And unsurprisingly, it feels much calmer.

That tells us something important:

**your visual system isn't the problem. Your content density is.**

The project page proves that the same typography, borders, blue accent, pills and spacing can work well when there are fewer elements.

I would make one structural improvement, however.

Instead of:

Tech Stack
→ 14 pills

Key Results
→ 6 bordered items

I'd move toward a case-study structure:

**Overview**

**At a Glance**
Role · Type · Status · Main stack

**Architecture / Approach**

**Key Engineering Decisions**

**Evidence / Results**

**Source / Demo**

That would make the pages feel like **engineering case studies**, not marketing landing pages.

And that distinction matters for the impression you're trying to create.

---

# 12. Key Results are over-carded

On the project page, the six outlined result rows are readable.

But six large bordered rectangles in sequence again produce fragmentation.

I'd use:

✓ result one

────────────────

✓ result two

────────────────

✓ result three

or simply a clean vertical list.

Maybe highlight **one or two quantitative results** visually, not every result.

That creates stronger hierarchy.

---

# 13. About page: good information architecture, too many boxes

The About page is much better than the homepage in terms of conceptual organization.

The current structure is roughly:

intro → How I Work → Technical Profile → education/languages/availability → CV CTA. ([[EID MOHAMMAD AHMADI Portfolio](https://empouya.github.io/about/)][4])

That makes sense.

The problem is presentation.

Eight Technical Profile cards + seven How I Work pills + three bottom cards + CTA container means you are again putting almost everything inside a visual container.

I'd simplify it considerably.

### Technical Profile

Instead of eight cards:

**Backend**
Python · Django · FastAPI · REST · Celery

**Data & Infrastructure**
PostgreSQL · Redis · Docker · Linux · Nginx

**Testing & Observability**
Pytest · OpenTelemetry · Prometheus · Grafana

**Supporting Technologies**
React · TypeScript · etc.

Four groups are enough.

Possibly even three.

---

# 14. "How I Work" should be 3 principles, not 7 attributes

You currently show seven labels such as Problem-solving, Product-oriented mindset, Technical ownership, Analytical thinking and so forth. ([[EID MOHAMMAD AHMADI Portfolio](https://empouya.github.io/about/)][4])

Visually, this resembles a personality-test result.

And generic professional attributes are inherently difficult for a visitor to verify.

From a UI perspective, I'd reduce them to **three themes**.

For example structurally:

**Engineering judgment**
Short explanation.

**Maintainability**
Short explanation.

**Collaboration**
Short explanation.

Three principles with a sentence each communicate much more than seven pills.

---

# 15. Education / Languages / Availability don't need cards

The three cards at the bottom of About are neat but add another row of containers.

These can simply be a three-column metadata section:

**Education**
B.Sc. Computer Engineering
AUT · 2025

**Languages**
English · Spanish · Persian

**Location / Availability**
Barcelona, Spain
Open to opportunities

No border needed.

This will make the page feel more editorial and less dashboard-like.

---

# 16. Contact page is massively over-designed for its function

This is the easiest page to simplify.

Current structure:

contact introduction → four contact cards → large gap → Ready to Work Together CTA → footer. ([[EID MOHAMMAD AHMADI Portfolio](https://empouya.github.io/contact/)][5])

But the page itself **is already the CTA**.

So the second CTA section is redundant.

You are effectively saying:

> Contact me.

then:

> Here are four ways to contact me.

then:

> Are you ready to contact me?

then:

> Contact me.

### I would make this page extremely simple

Something approximately like:

**Let's talk**

Have a role, freelance project, or engineering problem you'd like to discuss?

**[empouya03@gmail.com](mailto:empouya03@gmail.com)**

LinkedIn · GitHub

Barcelona, Spain

[Send email]

That's it.

It can comfortably fit in one viewport.

The current version has excessive whitespace because there isn't enough unique information to justify the full-page composition.

A short utility page is perfectly acceptable.

---

# 17. Footer is good, but can be slightly smaller

The footer is consistent across pages, which is good.

Name + short professional identity + social links + copyright is enough.

I'd reduce the vertical padding by perhaps **20–30%**.

It currently feels like another section rather than the termination of the page.

No major redesign needed.

---

# 18. Navbar is strong

I would largely leave the navbar alone.

You have:

Home
Projects
About
Contact
CV
theme toggle

The active underline is subtle and understandable.

The CV control is particularly useful for recruiters.

The only thing I'd consider is changing:

**EM Portfolio**

to simply:

**EM**

or

**Eid Mohammad**

"Portfolio" doesn't tell the visitor anything they don't already know.

But this is low priority.

The theme toggle is also optional. It doesn't hurt anything, but it adds no meaningful recruiter value. If dark mode is already implemented properly, keep it. I wouldn't spend more development time on it.

---

# 19. Your homepage currently repeats Projects three times

This is worth calling out separately.

A visitor encounters:

**Featured Projects**

then later an **Experience** section containing project-oriented details

then **Key Projects**

then the dedicated Projects page itself.

The live homepage confirms both Featured Projects and Key Projects exist separately. ([[EID MOHAMMAD AHMADI Portfolio](https://empouya.github.io/)][1])

That's a lot of repetition.

I would have exactly **one project area on the homepage**.

Two excellent featured projects.

Then:

**View all projects →**

Done.

---

# 20. The "Mindset" section belongs on About, not Home

"How I think about building software" is reasonable material for an engineering portfolio.

But structurally, it belongs to About.

The homepage visitor hasn't requested that level of explanation yet.

The home page should answer:

**Who are you?**

**What kind of engineer are you?**

**What have you built?**

**What evidence do you have?**

**How do I investigate/contact you?**

Your philosophy is secondary.

Move it to About.

---

# The homepage I would build

This is the biggest recommendation from the entire review.

I would reduce the homepage to approximately:

```text
NAVIGATION

────────────────────────────────────────

HERO

Eid Mohammad Ahmadi
Backend Engineer

One short positioning statement.

[View Projects] [Download CV]

Barcelona · Open to opportunities

────────────────────────────────────────

SELECTED WORK

[ Project 1                    ]
[ short description            ]
[ tech · tech · tech           ]
[ one result                   ]

[ Project 2                    ]
[ short description            ]
[ tech · tech · tech           ]
[ one result                   ]

View all projects →

────────────────────────────────────────

EXPERIENCE + CAPABILITIES

Experience                     Core Stack
Company / role                 Python
Company / role                 Django / FastAPI
                               PostgreSQL
                               Docker / Linux
                               Testing

────────────────────────────────────────

CONTACT

Interested in working together?

[Contact me]

────────────────────────────────────────

FOOTER
```

That is all I think your homepage needs.

No:

- About preview
- seven trait cards
- four capability cards
- Key Projects duplication
- Mindset section
- giant secondary CTA banner

It would probably make the homepage **close to half its current visual length**, while retaining almost all of its decision-making value.

---

# The ideal site architecture

Your existing navigation is essentially correct.

I would keep four real pages:

| Page               | Purpose                                                     |
| ------------------ | ----------------------------------------------------------- |
| **Home**           | Rapid credibility assessment                                |
| **Projects**       | Evidence library                                            |
| **About**          | Professional context, capabilities and engineering approach |
| **Contact**        | Zero-friction communication                                 |
| **Project detail** | Technical case study                                        |

The crucial rule is:

> **Don't duplicate the deeper pages on Home.**

Home should point to them.

---

# Recruiter UX vs client UX

You actually have two audiences, and they behave differently.

### Recruiter

The recruiter ideally moves:

**Home → CV or Project → LinkedIn/contact**

They need to determine very quickly:

role → location → technologies → level → evidence.

They don't need an essay.

### Potential client

The client ideally moves:

**Home → Project case study → About → Contact**

They care more about:

problem solving → delivery → trust → communication → evidence.

A simplified homepage works better for **both** audiences.

The deeper pages can then satisfy their different information needs.

---

# What I would absolutely keep

Despite the amount I've recommended removing, the redesign should **not look radically different**.

Your existing foundation is good:

- black / white / blue palette
- typography
- large homepage name
- blue eyebrow section labels
- content width
- rounded-corner vocabulary
- restrained border treatment
- whitespace
- navbar
- CV button
- two-column layouts
- project-detail typography
- overall minimal aesthetic

That's why I don't think you need "Portfolio V3 from scratch."

You need **Portfolio V2 with about 40% fewer things on the screen**.

---

# Priority order

If I were implementing this myself, I would change things in this order:

1. **Remove the About and Mindset sections from Home.**
2. **Remove duplicated Key Projects from Home.**
3. **Reduce Skills to a compact capability block.**
4. **Replace the giant project-letter thumbnails.**
5. **Remove Projects filters while there are only four projects.**
6. **Reduce pill usage globally.**
7. **Reduce card usage globally.**
8. **Simplify Contact into essentially one viewport.**
9. **Compress About's eight skill cards into 3–4 groups.**
10. **Turn project detail pages into small engineering case studies.**
11. Slightly strengthen small grey text and shrink footer vertical padding.
12. Then perform the content rewrite.

The first **six changes would create most of the improvement**.

## Final verdict

I would **not throw away this design**.

It already looks significantly better than a typical developer portfolio. Your discomfort with it comes from something real, but the underlying problem isn't "the design is bad." It is:

> **too many good components are being used at once.**

The more senior/professional version of this same design is **quieter, shorter, and more selective**.

The current site says:

> "Look at everything I can tell you."

The improved version should say:

> "Here are the three reasons you should keep looking."

That is the direction I would take before touching the content.

And once that UI structure is locked, updating the actual claims and professional positioning against your master profile should be a separate pass rather than mixing the two problems together.

[1]: https://empouya.github.io/ "EID MOHAMMAD AHMADI | Full Stack Engineer (Backend-Focused)"
[2]: https://empouya.github.io/projects/ "Projects | EID MOHAMMAD AHMADI"
[3]: https://empouya.github.io/projects/taskhive-backend/ "TaskHive — Enterprise-Grade Project Management API | EID MOHAMMAD AHMADI"
[4]: https://empouya.github.io/about/ "About | EID MOHAMMAD AHMADI"
[5]: https://empouya.github.io/contact/ "Contact | EID MOHAMMAD AHMADI"
