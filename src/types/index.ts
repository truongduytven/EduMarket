export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  fullDescription: string;
  category: string;
  rating: number;
  reviews: number;
  instructor: string;
  duration: string;
  students: number;
  level: string;
  tags: string[];
  trialVideo: string;
}