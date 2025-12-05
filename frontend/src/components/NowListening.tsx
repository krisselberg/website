"use client";

import { useEffect, useState } from "react";
import Container from "./Container";

type TrackPayload = {
  username?: string | null;
  artist?: string | null;
  track?: string | null;
  url?: string | null;
  playedAt?: string | null;
  artwork?: string | null;
};

const RELATIVE_TIME_THRESHOLDS = [
  { limit: 60, divisor: 1, unit: "s" },
  { limit: 3600, divisor: 60, unit: "m" },
  { limit: 86400, divisor: 3600, unit: "h" },
  { limit: Infinity, divisor: 86400, unit: "d" },
];

const formatRelativeTime = (iso?: string | null) => {
  if (!iso) return null;
  const playedDate = new Date(iso);
  if (Number.isNaN(playedDate.getTime())) return null;

  const diffSeconds = Math.max(0, (Date.now() - playedDate.getTime()) / 1000);

  for (const { limit, divisor, unit } of RELATIVE_TIME_THRESHOLDS) {
    if (diffSeconds < limit) {
      const value = Math.floor(diffSeconds / divisor) || 1;
      return `${value}${unit} ago`;
    }
  }

  return null;
};

export default function NowListening() {
  const [data, setData] = useState<TrackPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchTrack = async () => {
      try {
        const response = await fetch("/api/lastfm", { cache: "no-store" });
        const text = await response.text();

        // Try to parse as JSON
        let payload: TrackPayload & { error?: string };
        try {
          payload = JSON.parse(text);
        } catch {
          throw new Error("Invalid response from server");
        }

        // Check for error in payload
        if (payload.error) {
          throw new Error(payload.error);
        }

        if (isMounted) {
          setData(payload);
          setError(null);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Unable to reach Last.fm"
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchTrack();
    const interval = setInterval(fetchTrack, 60000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const relativeTime = formatRelativeTime(data?.playedAt);
  const headline =
    data?.track && data?.artist ? `${data.track} — ${data.artist}` : null;

  return (
    <section className="pb-8">
      <Container>
        <div className="bg-black/80 border border-gray-800 rounded-xl px-5 py-4 flex items-center gap-4 shadow-inner shadow-black/40">
          <div className="text-green-400 text-lg">♫</div>

          <div className="flex-1">
            <p className="text-green-400 text-xs uppercase tracking-[0.2em] mb-1">
              Now Listening
            </p>

            {loading && (
              <p className="text-gray-500 text-sm">Fetching from Last.fm…</p>
            )}

            {!loading && error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            {!loading && !error && (
              <>
                <p className="text-white text-base leading-tight">
                  {headline ?? "No recent track found"}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  {relativeTime
                    ? `Last scrobbled ${relativeTime}`
                    : "Awaiting a fresh scrobble"}
                </p>
              </>
            )}
          </div>

          {data?.url && !loading && !error && (
            <a
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-white transition-colors"
            >
              View track ↗
            </a>
          )}
        </div>
      </Container>
    </section>
  );
}
