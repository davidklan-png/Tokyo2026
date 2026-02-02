import { defineCollection, z } from 'astro:content';

const days = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    participants: z.array(z.string()),
    steps: z.number().optional(),
    locations: z.array(z.string()).default([]),
    highlights: z.array(z.string()).default([]),
    favoritePhotos: z.array(z.string()).default([]),
    hero: z.string().optional(),
    teaser: z.string(),
    order: z.number(),
    favorite: z.boolean().default(false),
  }),
});

export const collections = { days };
