# 05 — Information architecture

## The organising decision

The current site is one page where everything competes for the same attention. The new site is
organised around the fact that **Otherworldly is no longer only a festival**. Since 2026 it runs
three parallel things: the festival itself, the Laboratory of the Liminal Image, and an
accumulating archive of past editions.

So the top level of the site is not "Home / About / Contact". It is the organisation's actual
strands:

> **Festival · Laboratory · Archive · Materials · About**

with Tickets and the language switch as persistent chrome. This mirrors the strongest pattern
found in research (Alchemy, Open City) and it scales: in 2027 the festival strand points at a
new edition and the 2026 edition moves into the archive, with no structural change.

---

## Sitemap

```
/[locale]                                    HOME

├── /festival                                current edition (redirects to /festival/2026)
│   ├── /festival/2026                       season: «Переход» — statement, key dates
│   ├── /festival/2026/programme             all events, filterable
│   ├── /festival/2026/timetable             ★ schedule by day
│   ├── /festival/2026/films                 all films in the edition
│   ├── /festival/2026/films/[slug]          single film
│   ├── /festival/2026/events/[slug]         single event  → ticket button
│   ├── /festival/2026/venues                where things happen
│   └── /festival/2026/gallery               photo documentation
│
├── /lab                                     LABORATORY OF THE LIMINAL IMAGE
│   ├── /lab                                 what it is, how to join
│   ├── /lab/reading                         reading list / syllabus
│   ├── /lab/sessions                        session schedule
│   └── /lab/projects                        participant outcomes
│
├── /open-call                               ★ OPEN CALL 2026
│   ├── requirements, thematic vectors, deadlines
│   ├── FAQ (accordion)
│   └── → application form
│
├── /archive                                 PAST EDITIONS
│   ├── /archive                             index: 2024, 2025 (+2026 after it closes)
│   ├── /archive/2024                        Otherworldly 1.0 — hauntology, spectrality
│   ├── /archive/2025                        Otherworldly 2.0 — neurometamorphoses, border,
│   │                                        trace, sensuality
│   └── /archive/[year]/gallery              per-edition photos
│
├── /materials                               ★ THE FESTIVAL AS PUBLISHER
│   ├── /materials                           index — texts, interviews, showcases
│   ├── /materials/[slug]                    single article
│   └── filter by type: текст / интервью / шоукейс / хроника
│
├── /about                                   ABOUT
│   ├── /about                               what the festival is, its method
│   ├── /about/team                          four curators, bios, links
│   └── /about/contacts                      email, Telegram, socials, press
│
├── /tickets                                 HOW TO ATTEND
│   ├── ticket types, prices, Timepad links
│   └── FAQ: accessibility, venues, latecomers
│
└── /news                                    NEWS (chronological, tagged)
    └── /news/[slug]
```

**Nine top-level sections, five in primary nav.** Tickets sits as a distinct CTA; News and
Open Call are surfaced contextually from the homepage and in the footer, because they are
seasonal — Open Call is loud from July to September and quiet afterwards.

---

## Localisation and URL scheme

**Decision: sub-path routing.** `/ru/...` and `/en/...`, single domain, single deploy.

```
/ru/festival/2026/programme  ↔  /en/festival/2026/programme
/ru/materials/interview-xyz  ↔  /en/materials/interview-xyz
```

**Why sub-path and not subdomains or separate domains:**
one deploy, one sitemap, one SSL certificate, shared assets, and `hreflang` works cleanly.
Cost: Russian users see `/ru/` rather than a bare root. Acceptable.

**Slugs stay identical across locales.** Translating slugs (`programma` vs `programme`) doubles
the routing complexity and breaks shared links for a bilingual audience. One canonical slug,
two locales.

**Root behaviour:** `/` detects `Accept-Language` and redirects — `ru` → `/ru`, anything else →
`/en`. The choice is remembered.

**Language switch behaviour:** switches to the *equivalent page*, never to the homepage. If the
equivalent doesn't exist, go to the section index, not to 404. (CPH:DOX does this correctly;
most mid-size festival sites do not.)

**Metadata:** every page emits `hreflang` alternates plus `x-default`, and `og:locale` /
`og:locale:alternate`.

---

## Navigation

**Header (persistent, dark, condenses on scroll)**

```
[ПО-ТУ-СТОРОННИЙ]   Фестиваль  Лаборатория  Архив  Материалы  О нас     [БИЛЕТЫ]  RU/EN
```

- Logo → home
- Five text items, no dropdowns on desktop; section landing pages carry their own sub-nav
- **Билеты / Tickets** — visually distinct, always present
- RU/EN — text toggle, not a flag (flags represent countries, not languages)
- Mobile: full-screen overlay menu, one level, large type

**Footer**

Four columns: *Sections* · *Festival* (open call, submit, press, archive) ·
*Contacts* (email, Telegram, Instagram) · *Credits* (photo, development, © year).
Newsletter signup if the client wants one.

---

## Page-by-page content model

### Home
Not a scroll-to-everything page. Five modules, in order:

1. **Season block** — festival name, 2026, theme «Переход», dates, primary CTA.
2. **Three strands** — large tiles: Фестиваль 2026 / Лаборатория / Архив.
3. **Ближайшие события** — next 3 events, chronological, from `event` where `date >= now`.
4. **Open Call** — full-width, conditional. Shows only while `siteSettings.openCallOpen` is true.
5. **Материалы** — latest 3 articles.

Everything above is CMS-driven. The homepage changes when the content changes, not when a
developer edits it.

### Programme (`/festival/2026/programme`)
List of events. Filters: **date · venue · strand · type** (screening / talk / lab session).
Filter state lives in the URL. Each card: still, title, date/time, venue, duration, ticket state.
Toggle to switch between list and grid.

### Timetable (`/festival/2026/timetable`) ★
The hardest page and the most valuable. Same data as Programme, different question:
*"What can I see on Saturday?"* rather than *"What films are showing?"*

- Desktop: grid — days as columns, hours as rows, venue as colour.
- Tablet: one day per screen, swipe.
- Mobile: vertical list, sticky day headers.
- Every row carries an inline ticket affordance.
- "Add to calendar" (.ics) per event — cheap to build, disproportionately appreciated.

### Film page (`/festival/2026/films/[slug]`)
Still, title (original + translated), director, country, year, duration, format (16mm / digital —
this matters to an experimental festival audience), synopsis, and **every screening of this film
across all editions**. That last part is what makes the archive alive rather than a graveyard.

### Event page
Cover, title, date/time, venue with map link, description, films included, curator, and the
Timepad ticket button.

### Archive index and `/archive/[year]`
Index: one large block per edition — year, title, theme, cities, cover image.
Edition page: statement, curatorial vectors, full programme, films, gallery, press.
The 2024 and 2025 accordions on the current Tilda site become real pages here.

### Materials
The current site's «МАТЕРИАЛЫ» footnote becomes a section. Filterable by type. Handles both
internal articles and links out (the Piligrim interview and showcase are external — the model
supports an `externalUrl` field so both live in one feed).

### Open Call
Requirements, thematic vectors, deadlines, FAQ accordion, and the application CTA. Currently
Google Forms; the model keeps this as a config field so it can move in-house later without a
structural change. Conditional visibility driven by `siteSettings`.

---

## Three key user flows

**A visitor buys a ticket**
`Home → Ближайшие события (or Timetable) → Event page → [Билеты] → Timepad popup → paid`
Three clicks from home. The ticket button also appears inline on programme and timetable rows,
so the flow can be two.

**A filmmaker submits**
`Home → Open Call banner → Open Call page → read requirements + FAQ → application form`
The FAQ must sit *above* the form, not below it — most abandonment happens at "am I eligible?"

**A curator publishes an event**
`otherworldly.sanity.studio → События → Создать → fill RU + EN → attach film, venue, date → paste Timepad ID → Publish`
Live in seconds. No rebuild. Target: under 10 minutes for someone who has done it twice.

---

## Content governance

| Content | Owner | Cadence |
|---|---|---|
| Events, films, timetable | Programme curator | Heavy Jul–Nov, quiet otherwise |
| Materials / articles | Editorial curator | Year-round, ~2/month |
| Laboratory | Lab curator | Weekly during the lab |
| News | Whoever has news | Ad hoc |
| Archive | Migrated once per edition, then frozen | Annual |
| Site settings | Anyone with admin | Rare |

The archive is the one thing that must be treated as *finished*. Once an edition closes, its
pages stop changing. That's what makes it an archive.

---

## Requirements traceability

| Requirement | Where it's met |
|---|---|
| RU / EN | Sub-path routing `/ru` `/en`, field-level translation, equivalence-preserving switcher, hreflang |
| ~~Dark only~~ → Two worlds | Both palettes as custom properties on `[data-world]`; world set server-side from `edition` dates + cookie; crossing control in the header — `09` |
| CMS | Sanity Studio at `otherworldly.sanity.studio` (moved off `/studio`, D-110); nine document types; Russian field labels |
| Multipage | Nine top-level sections, real routes, deep-linkable, filter state in URL |
| Timepad | `TicketButton` component on event / programme / timetable / tickets pages |
| Timetable | `/festival/2026/timetable`, generated from event data, three responsive treatments |
