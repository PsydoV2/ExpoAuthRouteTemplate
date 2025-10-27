import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useSession } from "@/src/context/AuthContext";
import { useToast } from "@/src/context/ToastProvider";
import { Button } from "react-native";

export default function Home() {
  const { signOut } = useSession();
  const { showToast } = useToast();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 18 }}>
        Home Screen
      </Text>
      <EditScreenInfo path="app/(auth)/(tabs)/index.tsx"></EditScreenInfo>
      <Button
        title="Sign out"
        onPress={() => {
          signOut();
          showToast("Logged out!", "info");
        }}
      ></Button>
    </View>
  );
}
