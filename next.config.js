/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/generate",
        destination: "https://gptexplain.vercel.app/api/generate",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/api/generate",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "http://localhost:3000, https://gptexplain.vercel.app",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "POST",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
