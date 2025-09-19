const gray = {
  50: "#f9fafb",
  100: "#f3f4f6",
  200: "#e5e7eb",
  300: "#d1d5db",
  400: "#9ca3af",
  500: "#6b7280",
  600: "#4b5563",
  700: "#374151",
  800: "#1f2937",
  900: "#111827",
};

const primary = {
  light: "#4f46e5", // Indigo-600
  dark: "#818cf8", // Indigo-400
};

export default {
  light: {
    text: gray[900],
    textSecondary: gray[600],
    background: "#ffffff",
    card: gray[50],
    border: gray[200],
    tint: primary.light,
    tabIconDefault: gray[400],
    tabIconSelected: primary.light,
  },
  dark: {
    text: gray[50],
    textSecondary: gray[300],
    background: gray[900],
    card: gray[800],
    border: gray[700],
    tint: primary.dark,
    tabIconDefault: gray[500],
    tabIconSelected: primary.dark,
  },
};
