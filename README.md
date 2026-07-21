# Searcy School of Dental Assisting

One-page website for Searcy School of Dental Assisting (searcydentalassistingschool.com), rebuilt as a plain static site after the original WordPress site was lost. Content, images, and layout were recovered from the Internet Archive (Wayback Machine capture of May 10, 2026).

## What changed from the original

The original site ran WordPress + Elementor Pro + Genesis Block Theme. This rebuild is dependency-free static HTML/CSS/JS — nothing to update, patch, or get hacked; it can be hosted anywhere (Netlify, Vercel, GitHub Pages, any shared host).

- All page copy and section content are preserved verbatim from the archived site; the visual design was modernized (new typography, navy/blue palette, card layouts, stat band, scroll-reveal animations).
- All original images were recovered from the Wayback Machine (`assets/images/`).
- The hero background image (`Care-Services.png`) was hosted on a wpengine staging domain that was never archived, so the hero now uses one of the recovered school photos with a dark overlay.
- The Elementor "typing" headline animation over the enrollment form is recreated in vanilla JS (`js/main.js`); all animations respect `prefers-reduced-motion`.
- Fonts: Plus Jakarta Sans (headings) + Inter (body) via Google Fonts. Brand accent remains `#0072e5`.

## Structure

```
index.html          — the whole site (one page)
css/style.css       — all styles
js/main.js          — mobile menu, typing headline, form handling
assets/images/      — images recovered from the Wayback Machine
```

## TODO before launch

1. **Forms have no backend.** The original site emailed submissions via Elementor Pro. Set `FORM_ENDPOINT` at the top of `js/main.js` to a form service endpoint (Formspree, FormSubmit, Basin, etc.) pointed at the client's email. Until then, submitting shows a message directing visitors to call (501) 203-0120. Optionally set `FALLBACK_EMAIL` for a mailto fallback.
2. **Confirm the "Contact us" hero button destination.** The original linked to http://searcyfamilydental.com/ — verify that site is still live.
3. Point the `searcydentalassistingschool.com` DNS at the new host and confirm the domain registration didn't lapse (a lapsed domain may be why the site vanished).

## Site details (from the original)

- Phone: (501) 203-0120
- Address: 1639 E. Beebe Capps Expy. Searcy, AR 72143
- Facebook: https://www.facebook.com/searcyschoolofdentalassisting/
- Accent color: `#0072e5`
- Fonts: Poppins (headings), Roboto (body) via Google Fonts
