/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Playwright関連ファイルをビルドから除外
      config.externals = config.externals || [];
      config.externals.push({
        'playwright-core': 'commonjs playwright-core',
        '@sparticuz/chromium': 'commonjs @sparticuz/chromium',
        'chromium-bidi': 'commonjs chromium-bidi',
      });
    }
    return config;
  },
}

module.exports = nextConfig