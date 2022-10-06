const isDevelopment = process.env.NODE_ENV === 'development'

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  assetPrefix: isDevelopment ? "" : "./"
}
