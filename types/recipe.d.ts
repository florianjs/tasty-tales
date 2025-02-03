declare global {
  interface Recipe {
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

  interface RecipesCollectionItem extends Recipe {
    _path: string;
    _dir: string;
    _draft: boolean;
    _partial: boolean;
    _locale: string;
    _type: string;
  }
}

export {};
