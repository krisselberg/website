import Link from "next/link";
import Container from "./Container";
import Tooltip from "./Tooltip";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-gray-950/90">
      <Container className="py-3">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-white text-xl font-medium hover:opacity-80 transition-opacity duration-200"
          >
            Home
          </Link>

          <nav className="flex gap-8">
            <Tooltip content="Coming Soon..." position="bottom">
              <button className="text-white text-lg font-medium hover:opacity-80 transition-opacity duration-200 cursor-not-allowed">
                Books
              </button>
            </Tooltip>
            <Link
              href="/blog"
              className="text-white text-lg font-medium hover:opacity-80 transition-opacity duration-200"
            >
              Blog
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
}
