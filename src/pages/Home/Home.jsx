import Navbar from "../../components/Navigation/Navbar";
import HeroSection from "./components/HeroSection";

function Home() {
  return (
    <div className="font-sans min-h-screen bg-[#04201a] px-4 sm:px-0">
      {/* Navbar */}
      <Navbar />
      {/* Hero */}
      <HeroSection />
    </div>
  );
}

export default Home;
