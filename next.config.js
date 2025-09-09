const { withExpo } = require('@expo/next-adapter');

module.exports = withExpo({
  // transpilePackages is a Next.js +13.1 feature.
  // older versions can use next-transpile-modules
  transpilePackages: [
    'react-native',
    'react-native-web',
    'expo',
    'orm',
    // Add more React Native/Expo packages here...
  ],
  webpack: (config, { webpack }) => {
      config.experiments = { ...config.experiments };
      config.externals["node:fs"] = "commonjs node:fs";
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
      config.plugins.push(

        new webpack.NormalModuleReplacementPlugin(
          /^node:/,
          (resource) => {
            resource.request = resource.request.replace(/^node:/, '');
          },
        ),
      );
  
      return config;
   },
   env: {
    SOLU_NEXTJS_ROOT: __dirname,
   }
});
