import Container from "./Container";

interface WritingItemProps {
  date: string;
  title: string;
  link: string;
}

function WritingItem({ date, title, link }: WritingItemProps) {
  return (
    <div className="flex items-start gap-4 py-3 border-b border-white/10 last:border-b-0">
      <span className="text-sm text-gray-400 font-mono min-w-[80px]">{date}</span>
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-white transition-colors flex-1"
      >
        {title}
      </a>
    </div>
  );
}

export default function Writing() {
  const technicalWriting = [
    {
      date: "Mar 2024",
      title: "General Motors Apps Deep Dive",
      link: "https://www.emergetools.com/deep-dives/general-motors"
    },
    {
      date: "Jan 2024", 
      title: "How to Optimize Swift Closures for Better Performance",
      link: "https://krisselberg.github.io/2024/01/04/closures.html"
    },
    {
      date: "Dec 2023",
      title: "LLM Princeton Student Search",
      link: "https://krisselberg.github.io/2023/12/26/princetonstudentsearch.html"
    },
    {
      date: "Dec 2023",
      title: "Pi Face Jukebox",
      link: "https://krisselberg.github.io/2023/12/18/pifacejukebox.html"
    }
  ];

  const personalWriting = [
    {
      date: "Feb 2021",
      title: "Why I Ran 4 Miles Every 4 Hours for 48 Hours",
      link: "https://krisselberg.github.io/2021/02/15/gogrun.html"
    }
  ];

  return (
    <section className="py-8 pb-16">
      <Container>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-8">Technical Writing</h3>
            <div className="space-y-1">
              {technicalWriting.map((item, index) => (
                <WritingItem 
                  key={index}
                  date={item.date}
                  title={item.title}
                  link={item.link}
                />
              ))}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-8">Personal Writing</h3>
            <div className="space-y-1">
              {personalWriting.map((item, index) => (
                <WritingItem 
                  key={index}
                  date={item.date}
                  title={item.title}
                  link={item.link}
                />
              ))}
              <div className="flex items-start gap-4 py-3">
                <span className="text-sm text-gray-400 font-mono min-w-[80px]">More</span>
                <span className="text-gray-300">
                  See more posts on my{" "}
                  <a 
                    href="https://krisselberg.github.io/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    blog
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}