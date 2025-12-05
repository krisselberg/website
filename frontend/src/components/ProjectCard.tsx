import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  link?: string;
  blogLink?: string;
  imageStyle?: string;
}

export default function ProjectCard({ 
  title, 
  description, 
  image, 
  imageAlt, 
  link, 
  blogLink,
  imageStyle = "object-cover"
}: ProjectCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-shrink-0">
          <Image
            src={image}
            alt={imageAlt}
            width={200}
            height={150}
            className={`rounded-lg ${imageStyle}`}
            style={{ height: "150px", width: "200px" }}
            priority={false}
            unoptimized={true}
          />
        </div>
        
        <div className="flex-1">
          <h4 className="text-xl font-bold text-white mb-4">
            {link ? (
              <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                {title}
              </a>
            ) : (
              title
            )}
          </h4>
          
          <div className="text-gray-300 leading-relaxed space-y-3">
            {description.split('\n').map((paragraph, index) => (
              <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
            ))}
          </div>
          
          {blogLink && (
            <div className="mt-4">
              <a 
                href={blogLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline text-sm"
              >
                Read the blog post →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}