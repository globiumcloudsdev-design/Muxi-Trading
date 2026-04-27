/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async rewrites() {
    const proxyTarget = process.env.API_PROXY_TARGET || process.env.NEXT_PUBLIC_API_PROXY_TARGET;

    // Use built-in Next.js API routes by default; only proxy when explicitly configured.
    if (!proxyTarget) {
      return [];
    }

    const normalizedTarget = proxyTarget.replace(/\/$/, '');

    return [
      {
        source: '/api/:path*',
        destination: `${normalizedTarget}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;

