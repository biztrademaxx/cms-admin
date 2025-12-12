/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: ".next",
  
  // This resolves the lockfile warning
  outputFileTracingRoot: __dirname,
  
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.revolutionevmalaysia.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = nextConfig;