/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/courses/networking/load-balancer",
        destination: "/courses/hld/load-balancer",
        permanent: true,
      },
      {
        source: "/courses/hld/cacheing",
        destination: "/courses/hld/caching",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
