import { Button } from "@/components/ui/button";
import { Zap, Menu, X } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-quantum rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">
              Q<span className="text-accent-glow">Renew</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('problem')}
              className="text-white/90 hover:text-white transition-colors"
            >
              Problem
            </button>
            <button 
              onClick={() => scrollToSection('team')}
              className="text-white/90 hover:text-white transition-colors"
            >
              Team
            </button>
            <button 
              onClick={() => scrollToSection('solution')}
              className="text-white/90 hover:text-white transition-colors"
            >
              Solution
            </button>
            <Button 
              variant="quantum" 
              size="sm"
              onClick={() => window.location.href = '/demo'}
            >
              Try Demo
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('problem')}
                className="text-white/90 hover:text-white transition-colors text-left"
              >
                Problem
              </button>
              <button 
                onClick={() => scrollToSection('team')}
                className="text-white/90 hover:text-white transition-colors text-left"
              >
                Team
              </button>
              <button 
                onClick={() => scrollToSection('solution')}
                className="text-white/90 hover:text-white transition-colors text-left"
              >
                Solution
              </button>
              <Button 
                variant="quantum" 
                size="sm"
                className="w-fit"
                onClick={() => window.location.href = '/demo'}
              >
                Try Demo
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;