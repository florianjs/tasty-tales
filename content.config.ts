import { defineContentConfig, defineCollection, z } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    recipes: defineCollection({
      type: 'page',
      source: 'recipes/**.json',
      schema: z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        cookingTime: z.number().int().positive(),
        difficulty: z.enum(['easy', 'medium', 'hard']),
        featured: z.boolean().default(false),
        image: z.string().url(),
        tags: z.string().array(),
        rating: z.number().min(0).max(5).optional(),
        reviews: z.number().int().nonnegative().optional(),
        servings: z.number().int().positive(),
        ingredients: z.string().array(),
        instructions: z.string().array(),
        notes: z.string().optional(),
        date: z.date().optional(),
        author: z.string().optional(),
      }),
    }),
    articles: defineCollection({
      type: 'page',
      source: 'articles/*.md',
      schema: z.object({
        title: z.string(),
        slug: z.string(),
        content: z.string(),
        date: z.string().or(z.date()),
        description: z.string().optional(),
        image: z.string().url().optional(),
        tags: z.string().array().optional(),
        author: z.string().optional(),
        excerpt: z.string().optional(),
        category: z.string().optional(),
        published: z.boolean().default(true),
      }),
    }),
  },
});
