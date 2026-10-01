import { MenuItem, CategoryType } from '../types/menu';

export const CAFETERIA_ITEMS: MenuItem[] = [
  {
    id: 'sen-101',
    name: 'Thieboudienne (Ceebu Jën)',
    category: 'Mains',
    price: 2500,
    calories: 620,
    prepTimeMinutes: 15,
    description: 'Senegal national dish: White fish stuffed with parsley-garlic rof, simmered with cassava, carrots, & jasmine rice.',
    detailedDescription: 'The crown jewel of Senegalese gastronomy. Fresh white fish marinated with traditional rof (parsley, garlic, chili, scallion blend), stewed in a rich tomato tamarind broth with cassava, white cabbage, carrots, and smoked fish, cooked into fragrant broken jasmine rice.',
    isSpecial: true,
    specialPrice: 2000,
    rating: 4.9,
    dietary: ['Halal', 'Nut-Free', 'Gluten-Free'],
    allergens: ['Fish'],
    ingredients: [
      { name: 'Fresh Sea Bass / Red Snapper', amount: '180g', calories: 210 },
      { name: 'Broken Jasmine Rice', amount: '1.5 cups', calories: 260 },
      { name: 'Cassava, Carrots & Cabbage', amount: '120g', calories: 90 },
      { name: 'Traditional Rof & Tamarind Sauce', amount: '3 tbsp', calories: 60 }
    ],
    imageEmoji: '🍲',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    imageSource: require('../../assets/images/menu/thieboudieunne.jpeg')
  },
  {
    id: 'sen-102',
    name: 'Yassa Poulet (Chicken Yassa)',
    category: 'Mains',
    price: 2200,
    calories: 580,
    prepTimeMinutes: 12,
    description: 'Grilled chicken marinated in Dijon mustard, caramelized onions, lime juice, and Scotch bonnet peppers.',
    detailedDescription: 'Classic Casamance-style dish featuring flame-grilled chicken quarter marinated overnight in lime juice, garlic, Dijon mustard, and slow-caramelized yellow onions with a hint of Scotch bonnet heat. Served over fluffy white rice.',
    isSpecial: true,
    specialPrice: 1800,
    rating: 4.8,
    dietary: ['Halal', 'Nut-Free', 'Gluten-Free'],
    allergens: ['Mustard'],
    ingredients: [
      { name: 'Marinated Chicken Quarter', amount: '200g', calories: 310 },
      { name: 'Caramelized Mustard Onions', amount: '150g', calories: 120 },
      { name: 'Steamed White Rice', amount: '1 cup', calories: 150 }
    ],
    imageEmoji: '🍗',
    imageUrl: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80',
    imageSource: require('../../assets/images/menu/yassapoulet.jpeg')
  },
  {
    id: 'sen-103',
    name: 'Maffe Beef (Maafe)',
    category: 'Mains',
    price: 2000,
    calories: 670,
    prepTimeMinutes: 10,
    description: 'Rich and hearty peanut butter stew cooked with tender braised beef cubes, sweet potatoes, and carrots.',
    detailedDescription: 'A rich, savory West African stew crafted from roasted ground peanuts, tomato paste, garlic, and tender slow-braised beef chunks. Accompanied by sweet potatoes and carrots over jasmine rice.',
    isSpecial: false,
    rating: 4.7,
    dietary: ['Halal', 'Gluten-Free'],
    allergens: ['Peanuts'],
    ingredients: [
      { name: 'Braised Beef Chuck Cubes', amount: '160g', calories: 290 },
      { name: 'Roasted Peanut Butter Sauce', amount: '4 tbsp', calories: 250 },
      { name: 'Sweet Potato & Jasmine Rice', amount: '150g', calories: 130 }
    ],
    imageEmoji: '🥘',
    imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
    imageSource: require('../../assets/images/menu/maffe.jpeg')
  },
  {
    id: 'sen-104',
    name: 'Pastels au Poisson',
    category: 'Sides & Snacks',
    price: 1000,
    calories: 320,
    prepTimeMinutes: 6,
    description: 'Crispy fried dough pockets filled with spiced minced fish, served with spicy tomato dipping sauce.',
    detailedDescription: 'Four hand-folded golden fried pastries packed with flaked spiced tuna, onions, garlic, and herbs. Paired with a hot homemade Senegalese tomato-onion dipping sauce.',
    isSpecial: false,
    rating: 4.8,
    dietary: ['Halal', 'Nut-Free'],
    allergens: ['Gluten', 'Fish'],
    ingredients: [
      { name: 'Crispy Fried Pastry (x4)', amount: '110g', calories: 200 },
      { name: 'Spiced Tuna Filling', amount: '60g', calories: 80 },
      { name: 'Senegalese Tomato Dipping Sauce', amount: '2 tbsp', calories: 40 }
    ],
    imageEmoji: '🥟',
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    imageSource: require('../../assets/images/menu/fataya.jpeg')
  },
  {
    id: 'sen-105',
    name: 'Fataya (Spiced Meat Pasties)',
    category: 'Sides & Snacks',
    price: 900,
    calories: 340,
    prepTimeMinutes: 6,
    description: 'Golden deep-fried turn-overs filled with seasoned ground beef and West African spices.',
    detailedDescription: 'Crispy street-food savory turnovers stuffed with seasoned halal ground beef, onions, garlic, and aromatic black pepper. Served warm with a sweet and spicy sauce.',
    isSpecial: false,
    rating: 4.6,
    dietary: ['Halal', 'Nut-Free'],
    allergens: ['Gluten', 'Eggs'],
    ingredients: [
      { name: 'Flaky Pastry Crust (x3)', amount: '120g', calories: 210 },
      { name: 'Seasoned Ground Beef', amount: '70g', calories: 130 }
    ],
    imageEmoji: '🥐',
    imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    imageSource: require('../../assets/images/menu/fataya.jpeg')
  },
  {
    id: 'sen-106',
    name: 'Bissap Iced Tea',
    category: 'Drinks',
    price: 750,
    calories: 140,
    prepTimeMinutes: 2,
    description: 'Senegalese national drink: Chilled red hibiscus flower tea infused with fresh mint and orange blossom.',
    detailedDescription: 'Brewed from dried organic Hibiscus sabdariffa flowers, sweetened with cane sugar, and perfumed with fresh garden mint leaves and a delicate hint of orange blossom water.',
    isSpecial: true,
    specialPrice: 500,
    rating: 4.9,
    dietary: ['Vegan', 'Vegetarian', 'Gluten-Free', 'Halal', 'Nut-Free'],
    allergens: [],
    ingredients: [
      { name: 'Brewed Dried Hibiscus Flowers', amount: '250ml', calories: 20 },
      { name: 'Pure Cane Sugar & Mint Infusion', amount: '2 tbsp', calories: 120 }
    ],
    imageEmoji: '🍹',
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    imageSource: require('../../assets/images/menu/bissap.jpeg')
  },
  {
    id: 'sen-107',
    name: 'Bouye (Baobab Fruit Juice)',
    category: 'Drinks',
    price: 900,
    calories: 220,
    prepTimeMinutes: 3,
    description: 'Creamy tropical juice made from wild baobab fruit pulp, sweetened condensed milk, and pineapple.',
    detailedDescription: 'A nutrient-dense superfood drink crafted from wild-harvested baobab fruit pulp (pain de singe), blended smooth with sweet condensed milk, vanilla extract, and a touch of pineapple nectar.',
    isSpecial: false,
    rating: 4.9,
    dietary: ['Vegetarian', 'Gluten-Free', 'Halal', 'Nut-Free'],
    allergens: ['Dairy'],
    ingredients: [
      { name: 'Wild Baobab Fruit Pulp', amount: '50g', calories: 80 },
      { name: 'Sweetened Condensed Milk & Pineapple', amount: '150ml', calories: 140 }
    ],
    imageEmoji: '🥛',
    imageUrl: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80',
    imageSource: require('../../assets/images/menu/bouye.jpeg')
  },
  {
    id: 'sen-108',
    name: 'Thiakry (Degue Dessert)',
    category: 'Desserts',
    price: 800,
    calories: 290,
    prepTimeMinutes: 3,
    description: 'Sweet Senegalese pudding with steamed millet couscous, sweetened vanilla yogurt, nutmeg, and raisins.',
    detailedDescription: 'A classic Senegalese comfort dessert made from steamed millet grains folded into sweet cultured yogurt, sour cream, grated nutmeg, vanilla, coconut flakes, and plump golden raisins.',
    isSpecial: false,
    rating: 4.8,
    dietary: ['Vegetarian', 'Gluten-Free', 'Halal', 'Nut-Free'],
    allergens: ['Dairy'],
    ingredients: [
      { name: 'Steamed Millet Couscous', amount: '80g', calories: 110 },
      { name: 'Sweetened Vanilla Yogurt & Nutmeg', amount: '120g', calories: 180 }
    ],
    imageEmoji: '🍨',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
    imageSource: require('../../assets/images/menu/thiakry.jpeg')
  }
];

export function getMenuItemById(id: string): MenuItem | undefined {
  return CAFETERIA_ITEMS.find((item) => item.id === id);
}

export function getMenuByCategories(): { title: CategoryType; data: MenuItem[] }[] {
  const categories: CategoryType[] = ['Mains', 'Sides & Snacks', 'Drinks', 'Desserts'];
  return categories.map((cat) => ({
    title: cat,
    data: CAFETERIA_ITEMS.filter((item) => item.category === cat)
  }));
}
