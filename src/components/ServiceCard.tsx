import { Star, MapPin, Users, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Service } from '@/data/mockData';

interface ServiceCardProps {
  service: Service;
  onViewDetails: (service: Service) => void;
}

const ServiceCard = ({ service, onViewDetails }: ServiceCardProps) => {
  const formatPrice = (price: number, category: string) => {
    if (category === 'Caterer') {
      return `$${price}/person`;
    }
    return `$${price.toLocaleString()}`;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'DJ':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'Photographer':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'Caterer':
        return 'bg-gold/10 text-gold border-gold/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="group card-hover cursor-pointer bg-gradient-card border-border/50 overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={service.images[0]}
          alt={service.name}
          className="w-full h-48 object-cover transition-smooth group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop';
          }}
        />
        
        {/* Category Badge */}
        <Badge 
          className={`absolute top-3 left-3 ${getCategoryColor(service.category)} font-medium`}
        >
          {service.category}
        </Badge>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
          <Star className="w-4 h-4 fill-gold text-gold" />
          <span className="text-sm font-medium text-foreground">{service.rating}</span>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-smooth">
            {service.name}
          </h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              {formatPrice(service.price, service.category)}
            </div>
          </div>
        </div>

        <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-2">
          {service.description}
        </p>

        {/* Service Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            {service.location}
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            {service.reviewCount} reviews • {service.experience} years experience
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            Next available: {new Date(service.availability[0]).toLocaleDateString()}
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {service.features.slice(0, 2).map((feature, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {feature}
            </Badge>
          ))}
          {service.features.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{service.features.length - 2} more
            </Badge>
          )}
        </div>

        <Button 
          onClick={() => onViewDetails(service)}
          className="w-full bg-gradient-primary hover:shadow-glow transition-smooth font-medium"
        >
          View Details & Book
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;