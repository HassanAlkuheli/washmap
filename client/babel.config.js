module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // Temporarily disabled NativeWind for web compatibility
    // plugins: ['nativewind/babel'],
  };
};
