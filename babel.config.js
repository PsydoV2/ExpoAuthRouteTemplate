module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"], // already includes expo-router support
    plugins: [
      // Path alias support for "@/..." imports
      [
        "module-resolver",
        {
          root: ["./"],
          alias: { "@": "./" }, // or './src' if you prefer mapping to src
          extensions: [
            ".ios.js",
            ".android.js",
            ".js",
            ".ts",
            ".tsx",
            ".json",
            ".ios.ts",
            ".android.ts",
            ".ios.tsx",
            ".android.tsx",
          ],
        },
      ],
      // No explicit Reanimated/Worklets plugin needed: babel-preset-expo
      // auto-detects react-native-worklets and applies its plugin.
    ],
  };
};
