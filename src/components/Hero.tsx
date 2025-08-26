import React from 'react';
import { Car, MapPin, Clock, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBar from './SearchBar';
import heroImage from '@/assets/hero-parking.jpg';

const Hero = () => {
  const handleSearch = (location: string) => {
    console.log('Searching for parking in:', location);
    // In a real app, this would trigger map navigation and search
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-20 text-center">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Par<span className="text-transparent bg-gradient-hero bg-clip-text">kar</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Find and pay for parking anywhere in Europe and USA
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-12">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
            <MapPin className="w-8 h-8 mx-auto mb-3 text-success" />
            <h3 className="font-semibold mb-2">Real-time Availability</h3>
            <p className="text-sm text-white/80">Live updates on parking spots</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
            <Clock className="w-8 h-8 mx-auto mb-3 text-warning" />
            <h3 className="font-semibold mb-2">Reserve in Advance</h3>
            <p className="text-sm text-white/80">Book your spot ahead of time</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
            <CreditCard className="w-8 h-8 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold mb-2">Seamless Payment</h3>
            <p className="text-sm text-white/80">Pay directly through the app</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
            <Car className="w-8 h-8 mx-auto mb-3 text-white" />
            <h3 className="font-semibold mb-2">All Vehicle Types</h3>
            <p className="text-sm text-white/80">Cars, motorcycles, and more</p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12">
          <Button variant="hero" size="lg" className="text-lg px-8 py-4">
            Start Finding Parking
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;