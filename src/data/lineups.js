// Line-up catalogue.
//
// Adding a line up means adding one entry here - no new component, route or
// sidebar edit. `map`, `ability` and `title` are optional: the gallery falls
// back gracefully when they are missing, so an entry is useful the moment you
// know its video id.
//
// To fill in the titles automatically once the videos are public, run:
//   node scripts/fetch-lineup-titles.mjs
// It reads each video's real title from YouTube's public oEmbed endpoint.

import { asset } from "../utils/asset";

export const LINEUP_AGENTS = [
  {
    slug: "sova",
    name: "Sova",
    banner: asset("images/sovapic.jpeg"),
    blurb:
      "Recon Bolts and Shock Darts that clear a site before your team steps onto it.",
  },
  {
    slug: "cypher",
    name: "Cypher",
    banner: asset("images/cypher.jpeg"),
    blurb:
      "Cages and trapwires that lock down flanks and buy your team information.",
  },
];

export const LINEUPS = [
  // --- Sova -----------------------------------------------------------------
  { id: "Dm_AnZbeamE", title: "B Stairs To Mid", map: "Ascent", agent: "sova" },
  { id: "7lR2_FfKqUk", title: "Hell to Heaven", map: "Ascent", agent: "sova" },
  { id: "RCdzMhXYvn8", title: "CT to Boat", map: "Ascent", agent: "sova" },
  { id: "Csqb_JKoOwo", title: "CT Spawn to A", map: "Ascent", agent: "sova" },
  {
    id: "TR_OlrD8e_4",
    agent: "sova",
    title: "Garage Recon",
    map: "Haven",
    ability: "Recon Bolt",
  },
  { id: "K9p7Hu9zSWU", title: "T Spawn To Garage", map: "Haven", agent: "sova" },
  { id: "bY5wwODz3S4", title: "C Main to C Site", map: "Haven", agent: "sova" },
  { id: "ENo5rg6PLmg", title: "B Link to A", map: "Haven", agent: "sova" },

  // --- Cypher ---------------------------------------------------------------
  { id: "_kgwebcpdxw", title: "B Setup", map: "Split", agent: "cypher" },
  { id: "FCCmm8oKYWg", title: "A Setup", map: "Split", agent: "cypher" },
  { id: "k4vnsdNBEu8", title: "B Setup", map: "Bind", agent: "cypher" },
  { id: "jHMsLL9HgOY", title: "A Setup", map: "Bind", agent: "cypher" },
  { id: "TFteb9A_63c", title: "B Setup", map: "Fracture", agent: "cypher" },
  { id: "4xppZMixd0s", title: "A Setup", map: "Fracture", agent: "cypher" },
];

// Standalone gameplay clips - same card treatment, no agent grouping.
export const GAMEPLAY = [
  { id: "M7D_XBjGw3E", title: "Justin's 1v5 ACE" },
  { id: "WakR802RZcI", title: "Gameplay #1" },
  { id: "HQjIVPSG4Nw", title: "Gameplay #2" },
  { id: "yRKr-0ZWobY", title: "Gameplay #3" },
];

export const getAgent = (slug) =>
  LINEUP_AGENTS.find((agent) => agent.slug === slug);

export const lineupsFor = (slug) =>
  LINEUPS.filter((lineup) => lineup.agent === slug);

// Maps present in a set of line ups, for the filter chips. Entries with no map
// yet are ignored here but still render in the grid.
export const mapsIn = (lineups) =>
  [...new Set(lineups.map((l) => l.map).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b)
  );

// hqdefault exists for every public video; maxres does not.
export const thumbnailFor = (id) =>
  `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

export const watchUrl = (id) => `https://www.youtube.com/watch?v=${id}`;
