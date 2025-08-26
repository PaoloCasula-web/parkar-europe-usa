import React from 'react';
import Map from './Map';
import { Button } from '@/components/ui/button';
import { Navigation, Settings, List } from 'lucide-react';

const MapSection = () => {
  return (
    <section className="w-full py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Parking Spots
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Interactive map showing real-time parking availability across major cities in Europe and USA
          </p>
        </div>

        <div className="relative">
          {/* Map Container */}
          <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-elegant">
            <Map />
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <Button variant="secondary" size="icon" className="shadow-card">
              <Navigation className="w-4 h-4" />
            </Button>
            <Button variant="secondary" size="icon" className="shadow-card">
              <List className="w-4 h-4" />
            </Button>
            <Button variant="secondary" size="icon" className="shadow-card">
              <Settings className="w-4 h-4" />
            </Button>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-card p-4 rounded-lg shadow-elegant border">
            <h4 className="font-semibold mb-3 text-sm">Availability Legend</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success"></div>
                <span className="text-xs">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-warning"></div>
                <span className="text-xs">Limited</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive"></div>
                <span className="text-xs">Full</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="text-center p-6 bg-card rounded-lg shadow-card">
            <div className="text-3xl font-bold text-primary mb-2">50,000+</div>
            <div className="text-muted-foreground">Parking Spots</div>
          </div>
          <div className="text-center p-6 bg-card rounded-lg shadow-card">
            <div className="text-3xl font-bold text-success mb-2">100+</div>
            <div className="text-muted-foreground">Cities Covered</div>
          </div>
          <div className="text-center p-6 bg-card rounded-lg shadow-card">
            <div className="text-3xl font-bold text-warning mb-2">1M+</div>
            <div className="text-muted-foreground">Happy Drivers</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;