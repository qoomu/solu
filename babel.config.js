module.exports = function (api) {
  const isWeb = api.caller(
    caller =>
      caller && (caller.name === 'babel-loader' || caller.name === 'next-babel-turbo-loader')
  );
  api.cache.never();
  return {
    presets: !isWeb ? ['babel-preset-expo'] : [require('next/babel')],
    plugins: ['python'],
  };
};
