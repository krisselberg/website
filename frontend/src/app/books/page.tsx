/* "use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Container from "@/components/Container";
import Separator from "@/components/Separator";
import ReadingCalendar from "@/components/books/ReadingCalendar";
import BookGrid from "@/components/books/BookGrid";
import BookModal from "@/components/books/BookModal"; */

/* type Theme = {
  primary: string;
  secondary: string;
  background: string;
};

type Book = {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  dateRead: string;
  recommendation: number; // 1-10 scale
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

const SAMPLE_BOOKS: Book[] = [
  {
    id: "1",
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    coverImage: "/next.svg",
    dateRead: "2024-01-15",
    recommendation: 9,
    summary:
      "Essential reading for any software developer. Changed how I think about coding and software development practices.",
    detailedNotes:
      "This book fundamentally changed my approach to programming. The concept of 'broken windows' theory really resonated with me - small issues left unfixed can lead to bigger problems. The DRY principle and the emphasis on continuous learning have become core to my development philosophy. I particularly appreciated the practical advice on debugging, testing, and maintaining code quality.",
    pages: 352,
    genre: ["Programming", "Software Development"],
    tags: ["technical", "career", "best-practices", "programming"],
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    coverImage: "/vercel.svg",
    dateRead: "2023-12-10",
    recommendation: 8,
    summary:
      "Great framework for building good habits and breaking bad ones. Practical and actionable advice.",
    detailedNotes:
      "James Clear's framework for habit formation is incredibly practical. The 1% improvement concept is powerful - small changes compound over time. I've implemented several strategies from this book, including habit stacking and environment design. The identity-based habits approach was particularly insightful - focusing on who you want to become rather than what you want to achieve.",
    pages: 320,
    genre: ["Self-Help", "Psychology"],
    tags: ["productivity", "habits", "life-changing", "psychology"],
  },
  {
    id: "3",
    title: "The Design of Everyday Things",
    author: "Don Norman",
    coverImage: "/poke-ball.png",
    dateRead: "2024-01-20",
    recommendation: 9,
    summary:
      "Fascinating insights into how design affects human behavior and cognition. Essential for understanding UX.",
    detailedNotes:
      "Don Norman's classic work on design psychology is eye-opening. The concept of affordances and signifiers has completely changed how I look at everyday objects and digital interfaces. The examples of poor design (like doors that don't indicate which way to push) are both humorous and educational. This book has influenced my approach to designing user experiences.",
    pages: 368,
    genre: ["Design", "Psychology"],
    tags: ["ux", "design-thinking", "cognitive-science", "psychology"],
  },
];

const SAMPLE_READING_DATA: ReadingDay[] = [
  { date: "2024-01-20", pagesRead: 19, booksRead: ["3"] },
  { date: "2024-01-19", pagesRead: 25, booksRead: ["3"] },
  { date: "2024-01-18", pagesRead: 15, booksRead: ["3"] },
  { date: "2024-01-17", pagesRead: 30, booksRead: ["3"] },
  { date: "2024-01-16", pagesRead: 20, booksRead: ["3"] },
  { date: "2024-01-15", pagesRead: 50, booksRead: ["1"] },
  { date: "2024-01-14", pagesRead: 45, booksRead: ["1"] },
  { date: "2024-01-13", pagesRead: 35, booksRead: ["1"] },
  { date: "2024-01-12", pagesRead: 40, booksRead: ["1"] },
  { date: "2024-01-11", pagesRead: 25, booksRead: ["1"] },
  { date: "2024-01-10", pagesRead: 30, booksRead: ["1"] },
  { date: "2024-01-09", pagesRead: 20, booksRead: ["1"] },
  { date: "2024-01-08", pagesRead: 15, booksRead: ["1"] },
  { date: "2024-01-07", pagesRead: 25, booksRead: ["1"] },
  { date: "2024-01-06", pagesRead: 35, booksRead: ["1"] },
  { date: "2024-01-05", pagesRead: 40, booksRead: ["1"] },
  { date: "2024-01-04", pagesRead: 30, booksRead: ["1"] },
  { date: "2024-01-03", pagesRead: 25, booksRead: ["1"] },
  { date: "2024-01-02", pagesRead: 20, booksRead: ["1"] },
  { date: "2024-01-01", pagesRead: 15, booksRead: ["1"] },
  { date: "2023-12-31", pagesRead: 30, booksRead: ["2"] },
  { date: "2023-12-30", pagesRead: 25, booksRead: ["2"] },
  { date: "2023-12-29", pagesRead: 35, booksRead: ["2"] },
  { date: "2023-12-28", pagesRead: 40, booksRead: ["2"] },
  { date: "2023-12-27", pagesRead: 30, booksRead: ["2"] },
  { date: "2023-12-26", pagesRead: 25, booksRead: ["2"] },
  { date: "2023-12-25", pagesRead: 20, booksRead: ["2"] },
  { date: "2023-12-24", pagesRead: 15, booksRead: ["2"] },
  { date: "2023-12-23", pagesRead: 30, booksRead: ["2"] },
  { date: "2023-12-22", pagesRead: 35, booksRead: ["2"] },
  { date: "2023-12-21", pagesRead: 25, booksRead: ["2"] },
  { date: "2023-12-20", pagesRead: 20, booksRead: ["2"] },
  { date: "2023-12-19", pagesRead: 15, booksRead: ["2"] },
  { date: "2023-12-18", pagesRead: 30, booksRead: ["2"] },
  { date: "2023-12-17", pagesRead: 25, booksRead: ["2"] },
  { date: "2023-12-16", pagesRead: 35, booksRead: ["2"] },
  { date: "2023-12-15", pagesRead: 40, booksRead: ["2"] },
  { date: "2023-12-14", pagesRead: 30, booksRead: ["2"] },
  { date: "2023-12-13", pagesRead: 25, booksRead: ["2"] },
  { date: "2023-12-12", pagesRead: 20, booksRead: ["2"] },
  { date: "2023-12-11", pagesRead: 15, booksRead: ["2"] },
  { date: "2023-12-10", pagesRead: 50, booksRead: ["2"] },
];

const DEFAULT_THEME: Theme = {
  primary: "#6B7280",
  secondary: "#4B5563",
  background: "#1F2937",
};

*/

export default function BooksPage() {
  return (
    <div className="min-h-screen flex items-center justify-center text-white bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">📚 Books Page</h1>
        <p className="text-xl text-gray-400">Coming Soon...</p>
      </div>
    </div>
  );
}

/* 
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);
  const [books] = useState<Book[]>(SAMPLE_BOOKS);
  const [readingData] = useState<ReadingDay[]>(SAMPLE_READING_DATA);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("pokemonTheme");
    if (saved) {
      try {
        setTheme(JSON.parse(saved));
      } catch {
        localStorage.removeItem("pokemonTheme");
      }
    }
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("pokemonTheme", JSON.stringify(newTheme));
  };

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  return (
    <div
      className="min-h-screen transition-colors duration-500 text-white"
      style={{ backgroundColor: theme.background }}
    >
      <Header
        onHomeClick={handleHomeClick}
        onThemeChange={handleThemeChange}
        currentTheme={theme}
      />

      <div className="pt-20">
        <Container>
          <div className="text-center py-16">
            <h1 className="text-5xl font-bold mb-4">My Book Notes</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Notes on the books I've read and how I've applied lessons to my
              life.
            </p>
          </div>

          <div className="py-8">
            <ReadingCalendar readingData={readingData} books={books} />
          </div>

          <div className="py-8">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Books I've Read
            </h2>
            <BookGrid books={books} onBookClick={handleBookClick} />
          </div>
        </Container>
      </div>

      {selectedBook && (
        <BookModal
          book={selectedBook}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
*/
