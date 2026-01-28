export interface Cuisine { // contract: every cuisine must have a key and an image
  key: string;
  image: string;
}

export const CUISINES: Cuisine[] = [
  { key: 'Kebab', image: 'assets/cuisine/kebab.webp' },
  { key: 'Asian', image: 'assets/cuisine/asian.webp' },
  { key: 'Italian', image: 'assets/cuisine/italian.webp' },
  { key: 'Indian', image: 'assets/cuisine/indian.webp' },
  { key: 'Vegetarian', image: 'assets/cuisine/vegetarian.webp' },
  { key: 'Fast Food', image: 'assets/cuisine/fast-food.webp' },
  { key: 'Burgers', image: 'assets/cuisine/burgers.webp' },
  { key: 'Japanese', image: 'assets/cuisine/japanese.webp' },
  { key: 'Austrian', image: 'assets/cuisine/austrian.webp' },

];
