# Renigo — Case Study & Interactive Prototype

> **Read-only Mirror.** This is maintained in Xkye Solutions' private monorepo and split here with its history. Changes made here are overwritten, so please don't open issues or pull requests. Live at <https://renigo.xkye.app>. Built on [`case-study-kit`](https://github.com/xkye-solutions/case-study-kit) and [`brand`](https://github.com/xkye-solutions/brand), which are Mirrors too.

A portfolio case study by **Xkye Solutions** for Renigo, a community management platform for residential villages and estates. The page tells the product story and embeds a live, clickable prototype of the resident app that follows along as you scroll.

Built with Astro on the shared case-study kit (`@xkye/case-study-kit`); see the kit's README for how the pieces fit.

## Running locally

From the monorepo root:

```sh
pnpm install
pnpm --filter @xkye/renigo-case-study dev
```

Then open the URL Astro prints: `/` is the case study and `/prototype.html` is the prototype on its own. `pnpm build` writes the site to `dist/`.

## Project structure

```
.
├── astro.config.mjs
├── src/
│   ├── pages/index.astro       The case study: nav, hero, narrative chapters and end sections
│   ├── content/flows/          One Markdown file per key-flow chapter
│   ├── content.config.ts       The flows collection, on the kit's flowSchema
│   └── styles/renigo.css       All page styles
└── public/
    ├── prototype.html          Interactive prototype (resident app), served as-is
    └── assets/
        ├── brand/              Logos, favicons and social card from the Renigo brand kit
        └── images/             Web-sized photos (facilities, people, background)
```

## Prototype

The prototype is a single file with an in-memory state, a small router and an action map (`A`) wired to `data-act` attributes. Everything resets on reload.

**Flows:** login (password or Face ID), home dashboard, facility booking, visitor passes (create, view, share, revoke), household staff (check in/out and a 4-step registration), helpdesk requests, parking, household members, profile with the owner gate pass, notifications and news.

Opened on its own it starts at the login screen and shows a **Back to case study** link. Embedded in the case study it skips login.

### Driving it from the case study

The case study sends `renigo:goto` messages to the embedded prototype as each chapter scrolls into view, following the kit's Prototype contract:

```js
{
  type: 'renigo:goto',
  tab: 'home',            // home | facilities | passes | requests | profile
  screen: 'facilities',   // optional screen pushed on top of the tab
  sub: { sr: 'new' },     // optional sub-tab state
  action: 'book',         // optional action to run after navigating
  data: { id: 'pool' },
}
```

Each chapter declares its target with a `goto` prop (or `goto` frontmatter for a key flow), so adding a chapter only needs markup or a new file in `src/content/flows/`.

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

This Case Study lives in the `xkye-solutions` monorepo. It's deployed to Cloudflare by the root `alchemy.run.ts`, and its source is split, with history, to the read-only `xkye-solutions/renigo-case-study` Mirror.

The social preview tags (`og:image`, `og:url`, canonical) are built from `site="https://renigo.xkye.app/"` in `src/pages/index.astro`; update it, and `site` in `astro.config.mjs`, if the domain changes.

## Content notes

- The **outcomes** in section 07 are design targets, not measured results.
- Names, units and data in the prototype are sample content.
- The V2 storyboard is unreleased and is intentionally **not** part of this repository.
