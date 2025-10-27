import { Redirect, Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useSession } from "@/src/context/AuthContext";
import { useColorScheme } from "react-native";
import Colors from "@/constants/StyleVariables";

export default function AuthGroupLayout() {
  const { isAuthenticated, isLoading } = useSession();
  const scheme = useColorScheme();
  const theme = Colors[scheme ?? "light"];

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.bgDark,
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/AuthScreen" />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.bgDark },
        headerTintColor: theme.text,
        contentStyle: { backgroundColor: theme.bgDark },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="modal"
        options={{ presentation: "modal", title: "Info" }}
      />
    </Stack>
  );
}
