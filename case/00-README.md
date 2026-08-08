# По-ту-сторонний / Otherworldly — website case study

Portfolio case for the redesign and rebuild of the website of «По-ту-сторонний», an independent
international film festival-laboratory based in St. Petersburg.

| | |
|---|---|
| **From** | single-page Tilda site, Russian only, no ticketing, no schedule, no CMS |
| **To** | multipage bilingual site, dark-only, CMS-driven, Timepad ticketing, generated timetable |
| **Method** | vibecoding — AI-assisted design and development, documented as it happens |
| **Started** | 2 August 2026 |

## Documents

| | Document | What it contains |
|---|---|---|
| 01 | [Brief](01-brief.md) | The festival, content inventory of the current site, requirements, open questions |
| 02 | [Roadmap](02-roadmap.md) | Phase map, 32 portfolio artefacts, how to collect them, session plan, risks |
| 03 | [Reference research](03-research-references.md) | 12 festival sites analysed, 7 patterns, 6 anti-patterns |
| 04 | [CMS & hosting architecture](04-cms-architecture.md) | Next.js + Sanity, cost, bilingual mechanism, content model, Timepad, deployment |
| 05 | [Information architecture](05-information-architecture.md) | Sitemap, URL scheme, navigation, page models, user flows, traceability |
| 06 | [Wireframes](06-wireframes/) | Three interactive low-fi directions — **open `index.html`** |
| 07 | [Process log](07-process-log.md) | Dated sessions, **109 numbered decisions**, open items |
| 08 | [Visual audit](08-visual-audit.md) | What the current site gets right, what's broken, measured before-state, rendering defects |
| 09 | [Two worlds](09-two-worlds.md) | ⚠️ **Superseded 3 Aug.** The dual-register system, designed and built, then cut. Kept as the record of a rejected direction |
| 10 | [Visual direction](10-visual-direction.md) | References decoded, 11 revisions, the palette and its corrections |
| 11 | [Design system](11-specimen/) | **Rebuilt 3 Aug.** Six rules, tokens, the one primitive, what was rejected and why |
| 12 | [Homepage](12-homepage/) | **Open `index.html`.** The projection concept — ЗАЛ / ЛУЧ |
| 13 | [Type chooser](13-type/) | Seven display faces tested on the real material — Golos Text chosen |
| 14 | [Inner pages](14-pages/) | **Five pages** — timetable, programme, film, article, archive edition |
| 15 | [`../site/`](../site/README.md) | **The build.** Next.js 16 + Sanity, embedded Studio, nine schemas, i18n |

---

## The six requirements, and where each is answered

| Requirement | Answer |
|---|---|
| RU / EN | Sub-path routing `/ru` `/en`, field-level translation, RU fallback, equivalence-preserving switcher — `04`, `05` |
| **Dark only** | Held. No theme toggle anywhere. The site is the auditorium — dark is the condition of watching film, not a preference. A two-world system was built and then cut (`09`) — `10` |
| CMS | Sanity Studio embedded at `/studio`, 9 document types, Russian field labels. New sections appear without a build via the flexible `[slug]` route, and curators order the menu themselves — `04` |
| Multipage | 9 top-level sections, real routes, filter state in URL — `05` |
| Timepad | Popup-mode widget behind our own `TicketButton` component — `04` |
| Timetable | Generated from event data, three responsive treatments — `04`, `05` |

---

## Where things stand

**Structure: direction C (Лента) for the homepage, direction A (Каталог) for the sub-pages** —
the hybrid recommended in `06-wireframes/README.md`. B stays in the case as a tested alternative.
Display face: **Golos Text**. Palette: monochrome, ЗАЛ primary.

**Done** — phases 0–5 of the roadmap: audit, research, CMS architecture, IA, wireframes,
visual direction, and the full page set — homepage plus five inner pages.

**Built and passing** — `../site/`. `next build` green, 46 pages prerendered.
Nine Sanity schemas, embedded Studio at `/studio`, RU/EN routing with real hreflang and
one sitemap for both languages, tokens declared once, every page wired to queries with a
seed-data fallback so the repo runs without any keys. Article bodies render from Portable
Text; alt text is required by the schema rather than requested of the editors.

**Not started** — CMS content migration, Timepad account, launch, and assembly of the case
study itself. Roadmap phases 9–11.

**Waiting on the client** — 2024/2025 poster source files, real festival photography,
confirmed September dates, Timepad organiser account, domain. Also: has anyone from the
festival seen the design yet?

**Still to capture** — reference screenshots are sitting in Downloads; move them into
`assets/references/`. The Tilda before-state has never been captured:
**[`assets/before/CAPTURE.md`](assets/before/CAPTURE.md)** is the protocol, about fifteen
minutes. No longer urgent — Tilda stays live in parallel rather than being replaced — but
still needed for the case's before/after spread.

**Deploying** — [`../DEPLOY.md`](../DEPLOY.md): Sanity project, GitHub repo, Cloudflare
Workers, and what to tell the client is still placeholder. GitHub Pages was ruled out —
static hosting cannot run the Studio or ISR (D-107).

**Case assembly waits for launch** (decided 7 Aug). Bilingual Markdown for a portfolio
builder, written when there are real photographs, real metrics and a client quote to put
in it. Until then the process log is the case's raw material.

---

## What's in here, and why each file stays

Every file is either a live working artefact or part of the case record. Nothing is scratch.

| Keep | Why |
|---|---|
| `00`–`10` docs | The case record. `09` is superseded but retained deliberately — a system designed, built and then cut is stronger material than a straight line |
| `06-wireframes/` | The three structural directions, including the two rejected |
| `11-specimen/` | Design system, rebuilt. The source of truth — pages are reconciled against it |
| `12-homepage/` | Current homepage, direction C |
| `13-type/` | Type chooser. Kept as the record of seven faces tested, not a live tool |
| `14-pages/` | Five inner pages — direction A |
| `assets/*/` | Empty, deliberately: destinations for before-state and reference screenshots that still need capturing |

---

## Folder layout

```
otherworldly/
└── case/
    ├── 00-README.md                    ← you are here
    ├── 01-brief.md                     festival, content audit, requirements
    ├── 02-roadmap.md                   phases, artefacts, risks
    ├── 03-research-references.md       12 festival sites, patterns, anti-patterns
    ├── 04-cms-architecture.md          Next.js + Sanity, Timepad, content model
    ├── 05-information-architecture.md  sitemap, URLs, flows
    ├── 06-wireframes/                  A / B / C — open index.html
    ├── 07-process-log.md               sessions, 109 decisions, open items
    ├── 08-visual-audit.md              current site measured, defects found
    ├── 09-two-worlds.md                ⚠ superseded — kept as a rejected system
    ├── 10-visual-direction.md          references decoded, 11 revisions
    ├── 11-specimen/                    ★ design system — source of truth
    ├── 12-homepage/                    ★ open index.html
    ├── 13-type/                        seven display faces tested
    ├── 14-pages/                       ★ five inner pages
    └── assets/                         empty — awaiting screenshots
        ├── before/                     Tilda before-state (to capture)
        ├── references/                 moodboard sources (in Downloads, to move)
        ├── progress/                   dated build screenshots
        └── final/
└── site/                          the build
    ├── src/app/globals.css        ★ tokens — declared once, not seven times
    ├── src/app/[locale]/          homepage (season spine) + timetable
    ├── src/app/studio/            embedded Sanity Studio
    ├── src/components/B.tsx       ★ the one interactive primitive
    ├── src/sanity/schemas/        nine document types
    └── src/lib/seed.ts            demo data — repo runs without Sanity keys
    
    routes: / · /[locale] · timetable · programme · film/[slug]
            materials · materials/[slug] · archive · archive/[year] · /studio
```
