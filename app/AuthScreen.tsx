import { Button, ActivityIndicator } from "react-native";
import { useSession } from "@/src/context/ctx";
import { Redirect, router } from "expo-router";
import { Text, View } from "@/components/Themed";
import EditScreenInfo from "@/components/EditScreenInfo";

export default function AuthScreen() {
  const { isAuthenticated, isLoading, signIn, signOut } = useSession();

  // Während Storage hydriert
  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  // Eingeloggt? Nie auf AuthScreen bleiben → sofort weiter
  if (isAuthenticated) {
    return <Redirect href="/(auth)/(tabs)" />;
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 18 }}>
        Auth Screen
      </Text>
      <EditScreenInfo path="app/AuthScreen.tsx"></EditScreenInfo>
      <Button
        title="Sign in"
        onPress={async () => {
          await signIn("demo-token");
          // Nach erfolgreichem Login explizit in den (auth)-Bereich bzw. Tabs wechseln
          router.replace("/(auth)/(tabs)");
        }}
      />
      {/* Optional: zum Testen eines „falschen“ Zustands */}
      {/* <Button title="Force sign out" onPress={() => signOut()} /> */}
    </View>
  );
}
