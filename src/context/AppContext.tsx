import { createContext, useContext, useState, ReactNode } from 'react';
import { Service } from '@/data/mockData';

export interface BookingState {
  selectedService: Service | null;
  bookingStep: number;
  bookingData: {
    date: string;
    time: string;
    guestCount: string;
    specialRequirements: string;
    name: string;
    email: string;
    phone: string;
  };
}

interface AppContextType {
  // Services
  services: Service[];
  filteredServices: Service[];
  
  // Search & Filters
  searchQuery: string;
  locationFilter: string;
  categoryFilter: string;
  priceFilter: string;
  ratingFilter: string;
  
  // UI State
  isLoading: boolean;
  selectedService: Service | null;
  showServiceDetail: boolean;
  showBookingForm: boolean;
  
  // Booking State
  bookingState: BookingState;
  
  // Actions
  setSearchQuery: (query: string) => void;
  setLocationFilter: (location: string) => void;
  setCategoryFilter: (category: string) => void;
  setPriceFilter: (price: string) => void;
  setRatingFilter: (rating: string) => void;
  setSelectedService: (service: Service | null) => void;
  setShowServiceDetail: (show: boolean) => void;
  setShowBookingForm: (show: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  updateBookingData: (data: Partial<BookingState['bookingData']>) => void;
  resetBooking: () => void;
  filterServices: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
  initialServices: Service[];
}

export const AppProvider = ({ children, initialServices }: AppProviderProps) => {
  // Services state
  const [services] = useState<Service[]>(initialServices);
  const [filteredServices, setFilteredServices] = useState<Service[]>(initialServices);
  
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showServiceDetail, setShowServiceDetail] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  
  // Booking state
  const [bookingState, setBookingState] = useState<BookingState>({
    selectedService: null,
    bookingStep: 1,
    bookingData: {
      date: '',
      time: '',
      guestCount: '',
      specialRequirements: '',
      name: '',
      email: '',
      phone: ''
    }
  });

  // Filter services based on current filters
  const filterServices = () => {
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

    setFilteredServices(filtered);
  };

  // Update booking data
  const updateBookingData = (data: Partial<BookingState['bookingData']>) => {
    setBookingState(prev => ({
      ...prev,
      bookingData: {
        ...prev.bookingData,
        ...data
      }
    }));
  };

  // Reset booking state
  const resetBooking = () => {
    setBookingState({
      selectedService: null,
      bookingStep: 1,
      bookingData: {
        date: '',
        time: '',
        guestCount: '',
        specialRequirements: '',
        name: '',
        email: '',
        phone: ''
      }
    });
  };

  const value: AppContextType = {
    // Services
    services,
    filteredServices,
    
    // Search & Filters
    searchQuery,
    locationFilter,
    categoryFilter,
    priceFilter,
    ratingFilter,
    
    // UI State
    isLoading,
    selectedService,
    showServiceDetail,
    showBookingForm,
    
    // Booking State
    bookingState,
    
    // Actions
    setSearchQuery,
    setLocationFilter,
    setCategoryFilter,
    setPriceFilter,
    setRatingFilter,
    setSelectedService,
    setShowServiceDetail,
    setShowBookingForm,
    setIsLoading,
    updateBookingData,
    resetBooking,
    filterServices
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};