import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim();
const token = process.env.SANITY_API_READ_TOKEN?.trim();

if (!projectId || !dataset) {
  console.warn(
    'Sanity configuration is incomplete. Please check NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in .env.local'
  );
}

export const client = createClient({
  projectId: projectId || 'eqe2jz7p',
  dataset: dataset || 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // Use CDN to reduce Sanity load and improve speed
  token,
});
