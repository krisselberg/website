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

interface BookCardProps {
  book: Book;
  onClick: () => void;
}

export default function BookCard({ book, onClick }: BookCardProps) {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
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
          className={`text-lg ${
            i <= rating ? "text-yellow-400" : "text-gray-400"
          }`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div
      className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Book Cover */}
        <div className="flex-shrink-0">
          <div className="relative w-32 h-48 rounded-lg overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
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

        {/* Book Details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
            {book.title}
          </h3>

          <p className="text-gray-300 mb-3 font-medium">by {book.author}</p>

          <div className="flex items-center gap-4 mb-3 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              📅 {formatDate(book.dateRead)}
            </span>
            <span className="flex items-center gap-1">
              📖 {book.pages} pages
            </span>
          </div>

          {/* Recommendation Rating */}
          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">Recommendation:</p>
            <div className="flex items-center gap-1">
              {renderStars(book.recommendation)}
              <span className="text-sm text-gray-300 ml-2">
                {book.recommendation}/10
              </span>
            </div>
          </div>

          {/* Summary */}
          <p className="text-gray-300 leading-relaxed line-clamp-3">
            {book.summary}
          </p>

          {/* Genre Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {book.genre.slice(0, 2).map((genre) => (
              <span
                key={genre}
                className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300"
              >
                {genre}
              </span>
            ))}
            {book.genre.length > 2 && (
              <span className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300">
                +{book.genre.length - 2} more
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
