/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  swcMinify: true,

  webpack(config) {
    // support WebAssembly
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };

    // Ignore node-specific modules when bundling for the browser:
    // See https://webpack.js.org/configuration/resolve/#resolvealias
    config.resolve.alias = {
      ...config.resolve.alias,
      sharp$: false,
      'onnxruntime-node$': false,
    };

    return config;
  },
};

module.exports = nextConfig;
