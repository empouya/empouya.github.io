# Project content and evidence

Reviewed on 2026-09-20 for Tasks 5–6. The supplied master professional profile is the authority for career facts, confidential client delivery, TaskHive's local status/testing, and Aetheris's scope. It is not imported into the build. Only relevant public facts are copied into the project dataset.

Public repository files were inspected to check the older portfolio's technical descriptions. Reading source is not equivalent to running the projects or independently reproducing their tests. Case studies deliberately avoid invented production benchmarks, adoption, uptime, and deployment claims. Descriptions of architectural consequences are explanations of the documented structure, not measured outcomes.

## Content ownership

`src/content/projects/data/*.json` owns the project summaries and full case studies. `src/content/projects/index.ts` supplies the library, detail routes, sitemap, and Home's two featured summaries. Keep stable slugs when revising titles. Project type, status, role, context, contribution, architecture, decisions, evidence, limitations, and source availability are required. Add a live link only when a real public demo is available.

## Evidence register

| Project | Sources inspected | Claim decisions |
| --- | --- | --- |
| International logistics platform | Master profile: logistics experience, chronology, deployment topology, business rules, team responsibilities | Commercial freelance work, June 2023–May 2025. Seven-developer team leadership is functional responsibility. Single ECS deployment; partially automated delivery and manual production replacement. Confidential source/client. No public demo or invented benchmarks. |
| TaskHive | Master profile; [repository README](https://github.com/empouya/task-hive#readme) | Master profile governs conservative figures: 100+ backend tests and 90%+ coverage. Operational locally. Omit the older precise latency/error-rate claims and enterprise-adoption language. Do not represent README measurements as independently rerun results. |
| Aetheris | Master profile; [repository README](https://github.com/empouya/aetheris#readme) | Independent local platform, public demo in progress. PostgreSQL is authoritative, Qdrant supports semantic retrieval; background ingestion and organization scope are explicit. No production customers or commercial adoption. |
| RideFlow | [Gateway package](https://github.com/empouya/rideflow/blob/main/apps/api-gateway/package.json), [location package](https://github.com/empouya/rideflow/blob/main/apps/location-service/package.json), [authentication event contracts](https://github.com/empouya/rideflow/blob/main/docs/events/auth-events.md), recursive repository file tree | Correct older Python-led stack to TypeScript/NestJS. The tree contains gateway, auth, user, driver, location, tests, and publisher implementations. Retain simulation framing. Do not equate repository vision or planned consumers with finished matching/payment features or fault-tolerance evidence. |
| xv6 | [Upstream README in the fork](https://github.com/empahmadi/xv6-riscv/blob/riscv/README), [system-call definitions](https://github.com/empahmadi/xv6-riscv/blob/riscv/kernel/syscall.h), [process fields](https://github.com/empahmadi/xv6-riscv/blob/riscv/kernel/proc.h) | Credit the teaching kernel to upstream authors. Describe kernel extensions and visible scheduler/timing interfaces. No invented scheduler benchmark or production-OS claim. |
| Tweeter | Repository description (“term project”); [connection implementation](https://github.com/empahmadi/Tweeter-Project/blob/main/java/org/ce/ap/client/impl/ConnectionServiceImpl.java), [server entry point](https://github.com/empahmadi/Tweeter-Project/blob/main/java/org/ce/ap/server/Main.java), [client handler](https://github.com/empahmadi/Tweeter-Project/blob/main/java/org/ce/ap/server/connection/ClientHandler.java), file tree | Correct WebSockets to TCP sockets, with JavaFX client. Executor-based connection handling is inspectable; no scalability guarantee. Flag local path configuration as a setup limitation. |

The four previously published slugs remain unchanged. Logistics and Aetheris add new slugs and sitemap entries. The logistics and TaskHive entries remain Home's featured selection; the library offers all six case studies without filters.

## Verification

Run `node --test tests/projects.test.mjs` for stable routes, distinct IDs, complete evidence fields, resource-link shape, and key factual corrections. Run the normal lint, TypeScript, theme tests, and static export too. Inspect every exported case study directly and through library links at mobile/desktop sizes in both palettes. Verify heading order, named main landmarks, section links, active Projects navigation, persistent appearance, canonical URLs, sitemap coverage, and visibility with JavaScript disabled.
