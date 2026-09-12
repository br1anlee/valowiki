# Valowiki

A Valorant companion app for players who want to learn their agents and improve their game. Agents, maps and weapons are pulled live from the [Valorant API](https://dash.valorant-api.com/), so the roster never goes stale — new agents and maps appear automatically as Riot ships them.

Built with React and React Router. No backend.

> **Not affiliated with Riot Games.** All characters, art and assets belong to Riot Games.

---

## Screenshots

### Home
![Home page with video hero and section cards](./docs/screenshots/home.jpg)

### Agents
Live search and role filters over the full roster. Counts update as Riot adds agents.

![Agents listing with search box, role filter chips and a grid of agent cards](./docs/screenshots/agents.jpg)

### Agent detail
![Jett's detail page showing role badge, portrait and ability cards](./docs/screenshots/agent-detail.jpg)

### Maps
![Maps page showing a grid of map cards with splash art and site badges](./docs/screenshots/maps.jpg)

### Weapons
![Weapons page grouped by shop category with prices in creds](./docs/screenshots/weapons.jpg)

### Weapon comparison
Shots and time to kill computed from the game's damage tables, with a falloff chart.

![Weapon comparison showing shots and time to kill for two weapons side by side](./docs/screenshots/compare.jpg)

### Map callouts
Every callout plotted on the minimap from the coordinate transform the API ships per map.

![Ascent minimap with all callouts plotted and an index grouped by side](./docs/screenshots/map-callouts.jpg)

### Line ups
Video thumbnails with map tags and a lightbox player. Filter by map.

![Sova line ups with map filter chips and video thumbnail cards](./docs/screenshots/lineups.jpg)

### Mobile
The sidebar collapses to a drawer below 900px.

| Navigation drawer | Agents |
|---|---|
| ![Mobile navigation drawer open over the agents page](./docs/screenshots/mobile-nav.jpg) | ![Agents page on a phone-width screen](./docs/screenshots/mobile-agents.jpg) |

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
