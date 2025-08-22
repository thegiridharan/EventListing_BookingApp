import { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeroProps {
  onSearch: (query: string) => void;
  onLocationFilter: (location: string) => void;
}

const Hero = ({ onSearch, onLocationFilter }: HeroProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
    if (location) {
      onLocationFilter(location);
    }
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Hero Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920&h=1080&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Your Perfect Event
          <span className="block bg-gradient-gold bg-clip-text text-transparent">
            Starts Here
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
          Discover and book premium event services from top-rated professionals. 
          Make your special day unforgettable.
        </p>

        {/* Search Bar */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-elegant">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <Input
                placeholder="Search DJs, Photographers, Caterers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 bg-white/20 border-white/30 text-white placeholder:text-white/60 h-14 rounded-xl"
              />
            </div>

            {/* Location Input */}
            <div className="flex-1 relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <Input
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-12 bg-white/20 border-white/30 text-white placeholder:text-white/60 h-14 rounded-xl"
              />
            </div>

            {/* Search Button */}
            <Button
              onClick={handleSearch}
              className="bg-gradient-gold hover:shadow-glow h-14 px-8 rounded-xl font-semibold text-gold-foreground transition-smooth"
            >
              <Search className="w-5 h-5 mr-2" />
              Search
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-8 text-white/80">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-gold" />
              <span className="text-sm">1000+ Verified Professionals</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gold" />
              <span className="text-sm">5000+ Events Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gold rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-gold-foreground">★</span>
              </div>
              <span className="text-sm">4.8 Average Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;