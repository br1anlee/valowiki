// ===========================================================================
// AGENT CONCEPT - PLACEHOLDER CONTENT
//
// This file is a TEMPLATE. The kit below is deliberately generic filler so the
// page has something to render; it is not a finished design and should not be
// presented as one.
//
// Replace every field with your own design before showing this to anyone. The
// design itself is the thing being evaluated - the page is only the frame.
//
// Things worth covering in `counterplay` and `designNotes`, because they are
// what a design reviewer actually reads for:
//   - What problem in the current meta does this agent solve?
//   - What does the opponent DO about it? (an ability with no answer is a bug)
//   - Why these numbers? What breaks if the cooldown halves?
//   - Where does it overlap with an existing agent, and why is that fine?
// ===========================================================================

export const CONCEPT = {
  isPlaceholder: true,

  name: "Codename",
  role: "Initiator",
  origin: "Origin country",
  tagline: "One line on what this agent does that nothing else does.",

  bio: "Two or three sentences of character. Who are they, how do they fight, and what does the team gain by picking them?",

  // Signature ability is free each round; ultimate costs points.
  abilities: [
    {
      slot: "C",
      name: "Ability one",
      cost: "200 creds",
      charges: "1 charge",
      description: "What it does mechanically, in the same voice the game uses.",
      designNote: "Why it exists and what it is balanced against.",
    },
    {
      slot: "Q",
      name: "Ability two",
      cost: "250 creds",
      charges: "2 charges",
      description: "What it does mechanically.",
      designNote: "Why the cost and charge count are what they are.",
    },
    {
      slot: "E",
      name: "Signature ability",
      cost: "Free",
      charges: "Recharges on 2 kills",
      description: "The ability that defines how the agent is played every round.",
      designNote: "Why this is the signature rather than one of the others.",
    },
    {
      slot: "X",
      name: "Ultimate",
      cost: "7 points",
      charges: "1 use",
      description: "The round-swinging effect.",
      designNote: "Why 7 points, and what it should feel like to play against.",
    },
  ],

  counterplay: [
    "What an opponent can do to blunt the signature ability.",
    "Which existing agents already answer this kit.",
    "The information the ability gives away when used.",
  ],

  designNotes: [
    "The gap in the current meta this agent is meant to fill.",
    "The closest existing agent, and why both can coexist.",
    "The number you are least sure about, and how you would playtest it.",
  ],
};
