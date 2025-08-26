import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin, Car } from 'lucide-react';

interface ParkingSpot {
  id: string;
  coordinates: [number, number];
  availability: 'available' | 'limited' | 'full';
  price: string;
  type: 'street' | 'garage' | 'lot';
  timeLimit?: string;
}

const mockParkingSpots: ParkingSpot[] = [
  {
    id: '1',
    coordinates: [-0.1276, 51.5074], // London
    availability: 'available',
    price: '£2.50/hr',
    type: 'street',
    timeLimit: '2hrs max'
  },
  {
    id: '2',
    coordinates: [2.3522, 48.8566], // Paris
    availability: 'limited',
    price: '€3.20/hr',
    type: 'garage',
  },
  {
    id: '3',
    coordinates: [13.4050, 52.5200], // Berlin
    availability: 'available',
    price: '€2.00/hr',
    type: 'lot',
  },
  {
    id: '4',
    coordinates: [-74.0060, 40.7128], // New York
    availability: 'full',
    price: '$4.50/hr',
    type: 'street',
  },
  {
    id: '5',
    coordinates: [-118.2437, 34.0522], // Los Angeles
    availability: 'available',
    price: '$3.25/hr',
    type: 'garage',
  }
];

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // For demo purposes, using a placeholder token
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGVtb3VzZXIiLCJhIjoiY2wwNHJweGF6MDAwZDNkbjk5ZDVmdGt2NSJ9.demo';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [2.3522, 48.8566], // Start at Paris
      zoom: 4,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add parking spots as markers
    mockParkingSpots.forEach((spot) => {
      const el = document.createElement('div');
      el.className = `parking-marker parking-marker--${spot.availability}`;
      el.innerHTML = `
        <div class="parking-marker__icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L13.09 8.26L19 9L13.09 9.74L12 16L10.91 9.74L5 9L10.91 8.26L12 2Z" fill="currentColor"/>
          </svg>
        </div>
        <div class="parking-marker__price">${spot.price}</div>
      `;
      
      el.addEventListener('click', () => {
        setSelectedSpot(spot);
      });

      new mapboxgl.Marker(el)
        .setLngLat(spot.coordinates)
        .addTo(map.current!);
    });

    return () => {
      map.current?.remove();
    };
  }, []);

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

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg overflow-hidden shadow-card" />
      
      {/* Parking spot info popup */}
      {selectedSpot && (
        <div className="absolute bottom-4 left-4 right-4 bg-card p-4 rounded-lg shadow-elegant border max-w-sm mx-auto">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 mb-2">
              <Car className="w-5 h-5 text-primary" />
              <span className="font-semibold">Parking Spot</span>
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
            <button className="w-full mt-3 bg-primary text-primary-foreground py-2 rounded-md text-sm font-medium hover:bg-primary-hover transition-colors">
              Reserve Spot
            </button>
          )}
        </div>
      )}

      {/* Custom styles for markers */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .parking-marker {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        
        .parking-marker:hover {
          transform: scale(1.1);
        }
        
        .parking-marker__icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        
        .parking-marker--available .parking-marker__icon {
          background: hsl(142 76% 36%);
        }
        
        .parking-marker--limited .parking-marker__icon {
          background: hsl(38 92% 50%);
        }
        
        .parking-marker--full .parking-marker__icon {
          background: hsl(0 84% 60%);
        }
        
        .parking-marker__price {
          background: white;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 600;
          margin-top: 2px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.1);
          border: 1px solid hsl(214 32% 91%);
        }
      `
      }} />
    </div>
  );
};

export default Map;