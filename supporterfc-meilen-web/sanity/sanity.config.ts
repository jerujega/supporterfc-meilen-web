import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schema } from './schema';
import { deskStructure } from './deskStructure';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || 'eqe2jz7p';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || 'production';

export const config = defineConfig({
  projectId,
  dataset,
  title: 'Supporter FC Meilen Studio',
  basePath: '/studio',
  plugins: [
    deskTool({
      structure: deskStructure,
    }),
  ],
  schema: {
    types: schema,
  },
});
