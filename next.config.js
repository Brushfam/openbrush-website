module.exports = {
  reactStrictMode: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false};

    return config;
  },
}
