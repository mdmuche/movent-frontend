import CategoryGrid from "../components/CategoryGrid";
import Navbar from "../components/common/Navigation/Navbar";
import Newsletter from "../components/NewsLetter";
import UpcomingEvents from "../components/UpcomingEvents";
import HeroSection from "../components/HeroSection";
import Footer from "../components/common/Footer";

function Home() {
  return (
    <div className="font-sans min-h-screen bg-[#04201a] px-4 sm:px-0">
      {/* Navbar */}
      <Navbar />
      {/* Hero */}
      <HeroSection />
      {/* Category Grid */}
      <CategoryGrid />
      {/* Upcoming Events */}
      <UpcomingEvents />
      {/* Newsletter */}
      <Newsletter />
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
