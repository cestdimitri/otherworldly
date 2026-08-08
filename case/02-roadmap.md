# 02 — Project roadmap

How the project runs, what gets produced, and what each artefact is worth in the portfolio case.

---

## Guiding principle

Vibecoding produces work fast. A portfolio case needs **evidence of thinking**, not just a
finished site. So every phase has two outputs: a *thing that works* and a *record of why it
looks like that*. The record is captured **while** the work happens, never reconstructed after.

The cheapest way to do this: one `case/` folder, one commit per meaningful decision, and a
running `07-process-log.md` that gets a dated entry each session. Screenshots are taken at the
moment something changes, because "before" states are impossible to recover later.

---

## Phase map

| # | Phase | Output | Portfolio artefact | Status |
|---|---|---|---|---|
| 0 | Brief & audit | Content inventory, requirements | Before-state screenshots, content audit table | ✅ done |
| 1 | Research | Reference analysis, moodboard | Competitive/reference grid, pattern notes | ✅ done (screens pending) |
| 2 | Architecture | IA, sitemap, content model | Sitemap diagram, content model diagram | ✅ done |
| 3 | Wireframes | 3 low-fi directions | Interactive wireframes + rationale | ✅ done |
| 4 | Visual direction | Style references → design system | Moodboard, type/colour specimen, UI kit | ✅ done — 11 revisions, `10` + `11` |
| 5 | Hi-fi design | Key page designs | Desktop + mobile comps, dark-only rationale | ✅ done — homepage + 5 inner pages, `12`–`14` |
| 6 | Build | Next.js + Sanity site | Code snippets, architecture diagram, Lighthouse | 🟡 built and typechecked; Lighthouse not run |
| 7 | CMS setup | Sanity Studio, schemas, RU/EN | Studio screenshots, editor walkthrough GIF | 🟡 schemas written; no Sanity project exists yet |
| 8 | Integrations | Timepad, timetable, analytics | Integration diagram, flow demo | 🟡 timetable done; Timepad awaits an organiser account |
| 9 | Content migration | Real content in both languages | Before/after comparison | ⬜ |
| 10 | QA & launch | Live site | Perf/a11y scores, cross-device tests | ⬜ |
| 11 | Case assembly | The portfolio case itself | Full case study page | ⬜ **the remaining deliverable** |

---

## The full artefact list

Everything below is worth capturing. Marked ★ = highest value for a portfolio case; these are
the ones people actually stop and read.

### Framing artefacts (why this project exists)

1. **★ Before-state capture** — full-page screenshots of the Tilda site, desktop and mobile.
   Take these *now*; the site will change. Also capture: page weight, Lighthouse score,
   time-to-interactive. Numbers make the "after" credible.
2. **Problem statement** — one paragraph. What the Tilda site cannot do: no EN, no ticketing,
   no schedule, no independent content editing, single-page ceiling.
3. **Content audit table** — every existing block mapped to its destination. (In `01-brief.md`.)
4. **Constraints list** — RU/EN, dark-only, CMS, multipage, Timepad, timetable. State them up
   front so every later decision can be traced back to one.
5. **Stakeholder map** — four curators, all editors, none technical. This single fact drives
   most of the CMS decisions.

### Research artefacts

6. **★ Reference grid** — 10–14 festival sites, screenshotted, annotated. Not "sites I like"
   but "sites that solved a problem I also have."
7. **Pattern inventory** — how festival sites handle programme filtering, schedule density,
   film detail pages, archives, bilingual switching. One row per pattern, per site.
8. **Anti-patterns** — what to avoid, with examples. Reads as judgement, not just taste.
9. **★ Moodboard** — visual references, once you supply the style direction.

### Architecture artefacts

10. **★ Sitemap diagram** — the full page tree, both languages.
11. **URL scheme table** — including the RU/EN routing decision and why.
12. **★ Content model diagram** — Sanity document types and their relationships. This is the
    artefact that separates a designer who *made a site* from one who *designed a system*.
13. **User flows** — three: visitor buys ticket; filmmaker submits to open call; curator
    publishes an event.
14. **Editorial workflow diagram** — draft → review → publish, per language.

### Design artefacts

15. **★ Three wireframe directions with rationale** — including the ones not chosen. Rejected
    options are the most under-used portfolio material there is.
16. **Type specimen** — the dark-mode type scale, RU and EN, since Cyrillic and Latin behave
    differently at the same optical size.
17. **★ Dark-only colour system** — with contrast ratios shown. This turns an aesthetic choice
    into a defended decision.
18. **Component inventory** — buttons, cards, accordions, schedule row, film card, lang switcher.
19. **Hi-fi comps** — home, programme, film detail, timetable, article, archive.
20. **Motion notes** — what animates, what does not, and the reduced-motion fallback.
21. **Responsive behaviour** — how the timetable degrades on mobile. This is the hardest
    single layout problem in the project and worth its own artefact.

### Build artefacts

22. **★ Architecture diagram** — Next.js on Vercel, Sanity dataset, Timepad widget, image CDN.
23. **Schema code excerpts** — 2–3 short, well-chosen snippets. Not a code dump.
24. **★ Vibecoding process record** — this is your differentiator. Which prompts produced what;
    where AI got it wrong; what you had to correct by hand. Most portfolio cases pretend AI
    wasn't involved. Showing the actual workflow is more interesting and more honest.
25. **Lighthouse before/after** — performance, accessibility, best practices, SEO.
26. **i18n implementation notes** — how the RU/EN fallback works when a translation is missing.
27. **Timepad integration writeup** — the widget is iframe-based, which constrains styling.
    Documenting the workaround is a real engineering note.

### Outcome artefacts

28. **★ Before/after comparison** — side by side, same viewport.
29. **Editor walkthrough** — short screen recording of a curator publishing a post.
30. **Metrics** — page weight, load time, a11y score, editor time-to-publish.
31. **Client quote** — ask for one at handover. Two sentences is enough.
32. **What I'd do differently** — closes the case honestly and reads as maturity.

---

## The most optimised way to collect all of this

The failure mode is collecting nothing during the work and trying to reconstruct it at the end.
Three habits prevent that.

**1. Capture at the moment of change, not after.**
Before touching anything, screenshot the current state. Every time a layout meaningfully changes,
screenshot again into `case/assets/progress/YYYY-MM-DD-what.png`. Storage is free; memory is not.

**2. One session = one log entry.**
At the end of each work session, add 5–10 lines to `07-process-log.md`: what you did, what
decision you made, what you rejected, what broke. Ten minutes per session, and the case
essentially writes itself.

**3. Commit messages as documentation.**
`feat(programme): add year filter — curators need 2024/2025 separable in one view` tells the
whole story later. `git log --oneline` becomes a free project timeline.

**Folder structure to keep:**

```
otherworldly/
├── case/                    ← the portfolio case (this folder)
│   ├── 00-README.md
│   ├── 01-brief.md
│   ├── 02-roadmap.md
│   ├── 03-research-references.md
│   ├── 04-cms-architecture.md
│   ├── 05-information-architecture.md
│   ├── 06-wireframes/
│   ├── 07-process-log.md
│   └── assets/
│       ├── before/          ← Tilda screenshots
│       ├── references/      ← moodboard sources
│       ├── progress/        ← dated build screenshots
│       └── final/
└── site/                    ← the actual Next.js project
```

**Decision log format** — one line each, in the process log:

```
D-014 | 2026-08-09 | Sub-path routing (/ru, /en) over domain-based
        Why: single deploy, single sitemap, cheaper. Cost: RU users see /ru not /.
        Rejected: ru.domain / en.domain — no benefit at this scale.
```

Twenty of these lines are more convincing than three paragraphs of prose.

---

## Session plan

**Session 1 (done)** — audit, research, IA, CMS plan, wireframes.
**Session 2** — you supply visual references → moodboard, colour + type system, wireframe choice.
**Session 3** — hi-fi design of home + programme + film detail.
**Session 4** — scaffold Next.js + Sanity, define schemas, i18n.
**Session 5** — build pages against real content.
**Session 6** — Timepad + timetable.
**Session 7** — content migration, QA, launch.
**Session 8** — assemble the case study.

---

## Risks

| Risk | Impact | Mitigation |
|---|---|---|
| EN translation never arrives | Half-empty site | Build language fallback: missing EN falls back to RU with a notice, rather than a 404 |
| Timepad account not ready | Ticket buttons dead at launch | Build the ticket component against a config flag; ship with "coming soon" state |
| Curators find the CMS intimidating | They stop updating, site rots | Schema design in plain Russian labels, previews on every document, a 1-page written guide |
| Archive data doesn't exist in structured form | Archive pages thin | Accept text-only archive for 2024, structure from 2025 onward |
| Timetable complexity underestimated | Blows the schedule | Prototype the timetable early, in session 3, not at the end |
| Dark-only + experimental type = poor contrast | Accessibility failure | Fix a minimum contrast rule at design-system time and test every token |
