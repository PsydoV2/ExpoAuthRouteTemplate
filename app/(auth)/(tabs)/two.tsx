import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

export default function Second() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 18 }}>
        Second Screen
      </Text>
      <EditScreenInfo path="app/(auth)/(tabs)/two.tsx"></EditScreenInfo>
    </View>
  );
}
