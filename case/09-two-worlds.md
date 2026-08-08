# 09 — Two worlds: the dual-register design system

> ## ⚠️ SUPERSEDED — 3 August 2026
>
> This system was designed in full, built into the specimen and the homepage, and then **cut**.
> The dark-only requirement in `01-brief.md` was correct all along.
>
> **Why it was cut.** The site *is* the auditorium. Dark isn't a theme — it's the condition
> under which film is watched, and a switch to turn it off was quietly arguing that the
> condition is optional. The concept is stronger unconditional.
>
> **What it cost to carry.** The warning in D-024 turned out to be the decisive one: every
> future component designed twice, forever. Removing it retired a second palette, a duplicated
> image pipeline, an accessibility argument about overriding `prefers-color-scheme`, and about
> half the CSS.
>
> **Kept deliberately.** A system designed, built and then deliberately removed is more
> convincing case material than a straight line — and the measurement work here (the near-mirror
> contrast ratios that made the light world read as a photographic negative) is the analysis
> that led to cutting it. See revision 9 in [`10-visual-direction.md`](10-visual-direction.md).
>
> Everything below is retained as written, at the moment of the decision.

---

**Superseded requirement:** the brief said *dark version only*. It is now **two worlds**.
This needs re-agreeing with the curators (see "Pitching it" at the end).

---

## The concept

The festival is called «по-ту-сторонний» — *the one from the other side*. A site with only one
side is a site that has misread its own name.

So: **two visual worlds, one structure.**

- **Real life** — the light world. The festival as institution and record.
- **The other side** — the dark world. The festival as experience and trace.

Same layout, same grid, same information architecture, same content. Two registers.

### Why this is more than a theme switcher

**The 2026 season theme is «переход» — transition, crossing.** The control that moves you
between worlds *is* a переход. The site doesn't illustrate the season's premise; it performs it.

**The current site already contains both worlds and doesn't know it.** A dark, grainy hero,
then a light grey body — an unresolved split that reads as inconsistency. This project names it
and makes it the system. That's a stronger case-study line than "I chose two themes," because
the evidence is already on the client's own homepage.

### What each world *means*

Not just how they look — what they're for. This is the rule that keeps both honest.

| | **Real life** (light) | **The other side** (dark) |
|---|---|---|
| Register | Documentary | Spectral |
| The image is | Evidence | Trace |
| Texture | Graph paper — the workbook, the laboratory, measurement | Film grain — the screening room, the projection |
| Suits | Timetable, tickets, open call, practical info, archive-as-data | Film pages, gallery, laboratory, archive-as-memory |
| Feels | Sharp, legible, informational | Soft, degraded, atmospheric |

---

## What varies, and what never does

**Decision: colour, texture, image treatment, and typographic register vary.
Layout, grid, spacing, IA, content and component structure do not.**

This is the discipline rule. It exists because dual-theme projects nearly always end up with
one good theme and one afterthought. Keeping structure fixed means both worlds are the same
design, seen twice — neither can be neglected without the other visibly suffering.

| Varies | Never varies |
|---|---|
| Palette | Grid and column structure |
| Background texture | Spacing scale |
| Image filter treatment | Type *scale* (sizes and ratios) |
| Type weight and tracking | Typeface |
| Accent colour value | Component structure and behaviour |
| Grain/bloom intensity | Information architecture |
| — | Content (identical in both) |

### The typographic register — why it isn't arbitrary

This is the part that makes the concept defensible rather than decorative.

Light type on a dark ground optically **blooms** — glyphs thicken, counters close, and the same
weight reads heavier. Dark mode therefore *requires* compensation: drop a weight step, open the
tracking, open the leading slightly. That's not a style choice, it's optical correction that any
competent dark implementation has to do anyway.

The move here is to take that required correction and push it one notch further, so it becomes
expressive:

| | Real life | The other side |
|---|---|---|
| Body weight | Regular (400) | Light (300) |
| Display weight | Bold (700) | Medium (500) |
| Uppercase tracking | `0` | `+0.02em` |
| Body tracking | `0` | `+0.006em` |
| Line-height | `1.5` | `1.62` |
| Optical effect | Tight, sharp, printed | Open, dispersed, projected |

Same typeface, same sizes, two voices. The light world reads as a printed programme; the dark
world reads as a projection. **You get a genuinely different feel without a second type system
to maintain** — which is what keeps the ongoing cost sane.

---

## Colour tokens

All ratios computed against their own world's ground. ✅ = passes, ⚠️ = restricted use.

### The other side — ground `#0D0D0F`

| Token | Value | Ratio | Role |
|---|---|---|---|
| `--bg` | `#0D0D0F` | — | Page ground |
| `--surface` | `#141417` | 1.06:1 | Panels, rows — surface only, never text |
| `--line` | `#2A2A30` | 1.36:1 | Hairlines |
| `--ghost` | `#181820` | 1.10:1 | Year numerals — **deliberately near-invisible** |
| `--ink` | `#E8E8EA` | **15.87:1** ✅ AAA | Body text |
| `--dim` | `#8A8A94` | **5.68:1** ✅ AA | Secondary text, metadata |
| `--dimmer` | `#74747E` | **4.20:1** ⚠️ | Labels — uppercase/large only |

> Corrected from the draft in `08`: `--dimmer` was `#5C5C66`, which measured **2.94:1** and
> failed even the 3:1 large-text threshold. Raised to `#74747E`.

### Real life — ground `#E4E4E4`

Keeping the festival's existing background grey. It's theirs, and it already works.

| Token | Value | Ratio | Role |
|---|---|---|---|
| `--bg` | `#E4E4E4` | — | Page ground |
| `--surface` | `#EDEDED` | 1.09:1 | Panels, rows |
| `--line` | `#C2C2C4` | 1.40:1 | Hairlines |
| `--ghost` | `#D6D6D6` | 1.14:1 | Year numerals |
| `--ink` | `#141416` | **14.47:1** ✅ AAA | Body text |
| `--dim` | `#4E4E56` | **6.48:1** ✅ AA | Secondary text |
| `--dimmer` | `#6E6E78` | **3.97:1** ⚠️ | Labels — uppercase/large only |

Note the near-symmetry: 15.87 vs 14.47 for body, 5.68 vs 6.48 for secondary. The two worlds are
tonally equivalent, which is what makes them feel like one design rather than two.

### The accent is a *pair*, not a value

**Finding: no single accent hex passes in both worlds.** Every value bright enough for the dark
ground fails against light grey; every value dark enough for light fails against near-black.

This is a constraint that improves the concept — **the accent crosses over too.** Same hue,
two values.

| Candidate | Other side | Real life |
|---|---|---|
| **Cold lilac** ← recommended | `#B0A8F0` — 8.97:1 ✅ AAA | `#4A3FA8` — 6.43:1 ✅ AA |
| Cold cyan | `#7FD4E8` — 11.54:1 ✅ AAA | `#0E6E85` — 4.60:1 ✅ AA |
| Amber leader | `#F0A830` — 9.57:1 ✅ AAA | `#8A5A00` — 4.66:1 ✅ AA |
| Safelight red | `#FF5C46` — 6.35:1 ✅ AA | `#B3301C` — 4.92:1 ✅ AA |

As a **solid button fill**, cold lilac is the only candidate clearing AAA in both directions
(8.97:1 and 8.18:1). It also reads as neither warm-nostalgic nor alarm-red — closer to a
projector beam or a CRT afterimage, which suits hauntology better than amber does.

Still your call once the style references land — but lilac is the one that survives the numbers.

---

## Image treatment

Implemented as **CSS filters, not two sets of Sanity derivatives.** Cheaper, and — critically —
it means the images *animate through the crossing* rather than swapping. That's the best moment
in the whole interaction.

| | Real life | The other side |
|---|---|---|
| Colour | `grayscale(1)` | `grayscale(1)` |
| Contrast | `contrast(1.05)` | `contrast(0.88)` |
| Brightness | `brightness(1)` | `brightness(0.82)` |
| Blur | none | `blur(0.3px)` on atmospheric imagery only |
| Grain overlay | 4% opacity | 11% opacity |
| Texture | Graph grid, `#D6D6D6` on `#E4E4E4` | Film grain, no grid |

**Two image tiers, as flagged in `08`:**

- **Programmatic** — film stills, event covers. Sharp in *both* worlds. Someone deciding
  whether to buy a ticket must be able to see the film.
- **Archival** — atmosphere, gallery, past editions. Free to degrade fully in the dark world.

Set the tier as a field on the image in Sanity. Curators pick "документальное / атмосферное"
from a dropdown; the pipeline does the rest.

---

## The crossing

### Mechanics

**A persistent global toggle in the header. Choice remembered across pages and visits.**

Not a sun/moon icon. The control should be typographic and named — the two worlds have names,
so use them:

```
реальность / по ту сторону          real life / other side
```

The inactive world is the clickable one. It reads as a destination, not a setting.

### Default logic

**Light by default. The site crosses to dark on its own for the duration of the festival.**

```
if (user has an explicit stored choice, set after the current edition's window opened)
      → honour it
else if (today is within edition.startDate … edition.endDate)
      → the other side
else if (prefers-color-scheme: dark)
      → the other side          ← recommended concession, see Accessibility
else  → real life
```

Two things worth noting:

**It's driven by CMS data, not code.** The switch is `edition.startDate`/`endDate` in Sanity.
The curators control when the site crosses over by entering their own festival dates. Nobody
deploys anything. The site goes to the other side when the festival does.

**The stale-preference rule matters.** Someone who picked "light" in March shouldn't still be in
the real world when the festival opens in September. Store the preference with a timestamp;
if it predates the current edition's window, the automatic default wins. If they then choose
light again *during* the festival, that sticks.

### The transition itself

This is the single most important moment in the design and it should not be a 200 ms colour fade.

Film language, not UI language. Proposal — **a splice**:

```
0 ms     current world
0–160    fade to full black          (or full white, crossing the other way)
160–220  hold — one dark frame
220–460  fade up into the other world
```

Under half a second, but it reads as a *cut* rather than a *setting change*. Because the image
filters are CSS, photographs bloom or sharpen through the transition rather than popping.

Optional and probably worth prototyping: a faint horizontal wipe, like a projector shutter,
instead of a straight fade.

**`prefers-reduced-motion: reduce` → instant swap, no fade, no hold.** Non-negotiable.

---

## Accessibility

Being honest about the tension: making the default follow *festival dates* rather than the OS
setting means overriding a stated user preference. For people who need dark for photosensitivity
or light for low vision, that's a real cost, not a theoretical one.

Three mitigations, in order of importance:

1. **The toggle is always present, always in the same place, and persistent.** Anyone with a
   need sets it once and it holds.
2. **Consult `prefers-color-scheme` as a tiebreaker on first visit outside the festival window.**
   Costs the concept almost nothing — the festival window is when the crossing matters — and it
   removes the main objection. Recommended; reject it if you'd rather the crossing always be a
   deliberate act.
3. **Both worlds meet AA independently.** Neither is a degraded version of the other. The
   ratios above are the proof, and they belong in the case study as a table.

---

## Implementation

```css
:root[data-world="real"]  { --bg:#E4E4E4; --ink:#141416; --accent:#4A3FA8;
                            --w-body:400; --w-display:700; --track-up:0;      --lh:1.5;  }
:root[data-world="other"] { --bg:#0D0D0F; --ink:#E8E8EA; --accent:#B0A8F0;
                            --w-body:300; --w-display:500; --track-up:.02em;  --lh:1.62; }
```

One attribute on `<html>`; everything else is custom properties. Set it server-side from the
edition dates plus the cookie so there's **no flash of the wrong world** on load — the usual
failure of theme systems, and very visible when the two states are this different.

**Sanity knows nothing about any of this.** The worlds are presentation only. No content is
duplicated, no field is doubled, and curators never think about it. The only new CMS surface is
the image-tier dropdown.

Typeface requirement, now firm: **the display face needs Cyrillic across at least 300–700**, so
both worlds can be built from one family. This narrows the type search considerably and should
be checked before falling in love with anything.

---

## What this costs

| | Estimate |
|---|---|
| Design | ~1.7× single-world. Shared layout does most of the saving |
| Build | ~1.15×. It's tokens — the expensive part is getting them right once |
| Ongoing | Every future component is designed twice, forever. **This is the real cost** |
| QA | Doubles. Every page, both worlds, plus the crossing |

Worth it **only** because the discipline rule holds. The moment someone asks for a layout that
differs between worlds, the cost model breaks and the concept goes with it. Push back on that
the first time it comes up, not the third.

---

## Pitching it to the curators

They asked for dark only. Don't present this as overruling them — present it as taking the
festival's name literally:

> «По-ту-сторонний» означает «с той стороны». Сайт, у которого есть только одна сторона, не
> отражает названия. Мы предлагаем два мира: «реальность» и «по ту сторону» — одна структура,
> два регистра. Переход между ними — это и есть тема сезона.
>
> Тёмный мир остаётся тем, что вы просили, и включается сам во время фестиваля.

The last line is what makes it easy to say yes to: **they don't lose the dark version.** They
get it, automatically, exactly when it matters most — and gain a legible light world for the
eleven months when people are buying tickets, reading the open call and checking the timetable.

---

## Decisions

```
D-023 | 2026-08-02 | Two worlds — «реальность» (light) and «по ту сторону» (dark)
        Supersedes: the dark-only requirement.
        Why: the festival's name means "from the other side"; a one-sided site misreads it.
        The 2026 season theme is «переход» — the crossing enacts the season's premise.
        The current site already contains both registers, unresolved.
        Status: needs re-agreeing with the curators.

D-024 | 2026-08-02 | Discipline rule: colour, texture, image treatment and typographic
        register vary. Layout, grid, spacing, type scale, typeface, IA and content do not.
        Why: prevents the usual dual-theme failure where one theme is an afterthought.
        Enforcement: reject the first request for a layout that differs between worlds.

D-025 | 2026-08-02 | Typographic register derives from optical correction, not decoration
        Dark: −1 weight step, +0.02em uppercase tracking, 1.62 leading.
        Why: light-on-dark blooms and needs compensating anyway. Pushing the required
        correction one notch further makes it expressive at no maintenance cost.

D-026 | 2026-08-02 | The accent is a paired token, not a value
        Why: measured — no single hex passes AA on both #0D0D0F and #E4E4E4.
        Recommended: cold lilac #B0A8F0 / #4A3FA8 — the only candidate clearing AAA as a
        solid button fill in both worlds.

D-027 | 2026-08-02 | --dimmer on dark corrected #5C5C66 → #74747E
        Why: measured 2.94:1, below even the 3:1 large-text threshold. Now 4.20:1.

D-028 | 2026-08-02 | Default world is driven by edition dates in Sanity, not by code
        Why: the curators control the crossing by entering their own festival dates.
        No deploy. The site goes to the other side when the festival does.
        Stale-preference rule: a stored choice predating the current edition window loses
        to the automatic default.

D-029 | 2026-08-02 | Image treatment via CSS filters, not duplicate Sanity derivatives
        Why: cheaper, and photographs bloom/sharpen *through* the crossing instead of
        swapping — the best moment in the transition.
        Two tiers: programmatic (sharp in both worlds) and archival (free to degrade).

D-030 | 2026-08-02 | The crossing is a splice, not a fade: 160ms out, 60ms hold, 240ms up
        Why: film language over UI language. Reads as a cut, not a settings change.
        prefers-reduced-motion → instant swap.

D-031 | 2026-08-02 | World is set server-side from edition dates + cookie
        Why: no flash of the wrong world on load. Very visible when the states differ this much.
```

---

## Open

- [ ] Curators to agree the two-world concept
- [ ] Accent hue — lilac recommended, awaiting style references
- [ ] Accept or reject the `prefers-color-scheme` tiebreaker
- [ ] Typeface with Cyrillic 300–700 — check before committing to anything
- [ ] Does the graph-paper texture survive, or is it too close to Alchemy?
- [ ] Prototype the crossing early. If it doesn't feel like a cut, the concept is decoration
