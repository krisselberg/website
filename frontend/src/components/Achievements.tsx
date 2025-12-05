"use client";

import Container from "./Container";
import { useState } from "react";

type Achievement = {
  text: string;
  date: string;
  link?: string;
  linkText?: string;
};

const achievements: Achievement[] = [
  { text: "Graduated Princeton University", date: "May '25" },
  {
    text: "Flew to the Middle East for a month to build an on-prem AI solution running on real government data",
    date: "Mar '25",
  },
  {
    text: "Joined UniversalAGI as the 1st engineer",
    date: "Dec '24",
    link: "https://universalagi.com",
    linkText: "UniversalAGI",
  },
  {
    text: "Spent a semester in SF working on AI + permitting at BrainCo and flew to Qatar to pitch it",
    date: "Fall '24",
    link: "https://brain.co",
    linkText: "BrainCo",
  },
  {
    text: "Worked on video generation models with Sebastian Thrun and Eric Schmidt at Hooglee",
    date: "May–Aug '24",
  },
  {
    text: "Published a paper in AR + flew to Hawaii to present it at CHI",
    date: "May '24",
  },
  {
    text: "Backpacked Western Europe with my best friend for a month",
    date: "Jul–Aug '23",
  },
  { text: "Ran a marathon with two weeks notice", date: "Jan '23" },
  {
    text: "Built AI creator tools and video upload/streaming pipeline at a16z-backed flavrs",
    date: "Nov '22–Jul '23",
    link: "https://flavrs.com",
    linkText: "flavrs",
  },
  {
    text: "Lived in Colombia for 3 months coding and creating content",
    date: "Jun–Aug '22",
  },
  {
    text: "Grew a TikTok profile to 50k+ followers in 21 days talking about nonfiction books",
    date: "Aug '21",
  },
  {
    text: "Interned at the Qatar Computing Research Institute researching and building deepfake detection models",
    date: "May–Jul '21",
    link: "https://qcri.hbku.edu.qa",
    linkText: "Qatar Computing Research Institute",
  },
  {
    text: 'Read a book a week for a year (mostly self-help and "wantrepreneur" books)',
    date: "'20",
  },
  {
    text: "Won an applied math competition with 3000+ students",
    date: "Mar '20",
  },
  {
    text: "Made $1k+ selling fidget spinners from China to people in my school",
    date: "'17",
  },
];

function AchievementRow({ achievement }: { achievement: Achievement }) {
  const renderText = () => {
    if (achievement.text.includes("wantrepreneur")) {
      return (
        <>
          Read a book a week for a year (mostly self-help and{" "}
          <a
            href="https://en.wiktionary.org/wiki/wantrepreneur"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            &quot;wantrepreneur&quot;
          </a>{" "}
          books)
        </>
      );
    }

    if (achievement.link && achievement.linkText) {
      const parts = achievement.text.split(achievement.linkText);
      return (
        <>
          {parts[0]}
          <a
            href={achievement.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            {achievement.linkText}
          </a>
          {parts[1]}
        </>
      );
    }

    return achievement.text;
  };

  return (
    <div className="flex items-start gap-4">
      <span className="text-gray-500 flex-shrink-0 w-[160px]">
        [{achievement.date}]
      </span>
      <span className="text-gray-300">{renderText()}</span>
    </div>
  );
}

export default function Achievements() {
  const [showAll, setShowAll] = useState(false);

  const visible = achievements.slice(0, 5);
  const hidden = achievements.slice(5);

  return (
    <section className="pb-16">
      <Container>
        <div className="font-mono text-sm">
          <div className="mb-4">
            <div className="text-gray-500 text-xs">Me in 10 Seconds</div>
          </div>

          <div className="space-y-3">
            {visible.map((achievement, i) => (
              <AchievementRow key={i} achievement={achievement} />
            ))}

            {showAll &&
              hidden.map((achievement, i) => (
                <AchievementRow key={i + 5} achievement={achievement} />
              ))}
          </div>

          {hidden.length > 0 && (
            <div className="mt-6">
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-gray-500 hover:text-gray-300 transition-colors text-xs"
              >
                {showAll ? "Show less" : `Show ${hidden.length} more`}
              </button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
