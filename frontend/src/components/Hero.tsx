import Container from "./Container";

export default function Hero() {
  return (
    <section className="pt-32 pb-12">
      <Container>
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold mb-2 text-white">Kris Selberg</h1>
          <h2 className="text-xl text-gray-300">
            Founding Member of Technical Staff @{" "}
            <a
              href="https://universalagi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white"
            >
              UniversalAGI
            </a>
          </h2>
        </div>
      </Container>
    </section>
  );
}
