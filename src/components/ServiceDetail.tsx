import { useState } from 'react';
import { X, Star, MapPin, Calendar, Users, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Service } from '@/data/mockData';
import { mockReviews } from '@/data/mockData';

interface ServiceDetailProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
  onBookNow: (service: Service) => void;
}

const ServiceDetail = ({ service, isOpen, onClose, onBookNow }: ServiceDetailProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!service) return null;

  const serviceReviews = mockReviews.filter(review => review.serviceId === service.id);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === service.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? service.images.length - 1 : prev - 1
    );
  };

  const formatPrice = (price: number, category: string) => {
    if (category === 'Caterer') {
      return `$${price}/person`;
    }
    return `$${price.toLocaleString()}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        {/* Image Gallery */}
        <div className="relative">
          <div className="relative h-80 overflow-hidden rounded-t-lg">
            <img
              src={service.images[currentImageIndex]}
              alt={`${service.name} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop';
              }}
            />
            
            {/* Image Navigation */}
            {service.images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
                
                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {service.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="p-6">
          {/* Header */}
          <DialogHeader className="mb-6">
            <div className="flex justify-between items-start">
              <div>
                <DialogTitle className="text-2xl font-bold mb-2">
                  {service.name}
                </DialogTitle>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    {service.category}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-gold text-gold" />
                    <span className="font-medium">{service.rating}</span>
                    <span>({service.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {service.location}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">
                  {formatPrice(service.price, service.category)}
                </div>
                <Button
                  onClick={() => onBookNow(service)}
                  className="mt-2 bg-gradient-primary hover:shadow-glow transition-smooth"
                >
                  Book Now
                </Button>
              </div>
            </div>
          </DialogHeader>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold mb-3">About This Service</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-xl font-semibold mb-3">What's Included</h3>
                <div className="grid grid-cols-2 gap-3">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Reviews ({serviceReviews.length})
                </h3>
                <div className="space-y-4">
                  {serviceReviews.length > 0 ? (
                    serviceReviews.map((review) => (
                      <div key={review.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={review.avatar} />
                            <AvatarFallback>
                              {review.userName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{review.userName}</h4>
                              <div className="flex items-center gap-1">
                                {Array.from({ length: review.rating }).map((_, i) => (
                                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                                ))}
                              </div>
                            </div>
                            <p className="text-muted-foreground text-sm mb-1">
                              {review.comment}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(review.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      No reviews yet. Be the first to leave a review!
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-gradient-card rounded-lg p-4 border border-border/50">
                <h4 className="font-semibold mb-3">Service Details</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-gold" />
                      <span className="text-sm">Experience</span>
                    </div>
                    <span className="text-sm font-medium">{service.experience} years</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-sm">Reviews</span>
                    </div>
                    <span className="text-sm font-medium">{service.reviewCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-gold" />
                      <span className="text-sm">Rating</span>
                    </div>
                    <span className="text-sm font-medium">{service.rating}/5</span>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="bg-gradient-card rounded-lg p-4 border border-border/50">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Next Available Dates
                </h4>
                <div className="space-y-2">
                  {service.availability.slice(0, 5).map((date, index) => (
                    <div key={index} className="text-sm text-muted-foreground">
                      {new Date(date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => onBookNow(service)}
                  className="w-full mt-4 bg-gradient-primary hover:shadow-glow transition-smooth"
                >
                  Check All Available Dates
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetail;