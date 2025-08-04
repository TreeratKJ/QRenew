import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-glow rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary-glow rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent-glow rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Zap className="w-8 h-8 text-white animate-glow" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Q<span className="text-accent-glow">Renew</span>
              </h1>
            </div>
          </div>
          
          {/* Main headline */}
          <h2 className="text-3xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Using Quantum Technology to
            <br />
            <span className="bg-gradient-to-r from-secondary-glow to-accent-glow bg-clip-text text-transparent">
              Empower Green Energy
            </span>
            <br />
            for Everyone
          </h2>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Accelerating ASEAN's transition to 100% green energy through quantum-optimized microgrid placement and community detection
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="hero" 
              size="lg" 
              className="px-8 py-4 text-lg"
              onClick={() => window.location.href = '/demo'}
            >
              Try Quantum Optimization Demo
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
            >
              Learn More
            </Button>
          </div>
          
          {/* Key stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">10%</div>
              <div className="text-white/80">ASEAN population without electricity access</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">15.6%</div>
              <div className="text-white/80">Current renewable energy contribution</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">60%</div>
              <div className="text-white/80">Projected energy growth by 2040</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;