import Header from "@/components/Header";
import Container from "@/components/Container";
import Link from "next/link";

type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  status: "published" | "draft";
  readTime?: string;
};

const posts: BlogPost[] = [
  {
    slug: "direct-numerical-simulation",
    title:
      "Why Direct Numerical Simulation Remains Computationally Intractable",
    description:
      "An exploration of the computational challenges in simulating turbulent fluid flows and why we still can't brute-force the Navier-Stokes equations.",
    date: "Coming Soon",
    status: "draft",
    readTime: "~10 min",
  },
];

function BlogCard({ post }: { post: BlogPost }) {
  const isDraft = post.status === "draft";

  return (
    <div
      className={`group relative bg-gray-900/50 border border-gray-800 rounded-lg p-6 transition-all duration-200 ${
        isDraft
          ? "opacity-70"
          : "hover:border-gray-700 hover:bg-gray-900/80 cursor-pointer"
      }`}
    >
      {isDraft && (
        <span className="absolute top-4 right-4 text-xs font-mono text-yellow-500/80 bg-yellow-500/10 px-2 py-1 rounded">
          Draft
        </span>
      )}

      <div className="flex items-center gap-3 text-xs font-mono text-gray-500 mb-3">
        <span>{post.date}</span>
        {post.readTime && (
          <>
            <span className="text-gray-700">·</span>
            <span>{post.readTime}</span>
          </>
        )}
      </div>

      <h2 className="text-lg font-medium text-white mb-2 group-hover:text-green-400 transition-colors">
        {post.title}
      </h2>

      <p className="text-gray-400 text-sm leading-relaxed">
        {post.description}
      </p>

      {!isDraft && (
        <div className="mt-4 text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
          Read more →
        </div>
      )}
    </div>
  );
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />

      <main className="pt-32 pb-16">
        <Container>
          <div className="mb-12">
            <h1 className="text-3xl font-bold mb-2">Blog</h1>
            <p className="text-gray-500 font-mono text-sm">
              Thoughts on AI, physics, and building things.
            </p>
          </div>

          <div className="grid gap-6">
            {posts.map((post) =>
              post.status === "published" ? (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <BlogCard post={post} />
                </Link>
              ) : (
                <BlogCard key={post.slug} post={post} />
              )
            )}
          </div>

          {posts.length === 0 && (
            <div className="text-gray-500 font-mono text-sm">
              No posts yet. Check back soon.
            </div>
          )}
        </Container>
      </main>
    </div>
  );
}
