import React, { useState } from 'react';
import { MapPin, Car, Navigation, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ParkingSpot {
  id: string;
  coordinates: [number, number];
  availability: 'available' | 'limited' | 'full';
  price: string;
  type: 'street' | 'garage' | 'lot';
  timeLimit?: string;
  city: string;
}

const mockParkingSpots: ParkingSpot[] = [
  {
    id: '1',
    coordinates: [30, 40], // Relative positions for our mock map
    availability: 'available',
    price: '£2.50/hr',
    type: 'street',
    timeLimit: '2hrs max',
    city: 'London'
  },
  {
    id: '2',
    coordinates: [50, 30],
    availability: 'limited',
    price: '€3.20/hr',
    type: 'garage',
    city: 'Paris'
  },
  {
    id: '3',
    coordinates: [60, 35],
    availability: 'available',
    price: '€2.00/hr',
    type: 'lot',
    city: 'Berlin'
  },
  {
    id: '4',
    coordinates: [15, 50],
    availability: 'full',
    price: '$4.50/hr',
    type: 'street',
    city: 'New York'
  },
  {
    id: '5',
    coordinates: [10, 60],
    availability: 'available',
    price: '$3.25/hr',
    type: 'garage',
    city: 'Los Angeles'
  },
  {
    id: '6',
    coordinates: [45, 45],
    availability: 'limited',
    price: '€2.80/hr',
    type: 'street',
    timeLimit: '3hrs max',
    city: 'Paris'
  },
  {
    id: '7',
    coordinates: [35, 35],
    availability: 'available',
    price: '£3.00/hr',
    type: 'garage',
    city: 'London'
  }
];

const Map = () => {
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [zoom, setZoom] = useState(1);

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'text-success';
      case 'limited': return 'text-warning';
      case 'full': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'available': return 'Available';
      case 'limited': return 'Limited spots';
      case 'full': return 'Full';
      default: return 'Unknown';
    }
  };

  const getMarkerColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-success';
      case 'limited': return 'bg-warning';
      case 'full': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 rounded-lg overflow-hidden shadow-card">
      {/* Mock Map Background */}
      <div className="absolute inset-0">
        {/* Simulated map grid */}
        <div className="w-full h-full relative">
          {/* Grid lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          
          {/* Simulated streets */}
          <div className="absolute top-1/4 left-0 right-0 h-2 bg-slate-300 dark:bg-slate-600 opacity-60"></div>
          <div className="absolute top-2/3 left-0 right-0 h-2 bg-slate-300 dark:bg-slate-600 opacity-60"></div>
          <div className="absolute left-1/3 top-0 bottom-0 w-2 bg-slate-300 dark:bg-slate-600 opacity-60"></div>
          <div className="absolute left-2/3 top-0 bottom-0 w-2 bg-slate-300 dark:bg-slate-600 opacity-60"></div>
          
          {/* Simulated buildings */}
          <div className="absolute top-[10%] left-[20%] w-16 h-12 bg-slate-400 dark:bg-slate-700 opacity-40 rounded"></div>
          <div className="absolute top-[15%] left-[50%] w-20 h-16 bg-slate-400 dark:bg-slate-700 opacity-40 rounded"></div>
          <div className="absolute top-[40%] left-[15%] w-12 h-20 bg-slate-400 dark:bg-slate-700 opacity-40 rounded"></div>
          <div className="absolute top-[50%] left-[60%] w-24 h-14 bg-slate-400 dark:bg-slate-700 opacity-40 rounded"></div>
          <div className="absolute top-[70%] left-[30%] w-18 h-18 bg-slate-400 dark:bg-slate-700 opacity-40 rounded"></div>
        </div>
      </div>

      {/* Parking Spots */}
      {mockParkingSpots.map((spot) => (
        <button
          key={spot.id}
          onClick={() => setSelectedSpot(spot)}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 group transition-all duration-200 hover:scale-110 z-10`}
          style={{
            left: `${spot.coordinates[0]}%`,
            top: `${spot.coordinates[1]}%`,
            transform: `translate(-50%, -50%) scale(${zoom})`
          }}
        >
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full ${getMarkerColor(spot.availability)} shadow-lg flex items-center justify-center text-white font-bold group-hover:shadow-glow transition-shadow`}>
              <Car className="w-4 h-4" />
            </div>
            <div className="mt-1 bg-white dark:bg-slate-800 px-2 py-1 rounded text-xs font-semibold shadow-md border">
              {spot.price}
            </div>
          </div>
        </button>
      ))}

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button
          variant="secondary"
          size="icon"
          onClick={() => setZoom(Math.min(zoom + 0.2, 2))}
          className="shadow-card"
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={() => setZoom(Math.max(zoom - 0.2, 0.5))}
          className="shadow-card"
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button variant="secondary" size="icon" className="shadow-card">
          <Navigation className="w-4 h-4" />
        </Button>
      </div>

      {/* Demo Map Label */}
      <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-800/90 px-3 py-2 rounded-lg shadow-card">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Interactive Parking Map</span>
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Europe & USA Coverage
        </div>
      </div>

      {/* Parking spot info popup */}
      {selectedSpot && (
        <div className="absolute bottom-4 left-4 right-4 bg-card p-4 rounded-lg shadow-elegant border max-w-sm mx-auto z-20">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 mb-2">
              <Car className="w-5 h-5 text-primary" />
              <span className="font-semibold">{selectedSpot.city} Parking</span>
            </div>
            <button 
              onClick={() => setSelectedSpot(null)}
              className="text-muted-foreground hover:text-foreground"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status:</span>
              <span className={`text-sm font-medium ${getAvailabilityColor(selectedSpot.availability)}`}>
                {getAvailabilityText(selectedSpot.availability)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Price:</span>
              <span className="text-sm font-medium">{selectedSpot.price}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Type:</span>
              <span className="text-sm font-medium capitalize">{selectedSpot.type}</span>
            </div>
            
            {selectedSpot.timeLimit && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Time limit:</span>
                <span className="text-sm font-medium">{selectedSpot.timeLimit}</span>
              </div>
            )}
          </div>
          
          {selectedSpot.availability !== 'full' && (
            <Button className="w-full mt-3" variant="hero">
              Reserve Spot
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Map;