import { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, Grid, List, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import ServiceCard from './ServiceCard';
import { Service } from '@/data/mockData';

interface ServiceListProps {
  services: Service[];
  onServiceSelect: (service: Service) => void;
  searchQuery: string;
  locationFilter: string;
  onSearchQueryChange: (query: string) => void;
}

const ServiceList = ({ 
  services, 
  onServiceSelect, 
  searchQuery, 
  locationFilter,
  onSearchQueryChange 
}: ServiceListProps) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [ratingFilter, setRatingFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('rating');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const filteredAndSortedServices = useMemo(() => {
    let filtered = services.filter(service => {
      // Search query filter
      const matchesSearch = searchQuery === '' || 
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Location filter
      const matchesLocation = locationFilter === '' ||
        service.location.toLowerCase().includes(locationFilter.toLowerCase());

      // Category filter
      const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;

      // Price filter
      let matchesPrice = true;
      if (priceFilter !== 'all') {
        const price = service.category === 'Caterer' ? service.price : service.price;
        switch (priceFilter) {
          case 'low':
            matchesPrice = price < 1000;
            break;
          case 'medium':
            matchesPrice = price >= 1000 && price <= 2000;
            break;
          case 'high':
            matchesPrice = price > 2000;
            break;
        }
      }

      // Rating filter
      let matchesRating = true;
      if (ratingFilter !== 'all') {
        const minRating = parseFloat(ratingFilter);
        matchesRating = service.rating >= minRating;
      }

      return matchesSearch && matchesLocation && matchesCategory && matchesPrice && matchesRating;
    });

    // Sort services
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'reviews':
          return b.reviewCount - a.reviewCount;
        case 'experience':
          return b.experience - a.experience;
        default:
          return 0;
      }
    });

    return filtered;
  }, [services, searchQuery, locationFilter, categoryFilter, priceFilter, ratingFilter, sortBy]);

  const activeFilters = [
    categoryFilter !== 'all' && categoryFilter,
    priceFilter !== 'all' && `${priceFilter} price`,
    ratingFilter !== 'all' && `${ratingFilter}+ rating`,
    locationFilter && `in ${locationFilter}`
  ].filter(Boolean);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Available Services
          </h2>
          <p className="text-muted-foreground">
            Found {filteredAndSortedServices.length} service{filteredAndSortedServices.length !== 1 ? 's' : ''} matching your criteria
          </p>
        </div>

        {/* Search and Filter Bar */}
        <Card className="mb-8 bg-gradient-card border-border/50">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => onSearchQueryChange(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="reviews">Most Reviews</SelectItem>
                  <SelectItem value="experience">Most Experience</SelectItem>
                </SelectContent>
              </Select>

              {/* Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {activeFilters.length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {activeFilters.length}
                  </Badge>
                )}
              </Button>

              {/* View Mode Toggle */}
              <div className="flex border rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-border">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="DJ">DJ</SelectItem>
                    <SelectItem value="Photographer">Photographer</SelectItem>
                    <SelectItem value="Caterer">Caterer</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="low">Under $1,000</SelectItem>
                    <SelectItem value="medium">$1,000 - $2,000</SelectItem>
                    <SelectItem value="high">Over $2,000</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={ratingFilter} onValueChange={setRatingFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="4.5">4.5+ Stars</SelectItem>
                    <SelectItem value="4.0">4.0+ Stars</SelectItem>
                    <SelectItem value="3.5">3.5+ Stars</SelectItem>
                  </SelectContent>
                </Select>

                <Button 
                  variant="outline" 
                  onClick={() => {
                    setCategoryFilter('all');
                    setPriceFilter('all');
                    setRatingFilter('all');
                  }}
                  className="flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
                <span className="text-sm text-muted-foreground mr-2">Active filters:</span>
                {activeFilters.map((filter, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {filter}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Services Grid */}
        {filteredAndSortedServices.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredAndSortedServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onViewDetails={onServiceSelect}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No services found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search terms to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServiceList;