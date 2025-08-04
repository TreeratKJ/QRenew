import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, BarChart3, Zap, Globe } from "lucide-react";

const ProblemStatement = () => {
  const problems = [
    {
      icon: AlertTriangle,
      title: "Energy Access Crisis",
      description: "Around 10% of ASEAN population still lacks access to electricity, with grid transmission losses reaching 10-15%",
      stat: "10%",
      statLabel: "without electricity"
    },
    {
      icon: BarChart3,
      title: "Renewable Integration Challenge",
      description: "Current energy grid struggles to efficiently integrate renewable energy, leading to underutilization",
      stat: "15.6%",
      statLabel: "renewable contribution"
    },
    {
      icon: Zap,
      title: "Weather Dependency",
      description: "Solar output can drop by up to 90% on cloudy days, making consistent energy generation challenging",
      stat: "90%",
      statLabel: "output variation"
    },
    {
      icon: Globe,
      title: "Growing Energy Demand",
      description: "ASEAN energy demand projected to grow by 60% by 2040, requiring innovative distribution solutions",
      stat: "60%",
      statLabel: "growth by 2040"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            The Energy Crisis in
            <span className="bg-gradient-quantum bg-clip-text text-transparent"> ASEAN</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Despite rapid economic growth, Southeast Asia faces critical energy challenges that require innovative quantum-powered solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {problems.map((problem, index) => (
            <Card key={index} className="bg-gradient-card border-0 shadow-elegant hover:shadow-quantum transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-quantum rounded-lg flex items-center justify-center mx-auto mb-4">
                  <problem.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{problem.stat}</div>
                <div className="text-sm text-muted-foreground mb-4">{problem.statLabel}</div>
                <h3 className="text-lg font-semibold text-foreground mb-3">{problem.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{problem.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-energy rounded-2xl p-8 md:p-12 text-center shadow-energy">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Our Solution: Quantum-Optimized Microgrid Placement
          </h3>
          <p className="text-lg text-white/90 max-w-4xl mx-auto leading-relaxed">
            We leverage quantum computing algorithms including QAOA and Max-Cut for community detection, 
            network topology optimization, and optimal microgrid placement to maximize renewable energy utilization 
            and minimize infrastructure costs across ASEAN.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemStatement;