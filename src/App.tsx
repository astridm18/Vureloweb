import Navbar from "./components/Navbar";
import Hero1 from "./components/Hero1";
import SectionTransactions from "./components/SectionTransactions";
import Footer from "./components/footer";
import CardSliderSection from "./components/CardSliderSection";
import DigitalServicesSection from "./components/DigitalServicesSection";
import MoveMoneySection from "./components/MoveMoneySection";

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero1 />
      <MoveMoneySection />
      <CardSliderSection />
      <DigitalServicesSection />
      <SectionTransactions />
      <Footer />
    </div>
  );
}

export default App;
