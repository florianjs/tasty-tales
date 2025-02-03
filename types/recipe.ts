export interface Recipe {
  id: string;
  title: string;
  description: string;
  cookingTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  featured: boolean;
  image: string;
  tags: string[];
  rating?: number;
  reviews?: number;
  ingredients: string[];
  instructions: string[];
  notes?: string;
  servings: number;
}
