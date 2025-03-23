const tintColorLight = "#444"; // dezentes Grau
const tintColorDark = "#555"; // helles Grau

export default {
  light: {
    text: "#000", // Schwarzer Text
    background: "#fff", // Weißer Hintergrund
    tint: tintColorLight, // Aktive Elemente in Grau
    tabIconDefault: "#aaa", // Inaktive Tabs
    tabIconSelected: tintColorLight, // Aktive Tabs
  },
  dark: {
    text: "#fff", // Weißer Text
    background: "#000", // Schwarzer Hintergrund
    tint: "#eee", // Aktive Elemente hellgrau
    tabIconDefault: tintColorDark, // Inaktive Tabs
    tabIconSelected: tintColorDark, // Aktive Tabs
  },
};
