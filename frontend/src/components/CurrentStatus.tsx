import Container from "./Container";

export default function CurrentStatus() {
  return (
    <section className="pb-12">
      <Container>
        <div className="font-mono text-sm">
          <div className="mb-4">
            <div className="text-gray-500 text-xs">
              Last updated: November 22, 2025
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-4">
              <span className="text-gray-500 flex-shrink-0 w-[140px]">Building:</span>
              <span className="text-gray-300">
                Foundational Models for Physics Simulations
              </span>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-gray-500 flex-shrink-0 w-[140px]">Writing:</span>
              <span className="text-gray-300">
                "Why Direct Numerical Simulation Remains Computationally Intractable"
              </span>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-gray-500 flex-shrink-0 w-[140px]">Reading:</span>
              <span className="text-gray-300">
                <em>The Count of Monte Cristo</em> by Alexandre Dumas
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
