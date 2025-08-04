import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface ThailandMapProps {
  onAreaSelect: (data: {
    bounds: mapboxgl.LngLatBounds;
    center: [number, number];
    area: number;
    populationEst: number;
  }) => void;
  mapboxToken?: string;
}

// Sample solar power plant data for Thailand
const solarPlants = [
  { id: 1, name: "Lopburi Solar Farm", lng: 100.6197, lat: 14.7995, capacity: 84 },
  { id: 2, name: "Chaiyaphum Solar", lng: 102.0310, lat: 15.8069, capacity: 45 },
  { id: 3, name: "Nakhon Ratchasima Solar", lng: 102.0977, lat: 14.9799, capacity: 132 },
  { id: 4, name: "Ayutthaya Solar Park", lng: 100.5756, lat: 14.3692, capacity: 67 },
  { id: 5, name: "Saraburi Solar", lng: 100.9108, lat: 14.5289, capacity: 89 },
  { id: 6, name: "Prachinburi Solar", lng: 101.3747, lat: 14.0583, capacity: 23 },
  { id: 7, name: "Chonburi Solar Farm", lng: 100.9847, lat: 13.3611, capacity: 156 },
  { id: 8, name: "Rayong Solar", lng: 101.2542, lat: 12.6802, capacity: 78 },
  { id: 9, name: "Kanchanaburi Solar", lng: 99.5328, lat: 14.0227, capacity: 34 },
  { id: 10, name: "Ratchaburi Solar", lng: 99.8139, lat: 13.5282, capacity: 91 },
  { id: 11, name: "Suphan Buri Solar", lng: 100.1167, lat: 14.4745, capacity: 52 },
  { id: 12, name: "Ang Thong Solar", lng: 100.4550, lat: 14.5896, capacity: 67 },
  { id: 13, name: "Sing Buri Solar", lng: 100.3967, lat: 14.8943, capacity: 29 },
  { id: 14, name: "Chai Nat Solar", lng: 100.1250, lat: 15.1851, capacity: 45 },
  { id: 15, name: "Uthai Thani Solar", lng: 100.0244, lat: 15.3791, capacity: 38 },
  { id: 16, name: "Nonthaburi Solar", lng: 100.5144, lat: 13.8622, capacity: 15 }
];

const ThailandMap: React.FC<ThailandMapProps> = ({ onAreaSelect, mapboxToken }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [token, setToken] = useState(mapboxToken || '');
  const [selectedArea, setSelectedArea] = useState<mapboxgl.LngLatBounds | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || !token) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [100.5018, 13.7563], // Bangkok coordinates
      zoom: 6,
      pitch: 0,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    map.current.on('load', () => {
      // Add solar power plants
      solarPlants.forEach((plant) => {
        const marker = new mapboxgl.Marker({
          color: '#FFD700',
          scale: 0.8
        })
          .setLngLat([plant.lng, plant.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(`
                <div class="p-2 bg-black text-gold">
                  <h3 class="font-bold">${plant.name}</h3>
                  <p>Capacity: ${plant.capacity} MW</p>
                </div>
              `)
          )
          .addTo(map.current!);
      });

      // Add area selection functionality
      let startPoint: [number, number] | null = null;
      let selectionBox: mapboxgl.Marker | null = null;

      map.current!.on('mousedown', (e) => {
        if (!isDrawing) return;
        startPoint = [e.lngLat.lng, e.lngLat.lat];
        map.current!.getCanvas().style.cursor = 'crosshair';
      });

      map.current!.on('mouseup', (e) => {
        if (!isDrawing || !startPoint) return;
        
        const endPoint: [number, number] = [e.lngLat.lng, e.lngLat.lat];
        const bounds = new mapboxgl.LngLatBounds(startPoint, endPoint);
        const center: [number, number] = [bounds.getCenter().lng, bounds.getCenter().lat];
        
        // Calculate approximate area in km²
        const area = calculateArea(bounds);
        const populationEst = Math.round(area * 140); // 140 people per km² for Thailand
        
        setSelectedArea(bounds);
        onAreaSelect({ bounds, center, area, populationEst });
        
        // Visual feedback
        if (selectionBox) selectionBox.remove();
        
        const el = document.createElement('div');
        el.style.width = '100%';
        el.style.height = '100%';
        el.style.border = '2px solid #FFD700';
        el.style.backgroundColor = 'rgba(255, 215, 0, 0.1)';
        el.style.borderRadius = '4px';
        
        map.current!.getCanvas().style.cursor = '';
        setIsDrawing(false);
      });
    });

    return () => {
      map.current?.remove();
    };
  }, [token, onAreaSelect, isDrawing]);

  const calculateArea = (bounds: mapboxgl.LngLatBounds): number => {
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();
    
    // Approximate calculation in km²
    const latDiff = ne.lat - sw.lat;
    const lngDiff = ne.lng - sw.lng;
    
    // Convert degrees to km (rough approximation)
    const kmPerDegreeLat = 111;
    const kmPerDegreeLng = 111 * Math.cos((sw.lat + ne.lat) / 2 * Math.PI / 180);
    
    return Math.abs(latDiff * kmPerDegreeLat * lngDiff * kmPerDegreeLng);
  };

  if (!token) {
    return (
      <div className="space-y-4">
        <div className="text-center p-8 border border-gold/30 rounded-lg bg-black/50">
          <h3 className="text-gold text-lg font-bold mb-4">Mapbox Token Required</h3>
          <p className="text-white/70 mb-4">
            Please enter your Mapbox public token to display the interactive map.
          </p>
          <p className="text-white/50 text-sm mb-4">
            Get your token at: <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">mapbox.com</a>
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <Input
              type="text"
              placeholder="Enter Mapbox public token..."
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="bg-black/50 border-gold/30 text-white"
            />
            <Button 
              onClick={() => setToken(token)}
              disabled={!token}
              className="bg-gold text-black hover:bg-gold/90"
            >
              Load Map
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          onClick={() => setIsDrawing(!isDrawing)}
          className={`${isDrawing ? 'bg-gold text-black' : 'bg-black/50 text-gold border border-gold/30'}`}
        >
          {isDrawing ? 'Cancel Selection' : 'Select Area'}
        </Button>
        {selectedArea && (
          <Button
            onClick={() => {
              setSelectedArea(null);
              onAreaSelect({ 
                bounds: new mapboxgl.LngLatBounds([100, 13], [101, 14]), 
                center: [100.5, 13.5], 
                area: 12.0, 
                populationEst: 1680 
              });
            }}
            variant="outline"
            className="bg-black/50 text-gold border-gold/30 hover:bg-gold/10"
          >
            Clear Selection
          </Button>
        )}
      </div>
      
      <div 
        ref={mapContainer} 
        className="h-96 rounded-lg border border-gold/30 bg-black"
        style={{ minHeight: '400px' }}
      />
      
      {isDrawing && (
        <p className="text-gold/70 text-sm">
          Click and drag on the map to select an area for optimization
        </p>
      )}
    </div>
  );
};

export default ThailandMap;