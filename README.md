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
| `npm test` | Unit tests for the data helpers |
| `node scripts/fetch-lineup-titles.mjs` | Pull real line-up titles from YouTube (see below) |

---

## Routes

| URL | Description |
|---|---|
| `/` | Home |
| `/agents` | All agents, searchable and filterable by role |
| `/agents/:id` | Agent detail with abilities |
| `/maps` | Maps in the standard rotation |
| `/maps#<map-slug>` | Jumps to a map's section, e.g. `/maps#icebox` |
| `/weapons` | Weapons grouped by shop category |
| `/weapons/:id` | Weapon stats and skins |
| `/lineups` | Line-up overview |
| `/lineups/:agent` | Line-up videos for one agent |
| `/gameplay` | Gameplay clips |
| `/team` | About the team |
| `*` | 404 |

Maps have no detail route, so the sidebar links to anchors on `/maps` instead.

---

## How it works

### Everything is driven by the API

There are no hardcoded agent or weapon lists. [`src/utils/valorant.js`](./src/utils/valorant.js) turns raw API payloads into the shapes the UI renders, and both the sidebar and the listing pages read from it — so they can't drift out of sync.

Three things that endpoint needs handling for:

- **`/maps` returns more than the maps you play.** Deathmatch arenas, the tutorial and *two* "The Range" entries all come back. Only standard maps carry a `tacticalDescription`, which is what `playableMaps()` filters on.
- **Melee has no `shopData`.** It's the one weapon without a shop entry, so category grouping falls back to the equippable category and sorts it last.
- **`shopOrderPriority` is `0` for every weapon**, so it can't order the shop. Weapons sort by cost instead, which matches the in-game buy menu.

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
├── utils/valorant.js           # API grouping, filtering, slugs
└── components/
    ├── layout/                 # Sidebar, Footer, LineupGallery + CSS
    └── pages/                  # one component per route
scripts/
└── fetch-lineup-titles.mjs     # populates line-up titles from YouTube
docs/screenshots/               # images used by this README
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
