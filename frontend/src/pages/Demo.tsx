import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, MapPin, BarChart3, Zap, Settings, Plus, Minus } from "lucide-react";
import { useState } from "react";
import ThailandMap from "@/components/ThailandMap";
import mapboxgl from 'mapbox-gl';

const Demo = () => {
  const [selectedCountry, setSelectedCountry] = useState("Thailand");
  const [selectedArea, setSelectedArea] = useState<{
    bounds: mapboxgl.LngLatBounds;
    center: [number, number];
    area: number;
    populationEst: number;
  } | null>(null);
  const [gridArea, setGridArea] = useState(12.0);
  const [populationEst, setPopulationEst] = useState(1680);
  const [energyOutput, setEnergyOutput] = useState(0.0);
  const [numMicrogrids, setNumMicrogrids] = useState(0);
  const [renewableUtilization, setRenewableUtilization] = useState(0);
  const [efficiency, setEfficiency] = useState("Pending");
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleAreaSelect = (areaData: {
    bounds: mapboxgl.LngLatBounds;
    center: [number, number];
    area: number;
    populationEst: number;
  }) => {
    setSelectedArea(areaData);
    setGridArea(areaData.area);
    setPopulationEst(areaData.populationEst);
    // Reset optimization results when new area is selected
    setNumMicrogrids(0);
    setRenewableUtilization(0);
    setEnergyOutput(0);
    setEfficiency("Pending");
  };

  const runOptimization = async () => {
    if (!selectedArea) return;
    
    setIsOptimizing(true);
    setEfficiency("Running QAOA...");
    
    // Simulate QAOA optimization with realistic delay
    setTimeout(() => {
      const area = selectedArea.area;
      const optimalGrids = Math.max(1, Math.round(area / 8)); // 1 microgrid per 8 km²
      const utilization = Math.min(95, 60 + Math.random() * 35); // 60-95% utilization
      const output = parseFloat((area * 2.5 + Math.random() * 20).toFixed(1)); // MW based on area
      
      setNumMicrogrids(optimalGrids);
      setRenewableUtilization(Math.round(utilization));
      setEnergyOutput(output);
      setEfficiency(`${utilization.toFixed(1)}%`);
      setIsOptimizing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-6 py-8">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Home
          </Button>
          <div className="flex items-center space-x-3">
            <Zap className="w-8 h-8 text-primary-glow" />
            <div>
              <h1 className="text-xl font-bold text-white">Quantum Microgrid Optimization</h1>
              <p className="text-sm text-white/70">Community Detection & Network Topology using QAOA</p>
            </div>
          </div>
        </div>

        {/* Main Interface */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Panel - Interactive Map */}
          <div className="xl:col-span-2 space-y-6">
            {/* Interactive Thailand Map */}
            <Card className="bg-black/80 backdrop-blur-sm border-gold/30">
              <CardHeader>
                <CardTitle className="text-gold flex items-center">
                  <MapPin className="mr-2 w-5 h-5" />
                  Interactive Thailand Map - Quantum Microgrid Optimization
                </CardTitle>
                <p className="text-white/70 text-sm">Select country: {selectedCountry}</p>
                <p className="text-white/70 text-sm">Select an area on the map to run QAOA optimization for optimal microgrid placement</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 mb-4">
                  <Button 
                    onClick={runOptimization}
                    disabled={!selectedArea || isOptimizing}
                    className="bg-gold hover:bg-gold/90 text-black disabled:opacity-50"
                  >
                    <Zap className="mr-2 w-4 h-4" />
                    {isOptimizing ? 'Running QAOA...' : 'Run QAOA Optimization'}
                  </Button>
                  {selectedArea && (
                    <div className="text-gold text-sm self-center">
                      Selected Area: {selectedArea.area.toFixed(1)} km² | Population: {selectedArea.populationEst.toLocaleString()}
                    </div>
                  )}
                </div>

                <ThailandMap onAreaSelect={handleAreaSelect} />
              </CardContent>
            </Card>

            {/* Optimization Results */}
            <Card className="bg-black/60 backdrop-blur-sm border-gold/20">
              <CardHeader>
                <CardTitle className="text-gold text-lg">Quantum Optimization Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/40 p-3 rounded border border-gold/20">
                      <p className="text-white/70 text-sm">Optimal Microgrids</p>
                      <p className="text-gold font-bold text-xl">{numMicrogrids}</p>
                    </div>
                    <div className="bg-black/40 p-3 rounded border border-gold/20">
                      <p className="text-white/70 text-sm">Algorithm Status</p>
                      <p className="text-gold font-bold">{isOptimizing ? 'Running...' : efficiency}</p>
                    </div>
                  </div>
                  <div className="text-white/70 text-sm">
                    <p>Database: 16 solar power plants in central Thailand</p>
                    <p>Community Detection: {selectedArea ? 'Active' : 'Select area to begin'}</p>
                    <p>Network Topology: {numMicrogrids > 0 ? `${numMicrogrids} optimized clusters` : 'Pending optimization'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Analytics & Results */}
          <div className="space-y-6">
            {/* Live Analytics */}
            <Card className="bg-primary/20 backdrop-blur-sm border-primary/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BarChart3 className="mr-2 w-5 h-5" />
                  Live Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gold">{selectedArea ? 1 : 0}</div>
                    <div className="text-white/70 text-sm">Selected Areas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gold">{numMicrogrids}</div>
                    <div className="text-white/70 text-sm">Optimal Microgrids</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gold">{renewableUtilization}%</div>
                    <div className="text-white/70 text-sm">Renewable Utilization</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gold">{energyOutput}MW</div>
                    <div className="text-white/70 text-sm">Energy Output</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Region Details */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Region Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/80">Grid Area</span>
                  <span className="text-white font-bold">{gridArea} km²</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Efficiency</span>
                  <span className="text-accent-glow font-bold">Pending</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Population Est.</span>
                  <span className="text-white font-bold">{populationEst} people</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Grid Type</span>
                  <span className="text-white font-bold">Traditional</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Installation Cost</span>
                  <span className="text-white font-bold">$5,000</span>
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="bg-gradient-energy border-0 shadow-energy">
              <CardHeader>
                <CardTitle className="text-white">System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-white">Optimizer: Active</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
                  <span className="text-white">Map: Online</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-400 rounded-full mr-3"></div>
                  <span className="text-white">Analytics: Running</span>
                </div>
                
                {/* Quantum Advantage */}
                <div className="mt-6 pt-4 border-t border-white/20">
                  <h4 className="text-white font-bold text-lg mb-4">Quantum Advantage</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-white/80 text-sm">Optimization Efficiency</p>
                      <p className="text-white font-bold text-xl">+25%</p>
                    </div>
                    <div>
                      <p className="text-white/80 text-sm">Energy Profitability</p>
                      <p className="text-white font-bold">15% higher</p>
                    </div>
                    <div>
                      <p className="text-white/80 text-sm">vs Classical Runtime</p>
                      <p className="text-white font-bold">2.3x faster</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;