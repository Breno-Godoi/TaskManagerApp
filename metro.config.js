// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);

  return {
    ...defaultConfig,
    resolver: {
      ...defaultConfig.resolver,
      // Add any additional asset file extensions here
      assetExts: [...defaultConfig.resolver.assetExts, 'db'],
    },
  };
})();
