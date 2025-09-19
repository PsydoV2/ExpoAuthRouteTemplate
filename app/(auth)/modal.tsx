import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

export default function ModalScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 18 }}>
        Modal Screen
      </Text>
      <EditScreenInfo path="app/(auth)/modal.tsx"></EditScreenInfo>
    </View>
  );
}
