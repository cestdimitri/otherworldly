# 10 — Visual direction

Structure: **direction A, Каталог** (confirmed). Visual language derived from seven references
supplied 2 August 2026.

---

## What the references have in common

They look eclectic — an iOS reader, a calendar UI, a Taiwanese exhibition poster, an Argentine
film-festival programme, a techno label's ticket, a German-expressionism festival programme, and
a record sleeve. They are not eclectic. Six threads run through all of them.

**1. Everything is a printed object.** Not one reference is "web design". A poster, a ticket, a
programme, a record sleeve, a calendar rendered as a paper artefact. The site should read as a
**document**, not as an interface. This is the single most important thing the set is telling us,
and it happens to be exactly what direction A already is.

**2. Hairline rules dividing space into compartments.** References 3, 4, 5 and 6 all build their
structure from thin lines and boxed cells. Not cards with shadows — *rules*. The grid is visible
and it does the work.

**3. Enormous numerals.** The calendar's `22 23 24 25`; the poster's `OCT. 23 / NOV. 10 /`;
the programme's `01 02 03 04 05`; BRUMA's `Día 1 / 2 / 3`. This confirms D-021 emphatically —
**the date is the display typography**, and it's also exactly what the festival's own 2025
posters do (`12.09–14.09`).

**4. Dense tabular information treated as something beautiful.** References 4, 6 and 7 are all
essentially *tables* — a festival timetable, a screening schedule, an album's track credits —
and all three are gorgeous. This is the strongest possible validation of choosing direction A.
Density is not the enemy of beauty; it is the material.

**5. Grain, and degradation.** References 3, 6 and 7 are heavily grained. In 7 the type at the
edges is barely legible and that is clearly deliberate.

**6. Colour as coding, never as decoration.** The calendar's dots, the Lumière programme's
strand colours, the record sleeve's pink-on-blue. Colour carries information or it isn't there.

---

## The reference set maps onto the two worlds

This is the finding that matters. The seven references sort themselves cleanly into the two
registers, which means the two-world system isn't imposed on this visual language — it's already
latent in what you chose.

| | **Real life** — paper | **The other side** — night |
|---|---|---|
| References | 3 (The Loser poster), 4 (Lumière), 5 (Slapfunk ticket) | 6 (BRUMA), 7 (Nick Murphy sleeve) |
| Ground | Off-white, warm, paper | Deep blue-black |
| Type | Near-black, sharp, tight | Dispersed, dim, tracking open |
| Register | The programme, the archive, the record | The projection, the screening room, the trace |
| Grain | Light, on images only | Heavy, over everything |

Reference 2 (Calendario) and reference 1 (the reader) are structural rather than atmospheric —
they belong to both worlds.

---

## Two revisions to the palette, both driven by your references

### The light world is paper, not grey

I had proposed `#E4E4E4` — the current site's neutral grey. References 3 and 5 are both **warm
off-white**: paper stock, not screen grey. That's a meaningfully better idea and it comes
straight from your set.

**`#EAE7E0`.** Warm, slightly desaturated, reads as uncoated paper. It also makes the light
world feel like an *object* rather than a default, which is the whole point of thread 1.

### The dark world is blue-black, not neutral black

I had proposed `#0D0D0F` — neutral near-black. Reference 7's ground is a deep, desaturated
**blue**-black: the blue hour, the moment before the projector starts, the dark that still has
colour in it. Neutral black is the absence of light; blue-black is *night*.

**`#0B0D14`.** Contrast against the ink is identical (15.59:1 vs 15.60:1), so it costs nothing
and gains a great deal of atmosphere.

### And therefore the accent changes

I recommended cold lilac. **Your references say coral-red**, and they say it twice — reference 4
uses red on cream, reference 7 uses pink on midnight blue. That's the same accent appearing in
both a light and a dark reference, which is exactly the paired-token behaviour we need.

Coral is also the better *idea*: it's the colour of a safelight, of film leader, of an
emergency exit sign in a dark auditorium. Lilac was a guess; coral is evidenced.

---

## The palettes

All ratios measured against their own ground.

### Real life — `#EAE7E0`

| Token | Value | Ratio | Use |
|---|---|---|---|
| `--bg` | `#EAE7E0` | — | Paper ground |
| `--surface` | `#F2F0EA` | 1.08:1 | Panels — surface only |
| `--line` | `#C6C2B8` | 1.44:1 | Hairline rules |
| `--ghost` | `#DEDAD1` | 1.13:1 | Year numerals — near-invisible by design |
| `--ink` | `#17171A` | **14.49:1** ✅ AAA | Body text |
| `--dim` | `#4C4C52` | **6.90:1** ✅ AA | Metadata |
| `--dimmer` | `#6B6B72` | **4.28:1** ⚠️ | Labels — uppercase/large only |
| `--accent` | `#AE3026` | **5.23:1** ✅ AA | CTAs, current state |

### The other side — `#0B0D14`

| Token | Value | Ratio | Use |
|---|---|---|---|
| `--bg` | `#0B0D14` | — | Night ground |
| `--surface` | `#111319` | 1.05:1 | Panels |
| `--line` | `#22242E` | 1.26:1 | Hairline rules |
| `--ghost` | `#14161E` | 1.08:1 | Year numerals |
| `--ink` | `#E6E6EA` | **15.59:1** ✅ AAA | Body text |
| `--dim` | `#8C8C98` | **5.84:1** ✅ AA | Metadata |
| `--dimmer` | `#74747E` | **4.20:1** ⚠️ | Labels — uppercase/large only |
| `--accent` | `#FF6B70` | **7.01:1** ✅ AAA | CTAs, current state |

The two worlds are tonally near-identical (14.49 / 15.59 for body, 6.90 / 5.84 for metadata).
That symmetry is what makes them read as one design seen twice.

### Strand colours — from Lumière

Reference 4 colour-codes its programme strands, which is precisely what the timetable needs.
Four strands, each a paired token, all clearing AA as text on their own ground.

| Strand | Night | Paper |
|---|---|---|
| Фестиваль | `#FF6B70` (7.01) | `#AE3026` (5.23) |
| Лаборатория | `#7FA8FF` (8.27) | `#2B4FA8` (6.10) |
| Эхо в других городах | `#F0C05A` (11.45) | `#755200` (5.74) |
| Спецпрограмма | `#9BE0B0` (12.65) | `#186237` (5.99) |

Never colour alone — every strand also carries a label and a rule weight. Colour-blind users and
greyscale printouts both have to work.

---

## Reference-by-reference: what to actually build

### Ref 2 — Calendario (carlhauser) · **the most actionable in the set**

This *is* direction A's programme row, already designed. Day name left, enormous numeral right,
small coloured dots for strands, thin rule between rows, vertical side-tabs for categories.

Two details worth stealing exactly:

- **The inverted row.** One row is solid black with reversed type — the selected day. In our
  system, an inverted row is a row *from the other side*: the current day during the festival,
  or the next screening. The two-world logic gets a micro-expression at row level. This is the
  best small idea in the whole set.
- **The gradient fade on the adjacent row** — rows dissolving at the edge of attention.
  Hauntological, and free.

Build this as `<ProgrammeRow>` and `<TimetableRow>`. It carries the homepage's «ближайшие
события», the programme list, and the timetable.

### Ref 4 — Lumière · **the timetable**

A complete festival schedule as a printed grid: days as columns, screenings as rows, time /
title / director / year / running-time badge, strand colour-coded, seminars in a parallel
column. Tiny type, enormous density, entirely legible.

This is the answer to the hardest page in the project, and it proves the desktop grid can hold
far more than we assumed. Take the running-time badge, the director-and-year sub-line, and the
parallel column for non-screening events (which is where the Laboratory lives).

### Ref 3 — The Loser · **the film page and the poster lockup**

Hairline frame subdividing the page into compartments; a large grained monochrome image in the
main cell; credits running vertically in narrow side columns; the date set as
`OCT. 23 / NOV. 10 /` with slashes as separators.

The vertical credit columns are a genuine opportunity: film metadata (director, country, year,
format, print source) reads beautifully in a narrow vertical rail beside the still, and it
solves direction A's film page.

### Ref 5 — Slapfunk · **the ticket**

A punch-card artefact: perforated edge, monospace type, dashed rules, barcode, `1/3 2/3 3/3`.

The Timepad button and the festival pass should be **objects, not buttons**. A ticket CTA
rendered as a small perforated card — with a real perforation edge in CSS — turns the least
interesting element on the site into the most characteristic one. And it makes the Timepad
iframe's visual mismatch matter less, because our side of the transaction is clearly *ours*.

### Ref 6 — BRUMA · **the other side's texture**

High-contrast photocopy, halftone, rotated type, black slabs, xerox degradation. This is the
dark world's grain treatment: not smooth film grain but **generational loss** — a copy of a copy.
Thematically exact for a festival about traces and the spectral.

Use sparingly. This register is loud, and at full strength it fights legibility.

### Ref 7 — Nick Murphy sleeve · **the dark world's ground and mood**

Deep blue-black, heavy grain, a figure barely present, tiny coral type in credit columns,
text dissolving into the dark toward the edges.

Take: the ground colour, the coral, the credit-column composition, and the *courage* of letting
type sit near the threshold of legibility — but only for atmospheric material (an epigraph, a
season statement), never for the programme, and never below our measured floors.

### Ref 1 — iOS reader · **the article page**

Justified text, generous leading, floating pill controls, progressive blur fade at the bottom.

Two takeaways: **justified setting** suits the document register and works well in Russian
(long words, fewer bad rags than English) — though it needs hyphenation enabled or it will
produce rivers. And the **two-state pill** (`Read | Listen`) is exactly the right shape for the
world switch: `реальность | по ту сторону`, one control, current state filled.

---

## Typography

The references imply a specific pairing.

| Role | Character | Sources |
|---|---|---|
| **Display** | Grotesque, tight, heavy, uppercase-capable. Set very large for dates and numerals | Refs 2, 4, 6; the festival's own posters |
| **Body** | Neutral grotesque, comfortable, justified in long-form | Refs 1, 4 |
| **Mono** | Metadata, times, running times, ticket artefacts, credits | Refs 5, 7 |

The mono is a real find — it's in two references and it does a job nothing else does: times in a
timetable must align vertically, and tabular figures are the only way to get that right.

**Hard requirement:** Cyrillic across 300–700 in display and body, because one family has to
serve both worlds. Strong candidates with proper Cyrillic and open licensing worth testing:
**Suisse Int'l**, **Graphik**, **Neue Haas Grotesk**, **Söhne** (commercial); **Inter**,
**Manrope**, **Golos Text** (open). For mono: **JetBrains Mono**, **Martian Mono**, **Söhne Mono**.

Test the Cyrillic specifically. Several otherwise excellent grotesques have weak or
afterthought Cyrillic, and «ПО-ТУ-СТОРОННИЙ» set large will expose it instantly — particularly
the `Й` breve and the `Щ` descender.

---

---

# Revision 2 — after review, 2 August

Five corrections. Two of them fix real mistakes I made.

## 1. The ground is much whiter — `#F7F7F6`

`#EAE7E0` was too beige. It read as aged paper, which drifts toward nostalgia — and this
festival is about the spectral, not the antique. `#F7F7F6` is near-white with a single point of
warmth (R−B = +1), enough to avoid clinical screen-white without becoming cream.

Everything gained contrast: body text now **17.59:1**, metadata **8.21:1 AAA** (was AA),
labels **5.00:1** — so `--dimmer` clears full AA on the light side rather than being
large-text-only.

## 2. Weights go up, and the dark world goes boldest — **I had this backwards**

My original rule dropped the dark world a weight step, on the textbook logic that light-on-dark
optically blooms. The optical fact is true. Applying it that literally was the mistake: it made
«по ту сторону» look *weaker* than «реальность», which breaks the one rule the whole two-world
system depends on — neither world may be the afterthought.

| | Real life | The other side |
|---|---|---|
| Display | 800 | **900** |
| Mid | 600 | 600 |
| Body | 400 | 400 |
| Tracking | `0` | `+0.012em` (was `+0.02em`) |
| Leading | 1.5 | 1.58 (was 1.62) |

The register difference is now carried by tracking, leading, grain and image treatment — **not
by weight**. Which is better anyway: weight was doing work that texture should do, and reference
6 (BRUMA) is heavy black slabs, not thin type. The dark world should feel *more* physical than
the light one, not less.

Worth keeping in the case study. "I applied a correct principle too literally and the result
looked wrong" is a more honest process note than pretending the first pass was right.

## 3. One shape language — everything square

You were right that the elements didn't agree. There was a 999px pill toggle, square buttons,
a bare text link, and round strand dots, all in one header.

**The rule:** right angles everywhere. 1px border. Uppercase 10px at `.14em`. 34px height on
every interactive element, so buttons, segmented controls and the language switch all sit on one
optical line. Radius `0` — no exceptions.

The **only** curve in the system is the ticket's perforation, and it earns its place by being
*physical* rather than decorative: it's a hole punched through paper.

Strand markers became squares too. Ref 2 used circles, but consistency beats fidelity to a
single reference — and a square marker reads as a print registration mark, which suits the
document register better.

## 4. Translucent paper — the vellum layer *(new ref. 8)*

Your eighth reference — the "VISUAL REBOOT SEQUENCE" sheet — added something the other seven
didn't have: **layered translucency**. Tracing paper over a dot-matrix halftone, with technical
monospace annotations, corner brackets, and type showing through from beneath.

This turns out to be the missing piece, because it is *literally* the two-world concept as a
material: **two states visible at once, one showing through the other.** Not a switch between
them — an overlap.

```css
--sheet:      rgba(255,255,255,.72);   /* real life  */
--sheet:      rgba(32,35,46,.72);      /* other side */
--sheet-line: rgba(17,17,19,.18);
backdrop-filter: blur(1.5px) saturate(.9);
```

Used for: the homepage hero's stacked sheets, the strand cards, and any overlay panel. In the
light world it's tracing paper over paper; in the dark world it's a flared frame over night.
Same mechanism, both worlds.

Also taken from ref 8: the **dot-matrix halftone** as a global background texture, the
**corner brackets**, and the monospace technical annotations (`[SEASON.03] · СОСТОЯНИЕ: ПОРОГ`).
That last device gives the site a voice in the margins — a machine narrating its own state,
which is very on-theme for a festival about thresholds.

## 5. The homepage is now a threshold, not a header — `12-homepage/`

Open City impresses immediately because of three things, and none of them is the photograph:
the title **repeats as a marquee** and bleeds off both edges; the viewport is **framed like a
film frame** (those white rounded rectangles are sprocket holes); and the whole thing commits
to one gesture instead of stacking modules.

Our equivalent, built in `12-homepage/index.html`:

- **Three marquee bands** — «по-ту-сторонний» solid in the middle, outlined/ghosted above,
  `otherworldly` running in reverse below. Different speeds. It reads as film passing a gate,
  and it solves the RU/EN identity problem in the same move.
- **Stacked vellum sheets** behind the type, labelled `лист 01 · опен колл`, `лист 02 ·
  лаборатория`, `лист 03 · программа`. On hover they lift. The festival's strands are literally
  sheets of paper, layered — and the other side shows through them.
- **Corner brackets and technical ticks** — `▲ Sequence 03 / Переход`, coordinates,
  `[SEASON.03] · СОСТОЯНИЕ: ПОРОГ`, the date stamp.
- **The threshold bar** below the hero: a blinking cell, days remaining, open-call status, and
  — the line that ties the whole system together — **«Сайт перейдёт на ту сторону 17.09».**
  The site announces its own crossing. The season theme, stated by the interface, about itself.

That last line may be the single best thing in the project. It's a status message that is also
the concept.

---

# Revision 3 — the reset

Revision 2 was wrong in a way worth recording: it kept adding **signals of conceptuality**
instead of a concept. Corner brackets, coordinates, `[SEASON.03]`, sheet labels, numbered
sections, dot grids, hairline rules everywhere — the vocabulary of a technical document, applied
as surface. Fussy, not rigorous. "There's nothing conceptual in this kind of concept" was the
correct read.

The tell: every one of those elements could have been removed without changing what the site
*meant*. A real concept can't be removed.

## The concept: **проекция**

The site is a projection surface. That's it, and everything follows from it.

- **ЗАЛ** — the room. Near-black. The projector is off. **This is the primary world.**
- **ЛУЧ** — the beam. The projector is on; the screen is lit.

The crossing isn't a theme toggle — it's **the projector switching on**. Going to ЛУЧ flashes
white and blooms; returning to ЗАЛ cuts to black.

Why this holds up where revision 2 didn't:

**It explains why dark is primary.** The room is the default condition of cinema. Light is the
event. That's not a preference, it's how a screening works.

**It replaces dividers with light.** Sections are separated by luminance falloff and space, not
by rules. The vignette *is* the layout device — light spilling from a source and dying at the
edges. Removing the rules wasn't a subtraction; the concept supplied what they were doing.

**It gives the season theme a literal mechanism.** «Переход» is the moment the beam arrives.
The status line now reads **«Проектор включится 17.09»** — the site describing its own crossing,
driven by the edition dates in the CMS.

## Applied changes

| Correction | What happened |
|---|---|
| No tags, coordinates, technical labels | All removed. Nothing survives that could be deleted without loss |
| No dotted background | Replaced with a full-bleed photographic plate — beam falloff, silhouetted audience, vignette |
| No dividers | **Zero 1px rules across both files.** Separation is space, scale and luminance |
| No numbered sections | Removed |
| Separators | `·` → `\|` and `/`. Zero middots remain |
| Type | **Unbounded** 900 for display (wide geometric, full Cyrillic), **Inter** for everything else. Mono dropped — Inter's tabular figures handle the timetable |
| Colour | Acid green `#CCFF00` on `#08080A`. **17.03:1 AAA** |
| Dark primary | ЗАЛ is the default world in both files |

## Palette

**ЗАЛ — `#08080A`** (primary)

| Token | Value | Ratio |
|---|---|---|
| `--ink` | `#F2F2F4` | **17.90:1** AAA |
| `--dim` | `#9A9AA2` | **7.16:1** AAA |
| `--dimmer` | `#71717A` | 4.14:1 ⚠ large only |
| `--accent` | `#CCFF00` | **17.03:1** AAA |

**ЛУЧ — `#F7F7F5`** (secondary)

| Token | Value | Ratio |
|---|---|---|
| `--ink` | `#0A0A0C` | **18.44:1** AAA |
| `--dim` | `#54545C` | **6.99:1** AA |
| `--dimmer` | `#76767E` | 4.20:1 ⚠ large only |

**The accent behaves differently per world, and that's structural, not a workaround.** Acid
green on white measures 1.10:1 — unusable as text. So in ЛУЧ it is **fill-only**: a green block
with near-black type, 16.83:1. Which is the poppier use anyway. Green is the projector's light;
it belongs to the beam, and in the lit world it arrives as a surface rather than a mark.

## What's still placeholder

The hero plate is CSS-generated — beam hotspot, silhouetted heads along the bottom edge,
vignette. It reads as a projection because that's what it's drawing, but **it wants a real
photograph**, and the 2024/2025 screening documentation is exactly the right material. The
`--img` filter differs per world, so one upload serves both: dimmed and high-contrast in ЗАЛ,
lifted in ЛУЧ.

---

# Revision 4 — components and the first screen

## Monochrome, finally

Two accent guesses failed — coral, then acid green. The third answer was to stop guessing:
**there is no accent.** White and near-black, nothing else.

Which the references had been saying all along. Six of the eight are pure black-and-white — the
reboot sheet, The Loser, Slapfunk, BRUMA, and both B/W poster sets. Only Lumière and the Nick
Murphy sleeve carry colour, and in both cases it's doing *coding* work, not identity work.

It also suits проекция exactly. A projector emits light, not hue. The palette is now literally
**light and its absence**, which is the concept stated in colour terms rather than decorated
with one. `#F2F2F4` on `#08080A` — **17.90:1**.

All greys are cool-neutral, max channel spread 9/255 (3.5%) — below the threshold where the eye
reads them as tinted.

## One interactive primitive

There were five element types doing button-shaped jobs: `.btn`, `.btn.acc`, `.btn.ghost`,
the segmented switch, and the strand link. That's the inconsistency you spotted.

Now there is **one**: `.b`. Filled by default. On hover a fill sweeps in from the left and the
element turns inside out — the beam crossing the surface. Two modifiers only, and both are the
same mechanism started from the opposite state:

- `.b--out` — begins outlined, fills on hover
- `.b--sm` — smaller, same everything else

The sweep is what makes it not simple. It's a 380ms `cubic-bezier(.66,0,.16,1)` wipe, not a
colour fade — the same easing as the world switch and the strand cards, so every interactive
surface in the system moves the same way.

## The switch is not a button

It's a **toggle**: a track with a solid block of light that slides between the two labels. The
labels have no border and no fill of their own — they're lit by the block passing under them.

It reads as a physical switch because it has a moving part, which no button in the system has.
`aria-pressed` on both halves, so it's a real toggle for assistive tech, not two buttons.

## Sidebar

The header became a fixed 212px left rail: wordmark, nav stacked, then the switch, language
and dates pinned to the bottom.

It's **transparent over the first screen**, so the projection runs full-bleed behind it, and
picks up a `backdrop-filter` veil only after you scroll past the hero. That's the "fluid" part —
it's a layer floating on the projection rather than a bar sitting on top of the page.

Nav hover draws a short rule out from the left edge — the only line in the entire design, and
it's a pointer, not a divider.

Below 900px it collapses to a sticky top row.

## The name now always fits

It was overflowing because `13.5vw` on a 15-character line in a *wide* geometric face is far
more than 100vw.

Fixed structurally rather than by picking a smaller number: **the wordmark is SVG**, and the
viewBox scales it to the container. `textLength` + `lengthAdjust="spacing"` drives the line to
the exact container width, adjusting letter-spacing only — no glyph distortion.

The one trap: if the font is *wider* than the type size assumes, `textLength` compresses and
glyphs collide. So the size is tuned so the long line always needs slight **expansion**, never
compression — verified against a pessimistic 0.95em advance:

| Line | Natural | Target | Ratio |
|---|---|---|---|
| `ПО-ТУ-СТОРОННИЙ` @88 | 1175 | 1200 | 1.02 ✅ |
| `СТОРОННИЙ` @70 (narrow) | 598 | 600 | 1.00 ✅ |
| `ПО-ТУ-` @70 (narrow) | 336 | 600 | 1.79 ✅ |

The narrow variant justifies both lines to the same width — a solid two-line block, which is
the classic poster lockup.

## The dot wave

Canvas, first screen only. A grid of dots at 26px, each modulated by a sine wave radiating from
the same point the light beam originates — so the wave and the beam share a source. Dot radius
*and* opacity both breathe, and amplitude falls off with distance, so it dissolves toward the
edges instead of stopping at them.

Costs three things worth noting:

- **`IntersectionObserver`** stops the loop the moment the hero leaves the viewport — nothing
  runs while you're reading the programme.
- **`visibilitychange`** stops it on a background tab.
- **`prefers-reduced-motion`** renders one static frame of the wave and never animates.

DPR is capped at 2, and dots below 1.2% alpha are skipped entirely — typically half the grid.

---

# Revision 5 — navigation, controls, gallery

## The display face — pick it by eye, not by name

Unbounded is out. Rather than guess a fourth time, `13-type/index.html` puts **seven candidates
on the real material**: the wordmark at full width, an event title, the date, a metadata line,
and the problem Cyrillic — `Й` with its breve, `Щ` with its descender, `Ж Ф Д Ъ`. Clicking a
name re-renders the whole page in it, so you can judge it large *and* small at once.

All seven have genuine Cyrillic and open licences.

| | Face | Register |
|---|---|---|
| 1 | **Geologica** | Technical grotesque. Closest to проекция — engineered, faintly machined. Cyrillic drawn alongside the Latin, not bolted on. Currently applied as the interim default |
| 2 | Onest | Contemporary Russian grotesque, Cyrillic-first. Warmer; lets photography do the shouting |
| 3 | Archivo | American grotesque, tighter, newspaper-poster. Very heavy black at 900 |
| 4 | Oswald | The only condensed one — and therefore the only one where `ПО-ТУ-СТОРОННИЙ` simply fits. The register of your own 2025 posters. Downside: widely used |
| 5 | Rubik | Geometric with clipped corners. Nearest to Unbounded's logic but calmer and narrower — start here if width was the objection |
| 6 | Golos Text | Fully neutral, Paratype. The type disappears and leaves light, scale and frame |
| 7 | Russo One | Single weight, wide, techno. Sharpest poster of the set, but display-only |

Tell me a number and I'll apply it everywhere.

## Navigation as a film reel

The rail nav was five plain links. It's now a **strip of frames**.

Each item carries a small 22×15 frame outline; on hover the frame **fills from the bottom** —
it's the one being projected — and the label slides right. A perforation strip runs down the
left edge of the whole nav, drawn as a repeating radial-gradient: sprocket holes.

So the navigation is a length of film, and hovering advances to a frame. Same easing as every
other interactive surface (`.36s cubic-bezier(.66,0,.16,1)`), so it belongs to the same
mechanism as the button sweep and the strand fill.

Below 900px the frames drop away and it becomes a plain horizontal row — the metaphor doesn't
survive the space, so it doesn't try.

## Both toggles stop being buttons

They were buttons in disguise: boxed, bordered, 38px tall, exactly like `.b`.

**The world switch is now a fader.** Two labels, and beneath them a 1px track with a short solid
bar that slides between them. No box, no border, no fill on the labels. It's a rheostat — the
light slides along the rail — and it can't be confused with a button because no button in the
system has a moving part.

**The language switch is now just text.** `Ru / En`, active in `--ink`, inactive in `--dimmer`,
separated by a hairline slash. No container at all.

Verified: zero `box-shadow` on either control.

## Illustrations

Five inline SVG symbols, monochrome line, `currentColor` so they invert with the world for free:

`i-proj` projector and beam · `i-frame` film frame with sprockets · `i-cone` light cone from a
source · `i-reel` reel and film path · `i-arch` stacked archive sheets

They sit as section markers beside each heading and at the top of each strand card, where they
invert along with the card on hover. Line weight is a constant 1.4 across all five, so they read
as one set rather than five drawings.

Deliberately austere: at this scale, illustration that competes with the photography would
undercut it.

## Gallery

A new **Съёмка** section on the homepage, and the structure the archive galleries will reuse.

A four-column mosaic with mixed spans — one 2×2 anchor, two 2×1 wides, the rest single — so it
reads as a contact sheet rather than a uniform grid. Captions rise from the bottom edge on hover
over a gradient scrim; the image scales 1.05 underneath. Every frame carries the `--img` filter,
so the whole gallery re-grades when the projector switches on.

Currently gradient placeholders. Real screening documentation drops straight in — the frames are
already sized, cropped and filtered.

Below it: the coverage line — years, frame count, photographer credit — which is the metadata the
`gallery` document already holds in the content model.

---

# Revision 6 — Golos Text, floating dock, direction C

## Golos Text

Applied everywhere as the display face. Paratype, Cyrillic-native, 400–900, open licence.

It's the most neutral of the seven candidates — and that turns out to suit проекция better than
the characterful options did. The type gets out of the way and leaves light, scale and the frame
to do the work. A face with opinions would have competed with the projection.

The chooser stays at `13-type/` as a record of what was tested — rejected options are useful
case material.

## Navigation: floating dock

The left rail is gone. Navigation returns to the top as a **detached floating dock** —
centred, auto-width, 16px clear of the viewport edge, `rgba` background at ~65% with
`backdrop-filter: blur(20px) saturate(1.25)`, held by a 1px inset hairline.

Because it's translucent, the projection runs *underneath* it — the dock reads as a pane of
glass in the beam rather than a bar sitting on the page. Contents: wordmark, nav, world fader,
language, tickets.

It hides on scroll-down and returns on scroll-up, so it never covers the timeline while reading.

**Kept square.** A dock would conventionally be a rounded pill, but radius-0 is the established
rule and consistency was the earlier complaint. A rectangular floating pane also reads closer to
a film frame. Easy to soften if you'd rather.

## The homepage is now direction C — Лента

The season as a **vertical axis of the year**, exactly as the wireframe proposed, now in the
projection language.

Six phases down the spine, each with a period, a marker and a card:

| Phase | State |
|---|---|
| Подготовка | завершено — dimmed to 42% |
| Опен колл | идёт приём — lit marker |
| Лаборатория | набор идёт — lit marker |
| **Фестиваль** | через 45 дней — largest marker, display type at `clamp(34px,6.6vw,82px)` |
| Эхо в других городах | впереди |
| Архив | прошедшие сезоны |

Three details worth noting.

**The axis is a beam, not a rule.** It's a 1px column carrying a vertical gradient — dim at the
top, brightest across the current phases, fading out at the bottom. So it isn't a divider (which
the system doesn't allow); it's light travelling down the year, brightest where the season
currently is. The concept supplies the structure again.

**Past phases dim, future phases stay outlined.** Marker fill states carry it: hollow for not-yet-arrived, solid for active, larger and solid for the festival. State is legible without any
labels, though the labels are there too.

**The festival days are expanded inline.** Rather than sending you to a schedule page, the four
days sit inside the festival card as rows — day numeral, title, venue/time metadata, ticket.
This is the wireframe's note about grouping the programme by day directly in the list, and it
means the homepage answers "what can I see, and when" without a second navigation step.

The whole spine is driven by `edition` dates in the CMS — which phase is lit, the countdown,
the "проектор включится 17.09" line, and the automatic world crossing all read from the same
fields. Enter the dates once; the site knows its own position in the year.

Between seasons the spine doesn't empty — it simply shifts which phase is lit. That was the
original argument for direction C, and it's the thing that fixes the dormant-site problem the
research found at Berwick and True/False.

---

# Revision 7 — archive placement, weights, the light world

## The archive was in the wrong place, and it was a logic error

The timeline runs **forward** through the season: подготовка → опен колл → лаборатория →
фестиваль → эхо. Putting Архив at the bottom placed the past *after* the future. Nobody reading
a timeline downward would accept that.

Moved out into its own section, sitting between the timeline and the gallery — because the
archive and the screening photography are the same territory: **material that already exists**.
The page now reads forward through the season, then turns around and looks back.

The section is two edition blocks — year set large, title, the season's curatorial vectors,
a one-line description, and figures (films / programmes / cities). Same row mechanics as the
festival days, so it's the existing component, not a new one.

This also makes the timeline better: five phases instead of six, all of them genuinely part of
the current season, ending on Эхо — which is where the season actually ends.

## Weights down to 500–600

Everything display was at 900 or 700. Golos Text at 900 is a very heavy face and it was
crowding its own counters, which is what made the spacing read as bad — the problem wasn't the
spacing values, it was that the weight left no room inside the letters.

| | Before | Now |
|---|---|---|
| Wordmark | 900 | 600 |
| Phase headings | 900 | 600 |
| Festival heading | 900 | 600 |
| Section headings | 700 | 500 |
| Day numerals | 900 | 600 |
| Day titles | 700 | 500 |

Tracking relaxed at the same time — `-.03em` → `-.008em` on headings, since negative tracking
that reads as tight at 900 reads as broken at 600. Line-height up from 1.02 to 1.12. Phase
padding 54 → 78px, paragraph leading 1.62, state labels given 14px of clearance.

**The wordmark needed recalculating, not just re-weighting.** At 600 the face is narrower, so
the natural line is shorter and `textLength` has to *stretch* it further. At the old size that
came out at 1.36–1.62× — letters flying apart. Size raised 88 → 118, which puts it at
**1.02–1.21×** across the plausible metric range: no compression at the wide end, no scatter at
the narrow end. On the two-line mobile lockup only the long line is justified now; forcing
`ПО-ТУ-` to full width was giving it 2.2× tracking.

## Logo out of the dock

Removed. The dock is now nav plus controls only — and the wordmark occupies the entire first
screen a few pixels below it, so repeating it was redundant.

## The light world stopped being a negative

You were right, and the cause is measurable. The two worlds had **near-identical contrast
ratios**:

| Token | ЗАЛ | ЛУЧ (before) | Δ |
|---|---|---|---|
| ink | 17.90 | 18.44 | **0.54** |
| dim | 7.16 | 6.99 | **0.17** |
| dimmer | 3.96 | 4.20 | 0.23 |

Identical contrast with inverted luminance *is* a photographic negative. That's the definition.
The palette was mirrored rather than designed.

Three fixes:

**Contrast is no longer symmetrical.** ЛУЧ is deliberately softer — ink at 15.30 against ЗАЛ's
17.90, dim at 5.79 against 7.16. Δ 2.60 and 1.38. Still comfortably AAA/AA, but no longer a
reflection.

**The ground is warm and the ink isn't black.** `#F4F3EF` (R−B +5) instead of the neutral
`#F7F7F5`; ink `#1C1C20` instead of `#0A0A0C`. A lit screen is warm and its blacks are lifted —
that's what projected light does. Pure black on pure white is what an inverter produces.

**The plate is graded, not brightened.** Previously the dark radial gradient was simply given
`brightness(1.08)` — literally the same image turned up, which is exactly what a negative looks
like. ЛУЧ now has its **own** `--plate` gradient (white-to-warm-grey, light pooling from the
top) and its own grade: `contrast(.72) brightness(1.28) opacity(.62)` — lifted shadows, reduced
contrast, slightly transparent. A washed-out, over-lit screen. The audience silhouettes drop to
22% opacity, because when the projector is on you don't see the room.

The result: ЛУЧ is what the screen looks like with light on it, not what ЗАЛ looks like inverted.

---

# Revision 8 — mobile dock, materials, team

## The dock had three separate mobile bugs

Not one break — three, and they compounded.

**1. `margin-left:auto` survived into mobile.** Once the logo was removed, the wrapped first row
contained only the controls, still pushed right by the auto margin. A block of controls hanging
off the right edge with empty space beside them.

**2. The nav didn't fit and compressed instead of scrolling.** Five items at 12.5px need roughly
348px; at 375px viewport there are 351px available inside the dock. `overflow-x:auto` was set,
but without `flex:0 0 auto` on the items flexbox shrank them to fit rather than overflowing —
so nothing ever scrolled, the labels just crushed.

**3. `.away` didn't hide it.** `top:-84px` was measured against the one-row desktop dock. The
wrapped mobile dock is ~96px, so a strip stayed visible while scrolling.

Replaced `flex-wrap` with an **explicit two-row column**: nav on top, controls beneath spread
with `space-between`. Nav items get `flex:0 0 auto` so they genuinely scroll, the scrollbar is
hidden, and a mask fades the right edge to signal there's more. `.away` goes to `-180px`.

Explicit beats implicit here — `flex-wrap` was deciding the layout and it decided wrong.

## Материалы — between the timeline and the archive

Placed deliberately: the festival is a publisher (research finding 5 — Open City's Non-Fiction
Journal, Ann Arbor's essays), and materials are *current* output. They belong on the forward
side of the page, before the turn backward into the archive.

Four cards, **photo covers** as specified — 3:2 crop, scaling 1.05 on hover. Type label
(интервью / текст / шоукейс / хроника), title, date and reading time.

The covers carry `--img`, so they re-grade with the world exactly like the gallery: sharp and
contrasty in ЗАЛ, washed and lifted in ЛУЧ. One upload per article, both worlds handled.

**Content model:** this is the `article` document already specified in `04-cms-architecture.md`
— `title{}`, `coverImage`, `tags[]`, `publishedAt`. The only addition is a reading-time field,
which can be computed from the body rather than entered. The `externalUrl` field already in the
model covers the Piligrim interview and showcase, so external pieces sit in the same feed.

## Команда — below the gallery

Four curators, portraits at 4:5, name, role, one line each. Then a closing line linking the team
to «К!» and carrying the contacts.

Portraits also run through `--img`. Worth noting against the audit in `08-visual-audit.md`: the
current site's team photos are blurred past recognition — four named curators, none
identifiable. Here they're square (radius-0 holds), sharp, and legible, which is the actual job
of a team section.

**Content model:** the `person` document — `name{}`, `role{}`, `bio{}`, `portrait`, `links[]`.
No new type needed.

Section order is now: **Лента → Материалы → Архив → Съёмка → Команда.** Forward through the
season, then the turn: published work, past editions, documentation, and the people behind it.

---

# Revision 9 — one world, glow, print texture

## The two-world system is gone, and the concept is better for it

This removes the largest single piece of architecture in the project — `09-two-worlds.md`,
the fader, the projector transition, the paired tokens, the light palette, and roughly a dozen
decisions built on top of them.

Worth saying plainly: **it was the right call, and the concept survives intact.**

Проекция never needed two states. The site *is* the auditorium. Dark isn't a theme — it's the
condition under which film is watched, and a switch to turn it off was quietly arguing that the
condition is optional. Removing it makes the premise unconditional.

What it costs the case study: a nice-looking toggle. What it gains: no duplicated design work,
no second palette to maintain, no accessibility argument about overriding
`prefers-color-scheme`, and half the CSS. The earlier note that "every future component is
designed twice, forever" was the real warning, and this retires it.

`09-two-worlds.md` stays in the case as the record of a system that was designed, built, and
then deliberately cut. Reviewers find that more convincing than a straight line.

## Buttons: translucent, with light behind

The wipe is replaced. The button is now a **pane of frosted glass with a light source behind
it**: `rgba(242,242,244,.07)` fill, `backdrop-filter: blur(8px)`, 1px inset hairline.

On hover a blurred radial glow scales up from behind (`::after`, 130%×230%, `blur(16px)`),
the fill lifts to 13%, and the hairline brightens to 50% with an outer `--glow-2`. Nothing
slides; it *illuminates*. Which is the correct verb for this site.

## A glow scale, applied in 18 places

Three tokens rather than ad-hoc shadows:

```
--glow-1: 0 0 18px rgba(242,242,244,.10)   /* touch      */
--glow-2: 0 0 42px rgba(242,242,244,.20)   /* active     */
--glow-3: 0 0 90px rgba(242,242,244,.30)   /* the season */
```

Applied to: the wordmark (`drop-shadow`, two layers — a wide halo and a tight one, so it reads
as emitting rather than blurred), the festival heading, active timeline markers, the marker for
the current season phase at `--glow-3`, the axis itself (a blurred 13px column behind the 1px
line, brightest where the season is now), section-heading ticks, hovered rows, day numerals,
nav items, the blinking status cell, and captions.

The rule: **glow marks what is live.** Not decoration — a state.

## Print on cheap paper

Three fixed layers over the whole page, plus a fourth on imagery:

This was built as four layers and then reduced to one, across two rounds of review. The
reduction is the interesting part.

| Layer | What | Status |
|---|---|---|
| ~~`.tex-grain`~~ | fractal noise over the viewport | **removed** |
| ~~`.tex-dither`~~ | 0.5px dot grid at 3px, `overlay` | **removed** |
| ~~`.tex-halftone`~~ | 0.9px dot grid at 7px, `soft-light` | **removed** |
| `.plate-bmp`, `.mc .cov::after`, `.shot::after`, `.pers .por::after` | 1.1px **black** dots at 4px, `overlay` 30–34% | **kept** |

**Everything full-screen is gone. The halftone now exists only on imagery.**

The mistake was a category error I'd actually written down and then ignored: I noted that the
page layers were "paper tooth" and the image layers were "ink screen" — and then applied the
paper tooth to the entire viewport, including type, UI and empty space.

But the page isn't paper. **The page is a dark room.** A room doesn't have a screen pattern
across it. What's *printed* is the photograph — and only the photograph. Overlaying the whole
viewport meant every pixel of interface carried a texture that only makes sense on reproduced
imagery, which is why it read as a filter sitting on top rather than as a property of anything.

There was a legibility cost too. Both grids and the noise were operating on type the rest of
the system works hard to keep sharp — measured contrast means nothing if a dot screen is laid
over the glyphs afterwards.

What survives does the job better and more cheaply: black halftone dots on photographs (ink
broken into a coarse screen — the images look *reproduced*), plus a 1px `text-shadow` ink bloom
on type. Two mechanisms instead of five, no fixed overlays above the content layer at all.

**The general lesson, worth keeping in the case:** texture should belong to a *material*, not
to the viewport. If it can't answer "what surface is this?", it's a filter.

The image overlays are **black** dots rather than white, so photographs look *printed* — ink
broken into a coarse screen — while the page layers are white and read as paper tooth.

Text gets `text-shadow: 0 0 1px rgba(242,242,244,.22)` — a one-pixel bloom that simulates ink
spreading into fibre. Display type gets 2px. Subtle, but it removes the digital crispness that
was fighting the rest of the texture.

## Background gradient

```css
radial-gradient(140% 78% at 50% -8%, #1A1A22, #101015 26%, #0A0A0D 58%, #08080A 100%)
```

`background-attachment: fixed`, so it doesn't scroll — ambient light in a room, not a decorated
surface. Origin at `50% -8%`: the same point the beam and the dot wave come from. Three
phenomena, one source.

**Contrast verified at the lightest point of the gradient**, not just the base colour — that's
where a gradient background usually breaks a palette:

| On `#1A1A22` (top) | Ratio | |
|---|---|---|
| `--ink` | 15.46 | AAA |
| `--dim` | 6.19 | AA |
| `--dimmer` | 3.42 | AA large ✓ |

## Burger menu

Below 900px the nav is replaced by a burger. Full-screen overlay, items at
`clamp(28px, 8.6vw, 44px)`, glowing on hover, dates in the footer of the panel.

`aria-expanded` and `aria-controls` wired, Escape closes, body scroll locks while open, and the
dock's hide-on-scroll is suppressed so it can't vanish under an open menu.

## Correction

**Елиза Тимофеева is not a co-founder of «К!».** Fixed on her card and in the closing line,
which now reads that three of the four — Ира, Полина and Даша — co-founded the samizdat.
`01-brief.md` carried the same error and has been corrected.

---

## Decisions

```
D-032 | 2026-08-02 | Structure: direction A (Каталог) confirmed
        B and C retained in the case as tested-and-rejected alternatives.
        C's season-timeline logic survives inside A as the homepage's season block.

D-033 | 2026-08-02 | The site reads as a printed document, not an interface
        Why: not one of the seven references is web design. Consequence: hairline rules
        over cards, visible grid, no shadows, no rounded corners except where an element
        is deliberately an artefact (the ticket).

D-034 | 2026-08-02 | Light ground is warm paper #EAE7E0, not neutral grey #E4E4E4
        Why: refs 3 and 5 are both uncoated off-white. Makes the light world an object.

D-035 | 2026-08-02 | Dark ground is blue-black #0B0D14, not neutral #0D0D0F
        Why: ref 7. Neutral black is absence of light; blue-black is night.
        Costs nothing — contrast against ink is identical (15.59 vs 15.60).

D-036 | 2026-08-02 | Accent is coral-red, not lilac. #FF6B70 night / #AE3026 paper
        Why: appears in both a light reference (4) and the darkest (7) — already behaving
        as a paired token. Also the colour of a safelight and of film leader.
        Supersedes D-026.

D-037 | 2026-08-02 | Four colour-coded strands, paired per world, never colour-alone
        Фестиваль / Лаборатория / Эхо / Спецпрограмма. All clear AA as text on their
        own ground. Each also carries a label and a rule weight.

D-038 | 2026-08-02 | The inverted row expresses the two worlds at component scale
        Why: ref 2's black selected row. An inverted row = a row from the other side —
        current day, next screening. The system's concept made visible in a list item.

D-039 | 2026-08-02 | Tickets are artefacts, not buttons
        Why: ref 5. A perforated card in CSS. Also softens the Timepad iframe mismatch
        by making our side of the transaction unmistakably ours.

D-040 | 2026-08-02 | Three-part type system: display grotesque + body grotesque + mono
        Mono is non-negotiable for the timetable — tabular figures are the only way to
        align times. Hard requirement: Cyrillic 400–900 across display and body.

──── ревизия 2 ────

D-041 | 2026-08-02 | Light ground #EAE7E0 → #F7F7F6. Supersedes D-034
        Why: too beige. Aged paper reads as nostalgia; this festival is spectral, not antique.
        Gain: body 17.59:1, metadata 8.21:1 AAA, --dimmer now clears full AA on light.

D-042 | 2026-08-02 | Weights go UP; the dark world is the boldest. Supersedes D-025
        Was: dark drops a weight step (textbook optical compensation for blooming).
        Problem: it made «по ту сторону» look weaker than «реальность» — which violates
        D-024, the rule that neither world may be an afterthought.
        Now: display 800 light / 900 dark; body 400 both. The register difference is
        carried by tracking, leading, grain and image treatment, not weight.
        Note for the case: a correct principle applied too literally.

D-043 | 2026-08-02 | One shape language — right angles everywhere, radius 0
        1px border, uppercase 10px/.14em, 34px height on every interactive element so
        buttons, segmented controls and the language switch share an optical line.
        Sole exception: the ticket perforation — physical, not decorative.
        Strand markers become squares (ref 2 used circles; consistency beats fidelity).

D-044 | 2026-08-02 | The vellum layer — translucent sheets (new ref. 8)
        rgba sheet + 1px hairline + backdrop-filter blur(1.5px).
        Why: it is the two-world concept as a material — two states visible at once,
        one showing through the other, rather than a switch between them.
        Also adopted from ref 8: dot-matrix halftone ground, corner brackets, and
        monospace technical annotations in the margins.

D-045 | 2026-08-02 | The homepage is a threshold, not a header
        Three marquee bands at differing speeds (solid RU, ghosted outline, reversed EN);
        stacked labelled vellum sheets that lift on hover; corner ticks and machine
        annotations; a threshold status bar beneath.
        The bar carries «Сайт перейдёт на ту сторону 17.09» — the site announcing its own
        crossing. A status message that is also the concept.

──── ревизия 3 · сброс ────

D-046 | 2026-08-03 | Concept: ПРОЕКЦИЯ. Supersedes D-045 and the framing in D-023
        The site is a projection surface. ЗАЛ (the room, dark, PRIMARY) / ЛУЧ (the beam, lit).
        The crossing is the projector switching on, not a theme toggle.
        Why it holds: it explains why dark is primary (the room is cinema's default state,
        light is the event), it supplies what dividers were doing (luminance falloff), and
        it gives «переход» a literal mechanism.
        What revision 2 got wrong: it added *signals* of conceptuality — brackets, coordinates,
        machine labels, numbered sections — instead of a concept. Every one could have been
        deleted without changing meaning. That's the test it failed.

D-047 | 2026-08-03 | ЗАЛ is the primary world. Supersedes D-028's light-default
        Dark is the default state; ЛУЧ is entered deliberately or automatically during
        the festival. Reverses the earlier default without changing the CMS mechanism.

D-048 | 2026-08-03 | No dividers anywhere. Supersedes the hairline-rule language in D-033
        Zero 1px rules in either file. Separation is space, scale and luminance falloff.
        The vignette is the layout device.
        Also removed: numbered sections, corner ticks, coordinates, technical annotations,
        sheet labels, the dot-matrix ground.

D-049 | 2026-08-03 | Separators are | and /, never ·
        Zero middots remain in either file.

D-050 | 2026-08-03 | Type: Unbounded 900 display + Inter. Supersedes D-040
        Unbounded — wide geometric, full Cyrillic to 900, free. Mono dropped entirely;
        Inter's tabular figures handle timetable alignment. Two families, not three.

D-051 | 2026-08-03 | Accent: acid green #CCFF00. Supersedes D-036 (coral)
        17.03:1 on #08080A — AAA.
        In ЛУЧ it is fill-only (green block, near-black type, 16.83:1) because green on
        white measures 1.10:1. Structural, not a workaround: green is the projector's
        light, so in the lit world it arrives as a surface rather than a mark.

D-052 | 2026-08-03 | Full-bleed photographic plate replaces the dot grid
        Currently CSS-generated (beam hotspot, silhouetted audience, vignette). Wants real
        screening documentation. One upload serves both worlds via the --img filter.

──── ревизия 4 ────

D-053 | 2026-08-03 | No accent colour at all. Supersedes D-051 and D-036
        Two guesses failed (coral, acid green). The answer was that there isn't one.
        Six of the eight references are pure black-and-white; the two that carry colour
        use it for coding, not identity.
        Fits проекция exactly: a projector emits light, not hue. The palette is light and
        its absence. #F2F2F4 on #08080A — 17.90:1.
        All greys cool-neutral, max channel spread 9/255 — below the tinting threshold.

D-054 | 2026-08-03 | One interactive primitive: .b. Supersedes D-043's element rules
        Was five element types doing button-shaped jobs.
        Now one, with two modifiers that are the same mechanism inverted (.b--out, .b--sm).
        Hover sweeps a fill in from the left — the beam crossing a surface, 380ms
        cubic-bezier(.66,0,.16,1). Same easing on the switch and the strand cards, so
        every interactive surface in the system moves identically.

D-055 | 2026-08-03 | The world switch is a toggle, not a button
        A track with a block of light sliding between two labels; the labels have no border
        or fill of their own. Reads as physical because it has a moving part, which no
        button has. aria-pressed on both halves.

D-056 | 2026-08-03 | Header becomes a 212px fixed left rail
        Transparent over the first screen so the projection runs full-bleed behind it;
        gains a backdrop-filter veil only after the hero scrolls past.
        Nav hover draws a short rule from the left edge — the only line in the design,
        and it's a pointer, not a divider. Collapses to a sticky top row under 900px.

D-057 | 2026-08-03 | The wordmark is SVG with textLength, not CSS clamp()
        Why: clamp(…,13.5vw,…) overflowed — 15 characters in a wide geometric face
        exceed the viewport. SVG scales to the container, so it cannot overflow.
        Critical detail: size tuned so the long line needs slight EXPANSION, never
        compression — compression collides glyphs. Verified against a pessimistic
        0.95em advance (1175→1200 = 1.02).

D-058 | 2026-08-03 | Dot wave on the first screen only, canvas
        Sine wave radiating from the same origin as the light beam — wave and beam share
        a source. Radius and opacity both modulate; amplitude falls off with distance.
        Cost controls: IntersectionObserver halts the loop when the hero leaves the
        viewport, visibilitychange halts it on a background tab, DPR capped at 2, dots
        under 1.2% alpha skipped (~half the grid).
        prefers-reduced-motion renders one static frame and never animates.

──── ревизия 5 ────

D-059 | 2026-08-03 | Display face to be chosen from a live specimen, not named. Supersedes D-050
        Unbounded rejected. 13-type/index.html shows seven candidates on the real material —
        wordmark at full width, event title, date, metadata, and Й Щ Ж Ф Д Ъ.
        All seven have genuine Cyrillic and open licences. Geologica applied as interim.
        Awaiting a number.

D-060 | 2026-08-03 | Navigation is a film reel
        Each item carries a 22×15 frame that fills from the bottom on hover — the frame
        being projected — with a sprocket perforation strip down the left edge of the nav.
        Same easing as the button sweep and the strand fill, so it belongs to one mechanism.
        Drops the metaphor below 900px rather than cramming it.

D-061 | 2026-08-03 | Both toggles cease to be buttons. Supersedes D-055
        World switch → a fader: two labels over a 1px track with a sliding bar of light.
        A rheostat. No box, no border, no fill on the labels.
        Language → plain text, Ru / En, active in --ink. No container.
        Verified: zero box-shadow on either.

D-062 | 2026-08-03 | Five line illustrations, currentColor
        i-proj, i-frame, i-cone, i-reel, i-arch. Constant 1.4 stroke so they read as one
        set. currentColor means they invert with the world for free.
        Austere by intent — illustration that competes with the photography undercuts it.

D-063 | 2026-08-03 | Gallery: four-column mosaic with mixed spans
        One 2×2 anchor, two 2×1 wides, rest single — a contact sheet, not a uniform grid.
        Caption rises over a scrim on hover; image scales 1.05 beneath.
        Every frame carries --img, so the gallery re-grades when the projector switches on.
        Placeholders now; real documentation drops in already sized and filtered.

──── ревизия 6 ────

D-064 | 2026-08-03 | Display face: Golos Text. Closes D-059
        Paratype, Cyrillic-native, 400–900, open licence. The most neutral of the seven —
        which suits проекция better than the characterful options: the type gets out of the
        way and leaves light, scale and frame to work. 13-type/ retained as a record.

D-065 | 2026-08-03 | Navigation returns to the top as a detached floating dock.
        Supersedes D-056 (left rail)
        Centred, auto-width, 16px clear of the edge, rgba ~65% with backdrop blur(20px)
        saturate(1.25), held by a 1px inset hairline. The projection runs underneath, so it
        reads as glass in the beam rather than a bar on the page.
        Hides on scroll-down, returns on scroll-up.
        Kept square: radius-0 is the established rule and consistency was the complaint;
        a rectangular pane also reads closer to a film frame.

D-066 | 2026-08-03 | Homepage rebuilt as direction C — Лента. Supersedes D-032 (direction A)
        The season as a vertical axis of the year. Six phases: подготовка (done),
        опен колл (now), лаборатория (now), фестиваль (next, largest), эхо, архив.
        Direction A's catalogue logic still governs the sub-pages — the hybrid recommended
        in 06-wireframes/README.md, now actually built.

D-067 | 2026-08-03 | The year axis is a beam, not a rule
        A 1px column carrying a vertical gradient: dim at top, brightest across the current
        phases, fading at the bottom. Not a divider — light travelling down the year,
        brightest where the season is now. The concept supplies the structure again.

D-068 | 2026-08-03 | Festival days expand inline inside the phase card
        Four day-rows — numeral, title, venue/time, ticket — rather than a link to a
        schedule page. The homepage answers "what can I see and when" in one step.

D-069 | 2026-08-03 | The whole spine reads from edition dates in the CMS
        Which phase is lit, the countdown, «проектор включится 17.09», and the automatic
        world crossing all derive from the same fields. Enter the dates once.
        Between seasons the spine doesn't empty — it shifts which phase is lit. This is
        the fix for the dormant-site failure found at Berwick and True/False.

──── ревизия 7 ────

D-070 | 2026-08-03 | Архив вынесен из ленты в отдельную секцию. Правит D-066
        Ошибка логики: лента идёт вперёд по сезону, архив стоял ниже будущего.
        Теперь между лентой и съёмкой — обе секции про уже существующий материал.
        Лента сократилась до пяти фаз и заканчивается на «эхо», где сезон и кончается.

D-071 | 2026-08-03 | Веса заголовков 900/700 → 600/500. Правит D-042
        Golos Text 900 забивал собственные просветы — «плохие отбивки» были следствием
        веса, а не значений. Трекинг распущен -.03em → -.008em: отрицательный трекинг,
        читавшийся как плотный на 900, на 600 читается как сломанный.
        Интерлиньяж 1.02 → 1.12, отбивка фаз 54 → 78px.

D-072 | 2026-08-03 | Кегль имени пересчитан 88 → 118 под вес 600
        На 600 гарнитура уже, натуральная строка короче, textLength растягивал её
        в 1.36–1.62 раза — буквы разлетались. 118 даёт 1.02–1.21 при любых метриках.
        В мобильной раскладке выключается только длинная строка: «ПО-ТУ-» на полную
        ширину получал трекинг ×2.2.

D-073 | 2026-08-03 | Логотип убран из дока
        Имя занимает весь первый экран парой десятков пикселей ниже — повтор избыточен.

D-074 | 2026-08-03 | ЛУЧ перестал быть негативом. Правит D-041, D-053
        Диагноз измеримый: контрасты миров были почти зеркальными (Δ ink 0.54,
        dim 0.17). Одинаковый контраст при инвертированной светлоте — это и есть
        определение негатива.
        1) Контраст намеренно несимметричен: ink 15.30 против 17.90 (Δ 2.60),
           dim 5.79 против 7.16 (Δ 1.38). Пороги AAA/AA держатся.
        2) Фон тёплый #F4F3EF, текст #1C1C20, а не #0A0A0C — засвеченный экран тёплый,
           и тени в нём подняты. Чистый чёрный на чистом белом даёт инвертор.
        3) У ЛУЧА свой --plate (белый → тёплый серый) и своя градация:
           contrast(.72) brightness(1.28) opacity(.62). Раньше тот же тёмный градиент
           просто осветлялся — буквально негатив. Силуэты зрителей падают до 22%:
           когда проектор включён, зала не видно.

──── ревизия 8 ────

D-075 | 2026-08-03 | Мобильный док — явные две строки вместо flex-wrap
        Три бага сразу: margin-left:auto доживал до мобильных и вешал блок управления
        справа с пустотой слева; навигации нужно ~348px при 351 доступных, но без
        flex:0 0 auto флексбокс сжимал пункты вместо переполнения — скролл не включался;
        .away на -84px мерился по однострочному десктопному доку и не убирал двухстрочный.
        Теперь: колонка, навигация сверху со скроллом и маской по правому краю,
        управление снизу через space-between, .away на -180px.
        Вывод: flex-wrap сам решал раскладку и решал неверно.

D-076 | 2026-08-03 | Секция «Материалы» между лентой и архивом
        Место осознанное: фестиваль — издающий (находка 5 из исследования), а материалы
        это текущий выпуск, поэтому они на «передней» стороне страницы, до разворота
        в прошлое.
        Обложки фотографические, 3:2, несут --img — переградуируются вместе с миром.
        Модель: существующий документ article + вычисляемое время чтения.
        Поле externalUrl уже в модели, поэтому внешние публикации живут в той же ленте.

D-077 | 2026-08-03 | Секция «Команда» под галереей
        Портреты 4:5, тоже через --img. Прямоугольные — radius-0 держится.
        Против аудита 08: на текущем сайте портреты размыты до неузнаваемости, четыре
        кураторки не опознаются. Здесь резкие и читаемые — это и есть работа секции.
        Модель: существующий документ person, новых типов не нужно.

D-078 | 2026-08-03 | Порядок секций: Лента → Материалы → Архив → Съёмка → Команда
        Вперёд по сезону, затем разворот: опубликованное, прошедшие сезоны,
        документация, люди.

──── ревизия 9 ────

D-079 | 2026-08-03 | Система двух миров отменена. Отменяет D-023, D-024, D-046, D-047,
        D-061, D-074 и всё содержимое 09-two-worlds.md
        Остаётся только тёмный. Почему это улучшает концепцию: сайт и есть зал.
        Тёмное — не тема, а условие просмотра кино, и переключатель тихо утверждал,
        что условие необязательно.
        Что теряем: красивый тумблер. Что получаем: нет второй палитры, нет удвоения
        работы над каждым будущим компонентом (о чём и предупреждал D-024), нет спора
        про переопределение prefers-color-scheme, вдвое меньше CSS.
        09-two-worlds.md остаётся в кейсе как запись системы, которую спроектировали,
        построили и осознанно вырезали.

D-080 | 2026-08-03 | Кнопка: матовое стекло со свечением позади. Отменяет D-054
        rgba .07 + backdrop-filter blur(8px) + контур 1px. На hover сзади разрастается
        размытый радиальный свет (::after, 130×230%, blur 16px), заливка до .13,
        контур до .5, наружу --glow-2.
        Ничего не едет — оно загорается. Для этого сайта это верный глагол.

D-081 | 2026-08-03 | Шкала свечения из трёх токенов, 18 применений
        --glow-1 касание, --glow-2 активное, --glow-3 текущая фаза сезона.
        Правило: свечение помечает живое. Это состояние, а не украшение.
        Логотип получает двойной drop-shadow (широкий ореол + узкий), чтобы читался
        как излучающий, а не как размытый.

D-082 | 2026-08-03 | Печать по дешёвой бумаге: четыре слоя
        dither 3px overlay 50% + halftone 7px soft-light 16% + зерно 22% + чёрный
        растр 4px на изображениях.
        Две сетки с разным шагом лучше одной: одна читается как сетка,
        две интерферируют и читаются как сбитая приводка.
        На изображениях точки ЧЁРНЫЕ — краска, разбитая в грубый растр;
        на странице белые — фактура бумаги.
        text-shadow 1px (дисплей 2px) — растекание краски по волокну.

D-083 | 2026-08-03 | Градиент фона, background-attachment:fixed
        Центр в 50% -8% — там же, откуда идут луч и точечная волна.
        Три явления, один источник.
        Контраст проверен по САМОЙ СВЕТЛОЙ точке градиента, а не по базовому цвету:
        ink 15.46 AAA, dim 6.19 AA, dimmer 3.42 (порог 3.0) — держится.

D-084 | 2026-08-03 | Бургер-меню ниже 900px. Отменяет D-075
        Полноэкранный оверлей, пункты clamp(28px,8.6vw,44px).
        aria-expanded/aria-controls, Escape закрывает, скролл body блокируется,
        автоскрытие дока подавляется при открытом меню.

D-085 | 2026-08-03 | Подвал — техническая наклейка справа
        Плашка 344px у правого края: инверсная шапка, пары «ключ / значение» капсом
        9px, штрихкод, строка издания. Не подвал-меню, а паспортная табличка объекта.

D-086 | 2026-08-03 | Правка факта: Елиза Тимофеева не соосновательница «К!»
        Исправлено в карточке, в подписи под секцией и в 01-brief.md.
        Соосновательницы — Ира, Полина, Даша.

──── ревизия 10 ────

D-087 | 2026-08-03 | Слой плёночного зерна убран. Правит D-082
        Он делал работу, отличную от двух других, и мешал им: точечные сетки —
        структура, след печатного растра; фрактальный шум — неструктурная грязь
        на объективе. На весь вьюпорт это читалось как фильтр, наложенный на страницу,
        а не как её собственная поверхность, и на 22% размягчало шрифт, который
        вся остальная система старается держать резким.
        Печатный характер сохранился полностью: его давали не шум, а две
        интерферирующие сетки и ink-bloom в text-shadow.

D-088 | 2026-08-03 | Баг: бургер был виден на десктопе. Правит D-084
        Причина — порядок свойств: .burger{display:none; all:unset; …}.
        all — шорткат и сбрасывает ВСЁ, объявленное до него, включая display:none,
        после чего display возвращался к initial (inline).
        Исправление: all:unset идёт первым.
        Правило на будущее: all:unset всегда первой строкой правила.

D-089 | 2026-08-03 | Полноэкранные растровые слои убраны целиком. Правит D-082, D-087
        Растр остаётся только на изображениях (.plate-bmp и ::after у карточек,
        галереи, портретов).
        Ошибка была категориальная, и я сам её раньше сформулировал, а потом
        проигнорировал: слои страницы — «фактура бумаги», слои изображений —
        «печатный растр». Но страница не бумага. Страница — тёмный зал.
        В зале нет растровой сетки. Напечатана фотография, и только она.
        Наложение на весь вьюпорт означало, что текстуру, осмысленную лишь для
        репродукции, несёт каждый пиксель интерфейса — поэтому и читалось
        как фильтр сверху, а не как свойство чего-либо.
        Плюс цена в читаемости: сетки ложились поверх шрифта, ради резкости
        которого измерялся весь контраст.
        Осталось два механизма вместо пяти: чёрный растр на фотографиях +
        ink bloom в text-shadow. Fixed-слоёв поверх контента больше нет.
        Общий вывод для кейса: текстура должна принадлежать МАТЕРИАЛУ, а не вьюпорту.
        Если она не отвечает на вопрос «что это за поверхность» — это фильтр.

──── ревизия 11 · расписание ────

D-090 | 2026-08-03 | Полоса обозначается ТОЛЬКО подписью. Отменяет D-037 и две
        предыдущие редакции самого D-090
        Три попытки графической кодировки, все убраны:
        1) цвет — отпал вместе с отказом от цвета;
        2) толщина линейки 3/2/1px — толщина это ВЕЛИЧИНА, читается как важность,
           а полоса это КАТЕГОРИЯ;
        3) знак на корешке (квадрат/круг/треугольник/шеврон) — номинально верно,
           но требует легенды: знак надо сначала выучить, до тех пор он пуст.
        Осталось слово: ФЕСТИВАЛЬ / ЛАБОРАТОРИЯ / СПЕЦПРОГРАММА / ЭХО, капс 9px
        перед названием — там же, где .kind в материалах и .state в фазах.
        Один паттерн на весь проект.
        Подпись не требует расшифровки и легенды, работает в ч/б печати, при
        дальтонизме и с выключенными стилями. Всё остальное было слоем поверх неё.
        Вывод для кейса: прежде чем изобретать визуальный код для категории, стоит
        проверить, не назовёт ли её просто слово. Графическая кодировка нужна там,
        где на слово нет места, — здесь оно было.
        Побочное: в самом коротком блоке (64 мин) метаданные обрезаются, но время
        уже закодировано позицией в пропорциональной сетке, поэтому потери нет.

D-096 | 2026-08-03 | Док: прозрачнее, край растушёван, углы скруглены.
        Уточняет D-065 (там углы были оставлены прямыми)
        Фон rgba .58 → .34 (прозрачнее на 41%), размытие 22 → 30px:
        проекция должна читаться СКВОЗЬ панель, а не за ней.
        Край собран из четырёх слоёв вместо одной жёсткой линейки:
        блик по верхней кромке .11 (свет идёт сверху, оттуда же, откуда луч),
        мягкий контур .085 вместо .16, две тени наружу для отрыва от страницы.
        Скругление 20px у панели, 12px у контролов внутри.
        Область действия ограничена доком: --r-dock и --r-in объявлены отдельно,
        остальная страница остаётся прямоугольной. Распространить на весь сайт —
        заменить 0 на var(--r-in) в .b, одна строка.
        Почему не везде сразу: прямой угол — правило системы (D-043), и менять его
        целиком стоит осознанно, а не побочным эффектом правки навбара.

D-091 | 2026-08-03 | Сетка расписания пропорциональна времени
        Строка = 30 минут, событие span = длительность/30.
        Следствия: хронометраж читается как высота, накладки видны физически,
        пустота информативна (окно между показами, а не дыра в вёрстке).
        Проверено программно: 12 событий, 0 накладок, 0 выходов за границы.

D-092 | 2026-08-03 | Временная шкала — чередующиеся часовые полосы, не линейки
        Разделителей в системе нет (D-048), но расписание без шкалы нечитаемо.
        Полоса — поверхность, а не разделитель. Та же логика, что у оси года:
        ось это луч, а не линейка.

D-093 | 2026-08-03 | Линия «сейчас» — правило «свечение помечает живое», буквально
        Смещение внутри слота считается пропорцией, а не подбирается на глаз,
        иначе разъедется при изменении высоты слота.
        NOW вычисляется из времени и дат edition; вне фестиваля null — линии нет.

D-094 | 2026-08-03 | Ниже 920px сетка уступает списку по дням
        Не деградация, а другой ответ на другой вопрос: на телефоне спрашивают
        «что сегодня», а не «как устроена неделя».

D-095 | 2026-08-03 | Фильтр и день пишутся в URL через replaceState
        ?strand=lab&day=2 — отфильтрованный вид можно переслать.
```

---

## Open

- [ ] Typeface selection — test Cyrillic at display size, specifically `Й` and `Щ`
- [ ] Justified body text: confirm hyphenation strategy for Russian, or fall back to ragged
- [ ] How loud is the BRUMA photocopy texture allowed to be in the dark world?
- [ ] Does the perforated ticket survive contact with the Timepad popup, or does it look odd
      next to it?
- [ ] Grain implementation: SVG turbulence, a tiled PNG, or a CSS gradient? Test weight
