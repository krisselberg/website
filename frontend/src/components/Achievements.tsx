"use client";

import Container from "./Container";
import { useState } from "react";

export default function Achievements() {
  const [showAll, setShowAll] = useState(false);
  const achievements = [
    { text: "Graduated Princeton University", date: "May 2025" },
    {
      text: "Flew to the Middle East for a month to build an on-prem AI solution running on real government data",
      date: "Mar 2025",
    },
    {
      text: "Joined UniversalAGI as the 1st engineer",
      date: "Dec 2024",
      link: "https://universalagi.com",
      linkText: "UniversalAGI",
    },
    {
      text: "Worked on video generation models with Sebastian Thrun and Eric Schmidt at Hooglee",
      date: "May-Aug 2024",
    },
    {
      text: "Published a paper in AR + flew to Hawaii to present it at CHI",
      date: "May 2024",
    },
    {
      text: "Spent a semester in SF working on AI + permitting at BrainCo and flew to Qatar to pitch it",
      date: "Oct 2024",
      link: "https://brain.co",
      linkText: "BrainCo",
    },
    { text: "Ran a marathon with two weeks notice", date: "Jan 2023" },
    {
      text: "Backpacked Western Europe with my best friend for a month",
      date: "Jul-Aug 2023",
    },
    {
      text: "Lived in Colombia for 3 months coding and creating content",
      date: "Jun-Aug 2022",
    },
    {
      text: "Grew a TikTok profile to 50k+ followers in 21 days talking about nonfiction books",
      date: "Aug 2021",
    },
    {
      text: "Interned at the Qatar Computing Research Institute researching and building deepfake detection models",
      date: "May-Jul 2021",
      link: "https://qcri.hbku.edu.qa",
      linkText: "Qatar Computing Research Institute",
    },
    {
      text: 'Read a book a week for a year (mostly self-help and "wantrepreneur" books)',
      date: "2020",
    },
    {
      text: "Won an applied math competition with 3000+ students",
      date: "Mar 2020",
    },
    {
      text: "Made $1k+ selling fidget spinners from China to people in my school",
      date: "2017",
    },
  ];

  return (
    <section className="pb-16">
      <Container>
        <div className="font-mono text-sm">
          <div className="mb-4">
            <div className="text-gray-500 text-xs">Me in 10 Seconds</div>
          </div>

          <div className="space-y-3">
            {(() => {
              const sortedAchievements = achievements.sort((a, b) => {
                const parseDate = (dateStr: string) => {
                  if (dateStr.includes("-")) {
                    const parts = dateStr.split(" ");
                    const year = parseInt(parts[parts.length - 1]);
                    const monthRange = parts[0];
                    const endMonth = monthRange.split("-")[1];

                    const monthMap: { [key: string]: number } = {
                      Jan: 1,
                      Feb: 2,
                      Mar: 3,
                      Apr: 4,
                      May: 5,
                      Jun: 6,
                      Jul: 7,
                      Aug: 8,
                      Sep: 9,
                      Oct: 10,
                      Nov: 11,
                      Dec: 12,
                    };

                    return year * 100 + (monthMap[endMonth] || 0);
                  } else if (dateStr.includes(" ")) {
                    const [month, year] = dateStr.split(" ");
                    const monthMap: { [key: string]: number } = {
                      Jan: 1,
                      Feb: 2,
                      Mar: 3,
                      Apr: 4,
                      May: 5,
                      Jun: 6,
                      Jul: 7,
                      Aug: 8,
                      Sep: 9,
                      Oct: 10,
                      Nov: 11,
                      Dec: 12,
                    };

                    return parseInt(year) * 100 + (monthMap[month] || 0);
                  } else {
                    return parseInt(dateStr) * 100;
                  }
                };

                return parseDate(b.date) - parseDate(a.date);
              });

              const visibleAchievements = sortedAchievements.slice(0, 5);
              const hiddenAchievements = sortedAchievements.slice(5);

              return (
                <>
                  {visibleAchievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <span className="text-gray-500 flex-shrink-0 w-[140px]">
                        [{achievement.date}]
                      </span>
                      <span className="text-gray-300">
                        {achievement.text.includes("wantrepreneur") ? (
                          <>
                            Read a book a week for a year (mostly self-help and{" "}
                            <a
                              href="https://en.wiktionary.org/wiki/wantrepreneur"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:underline"
                            >
                              "wantrepreneur"
                            </a>{" "}
                            books)
                          </>
                        ) : achievement.link && achievement.linkText ? (
                          <>
                            {achievement.text.split(achievement.linkText)[0]}
                            <a
                              href={achievement.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:underline"
                            >
                              {achievement.linkText}
                            </a>
                            {achievement.text.split(achievement.linkText)[1]}
                          </>
                        ) : (
                          achievement.text
                        )}
                      </span>
                    </div>
                  ))}

                  {hiddenAchievements.length > 0 && showAll && (
                    <>
                      {hiddenAchievements.map((achievement, index) => (
                        <div key={index + 5} className="flex items-start gap-4">
                          <span className="text-gray-500 flex-shrink-0 w-[140px]">
                            [{achievement.date}]
                          </span>
                          <span className="text-gray-300">
                            {achievement.text.includes("wantrepreneur") ? (
                              <>
                                Read a book a week for a year (mostly self-help
                                and{" "}
                                <a
                                  href="https://en.wiktionary.org/wiki/wantrepreneur"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 hover:underline"
                                >
                                  "wantrepreneur"
                                </a>{" "}
                                books)
                              </>
                            ) : achievement.link && achievement.linkText ? (
                              <>
                                {
                                  achievement.text.split(
                                    achievement.linkText
                                  )[0]
                                }
                                <a
                                  href={achievement.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 hover:underline"
                                >
                                  {achievement.linkText}
                                </a>
                                {
                                  achievement.text.split(
                                    achievement.linkText
                                  )[1]
                                }
                              </>
                            ) : (
                              achievement.text
                            )}
                          </span>
                        </div>
                      ))}
                    </>
                  )}
                </>
              );
            })()}
          </div>

          {achievements.length > 5 && (
            <div className="mt-6">
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-gray-500 hover:text-gray-300 transition-colors text-xs"
              >
                {showAll ? `Show less` : `Show ${achievements.length - 5} more`}
              </button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
