import { NextResponse } from "next/server";

// Disable caching for this route
export const dynamic = "force-dynamic";

const LASTFM_API_KEY = process.env.LASTFM_API_KEY;
const LASTFM_USERNAME = "krisselberg";

type LastFmTrack = {
  name: string;
  artist: { "#text": string };
  album: { "#text": string };
  url: string;
  image: { "#text": string; size: string }[];
  date?: { uts: string; "#text": string };
  "@attr"?: { nowplaying: string };
};

export async function GET() {
  if (!LASTFM_API_KEY) {
    return NextResponse.json(
      { error: "Missing LASTFM_API_KEY" },
      { status: 500 }
    );
  }

  const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=1`;

  try {
    const response = await fetch(url, {
      cache: "no-store", // Always fetch fresh
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch from Last.fm" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const track: LastFmTrack | undefined = data?.recenttracks?.track?.[0];

    if (!track) {
      return NextResponse.json(
        { error: "No recent tracks found" },
        { status: 404 }
      );
    }

    const isNowPlaying = track["@attr"]?.nowplaying === "true";
    const artwork = track.image?.find((img) => img.size === "large")?.["#text"];

    return NextResponse.json({
      track: track.name,
      artist: track.artist["#text"],
      album: track.album["#text"],
      url: track.url,
      artwork: artwork || null,
      isNowPlaying,
      playedAt: track.date?.uts
        ? new Date(parseInt(track.date.uts) * 1000).toISOString()
        : null,
    });
  } catch (error) {
    console.error("Last.fm API error:", error);
    return NextResponse.json(
      { error: "Unable to fetch Last.fm data" },
      { status: 502 }
    );
  }
}
