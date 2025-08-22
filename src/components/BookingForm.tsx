import { useState } from 'react';
import { Calendar, Users, User, Mail, Phone, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Service } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

interface BookingFormProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
}

interface BookingData {
  date: string;
  time: string;
  guestCount: string;
  specialRequirements: string;
  name: string;
  email: string;
  phone: string;
}

const BookingForm = ({ service, isOpen, onClose }: BookingFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    date: '',
    time: '',
    guestCount: '',
    specialRequirements: '',
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<BookingData>>({});

  if (!service) return null;

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
    '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<BookingData> = {};

    switch (step) {
      case 1:
        if (!bookingData.date) newErrors.date = 'Please select a date';
        if (!bookingData.time) newErrors.time = 'Please select a time';
        break;
      case 2:
        if (!bookingData.guestCount) newErrors.guestCount = 'Please enter guest count';
        break;
      case 3:
        if (!bookingData.name) newErrors.name = 'Name is required';
        if (!bookingData.email) newErrors.email = 'Email is required';
        if (!bookingData.phone) newErrors.phone = 'Phone is required';
        if (bookingData.email && !/\S+@\S+\.\S+/.test(bookingData.email)) {
          newErrors.email = 'Please enter a valid email';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setCurrentStep(4); // Success step
    
    toast({
      title: "Booking Submitted!",
      description: "We'll contact you within 24 hours to confirm your booking.",
    });
  };

  const calculateTotal = () => {
    const guests = parseInt(bookingData.guestCount) || 0;
    if (service.category === 'Caterer') {
      return service.price * guests;
    }
    return service.price;
  };

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Select Date & Time</h3>
              <p className="text-muted-foreground">Choose your preferred date and time slot</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="date">Select Date</Label>
                <Select value={bookingData.date} onValueChange={(value) => setBookingData(prev => ({ ...prev, date: value }))}>
                  <SelectTrigger className={errors.date ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Choose a date" />
                  </SelectTrigger>
                  <SelectContent>
                    {service.availability.map((date) => (
                      <SelectItem key={date} value={date}>
                        {new Date(date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.date && <p className="text-destructive text-sm mt-1">{errors.date}</p>}
              </div>

              <div>
                <Label htmlFor="time">Select Time</Label>
                <Select value={bookingData.time} onValueChange={(value) => setBookingData(prev => ({ ...prev, time: value }))}>
                  <SelectTrigger className={errors.time ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Choose a time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.time && <p className="text-destructive text-sm mt-1">{errors.time}</p>}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Event Details</h3>
              <p className="text-muted-foreground">Tell us about your event requirements</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="guestCount">Number of Guests</Label>
                <Input
                  id="guestCount"
                  type="number"
                  placeholder="Enter number of guests"
                  value={bookingData.guestCount}
                  onChange={(e) => setBookingData(prev => ({ ...prev, guestCount: e.target.value }))}
                  className={errors.guestCount ? 'border-destructive' : ''}
                />
                {errors.guestCount && <p className="text-destructive text-sm mt-1">{errors.guestCount}</p>}
              </div>

              <div>
                <Label htmlFor="specialRequirements">Special Requirements (Optional)</Label>
                <Textarea
                  id="specialRequirements"
                  placeholder="Any special requests, dietary restrictions, or additional information..."
                  value={bookingData.specialRequirements}
                  onChange={(e) => setBookingData(prev => ({ ...prev, specialRequirements: e.target.value }))}
                  rows={4}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <User className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
              <p className="text-muted-foreground">We'll use this information to confirm your booking</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={bookingData.name}
                  onChange={(e) => setBookingData(prev => ({ ...prev, name: e.target.value }))}
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={bookingData.email}
                  onChange={(e) => setBookingData(prev => ({ ...prev, email: e.target.value }))}
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={bookingData.phone}
                  onChange={(e) => setBookingData(prev => ({ ...prev, phone: e.target.value }))}
                  className={errors.phone ? 'border-destructive' : ''}
                />
                {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* Booking Summary */}
              <Card className="bg-gradient-card border-border/50">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3">Booking Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Service:</span>
                      <span>{service.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span>{bookingData.date ? new Date(bookingData.date).toLocaleDateString() : '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <span>{bookingData.time || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Guests:</span>
                      <span>{bookingData.guestCount || '-'}</span>
                    </div>
                    <div className="border-t border-border pt-2 mt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>{formatPrice(calculateTotal())}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-semibold text-green-600">Booking Submitted!</h3>
            <p className="text-muted-foreground">
              Thank you for your booking request. We'll contact you within 24 hours to confirm the details and arrange payment.
            </p>
            <div className="bg-gradient-card border border-border/50 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Booking Reference</h4>
              <Badge className="bg-primary/10 text-primary text-lg font-mono">
                #{Date.now().toString().slice(-6)}
              </Badge>
            </div>
            <Button
              onClick={onClose}
              className="w-full bg-gradient-primary hover:shadow-glow transition-smooth"
            >
              Close
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Book {service.name}
          </DialogTitle>
        </DialogHeader>

        {/* Progress Steps */}
        {currentStep <= 3 && (
          <div className="flex items-center justify-center mb-6">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    step < currentStep ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Step Content */}
        <div className="min-h-[400px]">
          {renderStep()}
        </div>

        {/* Navigation Buttons */}
        {currentStep <= 3 && (
          <div className="flex justify-between pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={currentStep === 1 ? onClose : handlePrevious}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              {currentStep === 1 ? 'Cancel' : 'Previous'}
            </Button>
            
            <Button
              onClick={currentStep === 3 ? handleSubmit : handleNext}
              disabled={isSubmitting}
              className="bg-gradient-primary hover:shadow-glow transition-smooth flex items-center gap-2"
            >
              {isSubmitting ? (
                'Submitting...'
              ) : currentStep === 3 ? (
                'Submit Booking'
              ) : (
                <>
                  Next
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingForm;