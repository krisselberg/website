import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CurrentStatus from "@/components/CurrentStatus";
import Achievements from "@/components/Achievements";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />

      <Hero />
      <CurrentStatus />
      <Achievements />
    </div>
  );
}
