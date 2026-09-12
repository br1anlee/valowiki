import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../layout/Bundles.css";
import DataState, { SkeletonGrid } from "../layout/DataState";
import useBundleMeta from "../../hooks/useBundleMeta";
import { buildBundles } from "../../utils/bundles";

export default function Bundles({ weapons, status: weaponStatus, onRetry }) {
  const [query, setQuery] = useState("");
  const meta = useBundleMeta();

  const bundles = useMemo(
    () => buildBundles({ weapons, themes: meta.themes, bundles: meta.bundles }),
    [weapons, meta.themes, meta.bundles]
  );

  const visible = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return bundles;

    return bundles.filter(
      (bundle) =>
        bundle.name.toLowerCase().includes(search) ||
        bundle.items.some((item) =>
          item.displayName.toLowerCase().includes(search)
        )
    );
  }, [bundles, query]);

  // Either request can fail; the page needs both.
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

  const skinCount = bundles.reduce((sum, b) => sum + b.items.length, 0);

  return (
    <div className="page">
      <header className="page-head">
        <span className="eyebrow">Valowiki</span>
        <h1>Skin Bundles</h1>
        <p>
          {status === "ready"
            ? `${bundles.length} collections covering ${skinCount} skins`
            : "Every skin collection, grouped by theme"}
        </p>
      </header>

      <DataState
        status={status}
        onRetry={retry}
        what="bundles"
        skeleton={<SkeletonGrid count={9} variant="wide" />}
      >
        <div className="filter-bar">
          <input
            type="search"
            className="search-input"
            placeholder="Search bundles or skins..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search bundles by name, or by a skin inside them"
          />
          <span className="result-count" role="status" aria-live="polite">
            {visible.length} of {bundles.length}
          </span>
        </div>

        {visible.length === 0 ? (
          <p className="empty-state">No bundles match that search.</p>
        ) : (
          <div className="bundle-grid">
            {visible.map((bundle) => (
              <Link
                key={bundle.key}
                to={`/bundles/${bundle.key}`}
                className="card bundle-card"
              >
                <div className="bundle-card-art">
                  <img src={bundle.art} alt="" loading="lazy" />
                </div>
                <div className="bundle-card-body">
                  <h3>{bundle.name}</h3>
                  {/* Two editions of a collection share a name, so the weapon
                      list is what tells them apart. */}
                  <p className="bundle-card-weapons">{bundle.weaponsLabel}</p>
                  <span className="bundle-card-count">
                    {bundle.items.length} skins
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </DataState>
    </div>
  );
}
