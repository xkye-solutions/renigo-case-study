import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { flowSchema } from '@xkye/case-study-kit/schema';

const flows = defineCollection({
  loader: glob({ base: './src/content/flows', pattern: '*.md' }),
  schema: flowSchema,
});

export const collections = { flows };
