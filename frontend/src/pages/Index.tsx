import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ProblemStatement from "@/components/ProblemStatement";
import TeamSection from "@/components/TeamSection";
import SolutionSection from "@/components/SolutionSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <div id="problem">
        <ProblemStatement />
      </div>
      <div id="team">
        <TeamSection />
      </div>
      <SolutionSection />
    </div>
  );
};

export default Index;
