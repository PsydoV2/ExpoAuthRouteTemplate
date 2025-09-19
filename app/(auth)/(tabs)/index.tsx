import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useSession } from "@/src/context/ctx";
import { Button } from "react-native";

export default function Home() {
  const { signOut } = useSession();

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
        }}
      ></Button>
    </View>
  );
}
