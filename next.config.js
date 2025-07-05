/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        mode: process.env.NODE_ENV,
    },
    // Enable Turbopack (now stable)
    turbopack: {
        rules: {
            '*.svg': {
                loaders: ['@svgr/webpack'],
                as: '*.js',
            },
        },
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        });

        return config;
    },
    async redirects() {
        return [
            {
                source: '/graveyard.json',
                destination: '/api/graveyard',
                permanent: true,
            },
            {
                source: '/umami.js',
                destination: '/_next/static/umami.js',
                permanent: true,
            }
        ];
    },
    async rewrites() {
        return [
            {
                source: '/_next/static/umami.js',
                destination: 'https://analytics.bale.media/script.js'
            },
            {
                source: '/api/send',
                destination: 'https://analytics.bale.media/api/send',
            },
            {
                source: '/social/:path*',
                destination: 'https://static.killedbygoogle.com/com/social/:path*',
            }
        ]
    },
};

module.exports = nextConfig;
