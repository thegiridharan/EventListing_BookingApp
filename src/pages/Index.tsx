import { useState } from 'react';
import Hero from '@/components/Hero';
import ServiceList from '@/components/ServiceList';
import ServiceDetail from '@/components/ServiceDetail';
import BookingForm from '@/components/BookingForm';
import { mockServices, Service } from '@/data/mockData';

const Index = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showServiceDetail, setShowServiceDetail] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setShowServiceDetail(true);
  };

  const handleBookNow = (service: Service) => {
    setSelectedService(service);
    setShowServiceDetail(false);
    setShowBookingForm(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleLocationFilter = (location: string) => {
    setLocationFilter(location);
  };

  const handleCloseModals = () => {
    setShowServiceDetail(false);
    setShowBookingForm(false);
    setSelectedService(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Hero 
        onSearch={handleSearch}
        onLocationFilter={handleLocationFilter}
      />

      {/* Service Listing */}
      <ServiceList
        services={mockServices}
        onServiceSelect={handleServiceSelect}
        searchQuery={searchQuery}
        locationFilter={locationFilter}
        onSearchQueryChange={setSearchQuery}
      />

      {/* Service Detail Modal */}
      <ServiceDetail
        service={selectedService}
        isOpen={showServiceDetail}
        onClose={handleCloseModals}
        onBookNow={handleBookNow}
      />

      {/* Booking Form Modal */}
      <BookingForm
        service={selectedService}
        isOpen={showBookingForm}
        onClose={handleCloseModals}
      />
    </div>
  );
};

export default Index;
