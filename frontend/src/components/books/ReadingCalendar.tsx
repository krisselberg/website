import { useState, useMemo } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";

type Book = {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  dateRead: string;
  recommendation: number;
  summary: string;
  detailedNotes: string;
  pages: number;
  genre: string[];
  tags: string[];
};

type ReadingDay = {
  date: string;
  pagesRead: number;
  booksRead: string[];
};

interface ReadingCalendarProps {
  readingData: ReadingDay[];
  books: Book[];
}

export default function ReadingCalendar({
  readingData,
  books,
}: ReadingCalendarProps) {
  const [hoveredDay, setHoveredDay] = useState<ReadingDay | null>(null);

  // Create a map of reading data for quick lookup
  const readingMap = useMemo(() => {
    const map = new Map<string, ReadingDay>();
    readingData.forEach((day) => {
      map.set(day.date, day);
    });
    return map;
  }, [readingData]);

  // Generate month-based calendar data
  const monthGroups = useMemo(() => {
    const today = new Date(); // Current date (dynamic)
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(today.getFullYear() - 1);
    oneYearAgo.setMonth(today.getMonth() - 11); // Start 12 months ago

    const months = [];

    // Generate 12 months ending with current month
    for (let i = 0; i < 12; i++) {
      const monthDate = new Date(
        today.getFullYear(),
        today.getMonth() - 11 + i,
        1
      );

      const monthStart = startOfMonth(monthDate);
      const monthEnd = endOfMonth(monthDate); // Always show full month

      const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

      months.push({
        month: format(monthDate, "MMM"),
        year: monthDate.getFullYear(),
        days: monthDays.map((date) => {
          const dateStr = format(date, "yyyy-MM-dd");
          const readingDay = readingMap.get(dateStr);

          return {
            date,
            dateStr,
            readingDay,
            isToday: format(date, "yyyy-MM-dd") === format(today, "yyyy-MM-dd"),
          };
        }),
      });
    }

    return months;
  }, [readingMap]);

  // Get color class based on pages read
  const getColorClass = (pagesRead: number) => {
    if (pagesRead === 0) return "bg-gray-600";
    if (pagesRead <= 10) return "bg-green-400";
    if (pagesRead <= 25) return "bg-green-500";
    if (pagesRead <= 50) return "bg-green-600";
    return "bg-green-700";
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Summary */}
      <div className="mb-6 text-center md:text-left">
        <div className="text-gray-300 text-lg">
          <span className="font-bold text-white">
            {readingData.reduce((sum, day) => sum + day.pagesRead, 0)}
          </span>{" "}
          pages read in the last year
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex gap-1 justify-center md:justify-start">
        {/* Month labels and calendar combined */}
        {monthGroups.map((monthData, index) => {
          // On mobile, only show the last month (current month)
          const isCurrentMonth = index === monthGroups.length - 1;

          // Create a proper 7-day week structure for each month
          const weeks = [];
          const firstDay = monthData.days[0];
          const startDayOfWeek = firstDay.date.getDay();

          // Add empty cells for days before month starts
          const allCells = [
            ...Array(startDayOfWeek).fill(null),
            ...monthData.days,
          ];

          // Group into weeks of 7
          for (let i = 0; i < allCells.length; i += 7) {
            weeks.push(allCells.slice(i, i + 7));
          }

          return (
            <div
              key={`${monthData.year}-${monthData.month}`}
              className={`flex flex-col ${
                isCurrentMonth ? "block" : "hidden md:block"
              }`}
            >
              {/* Month label positioned directly above its calendar */}
              <div className="text-sm text-gray-400 font-medium mb-2 text-left">
                {monthData.month}
              </div>

              {/* Calendar for this month */}
              {weeks.map((week, weekIndex) => (
                <div
                  key={weekIndex}
                  className="flex"
                  style={{ marginBottom: "2px" }}
                >
                  {week.map((day, dayIndex) => {
                    if (!day) {
                      // Empty cell
                      return (
                        <div
                          key={`empty-${weekIndex}-${dayIndex}`}
                          style={{
                            width: "10px",
                            height: "10px",
                            marginRight: "2px",
                            marginBottom: "2px",
                          }}
                        ></div>
                      );
                    }

                    const isHovered = hoveredDay?.date === day.dateStr;

                    return (
                      <div
                        key={day.dateStr}
                        className={`
                          rounded-sm cursor-pointer transition-all duration-200
                          ${
                            day.readingDay
                              ? getColorClass(day.readingDay.pagesRead)
                              : "bg-gray-600"
                          }
                          ${
                            isHovered
                              ? "scale-125 z-10 shadow-lg"
                              : "hover:scale-110"
                          }
                          ${day.isToday ? "ring-2 ring-blue-400" : ""}
                        `}
                        style={{
                          width: "10px",
                          height: "10px",
                          marginRight: "2px",
                          marginBottom: "2px",
                        }}
                        onMouseEnter={() =>
                          setHoveredDay(day.readingDay || null)
                        }
                        onMouseLeave={() => setHoveredDay(null)}
                        title={
                          day.readingDay
                            ? `${format(day.date, "MMM dd, yyyy")} - ${
                                day.readingDay.pagesRead
                              } pages read`
                            : format(day.date, "MMM dd, yyyy")
                        }
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 text-sm text-gray-400 mt-6">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-gray-600 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-400 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-600 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-700 rounded-sm"></div>
        </div>
        <span>More</span>
      </div>

      {/* Hover Tooltip */}
      {hoveredDay && (
        <div className="mt-4 p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
          <h4 className="font-semibold text-white mb-2">
            {format(new Date(hoveredDay.date), "MMMM dd, yyyy")}
          </h4>
          <p className="text-gray-300 mb-2">
            <span className="font-medium">{hoveredDay.pagesRead}</span> pages
            read
          </p>
        </div>
      )}
    </div>
  );
}
