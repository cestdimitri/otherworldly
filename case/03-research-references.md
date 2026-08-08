# 03 — Reference research: film festival websites, 2026

Twelve sites, chosen because each solves a problem this project also has: bilingual switching,
programme density, schedule legibility, archive depth, or an experimental visual register that
still functions as a public utility.

> **Screenshots captured** 2 August 2026 at 1440×900. Chrome saves them browser-side, so they
> are in your **Downloads** folder — move them into `case/assets/references/` and
> `case/assets/before/`. The visual analysis below is written from those captures.

---

## Tier 1 — Closest to this project

### 1. Alchemy Film & Moving Image Festival (Hawick, Scotland)
https://alchemyfilmandarts.org.uk/ · WordPress

The single most relevant reference. UK's festival of experimental film and artists' moving image;
comparable scale, comparable audience, comparable ambition-to-budget ratio.

- **Structure worth stealing:** the homepage is four large tiles — Festival, Residencies, Film Town,
  About. Not a hero-and-scroll. Each tile is a *strand of the organisation*, not a page.
  Otherworldly has exactly this shape: Festival / Laboratory / Archive / About.
- **Festival-as-tag:** the current festival lives at `/tag/current-festival/` — the edition is a
  taxonomy, not a hardcoded page. Editorially clever, structurally weak (URL leaks the mechanism).
  Take the idea, fix the URL: `/festival/2026`.
- Accessibility and Crèche are top-level festival nav items. Institutional care made visible.
- **Take:** organisation-as-strands homepage, edition-as-data.
- **Leave:** WordPress-default typography, tag-based URLs.

### 2. Open City Documentary Festival (London)
https://opencitylondon.com/ · WordPress · design by GIRL, build by Outpost

The best-designed site in this list. Editorial confidence; a strong slogan-and-date lockup
("The Art of Non Fiction / 14–19 April 2026 / Venues Across London") repeated as a marquee.

- **Structure:** four huge link blocks — 2026 Festival, Non-Fiction, Short Courses, Year Round.
  Same strand logic as Alchemy, better executed.
- **"Notes" and "Non-Fiction Journal" as top-level nav.** A festival that also publishes.
  Otherworldly has «К!» and the Laboratory reading list — direct precedent for giving written
  material its own home rather than burying it in "News".
- Programme lives at `/2026-festival/programme/full-programme/` — deep but honest hierarchy.
- The footer credits designer and developer. Worth noting: this is how a small studio gets seen.
- **Take:** repeated typographic lockup as identity; journal as a first-class section.

### 3. Ann Arbor Film Festival
https://www.aafilmfest.org/ · Wix

Oldest avant-garde film festival in North America (est. 1963). Included as a *cautionary*
reference: enormous institutional depth trapped in a platform that can't express it.

- Nav is nine top-level items with 6–9 children each. Everything is equally important, so nothing is.
- Rules & Terms text appears above the logo in the DOM — platform artefact, bad for SEO and
  screen readers.
- News is a flat blog with pagination up to page 5+, no filtering, no tags.
- **Take:** the *content* ambition — essays by critics, artist interviews, tour programme, archive.
  Otherworldly should aim for this editorially.
- **Leave:** the nav, the platform, the flat blog. This is exactly the Tilda trap one level up.

---

## Tier 2 — Programme, schedule and ticketing mechanics

### 4. CPH:DOX (Copenhagen)
https://cphdox.dk/ · WordPress + custom ticketing

The reference for **bilingual routing** and **logged-in ticket state**.

- Locale as a URL prefix: `/da/...` and `/en/...`, with a per-page `da / en` switch that links
  to the *translated equivalent*, not the homepage. This is the correct behaviour and the one
  most bilingual sites get wrong.
- The page markup declares `og:locale: da_DK` with `og:locale:alternate: en_GB` — proper hreflang
  discipline, worth copying for RU/EN.
- The header carries a persistent **"Your tickets" panel** — date, quantity, event, venue.
  Ticket state is part of the chrome, not a separate account area.
- Programme is split into parallel entry points: Programme / Calendar / Films / Events / Venues.
  The same data, five doors. Directly applicable: a small festival still benefits from
  "by date" and "by film" being separate views.
- Sub-brands (UNG:DOX, KLUB:DOX, PARA:DOX) get their own nav lane. Otherworldly's Laboratory
  is structurally the same thing.
- **Take:** locale sub-path routing, per-page language equivalence, calendar-vs-list duality.

### 5. IFFR — International Film Festival Rotterdam
https://iffr.com/en · custom

Large-scale reference for **content typing**. Every item on the homepage is tagged by type:
News, Press release, CineMart, Hubert Bals Fund, IFFR Pro, Year-round 2026, IFFR Filmclub.

- The taxonomy does real work: "Year-round 2026" separates off-season events from festival
  events, which is precisely Otherworldly's 2026 problem (festival vs. Laboratory vs. echo
  screenings in other cities).
- "Upcoming events" and "Highlighted articles" are distinct homepage modules with distinct
  logic — one is chronological, one is curated. Worth replicating.
- **Take:** a real content taxonomy from day one; curated vs. chronological modules.

### 6. True/False Film Fest (Columbia, MO)
https://truefalse.org/ · WordPress/Elementor

Reference for **how a festival sells attendance** rather than tickets.

- The Attend section separates Passes / Reservations / Tickets / FAQ / Travel / Map — six pages
  for what most festivals cram into one. Because attendance genuinely is that complicated.
- Programme is split by medium: Films / Shorts / Music / Art / Events / Schedule.
- Archives are first-class: `/about/archives/2025/`, `/2024-archive/`, `/2023-archive/`.
  A festival that treats its past as content, not as dead weight.
- **Take:** archive-per-edition URLs; splitting "how do I attend" from "what's on".
- **Leave:** the visual density; Elementor bloat.

---

## Tier 3 — Consulted for specific patterns

| Site | Pattern to study |
|---|---|
| Berwick Film & Media Arts Festival (berwickfilm-artsfest.com) | Experimental-festival tone of voice; currently a dormant site — a reminder that a festival site must degrade gracefully between editions |
| Visions du Réel (visionsdureel.ch) | Multilingual FR/EN with a genuinely dense programme grid |
| Kasseler Dokfest (kasselerdokfest.de) | DE/EN, strong archive of past editions with full programmes preserved |
| Punto de Vista (puntodevistafestival.com) | ES/EN/EU trilingual; poster-led identity carried into the web |
| IDFA (idfa.nl) | Programme filtering at scale — section, date, venue, theme, all combinable |
| Sheffield DocFest (sheffdocfest.com) | Industry vs. public audience split in the same site |

---

## Pattern inventory

What to take, in order of decisiveness.

### 1. Homepage as strand selector, not as scroll
Alchemy and Open City both refuse the hero-plus-endless-scroll model. Three or four large blocks,
each a strand of the organisation. For Otherworldly: **Festival 2026 · Laboratory · Archive · About.**
This also solves the current site's core problem — everything is on one page, so nothing has weight.

### 2. Edition as data, not as a page
Alchemy uses a tag; True/False uses per-year archive pages; IFFR uses "Year-round 2026" as a term.
All three treat the edition as a first-class object. The 2027 site should be a new *entry*,
not a new *build*.

### 3. Locale as URL prefix with true page equivalence
CPH:DOX is the model. `/ru/programma` ↔ `/en/programme`. The switcher must link to the
translated page, never dump the user on the homepage.

### 4. Programme through multiple doors
CPH:DOX (Programme/Calendar/Films/Events/Venues) and True/False (Films/Shorts/Music/Art/Events/
Schedule) both provide several views over one dataset. Even at Otherworldly's scale, two doors
are needed: **by film** (list, filterable) and **by day** (timetable).

### 5. The festival as a publisher
Open City's Non-Fiction Journal and Notes; Ann Arbor's commissioned essays; IFFR's articles.
Otherworldly already publishes — «К!», interviews, showcases — but the current site treats this
as a footnote ("МАТЕРИАЛЫ"). It should be a section.

### 6. Attendance is its own information problem
True/False dedicates six pages to it. Otherworldly needs at minimum: how to attend, venues,
ticket links, and an FAQ that isn't buried in the open call.

### 7. Ticket state in the chrome
CPH:DOX keeps tickets in the header. With Timepad's iframe widget, full parity isn't possible,
but a persistent, unmissable "Билеты / Tickets" affordance is.

---

## Anti-patterns observed

- **Ann Arbor's nine-item nav with 60+ children.** Depth without hierarchy. Cap top-level at 5–6.
- **Tag-based URLs for the current edition** (Alchemy's `/tag/current-festival/`). Right idea,
  leaky implementation.
- **Language switch that returns to homepage.** Loses the user's place. Several mid-size
  festival sites do this; CPH:DOX doesn't.
- **Flat, unfilterable news with deep pagination** (Ann Arbor, 5+ pages). Tag from day one.
- **Dormant off-season sites** (Berwick). Between editions the site must still say something true.
- **Page-builder bloat** (True/False on Elementor). Heavy, hard to make fast, hard to make dark.

---

## What none of these do — the opening

Not one of these sites is **dark-only**. Festival sites default to white-and-poster-accent.
A committed, considered dark palette — appropriate for a festival about spectrality, hauntology
and the liminal image, and honest to the actual condition of watching film in a dark room —
is genuinely differentiating and thematically earned, not a style choice.

This is the strongest single argument in the case study. Lead with it.

---

# Visual analysis — from the captures

Reading the HTML told me how these sites are *structured*. Seeing them told me how they *behave*.
Three findings only became visible with screenshots, and two of them change the design brief.

## Finding 1 — The date is the display typography

The most consistent move across every good site in the set: **the festival dates are set as
large as, or larger than, the festival's name.**

| Site | Treatment |
|---|---|
| Punto de Vista | `09—14.03.27` set in the sticky header at the same size as the wordmark. The date *is* the logo lockup |
| Open City | `2026` is the fourth line of the title, same weight and size as `FESTIVAL` |
| Alchemy | `30 April — 3 May 2026 / Hawick` right-aligned, directly opposite the title, equal weight |
| Visions du Réel | `9–18.4.2027` in the header, colour-coded green against a red title |
| CPH:DOX | `Marts 11. – 22. 2026` beside the logo |

The logic: a festival is an *event*, and an event is a date. A festival site that hides its
dates in body copy has misunderstood what it is.

**And the festival already knows this.** The gallery on the current Tilda site contains a
photograph of the 2025 poster wall, and every poster is built exactly this way:
`12.09–14.09`, huge, above the programme title, with the strand label in small caps beneath
(`куратoрская программа`, `специальная программа`, `фильм открытия`).

## Finding 2 — The website is weaker than the festival's own posters

This is the most useful thing found all session, and it reframes the whole project.

The 2025 poster system visible in the gallery photograph has a real typographic hierarchy:
enormous date numerals, a small-caps strand label, a bold lowercase programme name, credits at
the bottom in small type. It is systematic, confident and repeatable — you can see it working
across nine different posters on the same wall.

The website has none of that system. It has a striking hero and then flat grey.

So the brief is not "design a website for this festival". It is:

> **The festival already has a strong graphic system. It exists in print and stops at the
> screen. Bring it onto the web.**

That is a much better case-study spine than a redesign narrative, and it's defensible because
the evidence is the client's own material. Ask for the 2024 and 2025 poster files — they may be
more decision-relevant than any moodboard.

## Finding 3 — The marquee, and the film-frame

Two of the strongest sites use a **horizontally repeating lockup** that bleeds off both edges:

- **Open City** — `OPEN CITY DOCUMENTARY FESTIVAL 2026` repeated across the viewport, overlaid
  on a full-bleed photograph, in coral over green foliage.
- **Visions du Réel** — the title and the word `News` running as coloured marquees on black.

It reads as a film strip passing through a gate, or as a title card looping. Cheap to build,
and it does the thing a static hero can't: it implies duration.

Open City goes further and frames the whole viewport in **sprocket holes** — the white rounded
rectangles down the left and right edges are perforations. The page *is* a film frame. It's the
single most elegant detail in the reference set, and it's pure CSS.

For a festival named «по-ту-сторонний», working on the liminal and the trace, both devices are
available and neither is decorative.

## Finding 4 — True/False is the anti-pattern, and it's the same one as the current site

The True/False homepage above the fold, in August, is: logo, `MARCH 4 - 7, 2027 | SIGN UP FOR
UPDATES`, and then nothing. Empty white to the fold.

This is exactly the failure mode of the current Tilda site — a festival site that has nothing to
say between editions. It's worth putting the two screenshots side by side in the case study. The
lesson isn't "don't be empty"; it's that **the off-season needs its own designed state**, which
is precisely the argument for wireframe direction C.

## Finding 5 — Alchemy in the browser is nothing like Alchemy in the markup

The HTML suggested a restrained WordPress site. It is actually cornflower blue with a white
**graph-paper grid** running through the whole page, a red-orange boxed logo, and heavy
uppercase display type with a tiny lowercase `and moving image` tucked into the counter of the
`M`. The grid motif reads as laboratory paper — measurement, experiment, notation.

Relevant because Otherworldly is also a *laboratory*, and the 2026 season is explicitly a
research programme. A structural background texture that says "workbook" rather than "poster" is
a live option, and it would sit well in dark: a faint grid at `#161620` on `#0D0D0F`.

## Finding 6 — IFFR is systematised to the point of being a product

Mint header, black pill CTA with an arrow, rounded cards, and a tag chip on every single item
(`Blog`, `News`, `Education`, `Interview`). Extremely clear, extremely consistent, and slightly
airless — it reads like a SaaS dashboard for cinema.

Worth taking: the tag-on-everything discipline. Worth leaving: the roundedness and the
card-on-grey. At Otherworldly's scale it would feel corporate.

---

## Revised summary of what to take

1. **Date as display type** — from Punto de Vista and the festival's own posters. Non-negotiable.
2. **The poster system, ported to screen** — the project's actual brief.
3. **A marquee or film-frame device** — from Open City and Visions du Réel. Thematically earned.
4. **A designed off-season state** — learned from True/False's failure and the current site's.
5. **A structural background texture** — from Alchemy's graph paper. Optional, but on-theme.
6. **Tag everything** — from IFFR. Cheap, and it makes the archive navigable.

---

## Sources

- [Alchemy Film & Arts](https://alchemyfilmandarts.org.uk/)
- [Open City Documentary Festival](https://opencitylondon.com/)
- [Ann Arbor Film Festival](https://www.aafilmfest.org/)
- [CPH:DOX](https://cphdox.dk/)
- [IFFR](https://iffr.com/en)
- [True/False Film Fest](https://truefalse.org/)
- [Berwick Film & Media Arts Festival](https://www.berwickfilm-artsfest.com/)
- [По-ту-сторонний (current site)](https://otherworldly.tilda.ws/)
