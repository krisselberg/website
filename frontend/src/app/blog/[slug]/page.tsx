import Header from "@/components/Header";
import Container from "@/components/Container";
import Link from "next/link";
import { notFound } from "next/navigation";

type BlogPostContent = {
  title: string;
  date: string;
  content: React.ReactNode;
};

const blogPostContent: Record<string, BlogPostContent> = {
  "2026-goals": {
    title: "2026 Goals",
    date: "January 3, 2026",
    content: (
      <div className="font-mono text-sm space-y-3">
        <div className="flex items-start gap-4">
          <span className="text-gray-500 flex-shrink-0 w-[100px]">[Fitness]</span>
          <span className="text-gray-300">&lt; 10% body fat at 185+ lb</span>
        </div>
        <div className="flex items-start gap-4">
          <span className="text-gray-500 flex-shrink-0 w-[100px]">[Reading]</span>
          <span className="text-gray-300">Read 25 books</span>
        </div>
        <div className="flex items-start gap-4">
          <span className="text-gray-500 flex-shrink-0 w-[100px]">[...]</span>
          <span className="text-gray-500 italic">More to come</span>
        </div>
      </div>
    ),
  },
};

export async function generateStaticParams() {
  return Object.keys(blogPostContent).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPostContent[slug];

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} | Kris Selberg`,
    description: `${post.title} - ${post.date}`,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPostContent[slug];

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />

      <main className="pt-32 pb-16">
        <Container>
          <Link
            href="/blog"
            className="inline-flex items-center text-gray-500 hover:text-gray-300 text-sm font-mono mb-8 transition-colors"
          >
            &larr; Back to Blog
          </Link>

          <header className="mb-12">
            <div className="text-xs font-mono text-gray-500 mb-4">
              <span>{post.date}</span>
            </div>
            <h1 className="text-3xl font-bold text-white">{post.title}</h1>
          </header>

          <article>{post.content}</article>
        </Container>
      </main>
    </div>
  );
}
