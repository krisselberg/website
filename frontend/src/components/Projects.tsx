import ProjectCard from "./ProjectCard";
import Container from "./Container";

export default function Projects() {
  const projects = [
    {
      title: "Breaking the Plane",
      description: `Breaking the Plane is an augmented reality (AR) application designed for the Meta Quest 3 headset using Unity, focusing on enhancing the comprehension of multidimensional mathematical concepts. It integrates a "Wizard of Oz" optical character recognition (OCR) solution for scanning handwritten input, enabling users to visualize 3D mathematical functions in an immersive AR environment. The application uniquely combines OCR with 3D AR visualization, a feature not previously explored in educational AR systems in mathematics. Its effectiveness was evaluated through a within-subjects study, where it demonstrated significant advantages in engagement and similar ease of use compared to traditional methods like Geogebra 3D (desktop equation visualizer) and Geogebra 3D Calculator (mobile AR).`,
      image: "/breakingtheplane.PNG",
      imageAlt: "Breaking the Plane system",
      blogLink: "https://krisselberg.github.io/2023/12/30/breakingtheplane.html",
      imageStyle: "object-cover object-right"
    },
    {
      title: "LLM Princeton Student Search",
      description: `LLM Princeton Student Search is a web application that simplifies the process of searching and managing information about Princeton University students. It combines NextJS and React for the frontend, OpenSearch for handling search queries, and utilizes AWS services for cloud hosting and deployment. The app features the integration of the GPT-4 API to convert natural language queries into structured search formats, enabling efficient and accurate data retrieval.`,
      image: "/ptonstudentsearchhome.gif",
      imageAlt: "Princeton Student Search Demo GIF",
      link: "https://github.com/krisselberg/princetonstudentsearch",
      blogLink: "https://krisselberg.github.io/2023/12/26/princetonstudentsearch.html"
    },
    {
      title: "The Pi Face Jukebox",
      description: `The Pi Face Jukebox is a Raspberry Pi application I developed for pranking some friends. This project blends a facial recognition SVM model with customized mp3 playback, playing specific theme songs for individuals as they are recognized by the system. The application uses Python, OpenCV for facial recognition, and the Pygame library for audio handling, along with custom scripts for dynamic music selection based on facial recognition.`,
      image: "/pifacejukebox.png",
      imageAlt: "Pi Face Jukebox Logo",
      link: "https://github.com/krisselberg/PiFaceJukebox",
      blogLink: "https://krisselberg.github.io/2023/12/18/pifacejukebox.html"
    },
    {
      title: "M3 Challenge Winner",
      description: `In March 2020, I worked in a team of five to solve problems related to the electric trucking industry, including calculating optimal placements of charging stations on certain routes, predicting the population of electric trucks 5, 10, and 20 years from now, and determining which routes are most important for developing charging stations first. We ended up placing first in the nation out of 760 teams and winning $20,000 in scholarship money. Our paper can be seen <a href="https://www.siam.org/media/k1zfcitl/s133509pdf.pdf" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline">here</a> published in SIAM Undergraduate Research Online, and a video of our presentation can be found <a href="https://www.youtube.com/watch?list=PLf_ipOSbWC86dNdRO-JUsrKjYO8wUyztH&v=uS4JKTfgYVU&feature=emb_title" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline">here</a>.`,
      image: "/mathworksvidss.png",
      imageAlt: "Mathworks Presentation Screenshot"
    }
  ];

  return (
    <section className="py-8">
      <Container>
        <h3 className="text-3xl font-bold text-white mb-12 text-center">Pet Projects</h3>
        
        <div className="space-y-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              image={project.image}
              imageAlt={project.imageAlt}
              link={project.link}
              blogLink={project.blogLink}
              imageStyle={project.imageStyle}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}