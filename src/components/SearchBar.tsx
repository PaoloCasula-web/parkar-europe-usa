import React, { useState } from 'react';
import { Search, MapPin, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (location: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            type="text"
            placeholder="Enter location (e.g., London, Paris, New York...)"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent shadow-card"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="px-4"
          >
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
          </Button>
          
          <Button
            type="submit"
            variant="hero"
            size="lg"
            className="px-6"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Find Parking</span>
          </Button>
        </div>
      </form>
      
      {/* Quick location buttons */}
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        {['London', 'Paris', 'Berlin', 'New York', 'Los Angeles'].map((city) => (
          <button
            key={city}
            onClick={() => {
              setSearchValue(city);
              onSearch(city);
            }}
            className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;