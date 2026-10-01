export type CategoryType = 'Mains' | 'Sides & Snacks' | 'Drinks' | 'Desserts';

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryType;
  price: number;
  calories: number;
  prepTimeMinutes: number;
  description: string;
  detailedDescription: string;
  isSpecial?: boolean;
  specialPrice?: number;
  rating: number;
  dietary: ('Vegetarian' | 'Vegan' | 'Gluten-Free' | 'Nut-Free' | 'Halal')[];
  allergens: string[];
  ingredients: { name: string; amount: string; calories: number }[];
  imageEmoji: string;
  imageUrl: string;
  imageSource: any;
}

export interface SectionData {
  title: CategoryType;
  data: MenuItem[];
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
}
