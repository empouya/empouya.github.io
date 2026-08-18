# Portfolio Redesign Agent Instructions

## Purpose

This repository is being redesigned incrementally to make the portfolio calmer, easier to scan, and more useful to recruiters and potential clients. The existing visual identity is intentionally being retained. The work is a simplification and information-architecture effort, not a ground-up visual replacement.

These instructions apply to every AI agent working anywhere in this repository.

## Required sources of truth

Read these files completely before starting or changing a roadmap task:

1. [`docs/portfolio-review.md`](docs/portfolio-review.md) — the verbatim external review and original requirements.
2. [`docs/information-architecture.md`](docs/information-architecture.md) — page ownership, audience journeys, migration decisions, and final architecture.
3. [`docs/roadmap.md`](docs/roadmap.md) — ordered implementation tasks, scope, acceptance criteria, and completion status.

The user's current request takes precedence. When it does not override these documents, follow them in the order above. Do not reinterpret the redesign from memory or from chat history alone.

## Task selection and scope

- Work on the task explicitly named by the user.
- If the user says to continue without naming a task, select the first unchecked task in `docs/roadmap.md`.
- Complete only one roadmap task per implementation cycle unless the user explicitly combines tasks.
- Do not pull later visual or content work into an earlier task merely because the files are nearby.
- Preserve unrelated user changes and inspect the working tree before editing.
- If the working tree contains overlapping changes that cannot safely be preserved, stop and explain the conflict.

## Mandatory workflow for every task

### 1. Explain before editing

Before changing files, tell the user:

- which roadmap task is being implemented;
- what problem it addresses;
- why it matters to recruiters and/or clients;
- which areas are expected to change;
- whether the task should create a visible difference or only an architectural/technical one.

The explanation must connect the task to the relevant recommendations in `docs/portfolio-review.md`.

### 2. Inspect and establish a baseline

- Read all files relevant to the task before editing them.
- Run `git status --short` and preserve existing work.
- Identify current behavior, duplication, accessibility considerations, responsive behavior, and data dependencies.
- Prefer existing components, tokens, and content sources when they remain appropriate.
- Do not replace the black/white/blue design language, typography system, content width, or restrained aesthetic unless the roadmap explicitly requires it.

### 3. Implement the task

- Make production-quality, scoped changes.
- Reduce visual fragmentation, repeated content, unnecessary pills, and unnecessary containers where required by the review.
- Keep content ownership consistent with `docs/information-architecture.md`.
- Maintain responsive behavior, keyboard access, semantic HTML, theme support, reduced-motion support, static export compatibility, metadata, and sitemap behavior.
- Avoid adding abstractions that do not remove real duplication or enforce an agreed architectural boundary.
- Do not silently rewrite professional claims. Content changes must be accurate, defensible, and within the task's scope.

### 4. Validate before declaring completion

At minimum, run:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

Also run task-specific checks from `docs/roadmap.md`. For visual tasks, inspect the affected routes at representative mobile and desktop widths and compare them with the currently deployed baseline at `https://empouya.github.io/`.

If this execution environment prevents the normal build or browser check, use a safe supported fallback where possible and report the limitation precisely. Do not describe an environment restriction as an application failure.

### 5. Update the roadmap

- Change the task checkbox from `[ ]` to `[x]` only after its implementation and automated checks succeed.
- Add a brief completion note under the task when the actual implementation materially differs from its planned scope.
- Do not mark blocked, partial, or unverified work as complete.

### 6. Review every changed file

The final response must include a Markdown table with these columns:

| File | What changed | Purpose and review reference |
| --- | --- | --- |

Use clickable absolute file links with a relevant line number. Include every file changed by the task, including roadmap updates and cleanup files. Explain how each change maps to the supplied review rather than merely describing code mechanics.

### 7. Provide a user test set

Give the user a concrete test set that includes:

- commands to run;
- exact routes and viewport sizes to inspect;
- interactions to exercise;
- expected behavior;
- what should differ from the deployed baseline;
- what must remain unchanged;
- task-specific acceptance questions phrased so the user can approve or reject the result.

For nonvisual tasks, explicitly state that visual parity is expected and treat any visual difference as a regression.

### 8. Commit the completed task

- Commit only after validation succeeds and the roadmap checkbox has been updated.
- Keep one focused commit per roadmap task.
- Stage only files belonging to that task; never absorb unrelated changes.
- Use a concise Conventional Commit message such as `refactor: simplify project cards` or `docs: define portfolio information architecture`.
- Report the commit hash and message in the final response.
- If validation fails or the task is incomplete, do not commit and do not check off the task.

## Required final response structure

Every completed task handoff must contain, in this order:

1. **Outcome** — what is now complete and its user-facing effect.
2. **Implementation summary** — the important design and engineering decisions.
3. **File review** — the required file/change/purpose table.
4. **Validation performed** — commands and results, including any environment limitations.
5. **User test set** — manual comparison and acceptance steps.
6. **Commit** — hash and message.
7. **Next task** — identify the next unchecked roadmap task without starting it.

## Completion standard

A task is not complete merely because the code compiles. It is complete only when it satisfies its roadmap acceptance criteria, preserves the architecture contract, passes proportionate automated checks, includes manual verification instructions, updates the roadmap, and is committed as an isolated change.
