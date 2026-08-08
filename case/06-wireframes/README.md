# 06 — Low-fidelity wireframes: three directions

Open `index.html` in a browser. Switch direction (A / B / C) and page (Home / Programme /
Timetable / Film). Toggle **Аннотации** to see the reasoning pinned onto each block.

These are deliberately ugly. No typography, no imagery — boxes only. The point is to decide
**structure** before anything visual, so that the visual language you supply next gets applied
to a structure that's already been argued for rather than to whatever the first layout happened
to be.

**The «Мир» button crosses between the two worlds** — «реальность» and «по ту сторону»
(see `../09-two-worlds.md`). Watch what *doesn't* move: the grid, the spacing, the column
structure, the type scale, every block position. Only the palette, the hatch texture, and the
typographic register (weight and tracking) change. That's the discipline rule, demonstrated
rather than asserted — and it's the thing that stops one world becoming an afterthought.

The crossing also runs the proposed **splice** transition — 160 ms to black, 60 ms hold, fade up.
It should read as a cut, not as a settings change. If it doesn't, the concept is decoration and
we should know that now. `prefers-reduced-motion` swaps instantly.

Each direction is shown across the same four pages, because a homepage alone can't tell you
whether a structure survives contact with a 40-event programme.

---

## A — Каталог (Catalogue)

Dense, typographic, list-driven. The homepage reads as a **contents page**, not a shop window:
season statement, upcoming events as rows, three strands, materials. Programme is a table with
sidebar filters. The register is archival — an index, a card catalogue, a journal.

**Strong:** highest information density; scales cleanly to 40+ events; cheapest to build and
maintain; maps almost one-to-one onto the CMS content model; performs best on slow connections.

**Weak:** cool and impersonal; images do little work; demands genuinely excellent typography or
it reads as an admin panel. If the festival's photography is strong, this direction wastes it.

**Choose if** the site's job is to be the festival's permanent record and reference.

---

## B — Полосы (Strands)

The Alchemy / Open City model, and the one closest to current festival-site convention. The
homepage is four large tiles — Festival, Laboratory, Archive, Materials — each a strand of the
organisation. Centred navigation, image-led, generous spacing.

**Strong:** immediately communicates that the festival is more than four days of screenings;
warm and confident; the safest choice; best if you have strong photography.

**Weak:** low information density; the timetable is further away; a card grid becomes an endless
scroll at 40 events; and it is the most conventional of the three — closest to what everyone else
already does.

**Choose if** the priority is legibility to newcomers and funders.

---

## C — Лента (Timeline)

The organising metaphor is **time**, which rhymes directly with the 2026 season theme,
«переход» / transition. The homepage is a vertical spine of the year: open call → laboratory →
festival → echoes in other cities → archive. The current phase is highlighted. The timetable is
promoted from sub-page to the site's central object.

**Strong:** conceptually the closest fit to what Otherworldly actually is; honestly represents a
project that runs year-round rather than for four days; and it solves the dormant-site problem
that kills most festival websites between editions (see Berwick in the research doc).

**Weak:** most expensive to build; the time axis needs careful handling on mobile; and the
structure has to reconfigure as the season phase changes, which is real logic to write and test.

**Choose if** you want the site to be an argument, not just a container.

---

## My recommendation

**C for the homepage, A for everything beneath it.**

They aren't mutually exclusive — that's the useful finding here. The timeline is the right
*framing* device and it's genuinely distinctive; but a timeline is a bad way to browse 40 films.
Below the homepage, the catalogue logic of A is stronger: dense, filterable, scannable, and it
matches the content model exactly.

B's contribution is the four-strand navigation, which all three directions should adopt regardless.

This hybrid is also the honest one for a portfolio case: it shows you tested three positions and
took what worked from each, rather than picking a favourite.

---

## What to decide before the next session

- [ ] Which direction, or confirm the hybrid
- [ ] Is the festival photography strong enough to lead (pushes toward B/C) or is it thin
      (pushes toward A)?
- [ ] Timetable: grid (A/C) or day-by-day (B)? This is the single most consequential
      layout decision in the project
- [ ] Should the homepage change shape across the year (C's premise), or stay fixed?
- [ ] Does the crossing read as a cut? Try it a few times on each direction

## Note on the two worlds and direction C

The two-world system strengthens direction C specifically. C's premise is that the homepage
changes shape as the season moves through its phases — open call, laboratory, festival, echoes,
archive. The world logic does the same thing on a different axis: the site lives in
«реальность» year-round and crosses to «по ту сторону» for the festival dates, driven by the
same `edition` dates in the CMS.

Two systems, one gesture. If you pick C, they reinforce each other; if you pick A or B, the
world crossing still works but loses that alignment.
