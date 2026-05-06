import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { SessionProvider } from "@/src/context/AuthContext";
import { Slot } from "expo-router";
import Colors from "@/constants/StyleVariables";
import { UserProvider } from "@/src/context/UserProvider";
import { ToastProvider } from "@/src/context/ToastProvider";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "AuthScreen",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });
  const scheme = useColorScheme();

  useEffect(() => {
    if (error) {
      console.error(error);
      SplashScreen.hideAsync().catch(console.error);
    }
  }, [error]);

  useEffect(() => {
    if (!loaded) return;
    const bg = scheme === "dark" ? Colors.dark.bgDark : Colors.light.bgDark;
    void (async () => {
      await SystemUI.setBackgroundColorAsync(bg).catch(console.error);
      await SplashScreen.hideAsync().catch(console.error);
    })();
  }, [loaded, scheme]);

  if (!loaded && !error) return null;

  return (
    <SafeAreaProvider>
      <UserProvider>
        <SessionProvider>
          <ToastProvider>
            <ThemeProvider value={scheme === "dark" ? DarkTheme : DefaultTheme}>
              <Slot />
            </ThemeProvider>
          </ToastProvider>
        </SessionProvider>
      </UserProvider>
    </SafeAreaProvider>
  );
}
