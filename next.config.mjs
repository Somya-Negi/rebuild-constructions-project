/** Keep the same Next.js 15 architecture; optimize media without adding a 3D bundle. */
const nextConfig = {
  // Keep development and production manifests isolated when both commands are run.
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com', pathname: '/photo-*' }],
    formats: ['image/webp'],
  },
  async headers() {
    const common = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    ];
    return [
      { source: '/:path*', headers: common },
      { source: '/api/:path*', headers: [{ key: 'Cache-Control', value: 'no-store' }] },
    ];
  },
};
export default nextConfig;
