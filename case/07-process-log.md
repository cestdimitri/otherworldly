# 07 — Process log

Running record of the project. One entry per session. Written *during* the work, not after.
Decisions get an ID (`D-nnn`) so later documents and commit messages can reference them.

---

## Session 1 — 2 August 2026

**Goal:** Audit the existing site, research references, define architecture, produce wireframe
directions.

**Done**

- Audited https://otherworldly.tilda.ws/ — single-page Tilda, RU only, ~12 content blocks.
  Full content inventory in `01-brief.md`.
- Established the six hard requirements: RU/EN, dark-only, CMS, multipage, Timepad, timetable.
- Researched 12 film festival sites; wrote up 7 patterns and 6 anti-patterns in
  `03-research-references.md`.
- Chose the stack and wrote the CMS architecture (`04-cms-architecture.md`).
- Designed the IA: 9 top-level sections, 9 Sanity document types (`05-information-architecture.md`).
- Built three interactive low-fi wireframe directions (`06-wireframes/`).
- Visual audit of the current site from a full-page capture (`08-visual-audit.md`): what to
  keep, what's broken, draft dark palette with measured contrast ratios.
- Corrected wireframe placeholder dates from November to September 2026.

**Not done**

- Reference screenshots — Claude in Chrome installed but the side panel isn't signed in yet.
  Blocking the moodboard.
- Before-state screenshots of the Tilda site at full resolution, desktop + mobile, plus
  Lighthouse. **Do this before anything changes.**
- Visual direction — waiting on style references and real festival photography from the client.

---

### Decisions

```
D-001 | 2026-08-02 | Next.js + Sanity over Astro+Decap and Payload
        Why: four non-technical editors need a real editing UI with live preview, image
        hotspots and revision history. Git-based CMS (Decap/Keystatic) would put them in a
        markdown editor — wrong tool for this team. Payload needs a Postgres database
        someone has to run.
        Cost: dependency on a hosted third party.
        Mitigation: content is exportable via `sanity dataset export`, so lock-in is low.

D-002 | 2026-08-02 | Sanity Studio embedded at /studio, not hosted separately
        Why: one repo, one deploy, one domain, one login. For a four-person team the
        cognitive saving is larger than the architectural cost.
        ⚠️ SUPERSEDED 8 Aug by D-110 — it does not fit in a 3 MB Worker. No size
        estimate was ever made when this was decided.

D-003 | 2026-08-02 | Locale as URL sub-path (/ru, /en), not subdomain or separate domain
        Why: single deploy, single sitemap, single certificate, clean hreflang.
        Cost: Russian users land on /ru rather than the bare root.
        Rejected: ru.domain / en.domain — no benefit at this scale, doubles DNS and cert work.

D-004 | 2026-08-02 | Slugs stay identical across locales
        Why: translating slugs doubles routing complexity and breaks shared links for an
        audience that moves between languages.

D-005 | 2026-08-02 | Field-level translation for films/events/people;
        document-level for articles
        Why: films and events are one object with two labels — side-by-side fields stop
        curators creating orphan English events. Articles are often genuine rewrites, or
        exist in one language only, so they need to be separate documents.

D-006 | 2026-08-02 | Missing EN falls back to RU with lang="ru" on the element
        Why: never show a gap or a 404 because a translation is late. Marking the language
        keeps screen readers correct. Accessibility decision, not a convenience one.

D-007 | 2026-08-02 | `film` and `event` are separate document types
        Why: the same film screens more than once and across editions. Splitting them lets a
        film page list every screening in the festival's history — the thing the current site
        cannot do at all, and the thing that makes an archive alive.

D-008 | 2026-08-02 | Timetable is a query over events, not a maintained document
        Why: one source of truth. Curators enter each event once, with a date and venue;
        the schedule assembles itself. Nothing to fall out of sync at the worst possible moment.

D-009 | 2026-08-02 | Timepad in popup mode, triggered by our own button
        Why: the widget renders in a src-less iframe and cannot be styled from our stylesheet.
        Popup mode isolates it so the site's dark identity stays intact.
        Cost: the checkout itself will not be dark without a Timepad-side customisation.
        Open: budget for that customisation, or accept the mismatch.

D-010 | 2026-08-02 | TicketButton renders a disabled "on sale soon" state when
        timepadEventId is empty
        Why: lets the whole site ship before the Timepad account is finalised, and prevents
        dead buttons at launch.

D-011 | 2026-08-02 | Edition is a document, not a page
        Why: 2027 should be a new entry, not a new build.

D-012 | 2026-08-02 | Homepage is a strand selector, not a scroll
        Why: the current site's core failure is that everything is on one page, so nothing has
        weight. Evidenced by Alchemy and Open City, both of which refuse the hero-and-scroll model.

D-013 | 2026-08-02 | Dark-only is the case study's lead argument
        Why: not one of the 12 reference sites is dark-only. For a festival about spectrality,
        hauntology and the liminal image — and about watching film in a dark room — it is
        thematically earned rather than decorative. Also the strongest differentiator.

D-014 | 2026-08-02 | Wireframe recommendation: hybrid — C's homepage over A's sub-pages
        Why: a timeline is the right framing device but a bad way to browse 40 films. All three
        directions adopt B's four-strand navigation.
        Status: awaiting client decision.
```

**D-015 to D-022** — made later the same day, after capturing the current site. In
[`08-visual-audit.md`](08-visual-audit.md): September dates, ghost numerals kept, pipeline image
treatment, `#E8E8EA` over `#FFFFFF`, and the two findings that reframed the project — the
poster system is the real brief (D-020), and the current markup can't be extended to
bilingual (D-022).

**D-023 to D-031** — the two-world system, in [`09-two-worlds.md`](09-two-worlds.md).
Supersedes the dark-only requirement.

**D-032 to D-040** — visual direction, in [`10-visual-direction.md`](10-visual-direction.md).
Direction A confirmed; the site reads as a printed document; night ground `#0B0D14` replaces
neutral black; **coral-red replaces lilac as the accent (supersedes D-026)** — the references
chose it, not me.

**D-041 to D-045** — revision 2, after review. Ground goes much whiter; **weights go up and the
dark world becomes the boldest — I had the optical rule backwards (supersedes D-025)**; one
shape language, radius 0 throughout; the vellum layer; homepage rebuilt as a threshold.

**D-046 to D-052** — **revision 3, the reset.** Revision 2 was rejected: *"there's nothing
conceptual in this kind of concept."* Correct. It had been adding *signals* of conceptuality —
corner brackets, coordinates, `[SEASON.03]`, numbered sections, dot grids, hairlines — rather
than a concept. The test it failed: every one of those could be deleted without changing what
the site meant.

Replaced with **проекция** — the site is a projection surface. ЗАЛ (the room, dark, primary) /
ЛУЧ (the beam). The crossing is the projector switching on. Dark becomes primary; dividers
disappear entirely (luminance replaces them); type becomes Unbounded 900 + Inter.

**D-053 to D-058** — revision 4. **No accent colour at all** — two guesses failed and the answer
was that there isn't one, which six of the eight references had been saying. One interactive
primitive replaces five. The world switch becomes a toggle with a moving part, not a button
clone. Header becomes a fixed left rail, transparent over the hero. The wordmark becomes SVG so
it can't overflow. Dot wave on the first screen, with three separate cost controls.

---

**D-059 to D-063** — revision 5. Display face to be **chosen from a live specimen** rather than
guessed a fourth time (`13-type/`). Navigation becomes a film reel — frames that light up, with
a sprocket strip. Both toggles stop being buttons: the world switch becomes a fader, the language
switch becomes plain text. Five line illustrations on `currentColor`. Gallery mosaic added.

**Bug — the type chooser wasn't switching.** All seven candidates were requested in a *single*
Google Fonts `css2` call with eight `family=` parameters. When one family in a combined request
is invalid, the **entire stylesheet fails** — so every candidate fell back to the same system
sans and clicking appeared to do nothing.

Three fixes, and the third is the one that matters:

1. **One `<link>` per family.** A single bad family can no longer take down the others. Applied
   to all three HTML files, not just the chooser.
2. **Re-render on `document.fonts.ready`.** SVG `textLength` is computed at paint time — if the
   webfont arrives afterwards, the wordmark is laid out with fallback metrics and never corrects.
3. **The page now audits itself.** For each candidate it measures `ЩЖФДЪЙ` and `ABCDEFG` against
   a known fallback. Equal widths mean the font didn't apply. It then reports *которое* of the
   two failed — `не загрузился` (neither) versus `нет кириллицы` (Latin applied, Cyrillic didn't)
   — and strikes the candidate out in the picker.

That third fix also caught a real problem: **Archivo's Cyrillic could not be confirmed** (there's
an open request for it upstream). Replaced with **Commissioner** — variable, genuine Cyrillic,
full range to 900. Rather than keep trusting my own recall about which faces cover Cyrillic, the
page now verifies it at runtime and says so.

**D-064 to D-069** — revision 6. **Golos Text** confirmed as the display face. Navigation returns
to the top as a **detached translucent dock** (supersedes the left rail). And the homepage is
rebuilt as **direction C, Лента** — the season as a vertical axis of the year, with the year axis
drawn as a beam rather than a rule, festival days expanded inline, and the whole spine reading
from `edition` dates in the CMS. Direction A's catalogue logic still governs the sub-pages, which
is the hybrid recommended back in `06-wireframes/README.md` — now actually built.

**D-070 to D-074** — revision 7. **Archive moved out of the timeline** — a logic error: the spine
runs forward through the season, so the past can't sit below the future. It now pairs with the
gallery. Display weights **900/700 → 600/500** with tracking relaxed to match, and the wordmark
size recalculated (88 → 118) because a lighter weight needs a larger size to avoid `textLength`
scattering the letters. Logo removed from the dock. And **the light world stopped being a
negative** — diagnosed by measurement: the two worlds had near-identical contrast ratios
(Δ 0.17–0.54), which is literally what a negative is.

**D-075 to D-078** — revision 8. **The mobile dock had three compounding bugs**, not one:
`margin-left:auto` surviving into mobile, nav compressing instead of scrolling (no
`flex:0 0 auto`), and `.away` measured against the desktop height. Replaced `flex-wrap` with an
explicit two-row column — implicit layout was making the decision and making it wrong.
Added **Материалы** (photo-cover cards, between timeline and archive — the festival is a
publisher, and materials are current output) and **Команда** (below the gallery). Both map onto
document types already in the content model: `article` and `person`. No new types.

**D-079 to D-086** — revision 9, the largest cut in the project. **The two-world system is
gone** — designed, built, then removed, and the original dark-only requirement restored. The
site is the auditorium; dark is the condition of watching film, not a theme, and a switch to
turn it off argued the condition was optional. Retiring it also retired the D-024 warning that
every future component would be designed twice forever.

Also: buttons become frosted glass with a light source behind (they illuminate rather than
wipe); a three-token **glow scale** applied in 18 places, where glow marks what is *live*;
a four-layer **cheap-print texture** (two dot grids at different pitches interfere and read as
misregistered printing, where one would read as a screen door); a fixed background gradient
originating at the same point as the beam and the wave; a **burger menu**; the footer as a
**technical spec plate**; and a factual correction — Елиза Тимофеева is not a «К!» co-founder.

**D-087 to D-088** — revision 10. Film-grain layer removed: it was unstructured dirt fighting
two structured print screens, and softening type the system works to keep sharp. The print
character was never coming from the noise. Plus a real CSS bug — **the burger showed on
desktop** because `.burger{display:none; all:unset; …}` had the shorthand *after* `display`,
and `all` resets everything declared before it. Rule going forward: `all:unset` always first.

**D-089** — revision 10, second pass. **All full-screen texture removed**; the halftone survives
only on imagery. This was a category error I'd written down and then ignored: I'd described the
page layers as "paper tooth" and the image layers as "ink screen", then applied the paper tooth
to the whole viewport. But the page isn't paper — **it's a dark room**, and a room doesn't have
a screen pattern across it. What's printed is the photograph, and only the photograph.
Lesson worth keeping: texture should belong to a *material*, not to the viewport. If it can't
answer "what surface is this?", it's a filter.

**D-090 to D-095** — the timetable, finally built (`14-pages/timetable.html`). Flagged in
session 1 as the highest-risk page and left as a sketch until now. It didn't invalidate the
system, but it did expose the same mistake twice running.

Three attempts at encoding a strand graphically, all three removed:

1. **Colour** — four hues. Died with the decision to go monochrome.
2. **Line weight** — 3/2/1px. Failed for exactly the reason grey tones would have: weight is a
   *magnitude*. It lines up as more/less and reads as importance. A strand is a **category**,
   not a rank — Эхо isn't less important than Фестиваль, it's in another city.
3. **A symbol on the spine** — square / circle / triangle / chevron. Nominally correct, but it
   needed a legend: a symbol has to be learned before it means anything.

What survived is the thing that had been doing the work the whole time: **the word.**
`ФЕСТИВАЛЬ`, `ЛАБОРАТОРИЯ`, `СПЕЦПРОГРАММА`, `ЭХО` — 9px caps above the title, in the same slot
as `.kind` on material cards and `.state` on season phases. One pattern across the project.

**The general lesson, worth keeping:** before inventing a visual code for a category, check
whether a word will just name it. Graphic encoding earns its place when there's no room for the
word — here there was.

The grid is time-proportional (row = 30 min, span = duration), so duration reads as height and
clashes are physically impossible to hide. Verified programmatically: 12 events, 0 overlaps,
0 overflows.

**Programme and film pages built** (`14-pages/`). Two things worth recording.

**Programme is deliberately not a second timetable.** Same events, different question — the
timetable answers "what can I fit in on Saturday", the programme answers "what's showing at
all". So it drops time as an axis entirely and sorts by properties of the work instead: strand,
format, duration, title. Format sits alongside strand as a filter because for an experimental-film
audience 16mm and digital are *different events*, not a technical footnote. Checked: 2 of 15
filter combinations return nothing, so the empty state tells you what to do rather than just
reporting a void. Query values are validated against an allow-list — a stale link with junk in
the query shouldn't be able to break the view.

**The film page's screenings block is the payoff of a decision made in session 1.** Splitting
`film` from `event` in the content model (D-007) is what lets that page list every screening of
a work across the festival's whole history, past seasons included, dimmed to 50% but not hidden.
That's the thing that makes an archive alive rather than a graveyard, and it's the thing the
current site cannot do at all. Format is recorded per *screening* rather than per film for the
same reason — the same work ran from digital in 2025 and runs from 16mm in 2026.

**Archive edition page built** — the last page in the plan. It turned out to be where the glow
rule proves itself: **nothing in the archive glows.** A closed season has no current phase, no
next event, nothing to buy. Had the archive glowed like the homepage, that would have meant the
glow was decoration all along rather than a state. Counted: 7 glow applications on the timetable,
6 on the article, 4 on the programme, 3 on the film page — and **1** on the archive, on the
current-season card at the foot. It's the only live thing on that page and it reads as such
without a label.

Ticket buttons are replaced by an "Архив" marker: the interface admits the action is impossible
rather than offering a control that would do nothing. The background gradient is a step darker
than on live pages — the projector is off. Nothing is hidden and everything stays readable;
what's dimmed is the signalling of action, not the content. Direct consequence of the content-
governance rule in `05`: a closed edition stops changing, and that's what makes it an archive.

**First build green** — `next build` passed on the first attempt, including the TypeScript
check on the schemas and `sanity.config.ts`, which are the two files I could not verify in the
sandbox. Both `/ru` and `/en` prerendered, `/studio` correctly dynamic. Worth recording that the
one part I had to hand off unverified is the part that turned out fine; the bugs had all been
caught earlier by typechecking the app code in isolation.

Then the remaining pages ported: materials (list + article), archive (list + edition).
Ten routes, 1,910 lines. Every internal link now resolves to a route that exists — checked
programmatically rather than by eye, because a dead link in a portfolio piece is worse than
a missing page.

**hreflang, metadata, sitemap and the revalidation webhook added** — 2,136 lines. Worth naming
because these are the parts that make the bilingual requirement *true* rather than merely routed:
until now RU/EN existed only as URL segments. `lib/meta.ts` emits canonical + both languages +
`x-default` pointing at Russian (the festival is in St. Petersburg; for an unknown language
that is a more sensible entry than English). One sitemap covers both languages — which is the
concrete payoff of choosing sub-paths over subdomains back in D-003, and the first time that
decision has actually earned anything.

The webhook revalidates only the routes the changed document type touches, not the whole cache.
Flushing everything on every comma is the same 60 seconds of staleness, just more expensive.

Also ported the footer, which I had simply forgotten — the spec plate existed in the prototype
and in no code at all.

**Build started** (`../site/`). Next.js 16 App Router + Sanity, 1,277 lines across 37 files.
App code typechecks clean.

The point of doing the system rebuild first shows up immediately: **tokens are now declared
once**, in `src/app/globals.css`, instead of seven times. The five-variant drift found during
the rebuild couldn't have survived contact with a single stylesheet — but it would have been
carried into the code if I'd ported before reconciling.

Three decisions that only became real once written as code:

- **`src/lib/seed.ts`** — the site runs on demo data when `NEXT_PUBLIC_SANITY_PROJECT_ID` is
  empty, with the same shape a GROQ query returns. Deliberate: a repo that needs keys before it
  will start can only be shown to someone you also hand credentials to.
- **`film.ts` + `event.ts`** — D-007 as two schema files. The format field lives on the
  *screening*, not the film, which is what lets a film page list every showing across the
  festival's history with the right carrier on each.
- **`i18n.ts`** — the EN→RU fallback returns both the text *and* the language it came from, so
  the component can put `lang="ru"` on the element. An accessibility decision, and it's only
  enforceable because the fallback is a function rather than a `??`.

Programme and film pages ported too — 1,532 lines now. The programme page splits server and
client deliberately: data is fetched on the server, filtering happens on the client, because a
season is a few dozen events and round-tripping them on every filter click would be worse than
useless. The film page carries the screenings block that D-007 made possible, though it needs
real multi-season data before it can show more than the current edition.

Sanity Studio and the full dependency tree install on the developer's machine — the sandbox
here couldn't complete a tree that size, so `npm install` is a local step.

**Design system rebuilt** (`11-specimen/`). The old file documented the two-world system —
i.e. something that no longer existed — and had only been palette-patched since.

Before writing it I diffed tokens and the `.b` primitive across all six built pages
programmatically, which is the part worth recording:

- **17 of 19 tokens already matched.** The two that didn't were `--surface` and `--edge` in the
  archive page — and that was *deliberate*, not drift. Fixed by promoting it to a documented
  variant, `[data-mode="archive"]`, instead of a silent local override.
- **The primitive had genuinely drifted into five variants** — heights 36/38/40/42, fills .028
  and .07, two font sizes. Nobody decided that; it accumulated because each page carries its own
  copy of the CSS. Reconciled to one definition: `--h-ctl` 40 / 34, quiet fill by default,
  `.b--on` and `aria-pressed="true"` for active. `.b--out` deleted — it was identical to the
  new default.

The drift is the argument for doing this *before* the Next.js build rather than after: static
prototypes duplicate CSS by nature, and duplication is where systems quietly diverge.

The rebuilt file also carries a **"Rejected" section** — the two-world system, the accent colour,
three strand encodings, full-page texture, site-wide rounding — each with the reason. In a design
system that's more useful than the list of what survived: it shows where the edges are and stops
anyone relitigating a settled question.

**D-096** — the dock reworked: 41% more transparent, blur up to 30px so the projection reads
*through* the panel rather than behind it, and the hard 1px outline replaced by four layers —
a highlight along the top edge (light arrives from above, from the same point as the beam),
a softer contour, and two outer shadows. Corners rounded, but **scoped to the dock only** via
separate tokens. Square corners are a system rule (D-043); changing it wholesale should be a
decision, not a side effect of a navbar tweak.

**Article page built.** The only page in the project where text is the subject rather than a
caption, so everything follows from that: 64-character measure, 16.5px, 1.76 leading.
Justified setting — Cyrillic rags less badly than Latin, but it needs `hyphens:auto` or the
narrow measure produces rivers. Justification switches off below 900px: under ~45 characters it
falls apart in any language, so that's a threshold, not a "simpler mobile version".
The read-progress bar measures against the *end of the article*, not the document — otherwise
the footer and the "read next" block would count as text read and the bar would lie.

### Open items

Closed since session 1: Chrome connection, style references, accent hue (moot — monochrome),
display face, wireframe direction, the `prefers-color-scheme` question (moot — no light mode).

| # | Item | Blocking | Owner |
|---|---|---|---|
| 1 | **Capture the Tilda before-state** — full-page desktop + mobile, plus Lighthouse | The whole before/after of the case | Dmitrii — the site is still up, this has a deadline |
| 2 | Move reference screenshots from Downloads into `assets/references/` | Moodboard section of the case | Dmitrii |
| 3 | **Show the design to the curators.** Eleven revisions, no client has seen it | Everything downstream | Dmitrii |
| 4 | **5–10 real festival photographs** | Image treatment is still gradient placeholders | Client |
| 5 | 2024/2025 poster source files (D-020 — the system to port) | Verifying the type decision | Client |
| 6 | Confirm actual September 2026 dates | Every page shows placeholders | Client |
| 7 | Timepad organiser account | Ticket integration | Client |
| 8 | Domain | Deployment | Client |
| 9 | Vercel Pro vs Cloudflare Pages — Hobby forbids commercial use | Launch | Dmitrii |
| 10 | Does EN need full parity at launch? | Content scope | Client |
| 11 | Do 2024/2025 programmes exist as structured data? | Archive depth | Client |
| ~~12~~ | ~~Rebuild `11-specimen/`~~ — **done 3 Aug**, and it surfaced real drift | — | done |

---

## Sessions 2–3 — 2–3 August 2026

Design direction. Eleven revisions, recorded above as D-032 onward. Two of them were
reversals of my own earlier decisions rather than refinements — the optical weight rule
(D-042) and the two-world system (D-079) — and both are kept in the record because the
reasoning that killed them is more useful than the reasoning that created them.

Then four pages built against the settled direction: timetable, programme, film, article.

**Blocked / not done**

- Reference screenshots still in Downloads, not moved into `assets/references/`.
- Tilda before-state and Lighthouse never captured. The site is still up — this one has
  a deadline attached.
- No one from the festival has seen the design.

**Next session**

- Archive edition page.
- Rebuild `11-specimen/` — it documents a system that no longer exists.

## Template for future entries

```
## Session N — DD Month YYYY

**Goal:**

**Done**
-

**Blocked / not done**
-

**Decisions**
D-0nn | date | one-line decision
        Why:
        Cost:
        Rejected:

**Screenshots taken**
- case/assets/progress/YYYY-MM-DD-*.png

**Next session**
-
```

```
D-097 | 2026-08-04 | hreflang, canonical and one sitemap for both languages
        Why: until now RU/EN existed only as URL segments — nothing told a search engine
        the two were the same page in two languages, which is the part of "bilingual" that
        isn't visible in the browser.
        x-default points at /ru: the festival is in St. Petersburg, so for a visitor of
        unknown language Russian is the more sensible entry than English.
        Note: this is the first time D-003 (sub-paths over subdomains) actually paid for
        itself. One sitemap, one certificate, one deploy. Subdomains would need two of each.

D-098 | 2026-08-04 | Revalidation webhook scoped by document type, not a full cache flush
        Why: flushing everything on every edit costs the same 60 seconds of staleness the
        time-based revalidate already gives, only more expensively. An event touches the
        homepage, timetable, programme and archive; an article touches only materials.

D-099 | 2026-08-04 | alt text is a required field in the schema, not an editorial habit
        Why: the audit of the Tilda site found 7 images and 0 alt attributes. Reminding four
        editors on every publication does not scale; the schema is the one place this can be
        fixed once. A `decorative` flag exists so an empty alt is a decision rather than a
        skipped field — otherwise required-alt just teaches people to type a space.
        Cost: one shared `captionedImage` type replaces five bare `image` fields, so every
        query that reads an image now reads its description too.

D-100 | 2026-08-04 | Portable Text renderer defines every block explicitly
        Why: the default renderer emits a plain <img>, and a colour photograph in the middle
        of a monochrome page breaks the system louder than any layout error. Images go
        through --img like everything else. Headings come back into the site's typography
        rather than bringing their own.
```

```
D-101 | 2026-08-07 | One flexible route `[locale]/[slug]` for CMS-authored sections
        Why: this is the part of the CMS requirement a static-site generator cannot fake.
        «О фестивале», «опен-колл», «контакты» appear without a build and without a
        developer. Static segments resolve before the dynamic one, so timetable/programme/
        materials/archive are never intercepted — the route only catches what isn't in code.

D-102 | 2026-08-07 | Menu order is a shared number, not "code items then CMS items"
        Why: appending CMS pages after the built-in ones would glue them permanently to the
        tail. The open call is the item with a deadline attached — a festival lives on what
        gets submitted to it — so a curator has to be able to put it FIRST without touching
        the repository. Built-in sections occupy 20–35; anything can slot around them.
        Cost: two sources of truth for one menu. Mitigated by capping the list at five —
        the dock is narrow and the sixth item would break it on production before anyone
        noticed locally.
```

```
D-103 | 2026-08-07 | "Now" comes from one function, with a documented escape hatch
        Found: 2026-08-03 was hardcoded in two files. Convenient in a prototype where a
        screenshot has to reproduce; a straightforward bug in a built site — the homepage
        countdown starts lying the next morning. It had already been wrong by four days.
        Fix: lib/now.ts. NEXT_PUBLIC_DEMO_DATE survives for the portfolio, not for
        development: a screenshot reading "festival in 41 days" says something about the
        work; one reading "finished" says nothing. Unset in production.

D-104 | 2026-08-07 | /film/[slug] belongs to the FILM, not to a screening of it
        Found: the page looked up its subject by EVENT slug and rendered exactly one
        screening — so D-007, made on day one and named as the thing that makes an archive
        alive, had paid for nothing in three weeks. The seed data hid it: with a single
        season there is nothing for the split to demonstrate.
        Fix: FILM_BY_SLUG + SCREENINGS_OF_FILM, and a 2025 season in the seed so the
        mechanism is visible. Carrier moved to the screening — the same work ran from
        digital in 2025 and runs from 16mm in 2026. That is a property of the projection,
        not of the film.

D-105 | 2026-08-07 | An event links to a film only when it screens exactly one
        Why: the workshop, the pitching session and the reading group are not films and
        must not have film pages. A shorts programme screens several works, and choosing
        one of them for the viewer is a lie about the programme.
        The card stays a card either way — only the hover response differs. Styling the
        non-linking one differently would tell the viewer about our data model instead of
        about the programme.
        Note: the previous code put the EVENT slug under /film/, so the URL existed and
        opened the wrong thing. Broken links announce themselves; wrong ones don't.
```

```
D-106 | 2026-08-07 | Case assembly waits for launch; the before-state capture does not
        Why: a case with placeholder photography, no metrics and no client quote is a
        weaker artefact than the same case written six weeks later. Nothing is lost by
        waiting — except one thing.
        That thing: the Tilda site is still up, and the moment the domain moves, the
        "before" half of the comparison stops existing. So the capture is decoupled from
        the case and treated as its own deadline. Protocol in assets/before/CAPTURE.md,
        with fixed widths (1440 / 390) so the "after" shots can be taken under identical
        conditions — otherwise the spread shows a difference in settings rather than a
        difference in work.
        Format decided: bilingual Markdown for a portfolio builder, not a self-hosted page.
```

```
D-107 | 2026-08-07 | Cloudflare Workers for hosting; GitHub keeps the code
        Asked for: "host it on GitHub so it works and can be shown to the client."
        Conflict: GitHub Pages serves static files only. The site does server rendering,
        ISR and an embedded Studio — none of that survives there. Pages would have meant
        reversing D-002 (Studio at /studio, one login, one domain) to get hosting that is
        worse in every other respect.
        Chosen: repo on GitHub, served from Cloudflare Workers via @opennextjs/cloudflare.
        Free, no commercial-use restriction (Vercel Hobby forbids it, and tickets are
        commerce — flagged in 04 and still true). Everything built so far survives intact.

D-108 | 2026-08-07 | No publish webhook until the R2 cache exists
        Caught in my own draft: I had written two mechanisms that do the same job. The
        webhook to /api/revalidate is written and correct — but without a shared cache the
        ISR store lives in one worker isolate's memory, so a purge would reach one instance
        of several. The edit would appear for some visitors and not others.
        A mechanism that works intermittently is worse than an honest sixty seconds,
        because nobody can tell it is broken. So: ISR alone now, R2 first and webhook
        second later. Order matters and is written down in DEPLOY.md.

D-109 | 2026-08-07 | Tilda stays live in parallel — the capture deadline is void
        The before-state is still worth having for the case, but it no longer expires.
        D-106 stands as a record of a deadline that turned out not to exist.
```

```
D-110 | 2026-08-08 | Studio moves to Sanity's own hosting — D-002 reversed by a hard limit
        D-002 put the Studio at /studio: one repo, one deploy, one domain, one login,
        argued as more valuable to four non-developers than architectural tidiness.
        It doesn't fit. A Cloudflare Worker is capped at 3 MB; the build came to 18.5 MB
        because the `sanity` package alone is 22 MB. The paid tier raises the cap to
        10 MB — so this was never a question of money, and offering to pay would have
        been useless advice.
        Removed src/app/studio, added sanity.cli.ts, `npx sanity deploy` →
        otherworldly.sanity.studio.
        Honest accounting: the reversal is an improvement. Studio edits no longer require
        rebuilding the site, and Sanity hosts it free. Two addresses instead of one is the
        whole cost. But I want it on the record that I did not reason my way here — a
        deploy failure did, and the original decision had no size estimate behind it at all.

D-111 | 2026-08-08 | Fallback triggers on a successful null, not only on failure
        Broke the first real build. `q()` degraded to seed data when keys were missing or
        the request threw — but an empty dataset is neither. The query succeeds and returns
        null, null passes through as a valid answer, and the page dies dereferencing it.
        So the code failed in precisely the state it is guaranteed to meet first: a Sanity
        project that has just been created and is empty. Four pages, one cause.
        An empty ARRAY is deliberately not a fallback: "no articles yet" is a legitimate
        answer, and substituting demo data for it would be lying about the dataset.

D-112 | 2026-08-08 | Two data sources must never be mixed within one page
        Uncovered by D-111. The edition could come from seed while its events were queried
        from the real dataset, using an id (`seed-2026`) that exists in neither. Result: a
        demo season with an empty programme — a state that exists in neither reality.
        Added qWithSource(), which reports where the answer came from. Same fix on the film
        page, where a work's biography would otherwise have come back empty.
        Related: /archive/2025 was showing the 2026 season, because the fallback handed
        back the current edition regardless of the year requested. It lied confidently and
        invisibly, which is the worst way for a fallback to fail.
```
