# 01 — Project brief

**Project:** Website for «По-ту-сторонний» / Otherworldly — independent international film festival
**Current site:** https://otherworldly.tilda.ws/ (Tilda, single page, RU only)
**Target:** Multipage, RU/EN, dark-only, CMS-driven, ticketing-integrated
**Role:** Design + development (vibecoding workflow)
**Date started:** 2 August 2026

---

## What the festival is

«По-ту-сторонний» is a festival-laboratory based in St. Petersburg where cinema is treated as
a research instrument. It joins film theory with experimental film practice. Each season sets new
thematic and metaphorical vectors developed together with directors, viewers and curators.

- **2024 — Otherworldly 1.0.** First edition, November 2024, at the experimental workshop «Горка».
  Three days on the spectrality of the cinematic image, the otherworldly, hauntology.
  Echo screenings in Moscow and Kaliningrad.
- **2025 — Otherworldly 2.0.** September 2025, St. Petersburg, echoes in Moscow, Vyborg,
  Kaliningrad. Vectors: neurometamorphoses, border, trace, sensuality.
- **2026 — Otherworldly 3.0.** Format change. Season theme: **transition** (переход).
  Beyond one-off curatorial screenings, a series of connected events plus the
  **Laboratory of the Liminal Image** — two months of reading, screenings, analysis,
  starting with an online reading group, ending in participant research/art projects
  presented at the 2026 festival.

**Team (all founders/curators):** Ира Ломакина, Полина Трубицына, Даша Чернова, Елиза Тимофеева.
**Three of the four — Ира, Полина and Даша — are also co-founders of the film samizdat «К!».**
Елиза is not (corrected 3 Aug; the original reading of the site had this wrong).

**Contacts:** otherworldlyfilmfestival@gmail.com · Telegram @potustoronnii · Instagram @otherworldly_festival

---

## Content inventory of the current Tilda site

| Block | Content type | Migrates to |
|---|---|---|
| Hero: НЕЗАВИСИМЫЙ КИНОФЕСТИВАЛЬ «ПО-ТУ-СТОРОННИЙ» | static + season line | Home hero |
| Positioning paragraph (festival-laboratory) | rich text | Home / About |
| Open Call 2026 + Google Form CTA | CTA block, external link | Open Call page |
| FAQ accordion (3 items) | Q/A pairs | Open Call FAQ + global FAQ |
| Season 2026 statement | rich text | Season page |
| Laboratory of the Liminal Image | programme description + TG link | Laboratory page |
| Team (4 people, photo + role + bio) | repeatable person entries | About / Team |
| Timeline 2024, 2025 | archive edition summaries | Archive |
| Archive accordions (2024, 2025) | nested programme data | Archive/[year] |
| Gallery | photo galleries | Gallery, per-edition |
| Materials: interview, showcase | external press links | Press / Materials |
| Footer: credits, contacts, socials | static | Global footer |

**Not present today but required:** EN version, timetable/schedule, ticket sales, news feed,
individual film/event pages, search or filtering.

---

## Constraints and requirements (client-stated)

1. **RU / EN** — full bilingual site, not a partial translation.
2. **Dark version only** — held. It was briefly replaced by a two-world system
   (`09-two-worlds.md`), which was designed, built, and then cut on 3 Aug. The original
   requirement was right: dark isn't a theme here, it's the condition under which film is
   watched, and a switch to turn it off argued that the condition is optional.
   No theme toggle exists anywhere in the system.
3. **CMS** — the curatorial team must add posts, galleries and programme data without a developer.
4. **Multipage** — real routed pages, not anchor scroll.
5. **Timepad integration** — buttons or a dedicated section for ticket sales.
6. **Timetable** — a schedule of screenings/events.

## Derived requirements (inferred, to confirm with the client)

7. Content is **seasonal and archival** — the model must support multiple editions without
   rebuilding the site each year.
8. Open Call currently runs on Google Forms — decide whether to keep or bring in-house.
9. The Laboratory is a second content stream alongside the festival programme (reading list,
   sessions, participant projects) and needs its own space.
10. Instagram is referenced obliquely on the current site ("Social media with pictures") —
    treat all outbound social linking with the same care.
11. Accessibility: dark-only means contrast ratios must be checked deliberately; experimental
    typography must not fall below WCAG AA for body text.

---

## Success criteria for the site

- A curator can publish a new event, with images and both languages, in under 10 minutes,
  without touching code.
- A visitor can go from homepage to "I have a ticket" in three clicks.
- The 2027 edition can be launched by creating a new edition entry, not a new site.
- The site reads as an object belonging to the festival's own visual world — not as a template.

---

## Open questions for the client

- [ ] Does EN need full parity, or is a reduced EN subset acceptable at launch?
- [ ] Is Timepad confirmed as the ticketing provider? Is the organiser account set up?
- [ ] Custom domain — is one owned, or does it need registering?
- [ ] Who will be the day-to-day CMS editors, and how technical are they?
- [ ] Is there an existing brand/type system, or is the site defining it?
- [ ] Archive depth: are full 2024/2025 programmes available as structured data, or only as text?
