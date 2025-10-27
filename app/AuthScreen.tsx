import { Button, ActivityIndicator } from "react-native";
import { useSession } from "@/src/context/AuthContext";
import { Redirect, router } from "expo-router";
import { Text, View } from "@/components/Themed";
import EditScreenInfo from "@/components/EditScreenInfo";
import { useToast } from "@/src/context/ToastProvider";
import { useApi } from "@/src/hooks/useAPI";
import { API_ROUTE_LOGIN } from "@/constants/APIRoutes";
import { DTOUser } from "@/src/types/DTOUser";
import { useUser } from "@/src/context/UserProvider";
import { useState } from "react";

export default function AuthScreen() {
  const { isAuthenticated, isLoading, signIn, signOut } = useSession();
  const { showToast } = useToast();
  const { callAuthentication } = useApi();
  const { setUser } = useUser();
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

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

  const handleLogin = async () => {
    await signIn("demo-token");
    router.replace("/(auth)/(tabs)");
    showToast("Authenticated", "success");
    return;

    // Example login flow:

    setIsLoadingSubmit(true);

    try {
      const body = {};

      const response = await callAuthentication(API_ROUTE_LOGIN, "POST", body);

      if (response) {
        type LoginResponse = DTOUser & { token: string };
        const data: LoginResponse = await response;

        if (!data.token) {
          const msg = "No JWT-Token returned!";
          showToast(msg, "error", 5000);
          return;
        }

        await signIn(data.token);

        const user: DTOUser = {
          id: data.id,
          username: data.username,
          email: data.email,
        };
        setUser(user);

        router.replace("/(auth)/(tabs)");
      }
    } catch (e) {
      showToast(`${e}`, "error", 5000);
    } finally {
      setIsLoadingSubmit(false);
    }
  };

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
      <Button title="Sign in" onPress={handleLogin} />
      {/* Optional: zum Testen eines „falschen“ Zustands */}
      {/* <Button title="Force sign out" onPress={() => signOut()} /> */}
    </View>
  );
}
