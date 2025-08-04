import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Network, Cpu, BarChart, Zap } from "lucide-react";

const SolutionSection = () => {
  const features = [
    {
      icon: Network,
      title: "Community Detection",
      description: "Find optimal microgrid communities that balance energy generation and consumption using quantum optimization"
    },
    {
      icon: Zap,
      title: "Power Flow Optimization", 
      description: "Ensure logical power flow between prosumer-consumer matching resembles physical grid flow"
    },
    {
      icon: BarChart,
      title: "Auction Matching",
      description: "Maximize traded values by matching price and energy quantity between asks and bids using QUBO formulation"
    },
    {
      icon: Cpu,
      title: "Quantum Algorithms",
      description: "Leverage QAOA and VQA quantum algorithms for superior optimization under dynamic pricing conditions"
    }
  ];

  const benefits = [
    "Maximize renewable energy utilization",
    "Minimize electricity costs for communities", 
    "Respect current grid infrastructure constraints",
    "Reduce transmission losses",
    "Democratize access to clean energy"
  ];

  return (
    <section id="solution" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Quantum
            <span className="bg-gradient-quantum bg-clip-text text-transparent"> Solution</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Revolutionary peer-to-peer energy trading platform powered by quantum optimization algorithms
          </p>
        </div>

        {/* Solution Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-foreground">
              Quantum-Optimized Energy Distribution
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our platform uses advanced quantum computing algorithms to solve complex optimization problems 
              in energy distribution. By formulating energy trading as QUBO (Quadratic Unconstrained Binary Optimization) 
              problems, we can leverage quantum algorithms like QAOA to find optimal solutions.
            </p>
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gradient-quantum rounded-full"></div>
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
            <Button variant="hero" size="lg" onClick={() => window.location.href = '/demo'}>
              Experience the Demo
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gradient-card border-0 shadow-elegant hover:shadow-quantum transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-quantum rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-3">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Key Innovation */}
        <div className="bg-gradient-hero rounded-2xl p-8 md:p-12 text-center shadow-quantum">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
            The Quantum Advantage
          </h3>
          <p className="text-lg text-white/90 max-w-4xl mx-auto leading-relaxed mb-8">
            Traditional classical algorithms struggle with the exponential complexity of optimizing energy distribution 
            across multiple prosumers and consumers. Our quantum algorithms can explore solution spaces exponentially 
            faster, enabling real-time optimization of complex energy trading scenarios.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-white mb-2">~90%</div>
              <div className="text-white/80">Optimization Speed Improvement</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">Real-time</div>
              <div className="text-white/80">Energy Trading Decisions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">Community</div>
              <div className="text-white/80">Based Energy Exchange</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;