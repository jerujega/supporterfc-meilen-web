import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactCompiler: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https' as const,
                hostname: 'cdn.sanity.io',
            },
        ],
    },
};

export default withNextIntl(nextConfig);
