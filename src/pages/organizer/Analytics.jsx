import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navigation/Navbar";
import SideBar from "../../components/SideBar";

function Analytics() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50">
        {/* Sidebar - Hidden on mobile, fixed on desktop */}
        <SideBar />
        <h1>Analytics</h1>
      </div>
      <Footer />
    </>
  );
}

export default Analytics;
