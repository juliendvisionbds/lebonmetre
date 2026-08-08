import AgitationSection from "@/components/AgitationSection";
import AlphaSection from "@/components/AlphaSection";
import ComparisonSection from "@/components/ComparisonSection";
import FaqSection from "@/components/FaqSection";
import FinalCta from "@/components/FinalCta";
import FitSection from "@/components/FitSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import ScopeSection from "@/components/ScopeSection";
import SolutionSection from "@/components/SolutionSection";
import { StatsProvider } from "@/components/StatsContext";
import TimelineSection from "@/components/TimelineSection";
import { getStats } from "@/lib/waitlist";

export default function Home() {
  const stats = getStats();

  return (
    <StatsProvider initialStats={stats}>
      <Header />
      <Hero />
      <ProblemSection />
      <AgitationSection />
      <SolutionSection />
      <ScopeSection />
      <ComparisonSection />
      <AlphaSection />
      <FitSection />
      <TimelineSection />
      <FaqSection />
      <FinalCta />
      <Footer />
    </StatsProvider>
  );
}
