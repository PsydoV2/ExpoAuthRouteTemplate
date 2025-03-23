import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SessionProvider } from "@/src/context/ctx";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import { ThemeProvider } from "@react-navigation/native";
import Colors from "../constants/Colors"; // dein Farbschema

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "AuthScreen",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}
import { Slot } from "expo-router";

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme ?? "light"];

  return (
    <SafeAreaProvider>
      <SessionProvider>
        <ThemeProvider
          value={{
            dark: colorScheme === "dark",
            colors: {
              background: themeColors.background,
              card: themeColors.background,
              text: themeColors.text,
              border: "#333",
              notification: themeColors.tint,
              primary: themeColors.tint,
            },
          }}
        >
          <Slot />
        </ThemeProvider>
      </SessionProvider>
    </SafeAreaProvider>
  );
}
