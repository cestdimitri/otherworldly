# 04 — CMS and hosting architecture

## The short answer to your question

**Yes.** The CMS can be created alongside the website and hosted together, at zero cost at this
scale. There are two genuinely different ways to do it, and the choice matters.

- **Coupled** — the CMS lives *inside* the website codebase, one repo, one deploy, one domain.
  The editing interface is a route on the site, e.g. `otherworldly.ru/studio`.
- **Decoupled** — the CMS is a separate hosted service; the website reads from it over an API.

We're going **coupled-embedded**: Sanity Studio mounted inside the Next.js app at `/studio`,
so you deploy one thing, but the content *data* lives in Sanity's hosted datastore, so you never
run a database.

This gives the best of both: one repo and one deploy to manage, no server administration,
no backups to configure, and editors get a professional editing interface at a URL on the
festival's own domain.

---

## The stack

```
┌─────────────────────────────────────────────────────────────┐
│  Vercel  (hosting, free Hobby tier)                         │
│                                                             │
│   Next.js 15 App Router                                     │
│   ├── /[locale]/...        public site (RU / EN)            │
│   └── /studio              Sanity Studio (embedded CMS UI)  │
└──────────────┬──────────────────────────────────────────────┘
               │ GROQ queries over HTTPS
               ▼
┌─────────────────────────────────────────────────────────────┐
│  Sanity  (content backend, free tier)                       │
│   • Content Lake — documents, versioned, per-field history  │
│   • Asset CDN    — images, on-the-fly resize/crop/format    │
│   • Two datasets — production / staging                     │
└─────────────────────────────────────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────┐
│  Timepad  (ticketing)  — JS widget, renders in an iframe    │
└─────────────────────────────────────────────────────────────┘
```

**Why not a database?** Because someone has to run it, back it up and pay for it. Sanity's
Content Lake *is* the database, and it's free at this scale.

**Why not WordPress?** It's what Alchemy, Open City, True/False and CPH:DOX all use, and it
works — but it means a server, updates, security patches, and a fight to make a fast, dark,
typographically controlled front end. The tradeoff isn't worth it for a four-person team.

---

## Cost

| Service | Plan | Cost | Headroom at this scale |
|---|---|---|---|
| Vercel | Hobby | **$0** | 100 GB bandwidth/mo — a festival site uses a fraction |
| Sanity | Free | **$0** | ~10,000 documents, 20 seats, 100 GB assets, 1M CDN req/mo |
| Domain | — | ~$10–30/yr | the only guaranteed cost |
| Timepad | per-ticket commission | commission only | no fixed fee |
| **Total** | | **~$20/yr** | |

Sanity's free tier limits have changed before and will again — verify at
https://www.sanity.io/pricing before committing in a client proposal. The realistic first
paid threshold is the Growth plan at ~$15/seat/mo, which this project should not reach.

> Note: Vercel's Hobby tier prohibits commercial use. Ticket sales likely count. Either move
> to Vercel Pro (~$20/mo) at launch, or deploy to Cloudflare Pages / Netlify, both of which
> allow it on free tiers. Flag this to the client before launch — it's a real decision, and
> documenting that you caught it is good case-study material.

---

## How editing actually works for the curators

1. Curator goes to `otherworldly.ru/studio` and logs in (Google account or email).
2. Left sidebar lists content in Russian: Фестивали · События · Фильмы · Статьи · Галереи · Люди.
3. She clicks **События → Создать**, fills the form, drags in images, hits **Publish**.
4. The site updates within seconds — no rebuild, no deploy, no developer.

Because the Studio is a route on the site, there's no second login, no second domain,
no "where do I go again". This matters more than it sounds for a non-technical team.

**Built in, free:**
- Live preview — see the page as it will look, while editing
- Full revision history per field, with restore
- Image hotspot/crop — the curator sets the focal point, the site crops responsively
- Real-time collaboration — two curators can edit at once
- Role permissions — Administrator / Editor / Viewer

---

## Bilingual content: the mechanism

Two patterns exist. We use both, deliberately.

**Field-level translation** for documents where RU and EN are the same object with two
labels — films, events, people. One document, `title: {ru, en}`.

```ts
// sanity/schemas/event.ts (excerpt)
defineField({
  name: 'title',
  type: 'object',
  fields: [
    { name: 'ru', type: 'string', title: 'Заголовок (RU)' },
    { name: 'en', type: 'string', title: 'Title (EN)' },
  ],
})
```

*Why:* the curator sees both languages side by side and can't accidentally create an orphan
English event that doesn't exist in Russian. For a small team this prevents the single most
common bilingual failure.

**Document-level translation** for articles and long-form editorial, where the EN version is a
genuine rewrite, not a translation, and may not exist at all. Two linked documents.

**Fallback rule:** if an EN field is empty, render the RU value with `lang="ru"` on the element,
rather than showing a gap or a 404. Screen readers get the right language, and the page never
breaks. This is a real accessibility decision and belongs in the case study.

---

## Content model

Nine document types. Deliberately small — every extra type is a decision a curator has to make.

```
edition ──────────< event >────── venue
   │                  │
   │                  ├──< film
   │                  └──── timepadEventId
   │
   ├──< gallery ──< image
   └──< article

person ────< (curator on edition, author on article)
page  (about, contacts, open call — flexible blocks)
siteSettings  (singleton: nav, footer, socials, season line)
```

| Type | Purpose | Key fields |
|---|---|---|
| `edition` | One festival year | year, theme{ru,en}, statement, dates, status (upcoming/current/archived), curators[] |
| `event` | A screening, talk, lab session | title{}, edition→, date/time, venue→, films[], description{}, timepadEventId, coverImage |
| `film` | A single work | title{}, originalTitle, director, country, year, duration, synopsis{}, still, format (16mm/digital) |
| `venue` | A place | name{}, address, city, mapLink |
| `article` | Editorial, interviews, notes | title{}, slug, body (portable text), author→, publishedAt, tags[], coverImage |
| `gallery` | Photo set | title{}, edition→, images[] (with alt{} and credit) |
| `person` | Curator, author, guest | name{}, role{}, bio{}, portrait, links[] |
| `page` | About, contacts, open call | title{}, slug, blocks[] (flexible) |
| `siteSettings` | Singleton | nav, footer, socials, current season line, open-call state |

**Why `film` is separate from `event`:** the same film screens more than once, and in more than
one edition. Splitting them means a film's page can show every time it has been shown at the
festival — which is exactly what an archive should do, and what the current Tilda site cannot.

---

## Timetable

The timetable is a *view*, not a content type. It's a query:

> all `event` documents where `edition == current`, sorted by `date`, grouped by day.

This is important: the curators never maintain a schedule separately from the events. They
enter each event once, with a date and venue, and the timetable assembles itself. Nothing to
fall out of sync.

Rendering — three breakpoints, three treatments:

- **Desktop** — CSS Grid, days as columns, time as rows, venue as colour/label.
- **Tablet** — one day per screen, horizontal swipe between days.
- **Mobile** — vertical list grouped by day with sticky day headers. Grids don't work at 375px;
  don't try.

Filters: by day, by venue, by strand (Festival / Laboratory / Echo). Filter state in the URL
(`?day=2&venue=gorka`) so a curator can share a link to a filtered view.

---

## Timepad integration

Timepad's widget is an asynchronous JS app that renders **inside a src-less iframe** to avoid
CSS/JS collisions with the host page. That constraint drives the whole approach.

**What this means in practice:**
- You cannot style the widget from your own stylesheet. Styling happens either via Timepad-side
  "customisations" (a `data-timepad-customized` ID, built by Timepad staff) or by shipping
  overrides next to the embed code.
- You cannot reach into the widget with jQuery normally — you bind to widget *events* instead.
- The widget can render inline in the page, or as a popup triggered by a button on your site.

**Recommended pattern:** popup mode. Your own button, in your own design system, in your own
dark palette, opens the Timepad popup. The site's visual identity stays intact; Timepad handles
the transaction. A `<TicketButton eventId={...} />` component wraps this, reading
`timepadEventId` from the event document.

**Fallback:** if `timepadEventId` is empty, the component renders a disabled "Скоро в продаже /
On sale soon" state instead of a broken button. This also lets the whole site ship before the
Timepad account is finalised.

**Dark mode caveat:** the widget will not be dark by default. Budget time for either a Timepad
customisation or overrides — and note it in the case study, because it's the kind of real
constraint that portfolio cases usually hide.

**Also available:** Timepad has a REST API, so an events list could be pulled programmatically.
Not recommended here — the programme should be curated in Sanity, with Timepad holding only the
transaction. One source of truth for content, one for money.

---

## Deployment and workflow

```
git push → Vercel builds → preview URL (every branch)
main branch → production
Sanity publish → webhook → revalidate affected pages (ISR)
```

Content changes don't trigger a rebuild — Next.js revalidates just the affected routes on
demand. A curator publishing at 23:00 sees it live in seconds, not after a three-minute build.

Two Sanity datasets: `production` and `staging`. The staging dataset lets you test schema
changes against real-shaped content without risk.

---

## What could go wrong

| Risk | Mitigation |
|---|---|
| Vercel Hobby forbids commercial use | Decide before launch: Vercel Pro, or Cloudflare Pages |
| Sanity free-tier limits change | Verify at proposal time; content is exportable (`sanity dataset export`), so lock-in is low |
| Curators don't adopt the CMS | All field labels in Russian; live preview on every type; one-page written guide; a 5-minute walkthrough at handover |
| Timepad widget breaks the dark design | Popup mode isolates it; budget for a Timepad-side customisation |
| EN content never gets written | Field-level fallback to RU means the site is never broken, only monolingual |
| Image weight kills mobile performance | Sanity CDN handles resize + AVIF/WebP; Next `<Image>` handles sizing. Never upload originals to the repo |

---

## Sources

- [Sanity pricing](https://www.sanity.io/pricing)
- [Timepad — widget capabilities](https://dev.timepad.ru/widget/what-widget-can/)
- [Timepad — how the embed code works](https://dev.timepad.ru/widget/how-widget-works/)
- [Timepad — custom design](https://dev.timepad.ru/widget/develop-design/)
- [Timepad — trigger widget from a site button](https://dev.timepad.ru/widget/bind-to-button/)
- [Timepad — developer portal](https://dev.timepad.ru/)
