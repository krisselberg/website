"use client";

import { useEffect, useState } from "react";
import Container from "./Container";

type TrackData = {
  track: string;
  artist: string;
  url: string;
  artwork: string | null;
  isNowPlaying: boolean;
  playedAt: string | null;
};

function formatTimeAgo(isoDate: string | null): string {
  if (!isoDate) return "";
  const seconds = Math.floor((Date.now() - new Date(isoDate).getTime()) / 1000);
  if (seconds < 60) return "now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export default function CurrentStatus() {
  const [track, setTrack] = useState<TrackData | null>(null);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const res = await fetch("/api/lastfm");
        if (res.ok) setTrack(await res.json());
      } catch {
        /* silently fail */
      }
    };
    fetchTrack();
    const interval = setInterval(fetchTrack, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pb-12">
      <Container>
        <div className="font-mono text-sm">
          <div className="mb-4">
            <div className="text-gray-500 text-xs">
              Last updated: November 22, 2025
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-4">
              <span className="text-gray-500 flex-shrink-0 w-[160px]">
                Building:
              </span>
              <span className="text-gray-300">
                Foundation Models for Physics Simulations
              </span>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-gray-500 flex-shrink-0 w-[160px]">
                Writing:
              </span>
              <span className="text-gray-300">
                &quot;Why Direct Numerical Simulation Remains Computationally
                Intractable&quot;
              </span>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-gray-500 flex-shrink-0 w-[160px]">
                Reading:
              </span>
              <span className="text-gray-300">
                <em>The Count of Monte Cristo</em> by Alexandre Dumas
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-gray-500 flex-shrink-0 w-[160px]">
                Listening:
              </span>
              <div className="flex items-center gap-3">
                {track?.artwork && (
                  <img
                    src={track.artwork}
                    alt=""
                    className="w-8 h-8 rounded shadow-md flex-shrink-0"
                  />
                )}
                {track ? (
                  <a
                    href={track.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {track.track}
                    <span className="text-gray-500"> — </span>
                    <span className="text-gray-400">{track.artist}</span>
                    {track.isNowPlaying ? (
                      <span className="text-green-400 ml-2">♫</span>
                    ) : track.playedAt ? (
                      <span className="text-gray-600 ml-2">
                        · {formatTimeAgo(track.playedAt)}
                      </span>
                    ) : null}
                  </a>
                ) : (
                  <span className="text-gray-600">Loading...</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
