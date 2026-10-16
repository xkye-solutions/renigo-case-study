# Renigo — Case Study & Interactive Prototype

A portfolio case study by **Xkye Solutions** for Renigo, a community management platform for residential villages and estates. The page tells the product story and embeds a live, clickable prototype of the resident app that follows along as you scroll.

- `index.html` — the case study
- `prototype.html` — the interactive resident app, also usable on its own

No framework or dependencies yet (an Astro port is planned): both pages are plain HTML, CSS and JavaScript.

## Running locally

Serve `public/` over HTTP (the case study talks to the prototype through an `<iframe>`, which browsers block on `file://`):

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory public
```

Then open:

- http://127.0.0.1:4173/ — case study
- http://127.0.0.1:4173/prototype.html — prototype on its own

## Project structure

```
.
├── package.json             Build: copies public/ to dist/
└── public/
    ├── index.html           Case study page
    ├── prototype.html       Interactive prototype (resident app)
    └── assets/
        ├── brand/           Logos, favicons and social card from the Renigo brand kit
        └── images/          Web-sized photos (facilities, people, background)
```

## Prototype

The prototype is a single file with an in-memory state, a small router and an action map (`A`) wired to `data-act` attributes. Everything resets on reload.

**Flows:** login (password or Face ID), home dashboard, facility booking, visitor passes (create, view, share, revoke), household staff (check in/out and a 4-step registration), helpdesk requests, parking, household members, profile with the owner gate pass, notifications and news.

Opened on its own it starts at the login screen and shows a **Back to case study** link. Embedded in the case study it skips login.

### Driving it from the case study

`index.html` sends messages to the embedded prototype as each chapter scrolls into view:

```js
frame.contentWindow.postMessage({
  type: 'renigo:goto',
  tab: 'home',            // home | facilities | passes | requests | profile
  screen: 'facilities',   // optional screen pushed on top of the tab
  sub: { sr: 'new' },     // optional sub-tab state
  action: 'book',         // optional action to run after navigating
  data: { id: 'pool' },
}, '*');
```

Chapters declare their target with a `data-goto` attribute, so adding a new chapter only needs markup.

## Brand

Colours, type and logos follow the Renigo brand kit (refined edition, October 2026):

| Token | Hex | Role |
| --- | --- | --- |
| Lime Canvas | `#F0FCE0` | Page background |
| Leaf Surface | `#E4F0D4` | Grouping surfaces |
| Lime Accent | `#D0E898` | Selection and emphasis |
| Olive | `#4C6810` | Secondary structure |
| Deep Olive | `#384C00` | Actions |
| Ink | `#141C0C` | Body text |

- **Typeface:** [Manrope](https://fonts.google.com/specimen/Manrope) 400–800, loaded from Google Fonts.
- **Icons:** [Tabler Icons](https://tabler.io/icons) webfont 3.31.0, loaded from jsDelivr.
- **Logo:** always use the supplied SVGs in `assets/brand/`; never typeset the wordmark.

The design system section of the case study is marked **in progress** and may change before release.

## Deployment

This Case Study lives in the `xkye-solutions` monorepo. `pnpm build` copies `public/` to `dist/`. That built output is deployed to Cloudflare at `renigo.xkye.app` and published to the read-only `xkye-solutions/renigo-case-study` Mirror.

The case study's social preview tags (`og:image`, `og:url`, canonical) use absolute `https://renigo.xkye.app/` URLs; update them if the domain changes.

## Content notes

- The **outcomes** in section 07 are design targets, not measured results.
- Names, units and data in the prototype are sample content.
- The V2 storyboard is unreleased and is intentionally **not** part of this repository.
