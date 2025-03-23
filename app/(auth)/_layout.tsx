import { Redirect, Stack } from "expo-router";
import { useSession } from "@/src/context/ctx";
import { Text } from "@/components/Themed";
import { useColorScheme } from "react-native";
import Colors from "@/constants/Colors";

export default function AppLayout() {
  const { session, isLoading } = useSession();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/AuthScreen" />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.background },
        headerTintColor: theme.text,
        contentStyle: { backgroundColor: theme.background },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
    </Stack>
  );
}
