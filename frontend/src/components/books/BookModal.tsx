import { useEffect } from "react";
import Image from "next/image";
import { format } from "date-fns";

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

interface BookModalProps {
  book: Book;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookModal({ book, isOpen, onClose }: BookModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMMM dd, yyyy");
    } catch {
      return dateString;
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 10; i++) {
      stars.push(
        <span
          key={i}
          className={`text-xl ${
            i <= rating ? "text-yellow-400" : "text-gray-400"
          }`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">Book Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Book Cover */}
              <div className="flex-shrink-0">
                <div className="relative w-48 h-72 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={book.coverImage}
                    alt={`Cover of ${book.title}`}
                    fill
                    className="object-cover"
                    priority={false}
                    unoptimized={true}
                  />
                </div>
              </div>

              {/* Book Information */}
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {book.title}
                </h1>

                <p className="text-xl text-gray-300 mb-4">by {book.author}</p>

                {/* Meta Information */}
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div>
                    <span className="text-gray-400">Date Read:</span>
                    <p className="text-white">{formatDate(book.dateRead)}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Pages:</span>
                    <p className="text-white">{book.pages}</p>
                  </div>
                </div>

                {/* Recommendation Rating */}
                <div className="mb-6">
                  <p className="text-gray-400 mb-2">My Recommendation:</p>
                  <div className="flex items-center gap-2">
                    {renderStars(book.recommendation)}
                    <span className="text-lg text-white ml-2">
                      {book.recommendation}/10
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Summary
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {book.summary}
                  </p>
                </div>

                {/* Detailed Notes */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    My Notes
                  </h3>
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {book.detailedNotes}
                    </p>
                  </div>
                </div>

                {/* Genre and Tags */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Genres
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {book.genre.map((genre) => (
                        <span
                          key={genre}
                          className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {book.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-600/50 text-gray-300 rounded-full text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
