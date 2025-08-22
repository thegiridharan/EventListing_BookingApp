export interface Service {
  id: string;
  name: string;
  category: 'DJ' | 'Photographer' | 'Caterer';
  price: number;
  rating: number;
  reviewCount: number;
  location: string;
  description: string;
  images: string[];
  availability: string[];
  features: string[];
  experience: number;
}

export interface Review {
  id: string;
  serviceId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

export const mockServices: Service[] = [
  {
    id: '1',
    name: 'Elite Sound Productions',
    category: 'DJ',
    price: 1200,
    rating: 4.9,
    reviewCount: 127,
    location: 'Los Angeles, CA',
    description: 'Premium DJ services for weddings and corporate events with state-of-the-art sound systems and lighting.',
    images: [
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571266028243-d220c9c5d99c?w=800&h=600&fit=crop'
    ],
    availability: ['2024-03-15', '2024-03-20', '2024-03-25', '2024-04-01', '2024-04-10'],
    features: ['Professional Sound System', 'LED Lighting', 'Microphone Setup', 'Music Library Access'],
    experience: 8
  },
  {
    id: '2',
    name: 'Lens & Light Photography',
    category: 'Photographer',
    price: 2500,
    rating: 4.8,
    reviewCount: 89,
    location: 'San Francisco, CA',
    description: 'Award-winning wedding and event photographer capturing your most precious moments with artistic flair.',
    images: [
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542038784456-1ea8e0c7412e?w=800&h=600&fit=crop'
    ],
    availability: ['2024-03-18', '2024-03-22', '2024-04-05', '2024-04-12', '2024-04-20'],
    features: ['Full Day Coverage', 'Digital Gallery', 'Print Rights', 'Engagement Session'],
    experience: 12
  },
  {
    id: '3',
    name: 'Gourmet Occasions Catering',
    category: 'Caterer',
    price: 85,
    rating: 4.7,
    reviewCount: 156,
    location: 'New York, NY',
    description: 'Exquisite catering services with farm-to-table ingredients and customizable menus for any occasion.',
    images: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop'
    ],
    availability: ['2024-03-16', '2024-03-21', '2024-04-02', '2024-04-08', '2024-04-15'],
    features: ['Custom Menus', 'Dietary Accommodations', 'Service Staff', 'Presentation Setup'],
    experience: 15
  },
  {
    id: '4',
    name: 'Rhythm & Beats Entertainment',
    category: 'DJ',
    price: 800,
    rating: 4.6,
    reviewCount: 93,
    location: 'Miami, FL',
    description: 'High-energy DJ services specializing in Latin, Pop, and Hip-Hop music for unforgettable celebrations.',
    images: [
      'https://images.unsplash.com/photo-1571266028243-d220c9c5d99c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop'
    ],
    availability: ['2024-03-19', '2024-03-26', '2024-04-03', '2024-04-11'],
    features: ['Dance Floor Lighting', 'Wireless Mics', 'Song Requests', '4-Hour Service'],
    experience: 6
  },
  {
    id: '5',
    name: 'Candid Moments Studio',
    category: 'Photographer',
    price: 1800,
    rating: 4.9,
    reviewCount: 72,
    location: 'Chicago, IL',
    description: 'Specializing in candid, natural photography that tells your unique story with authentic emotion.',
    images: [
      'https://images.unsplash.com/photo-1542038784456-1ea8e0c7412e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=600&fit=crop'
    ],
    availability: ['2024-03-17', '2024-03-24', '2024-04-07', '2024-04-14'],
    features: ['Natural Light Photography', 'Edited Gallery', 'USB with Images', 'Online Proofing'],
    experience: 9
  },
  {
    id: '6',
    name: 'Artisan Feast Catering',
    category: 'Caterer',
    price: 120,
    rating: 4.8,
    reviewCount: 104,
    location: 'Portland, OR',
    description: 'Artisan catering with locally-sourced ingredients and creative presentation for memorable dining experiences.',
    images: [
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop'
    ],
    availability: ['2024-03-20', '2024-03-27', '2024-04-04', '2024-04-13'],
    features: ['Organic Ingredients', 'Plated Service', 'Bartender Service', 'Cleanup Included'],
    experience: 11
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    serviceId: '1',
    userName: 'Sarah Johnson',
    rating: 5,
    comment: 'Absolutely phenomenal! The DJ kept everyone dancing all night and the sound quality was perfect.',
    date: '2024-02-15',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '2',
    serviceId: '1',
    userName: 'Mike Chen',
    rating: 5,
    comment: 'Professional, punctual, and amazing music selection. Highly recommend!',
    date: '2024-02-08',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '3',
    serviceId: '2',
    userName: 'Emily Rodriguez',
    rating: 5,
    comment: 'Beautiful photography that captured every special moment. The quality exceeded our expectations!',
    date: '2024-02-10',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  }
];