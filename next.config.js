const { withExpo } = require('@expo/next-adapter');

module.exports = withExpo({
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb',
    },
  },
  // transpilePackages is a Next.js +13.1 feature.
  // older versions can use next-transpile-modules
  transpilePackages: [
    'react-native',
    'react-native-web',
    'expo',
    // Add more React Native/Expo packages here...
  ],
  webpack: (config, { webpack }) => {
    config.module.rules.push({
      test: /\.(png|svg|jpe?g|gif)$/i,
      loader: 'react-native-web-image-loader',
      options: {
        name: 'static/[hash].[ext]',
        esModule: false,
      }
    });
    return config;
  },
  env: {
    SOLU_NEXTJS_ROOT: __dirname,
  },
  images: {
    disableStaticImages: true
  }
});
