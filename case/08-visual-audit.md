# 08 — Visual audit of the current site

Read from a full-page capture of https://otherworldly.tilda.ws/ (2 August 2026).
This is the "before" analysis, and it feeds directly into the visual direction (step 7).

---

## The finding that changes an assumption

**The current site is light, not dark.** A dark, grainy black-and-white hero sits at the top,
and then the entire body drops to a pale warm-neutral grey (≈`#E4E4E4`) with near-black type.

I had been treating "dark version only" as *making the existing look darker*. It isn't. It's an
**inversion of the festival's current visual identity** — and the hero band is the evidence that
the identity already wants to live there. The site opens in the dark and then turns the lights on.
The brief is essentially: don't turn the lights on.

That reframing is a much better story for the case study than "client wanted dark mode":

> The festival's own homepage already begins in darkness — a grainy monochrome image of an
> audience in a screening room — and then abandons it. The redesign takes the festival at its
> word and stays in the room.

This also means the dark redesign is not a stylistic imposition. It's a recovery of something
already present but not committed to.

---

## What is already good and must be kept

These are real assets. A redesign that discards them would be vandalism, not improvement.

### 1. The ghosted year numerals — the strongest device on the site

Enormous `2026`, `2024` set in a heavy grotesque, in a grey only a shade or two off the
background. Barely visible. Almost a watermark.

This is the single most on-theme element the festival owns. A number that is present but
almost not there is *literally* hauntological — the trace, the residue, the image that
persists after the thing has gone. It is doing conceptual work by accident.

**Carry it forward, and make it structural rather than decorative.** In the dark version it
inverts naturally: `#181818` numerals on a `#0D0D0F` ground — visible only at certain angles and
brightnesses, which is more evocative in dark than it ever was in light. It becomes the marker
for every edition and every section in the archive. Direction C's timeline was designed for
exactly this treatment without my having seen it.

### 2. The image treatment

Every photograph is greyscale, grainy, low-contrast, heavily softened. The hero reads as a
degraded film still or a long-exposure frame; the team portraits are circular and blurred to
near-abstraction. Whether or not all of that blur is intentional, the register is consistent
and it is correct: **the image as trace rather than as document.**

**Keep the treatment, systematise it.** A single image pipeline — greyscale, grain overlay,
reduced contrast — applied through the Sanity CDN so curators upload normal photographs and
the site applies the festival's optic automatically. Nobody has to remember to do it in
Photoshop. That's a genuinely nice engineering-meets-art-direction detail for the case.

One caution: at present the *only* image treatment is degradation. Film stills need to be
legible enough that someone can decide whether to buy a ticket. Propose two tiers — **archival**
(fully degraded, for atmosphere and past editions) and **programmatic** (greyscale and grained
but sharp, for stills in the current programme).

### 3. The typographic contrast

Two registers, cleanly separated:

- **Display** — heavy condensed uppercase grotesque, tight leading, right-aligned in the hero,
  set very large. Confident, poster-like, slightly brutal.
- **Body** — regular-weight grotesque, sentence case, left-aligned, generous line-height,
  comfortable measure (~55–60 characters).

The pairing works and it's period-correct for an experimental festival without being pastiche.
Keep both roles; the dark version will need weights adjusted (see below).

### 4. The white pill labels

Section markers are set as small white rounded rectangles floating at the left margin. Currently
they read as unstyled Tilda placeholders rather than as a decision — but the *idea* is sound:
a small, high-contrast object that punctuates the vertical rhythm and tells you a new section
has begun.

In the dark version this becomes the primary navigational punctuation, and it can carry real
content: `ФЕСТИВАЛЬ 2026`, `АРХИВ`, `ЛАБОРАТОРИЯ`. Direction A's `.lbl` and `.tag` elements are
already this component.

### 5. The asymmetric layout

Type sits left, images sit right, with a lot of empty space between. The team section uses full-
width hairline rules with circular portraits pushed to the right edge — a strong, unusual rhythm.

Keep the asymmetry. Formalise it as an actual grid so it holds up across nine page types instead
of being re-improvised per block.

---

### 6. The poster system — the strongest asset, and it isn't on the site

The gallery contains a photograph of the 2025 poster wall: nine posters, one system.
`по-ту-сторонний 2.0` small at the top, then `12.09–14.09` enormous, then a small-caps strand
label (`фильм открытия`, `кураторская программа`, `специальная программа`), then the programme
name bold and lowercase, then credits in small type at the foot.

It is systematic, hierarchical and repeatable — visibly working across nine variations.

**The website has none of it.** The site and the posters look like they belong to different
organisations. Every reference site in the research set does the opposite: Punto de Vista,
Open City, Alchemy and Visions du Réel all set the *dates* as their primary display typography,
exactly as these posters do.

So the real brief is not "redesign the website". It is:

> **The festival already has a strong graphic system. It lives in print and stops at the screen.
> The job is to bring it onto the web.**

**Ask for the 2024 and 2025 poster source files.** They are more decision-relevant than a
moodboard, because they are already the answer.

---

## Measured before-state

Captured at 1440×900, 2 August 2026. These are the numbers the "after" will be compared against.

| Metric | Value | Note |
|---|---|---|
| Page height | 6,755 px | For ~12 content blocks. Much of it empty |
| `<h1>` elements | **0** | No document heading at all |
| `<h2>` elements | **0** | No heading structure whatsoever |
| Images | 7 | For a festival site. Six of them are team portraits |
| Images without `alt` | **7 of 7** | Total failure |
| `<html lang>` | **absent** | Screen readers can't select a voice; blocks RU/EN semantics entirely |
| Scripts | 31 | For a static single page |
| Links | 16 | Whole site |
| DOMContentLoaded | 718 ms | Fast, to be fair |
| Load | 903 ms | |

The heading and `lang` findings matter beyond accessibility: with no `lang` attribute and no
heading hierarchy, the current site has **no structural foundation for a bilingual version at
all.** RU/EN isn't an addition to this markup; it requires replacing it.

---

## Rendering defects found

| Defect | Detail |
|---|---|
| **Team names overlap** | «ПОЛИНА ТРУБИЦЫНА» and «ДАША ЧЕРНОВА» render on top of one another as unreadable letterforms. Two of four curators are illegible |
| **Hero overflows** | At 1440 px, «НЕЗАВИСИМЫЙ» and «ПО-ТУ-СТОРОННИЙ» are clipped at the right edge. The festival's own name is cut off on a standard laptop |
| **Section labels empty** | The white pills carry no visible text; labels sit *below* them in pale grey, low-contrast |
| **Gallery images blur on load** | Placeholders resolve slowly; several never sharpen in a normal scroll |

Screenshot the overlapping-names bug specifically. A before/after pair where the "before" is
literally unreadable is the most persuasive image a case study can carry, and it is not a cheap
shot — it's a real defect on a live site.

---

## What is broken

| Problem | Evidence | Consequence |
|---|---|---|
| **The page is mostly empty** | Roughly a full viewport of blank grey between the intro paragraph and «до встречи в сентябре 2026!» | Reads as unfinished rather than as considered restraint. Whitespace only works when it frames something |
| **Section labels are invisible** | The white pills carry no legible text at all | The user cannot tell what section they're in |
| **The one real CTA is 11px** | «до встречи в сентябре 2026!» — the only forward-looking statement on the page — is set smaller than the body copy and centred in a void | The most important line on the site is the least visible |
| **No hierarchy after the hero** | Everything below the fold is the same grey, same weight, same rhythm | Nothing has priority, so the eye stops |
| **No navigation** | Single page, no menu | Nothing is linkable; nothing can be shared |
| **Portraits illegible** | Team photos blurred past recognition | Four named curators, none identifiable — the opposite of what a team section is for |
| **Contrast risk** | Mid-grey type on light-grey ground in several places | Likely below WCAG AA. Needs measuring, not guessing |

---

## Constraints this places on the dark design

Inverting a light design is not a matter of swapping two colours. Three things must be handled
deliberately.

**1. Weight must come down.** Light type on a dark ground optically bolds — the glyphs bloom.
Type that reads as Regular on `#E4E4E4` will read as Medium on `#0D0D0F`. Expect to drop one
weight step across the board, and to reduce the display weight noticeably in the hero.

**2. Letter-spacing must come up, slightly.** Same optical effect: counters close up in dark
mode. A small positive tracking on uppercase display and on the small caps labels.

**3. Pure white is wrong.** `#FFFFFF` on near-black vibrates and causes halation, which is
especially bad for a site people will read at night. Body text at `#E8E8EA` gives ~15:1 against
`#0D0D0F` — well past AA, without the glare.

**4. Grain needs re-tuning.** Film grain over a light ground and over a dark ground behave
completely differently — dark grain is far more visible and can turn to noise fast. The overlay
opacity will need to come down.

---

## Proposed dark palette — starting point

Not final. This is the structure to test your style references against.

| Token | Value | Role | Contrast on `--bg` |
|---|---|---|---|
| `--bg` | `#0D0D0F` | Page ground — near-black, very slightly cool | — |
| `--surface` | `#141417` | Cards, panels, table rows | — |
| `--line` | `#2A2A30` | Hairlines, dividers | — |
| `--ghost` | `#181820` | The giant year numerals | ~1.3:1 — deliberately near-invisible |
| `--ink` | `#E8E8EA` | Body text | **≈15.2:1** ✅ AAA |
| `--dim` | `#8A8A94` | Secondary text, metadata | **≈5.6:1** ✅ AA |
| `--dimmer` | `#5C5C66` | Labels, timestamps — large/uppercase only | ~3.1:1 ⚠️ AA large text only |
| `--accent` | TBD | Ticket CTA, current state, open call | must clear 4.5:1 |

**The accent is the one open question, and it's yours to answer with the style references.**
Three positions, all defensible:

- **No accent at all** — pure monochrome, emphasis carried entirely by weight, scale and white
  space. Most rigorous, most in keeping with the current site, hardest to make work for the
  ticket CTA.
- **A single cold accent** — a pale cyan or lilac, the colour of a projector beam or a CRT.
  Thematically precise, quiet.
- **A single hot accent** — the amber of a film-leader countdown, or the red of a darkroom
  safelight. Louder, better for CTAs, more conventional.

My instinct is the second, but this is exactly the decision your references should settle.

---

## What to send for step 7

In priority order — the first item outranks the other three combined.

1. **★ The 2024 and 2025 poster files.** The festival's graphic system already exists in print
   and it is better than the website. Porting it is the project. If the typeface used on the
   posters has full Cyrillic and a licence that covers web, most of the design system is
   already decided.
2. **Festival photography** — 5–10 real images from 2024/2025. Settles whether the design can be
   image-led (directions B and C) or has to carry itself typographically (direction A).
3. **A position on the accent** — or three images that imply one.
4. **Two or three sites** whose *feel* is right, even if unrelated to film.

---

## Related decisions

```
D-015 | 2026-08-02 | Festival is in September 2026, not November
        Source: «до встречи в сентябре 2026!» on the current site.
        Wireframe placeholder dates corrected to 17–20 September 2026 (a real Thu–Sun).
        Open: confirm actual dates with the client.

D-016 | 2026-08-02 | Dark-only is an inversion of the current identity, not an extension of it
        Why: the current site is light grey below a dark hero. The redesign commits to the
        register the hero already establishes and the rest of the page abandons.
        Consequence: this is the framing sentence for the case study.

D-017 | 2026-08-02 | Keep the ghosted year numerals; promote them from decoration to structure
        Why: a number that is present but barely visible is the site's most on-theme element.
        Becomes the marker for every edition and archive section.

D-018 | 2026-08-02 | Image treatment applied by the pipeline, not by hand
        Why: greyscale + grain + reduced contrast via the Sanity CDN means curators upload
        ordinary photographs and the festival's optic is applied automatically.
        Two tiers: archival (degraded) and programmatic (sharp), so film stills stay legible.

D-019 | 2026-08-02 | Body text at #E8E8EA, never #FFFFFF
        Why: pure white on near-black halates and is fatiguing at night. ~15:1 is ample.

D-020 | 2026-08-02 | The brief is "port the poster system to the web", not "redesign the site"
        Why: the 2025 poster wall shows a real, repeatable typographic system — huge date
        numerals, small-caps strand label, bold lowercase programme name. The website has
        none of it. Every strong reference site (Punto de Vista, Open City, Alchemy,
        Visions du Réel) sets dates as primary display type, exactly as these posters do.
        Consequence: this replaces D-016 as the spine of the case study.
        Blocking: need the 2024/2025 poster source files and the typeface licence.

D-021 | 2026-08-02 | Dates are display typography, at or above the scale of the wordmark
        Why: convergent across the entire reference set and across the festival's own posters.
        A festival is an event; an event is a date.

D-022 | 2026-08-02 | Current markup cannot be extended to bilingual — it must be replaced
        Why: zero h1, zero h2, no lang attribute. There is no structural foundation for
        RU/EN in the existing site. This closes off any "improve the Tilda site" option.
```
