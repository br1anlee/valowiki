# Valowiki

A Valorant companion app for players who want to learn their agents and improve their game. Agents, maps and weapons are pulled live from the [Valorant API](https://dash.valorant-api.com/), so the roster never goes stale — new agents and maps appear automatically as Riot ships them.

Built with React and React Router. No backend.

> **Not affiliated with Riot Games.** All characters, art and assets belong to Riot Games.

---

## Screenshots

### Home
![Home page with a video hero and cards linking to agents, maps and weapons](./docs/screenshots/home.jpg)

### Agents
Live search and role filters over the full roster. Counts update as Riot adds agents.

![Agents listing with a search box, role filter chips and a grid of agent cards](./docs/screenshots/agents.jpg)

| Filtered to duelists | Agent detail |
|---|---|
| ![Agents grid filtered to the eight duelists](./docs/screenshots/agents-filtered.jpg) | ![Jett's page with role badge, portrait and ability cards](./docs/screenshots/agent-detail.jpg) |

### Maps
![Maps page with a card per map in the standard rotation](./docs/screenshots/maps.jpg)

Every callout plotted on the minimap, from the coordinate transform the API ships per map:

![Ascent minimap with all 22 callouts plotted and an index grouped by side](./docs/screenshots/map-callouts.jpg)

### Weapons
| Listing | Detail |
|---|---|
| ![Weapons grouped by shop category with prices in creds](./docs/screenshots/weapons.jpg) | ![Vandal page with a uniform art box and a stat strip](./docs/screenshots/weapon-detail.jpg) |

### Weapon comparison
Shots and time to kill computed from the game's damage tables, for any two weapons.

![Comparison table showing damage, shots and time to kill by range](./docs/screenshots/compare.jpg)

The falloff chart makes the Vandal/Phantom tradeoff visible - the Phantom steps down at 20 m, the Vandal holds flat:

![Damage falloff chart with a flat Vandal line and a stepped Phantom line](./docs/screenshots/compare-chart.jpg)

### Skin bundles
Skins grouped into the collections they shipped in, with rarity tiers.

| Collections | Inside one |
|---|---|
| ![Grid of skin bundles with promo art and skin counts](./docs/screenshots/bundles.jpg) | ![The Glitchpop bundle with its five skins and Exclusive Edition tiers](./docs/screenshots/bundle-detail.jpg) |

### Line ups
Thumbnails with map tags; the player only loads when a card is opened.

| Gallery | Player |
|---|---|
| ![Sova line ups with map filter chips and thumbnail cards](./docs/screenshots/lineups.jpg) | ![A line-up video open in a lightbox with its map tag](./docs/screenshots/lineup-lightbox.jpg) |

### Loading and failure
The listing pages show skeletons while the API is in flight, and a retryable error if it fails - never an empty grid claiming there are no results.

| Loading | API unavailable |
|---|---|
| ![Skeleton placeholder cards while agent data loads](./docs/screenshots/loading-state.jpg) | ![An error panel reading "Couldn't load agents" with a Try again button](./docs/screenshots/error-state.jpg) |

### Mobile
The sidebar collapses to a drawer below 900px.

| Navigation | Agents | Weapon detail |
|---|---|---|
| ![Mobile navigation drawer open](./docs/screenshots/mobile-nav.jpg) | ![Agents page at phone width](./docs/screenshots/mobile-agents.jpg) | ![Weapon detail at phone width with a two-column stat grid](./docs/screenshots/mobile-weapon.jpg) |

<details>
<summary>More screens</summary>

### Team
![Team page with a card per contributor](./docs/screenshots/team.jpg)

### Gameplay
![Gameplay clips in the same thumbnail gallery](./docs/screenshots/gameplay.jpg)

### Not found
![404 page with a Jett animation and a link home](./docs/screenshots/not-found.jpg)

</details>

---

## Running locally

Requires Node 18 or newer (verified on Node 26).

```bash
git clone https://github.com/br1anlee/valowiki.git
cd valowiki
npm install
npm start
```

The app runs at `http://localhost:3000`. No API key or `.env` is needed — the Valorant API is public and unauthenticated.

### Scripts

| Command | What it does |
|---|---|
| `npm start` | Dev server with hot reload |
| `npm run build` | Production build into `build/` |
| `npm test` | Unit tests for the data and ballistics helpers |
| `node scripts/fetch-lineup-titles.mjs` | Pull real line-up titles from YouTube (see below) |

---

## Routes

| URL | Description |
|---|---|
| `/` | Home |
| `/agents` | All agents, searchable and filterable by role |
| `/agents/:id` | Agent detail with abilities |
| `/maps` | Maps in the standard rotation |
| `/maps/:id` | Minimap with every callout plotted |
| `/weapons` | Weapons grouped by shop category |
| `/weapons/:id` | Weapon stats and skins |
| `/compare` | Shots and time to kill for any two weapons |
| `/bundles` | Skin collections, searchable by bundle or skin name |
| `/bundles/:id` | Every skin in one collection, with rarity tiers |
| `/lineups` | Line-up overview |
| `/lineups/:agent` | Line-up videos for one agent |
| `/gameplay` | Gameplay clips |
| `/team` | About the team |
| `*` | 404 |

---

## How it works

### Everything is driven by the API

There are no hardcoded agent or weapon lists. [`src/utils/valorant.js`](./src/utils/valorant.js) turns raw API payloads into the shapes the UI renders, and both the sidebar and the listing pages read from it — so they can't drift out of sync.

Three things that endpoint needs handling for:

- **`/maps` returns more than the maps you play.** Deathmatch arenas, the tutorial and *two* "The Range" entries all come back. Only standard maps carry a `tacticalDescription`, which is what `playableMaps()` filters on.
- **Melee has no `shopData`.** It's the one weapon without a shop entry, so category grouping falls back to the equippable category and sorts it last.
- **`shopOrderPriority` is `0` for every weapon**, so it can't order the shop. Weapons sort by cost instead, which matches the in-game buy menu.

### Weapon comparison
Shots and time to kill computed from the game's damage tables, with a falloff chart.

![Weapon comparison showing shots and time to kill for two weapons side by side](./docs/screenshots/compare.jpg)

### Map callouts
Every callout plotted on the minimap from the coordinate transform the API ships per map.

![Ascent minimap with all callouts plotted and an index grouped by side](./docs/screenshots/map-callouts.jpg)

### Bundles are derived, not fetched

No endpoint lists a bundle's skins. Every skin does carry a `themeUuid`, though,
and a theme is the collection it shipped in - so
[`src/utils/bundles.js`](./src/utils/bundles.js) groups by theme and joins
`/v1/bundles` on by name for the promo art. That covers about 290 of 440
collections; the rest fall back to the theme icon or a skin render, so no card
is ever art-less.

Two wrinkles worth knowing:

- **`Standard` and `Random` are not bundles.** They are each weapon's default
  skin and the randomiser entry, and they are excluded.
- **Collections get re-released, and nothing is versioned.** Glitchpop shipped
  twice and Magepunk three times, and the API gives every edition the identical
  name in both endpoints. Same-named themes therefore take same-named bundles in
  order, so each edition gets its own art, and the cards are told apart by the
  weapons they cover rather than by an invented "2.0".

The skins themselves arrive inside the weapons payload the sidebar already
fetches, so only the theme, bundle and tier metadata (~0.4 MB) is requested, and
only when a bundle page is opened.

### Time to kill is computed, not looked up

[`src/utils/ballistics.js`](./src/utils/ballistics.js) derives shots and time to
kill from the API's own damage tables: per-pellet damage for shotguns, the band
that applies at a given range, and `(shots - 1) / fireRate` for the timing. It
makes the Vandal/Phantom tradeoff concrete - past 20 m the Phantom drops to 140
head damage and needs a second bullet through a full shield, while the Vandal
holds 160 at every range.

### Line ups are a data file

Adding a line up is one entry in [`src/data/lineups.js`](./src/data/lineups.js) — no new component, route or sidebar edit:

```js
{ id: "TR_OlrD8e_4", agent: "sova", title: "Garage Recon", map: "Haven", ability: "Recon Bolt" }
```

`map` and `ability` are optional; the card renders whatever is present.

To fill in titles automatically, make sure the videos are public and run:

```bash
node scripts/fetch-lineup-titles.mjs          # dry run, prints what it found
node scripts/fetch-lineup-titles.mjs --write  # applies the changes
```

It reads each title from YouTube's public oEmbed endpoint (no API key) and parses a trailing `[MAP]` tag — `Sova CT to Boat [ASCENT]` becomes `title: "CT to Boat", map: "Ascent"`. Map names are validated against the live map list, so a typo can't create a bogus filter. Private or deleted videos are reported and left untouched.

### Videos load as thumbnails, not players

A line-up page mounts **zero** YouTube iframes on load — just thumbnails. Clicking a card opens a lightbox that mounts exactly one player. Eight embedded iframes previously loaded ~0.5 MB of YouTube payload before anyone pressed play.

---

## Project structure

```
src/
├── App.js                      # routes + the three API fetches
├── index.css                   # design tokens, reset, shared primitives
├── data/lineups.js             # line-up catalogue
├── utils/valorant.js           # API grouping, filtering, callout projection
├── utils/ballistics.js         # damage, shots and time to kill
├── utils/bundles.js            # skin-to-collection grouping
├── hooks/useBundleMeta.js      # lazily fetched theme/bundle/tier data
└── components/
    ├── layout/                 # Sidebar, Footer, LineupGallery + CSS
    └── pages/                  # one component per route
scripts/
└── fetch-lineup-titles.mjs     # populates line-up titles from YouTube
.github/workflows/
├── ci.yml                      # tests + build on every push and PR
└── deploy.yml                  # publishes to GitHub Pages
docs/screenshots/               # images used by this README
```

### Loading and failure

The three API requests are made once in [`App.js`](./src/App.js) and shared. While
they are in flight the listing pages render skeletons; if they fail, the page
shows a retryable error rather than an empty grid claiming "no results". Getting
this wrong is the difference between a site that looks broken and one that
explains itself.

The 5.8 MB hero clip is not fetched until the browser is idle - a 40 KB poster
frame carries first paint, and anyone who has asked for reduced motion keeps the
still. Re-encoding the clip would help further; it needs ffmpeg, which the repo
does not assume:

```bash
ffmpeg -i src/components/video/home-bg.mp4 -vf scale=1280:-2 \
  -c:v libx264 -crf 30 -preset slow -an home-bg.mp4
```

### Styling

Plain CSS with custom properties. Tokens live at the top of [`src/index.css`](./src/index.css) — palette, spacing scale, radii, shadows, easing — alongside shared primitives (`.page`, `.card`, `.btn`, `.chip`, `.filter-bar`). Page-specific styles sit next to their components.

---

## Tech

- **React 18** with **React Router 6**
- **Axios** for API requests
- **react-player** for YouTube embeds
- **react-icons** for the team page
- **Create React App** (`react-scripts` 5)

## Resources

- [Valorant API](https://dash.valorant-api.com/) — agent, map and weapon data
- [Riot Games](https://playvalorant.com/) — all characters and assets
