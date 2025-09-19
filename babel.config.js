module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"], // enthält expo-router bereits
    plugins: [
      // Pfadalias (optional, wenn du "@/..." verwendest)
      [
        "module-resolver",
        {
          root: ["./"],
          alias: { "@": "./" }, // oder './src' falls du auf src mappen willst
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
      // Falls du Reanimated nutzt: UNBEDINGT als letztes aktivieren
      // 'react-native-reanimated/plugin',
    ],
  };
};
