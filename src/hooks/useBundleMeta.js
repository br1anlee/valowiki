import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const API = "https://valorant-api.com/v1";

// Themes, bundles and content tiers are only needed by the bundle pages, so
// they are fetched on mount rather than added to the app-wide load. Together
// they are around 0.4 MB; the skins themselves already arrive with the weapons
// payload the sidebar needs.
export default function useBundleMeta() {
  const [meta, setMeta] = useState({ themes: [], bundles: [], tiers: [] });
  const [status, setStatus] = useState("loading");
  const [attempt, setAttempt] = useState(0);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");

    Promise.all([
      axios.get(`${API}/themes`),
      axios.get(`${API}/bundles`),
      axios.get(`${API}/contenttiers`),
    ])
      .then(([themeRes, bundleRes, tierRes]) => {
        if (cancelled) return;

        setMeta({
          themes: themeRes.data.data,
          bundles: bundleRes.data.data,
          tiers: tierRes.data.data,
        });
        setStatus("ready");
      })
      .catch((error) => {
        if (cancelled) return;

        console.error("Bundle metadata request failed", error);
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [attempt]);

  return { ...meta, status, retry };
}
