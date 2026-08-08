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
import { getStatsOrDefault } from "@/lib/waitlist";

// Les places restantes changent à chaque inscription : jamais de page statique en cache.
export const dynamic = "force-dynamic";

export default async function Home() {
  const stats = await getStatsOrDefault();

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
