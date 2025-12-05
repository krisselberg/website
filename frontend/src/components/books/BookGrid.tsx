import BookCard from "./BookCard";

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

interface BookGridProps {
  books: Book[];
  onBookClick: (book: Book) => void;
}

export default function BookGrid({ books, onBookClick }: BookGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onClick={() => onBookClick(book)} />
      ))}
    </div>
  );
}
