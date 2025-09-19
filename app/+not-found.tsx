import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";

export default function NotFound() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "700" }}>Not found</Text>
      <Text style={{ marginTop: 8, opacity: 0.8 }}>
        This route does not exist.
      </Text>
      <Link href={"/"}>
        <Text>Back to home</Text>
      </Link>
    </View>
  );
}
