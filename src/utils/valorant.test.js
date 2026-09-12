import {
  groupAgentsByRole,
  groupWeaponsByCategory,
  playableMaps,
  mapSlug,
} from "./valorant";

const agent = (displayName, role) => ({
  uuid: displayName,
  displayName,
  role: role ? { displayName: role } : null,
});

const weapon = (displayName, categoryText, cost) => ({
  uuid: displayName,
  displayName,
  category: `EEquippableCategory::${displayName}`,
  shopData: categoryText === null ? null : { categoryText, cost },
});

describe("groupAgentsByRole", () => {
  const agents = [
    agent("Jett", "Duelist"),
    agent("Astra", "Controller"),
    agent("Iso", "Duelist"),
    agent("Omen", "Controller"),
  ];

  test("groups by role, pluralised, roles alphabetical", () => {
    expect(groupAgentsByRole(agents).map((g) => g.title)).toEqual([
      "Controllers",
      "Duelists",
    ]);
  });

  test("sorts agents alphabetically inside each role", () => {
    const duelists = groupAgentsByRole(agents).find(
      (g) => g.key === "Duelist"
    );
    expect(duelists.items.map((a) => a.displayName)).toEqual(["Iso", "Jett"]);
  });

  test("skips agents with no role and tolerates no input", () => {
    expect(groupAgentsByRole([agent("Nobody", null)])).toEqual([]);
    expect(groupAgentsByRole()).toEqual([]);
  });
});

describe("groupWeaponsByCategory", () => {
  const weapons = [
    weapon("Vandal", "Assault Rifles", 2900),
    weapon("Melee", null),
    weapon("Classic", "Sidearms", 0),
    weapon("Sheriff", "Sidearms", 800),
  ];

  test("orders categories by the shop layout, unknown ones last", () => {
    expect(groupWeaponsByCategory(weapons).map((g) => g.title)).toEqual([
      "Sidearms",
      "Assault Rifles",
      "Melee",
    ]);
  });

  test("sorts weapons cheapest first", () => {
    const sidearms = groupWeaponsByCategory(weapons)[0];
    expect(sidearms.items.map((w) => w.displayName)).toEqual([
      "Classic",
      "Sheriff",
    ]);
  });

  test("falls back to the equippable category when shopData is missing", () => {
    // Melee is the only weapon the API ships without shopData.
    const melee = groupWeaponsByCategory([weapon("Melee", null)]);
    expect(melee[0].key).toBe("Melee");
  });
});

describe("playableMaps", () => {
  // The API also returns deathmatch arenas, the tutorial and two "The Range"
  // entries; only standard maps carry a tacticalDescription.
  const maps = [
    { uuid: "1", displayName: "Ascent", tacticalDescription: "A/B Sites" },
    { uuid: "2", displayName: "The Range", tacticalDescription: null },
    { uuid: "3", displayName: "Abyss", tacticalDescription: "A/B Sites" },
    { uuid: "4", displayName: "Ascent", tacticalDescription: "A/B Sites" },
  ];

  test("keeps only standard maps, de-duplicated and sorted", () => {
    expect(playableMaps(maps).map((m) => m.displayName)).toEqual([
      "Abyss",
      "Ascent",
    ]);
  });

  test("tolerates no input", () => {
    expect(playableMaps()).toEqual([]);
  });
});

describe("mapSlug", () => {
  test("makes anchor-safe slugs", () => {
    expect(mapSlug("The Range")).toBe("the-range");
    expect(mapSlug("Split")).toBe("split");
    expect(mapSlug("")).toBe("");
  });
});
