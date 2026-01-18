/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Puppeteer関連ファイルをビルドから除外
      config.externals = config.externals || [];
      config.externals.push({
        'puppeteer-core': 'commonjs puppeteer-core',
        '@sparticuz/chromium': 'commonjs @sparticuz/chromium',
      });
    }
    return config;
  },
}

module.exports = nextConfig