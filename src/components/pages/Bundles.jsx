import { useEffect, useMemo, useState } from "react";
import "../layout/Bundles.css";
import DataState, { SkeletonGrid } from "../layout/DataState";
import BundleCard from "../layout/BundleCard";
import useBundleMeta from "../../hooks/useBundleMeta";
import { buildBundles } from "../../utils/bundles";

const PAGE = 24;

// Rarest first - it reads as a ladder rather than an arbitrary order.
const TIER_ORDER = [
  "Ultra Edition",
  "Exclusive Edition",
  "Premium Edition",
  "Deluxe Edition",
  "Select Edition",
];

export default function Bundles({ weapons, status: weaponStatus, onRetry }) {
  const [query, setQuery] = useState("");
  const [weapon, setWeapon] = useState("All");
  const [tier, setTier] = useState("All");
  const [sort, setSort] = useState("size");
  const [fullOnly, setFullOnly] = useState(true);
  const [shown, setShown] = useState(PAGE);

  const meta = useBundleMeta();

  const bundles = useMemo(
    () => buildBundles({ weapons, themes: meta.themes, bundles: meta.bundles }),
    [weapons, meta.themes, meta.bundles]
  );

  const tierNameById = useMemo(
    () => new Map(meta.tiers.map((t) => [t.uuid, t.displayName])),
    [meta.tiers]
  );

  const weaponNames = useMemo(
    () =>
      [...new Set(bundles.flatMap((b) => b.items.map((i) => i.weapon)))].sort(
        (a, b) => a.localeCompare(b)
      ),
    [bundles]
  );

  const tierNames = useMemo(
    () =>
      TIER_ORDER.filter((name) =>
        meta.tiers.some((t) => t.displayName === name)
      ),
    [meta.tiers]
  );

  const visible = useMemo(() => {
    const search = query.trim().toLowerCase();

    const filtered = bundles.filter((bundle) => {
      // 178 collections hold a single skin - one-offs rather than the
      // multi-weapon bundles people mean. Hidden unless asked for.
      if (fullOnly && bundle.items.length < 2) return false;

      if (weapon !== "All" && !bundle.items.some((i) => i.weapon === weapon)) {
        return false;
      }

      // "Contains", not "is" - 121 collections mix tiers.
      if (
        tier !== "All" &&
        !bundle.items.some((i) => tierNameById.get(i.tierUuid) === tier)
      ) {
        return false;
      }

      if (!search) return true;

      return (
        bundle.name.toLowerCase().includes(search) ||
        bundle.items.some((i) => i.displayName.toLowerCase().includes(search))
      );
    });

    return sort === "name"
      ? [...filtered].sort((a, b) => a.name.localeCompare(b.name))
      : filtered;
  }, [bundles, query, weapon, tier, sort, fullOnly, tierNameById]);

  // Any change to the filters starts the list again from the top.
  useEffect(() => {
    setShown(PAGE);
  }, [query, weapon, tier, sort, fullOnly]);

  const status =
    weaponStatus === "error" || meta.status === "error"
      ? "error"
      : weaponStatus === "loading" || meta.status === "loading"
      ? "loading"
      : "ready";

  const retry = () => {
    meta.retry();
    onRetry?.();
  };

  const page = visible.slice(0, shown);
  const remaining = visible.length - page.length;

  return (
    <div className="page">
      <header className="page-head">
        <span className="eyebrow">Valowiki</span>
        <h1>Skin Bundles</h1>
        <p>
          {status === "ready"
            ? `${bundles.length} collections covering ${bundles.reduce(
                (sum, b) => sum + b.items.length,
                0
              )} skins`
            : "Every skin collection, grouped by theme"}
        </p>
      </header>

      <DataState
        status={status}
        onRetry={retry}
        what="bundles"
        skeleton={<SkeletonGrid count={9} variant="wide" />}
      >
        <div className="bundle-controls">
          <input
            type="search"
            className="search-input"
            placeholder="Search bundles or skins..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search bundles by name, or by a skin inside them"
          />

          <label className="compare-field">
            <span>Weapon</span>
            <select
              className="compare-select"
              value={weapon}
              onChange={(event) => setWeapon(event.target.value)}
            >
              <option value="All">Any weapon</option>
              {weaponNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>

          <label className="compare-field">
            <span>Sort</span>
            <select
              className="compare-select"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="size">Most skins</option>
              <option value="name">A to Z</option>
            </select>
          </label>
        </div>

        <div className="filter-bar">
          <div className="chip-row">
            <button
              type="button"
              className="chip"
              aria-pressed={tier === "All"}
              onClick={() => setTier("All")}
            >
              Any tier
            </button>
            {tierNames.map((name) => (
              <button
                type="button"
                key={name}
                className="chip"
                aria-pressed={tier === name}
                onClick={() => setTier((cur) => (cur === name ? "All" : name))}
              >
                {name.replace(" Edition", "")}
              </button>
            ))}
            <button
              type="button"
              className="chip"
              aria-pressed={fullOnly}
              onClick={() => setFullOnly((on) => !on)}
              title="Hide collections that contain only one skin"
            >
              Full collections
            </button>
          </div>
          <span className="result-count" role="status" aria-live="polite">
            {visible.length} of {bundles.length}
          </span>
        </div>

        {visible.length === 0 ? (
          <p className="empty-state">No bundles match those filters.</p>
        ) : (
          <>
            <div className="bundle-grid">
              {page.map((bundle) => (
                <BundleCard key={bundle.key} bundle={bundle} />
              ))}
            </div>

            {remaining > 0 && (
              <div className="bundle-more">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShown((n) => n + PAGE)}
                >
                  Load {Math.min(remaining, PAGE)} more
                </button>
                <span>{remaining} remaining</span>
              </div>
            )}
          </>
        )}
      </DataState>
    </div>
  );
}
