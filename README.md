# Brick 3001, site rebuild

A sponsored redesign of [brick3001.com](https://www.brick3001.com) for Brick 3001 LLC, an independent
brick shop in northwest Fresno run by brothers Bryce and Nick. Built and hosted free by
[Rift Media](https://riftmedia.cc) as a sponsor.

**Shop:** 7089 N Marks Ave, Suite 106, Fresno, CA 93711 (NW corner of Herndon and Marks)
**Contact:** brickbrothers3001@gmail.com / [@brick3001fresno](https://www.instagram.com/brick3001fresno/) / [Facebook](https://www.facebook.com/people/Brick3001/61592854326791/)
**Opened:** soft opening September 2, 2026

---

## What was wrong with the old site

The live site is a one-screen Turbify (Yahoo) template page. Its header still says "We're Coming
Soon" directly above "Brick 3001 is officially OPEN!", its only nav link is a leftover template item
called "PANDORA", and it has no hours, no photos of the shop, no socials and no way to contact them.
People are asking for hours in the Instagram comments ("What are your hours on Saturday?").

## What this version does

- **Hours, answered.** A real hours table, plus a live "Open now until 9 PM" status computed in
  Fresno time, in the hero and the mobile menu. Today's row is highlighted.
- **The shop's actual texture,** from their own posts: the sorting tables and their prices
  (small box $10, big box $18, singles priced against BrickLink), the five-step card they keep by the
  shelf, the build counter, the flower cart, the minifigure cases.
- **The buyback,** written from their own "We're buying bulk" post: loose bulk over built sets,
  message first or just bring it in.
- **Why 3001.** Their logo is part 3001 drawn three ways (side, top, bottom). The section says so and
  shows a to-scale drawing of the brick. On scroll, the logo stack comes apart into the dimensioned
  drawing. This is the page's one authored motion moment.
- **Wayfinding.** The unit still has the previous tenant's sign (Little Lion Photography) above the
  door, so the copy points to the NW corner of Herndon and Marks, Branch Breakfast Co. next door, and
  the banner in the window of Suite 106.

## Design

Reading this as: a local shop homepage for Fresno families and adult collectors, in a bright,
precise, lightly playful language, leaning on the geometry of the 2x4 brick and the white-and-oak
look of the real room. Mode: persuade (visit, or sell us your bricks).

"A little LEGO theme" is carried by proportion and vocabulary, not by primary colors everywhere:

| Token | Value | Where it comes from |
|---|---|---|
| Paper | `#FAF8F4` | The shop's white walls under warm track light |
| Oak | `#F2EADD` | The light oak floor and acacia build counter |
| Ink | `#131A21` | LEGO black is a blue-black, so no pure `#000` |
| Bright Red | `#D1170E` | The one accent. Actions only. 5.5:1 with white |
| Banner blue | `#2972B3` | Sampled from their own window banner. Sell plate only |

- **Studs.** The sell band and the footer are "plates": a row of studs on their top edge at true
  LEGO proportions (pitch 8.0, stud 4.8 wide, 1.7 tall, drawn as 32 / 19 / 7 px).
- **8 px grid.** LEGO's stud pitch is 8 mm.
- **Buttons press like a brick.** A darker bottom edge that compresses on click.
- **Numbered steps are studs seen from above.**
- **Type:** Cabinet Grotesk (Fontshare), font-library pairing 9. Chunky, catalog-like, one family.
- **Radius:** 4 px on every rectangle (a brick's edge); circles are studs.

## Trademark care (LEGO Fair Play)

Checked against lego.com/legal/notices-and-policies/fair-play:

- "LEGO" is only ever an adjective (LEGO® sets, LEGO® bricks), never "LEGOs", with ® every time.
- No LEGO logo anywhere. The shop's own logo only.
- Footer carries the required line: "LEGO® is a trademark of the LEGO Group of companies which does
  not sponsor, authorize or endorse this site."
- The FAQ says plainly that this is an independent shop, not the official LEGO Store.

## Facts on the page, and where they come from

| Claim | Source |
|---|---|
| LEGO design numbers start at 3001, the 2x4 brick | Brickset, "Understanding LEGO part numbers" |
| Patent filed January 28, 1958 at 1:58 pm | LEGO.com History, "The stud and tube principle" |
| Filed in Copenhagen | The Brothers Brick, "The day the LEGO brick was born" |
| Studs and tubes create "clutch power" | LEGO.com History |
| 915,103,765 ways to combine six 2x4 bricks | LEGO.com History (S. Eilers, 2005) |
| 3001 is usually molded on the bottom of the part | Brick Architect / Rebrickable part guides |
| 8.0 pitch, 9.6 height, 4.8 stud, 1.7 stud height, 1.2 wall | BrickLink stud-dimension standards; Bartneck, "LEGO brick dimensions" |
| 31.8 x 15.8 footprint (0.2 mm play between bricks) | Bartneck |
| Sorting prices, five steps | Their in-store sign and "Brick Sorting Guide" card (Instagram, Sep 4) |
| Buyback wording | Their "We're buying bulk LEGO" post (Instagram, Sep 17) |
| Hours | Their Google Business listing (see the open question below) |
| Reviews | Their Google listing (Margaret, Sep 18; Will, Sep 27) |

## Confirm with the shop before handoff

1. **Hours.** Google lists Mon 10 to 4, Tue and Wed closed, Thu to Sat 10 to 9, Sun 10 to 6.
   The paper sign in their window on opening day said Mon and Tue closed, Wed and Thu 11 to 8,
   Fri and Sat 10 to 9, Sun 12 to 6. The site uses Google's. Update both the `#hours-table` rows in
   `index.html` and the `openingHoursSpecification` block in the JSON-LD.
2. **Phone number.** None is listed anywhere. Add one to the header, footer and schema if they want calls.
3. **Sorting prices** ($10 / $18) are from a sign photographed September 4.
4. **Gorillaz BrickHeadz idea.** Which brother, and do they want it on the site.
5. **Photos.** Everything is from @brick3001fresno. A fresh wide shot from the front door looking in
   would make a better hero than the setup-week photo used now.

## Sponsor credit tracking

The footer credit ("Website sponsored by Rift Media", also on the 404 page) is how this free site
pays Rift back, so it is measured:

- **Link:** `https://www.riftmedia.cc/?utm_source=brick3001&utm_medium=referral&utm_campaign=sponsored_site&utm_content=footer_credit`.
  It goes straight to `www`, skipping the 307 from the apex. The UTM tags only show in Vercel's
  reports with the Web Analytics Plus add-on ($10/mo), or in any analytics later added to riftmedia.cc.
- **Click count:** each click fires a Vercel Web Analytics custom event named
  `Sponsor credit click` with `site` and `page` (`home` or `not-found`). This is the number that
  matters, and it works on the standard Pro plan. The handler is in `main.js`.
- **Page views:** Web Analytics is enabled on the `brick-3001-mockup` project (cookieless). It
  counts visits too, which becomes a monthly report to give Bryce and Nick after handoff.
- **Report:** `node rm-os/Sponsored/_scripts/credit-clicks.mjs` (add `30` for the last 30 days).

Cost is Vercel's per-event rate on Pro, about $0.03 per 1,000 events.

## Stack

Plain HTML, CSS and JavaScript. No build step, no dependencies. Vercel with `cleanUrls`.

```
index.html      the whole site (single page) + LocalBusiness (ToyStore) and FAQPage JSON-LD
404.html        "Missing piece." custom not-found page
styles.css      design system
main.js         live open/closed status, mobile menu, the 3001 drawing moment, footer year
assets/img/     WebP photos, 2 to 3 widths each, from @brick3001fresno
assets/brand/   logo (trimmed PNG), favicon.svg, favicon-32.png, apple-touch-icon.png
robots.txt      Disallow all while this is a concept
vercel.json     cache + security headers
```

## Local preview

Paths are root-absolute, so serve the folder rather than opening the file:

```bash
npx serve .
```

## Handoff checklist

- [ ] Brothers approve the copy and confirm hours, prices, phone
- [ ] Remove `<meta name="robots" content="noindex, nofollow">` from `index.html` and `404.html`
- [ ] Replace `robots.txt` with `Allow: /`
- [ ] Remove the "Concept build" line from the footer
- [ ] Point brick3001.com at Vercel (their domain is on Turbify/Yahoo DNS today)
- [ ] Update `og:image` and schema URLs from brick3001.riftmedia.cc to www.brick3001.com
- [ ] Keep "Website sponsored by Rift Media" in the footer, with its `data-sponsor-credit` tracking
- [ ] Tell them the site counts visits with Vercel's cookieless analytics, and offer a monthly report
- [ ] Change `utm_source` only if you want the domain move to show separately (optional)

Built by Rift Media, 2026.
