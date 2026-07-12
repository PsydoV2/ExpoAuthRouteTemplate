import { useSession } from "@/src/context/AuthContext";
import { useToast } from "@/src/context/ToastProvider";
import { Card, ScreenContent, Text, View, useThemeColor } from "@/components/Themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Redirect } from "expo-router";
import { ActivityIndicator, Pressable, StyleSheet } from "react-native";

export default function AuthScreen() {
  const { isAuthenticated, isLoading, signIn } = useSession();
  const { showToast } = useToast();
  const primary = useThemeColor({}, "primary");
  const textMuted = useThemeColor({}, "textMuted");
  const border = useThemeColor({}, "border");

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={primary} />
      </View>
    );
  }

  if (isAuthenticated) {
    return <Redirect href="/(auth)/(tabs)" />;
  }

  return (
    <View style={styles.root}>
      <ScreenContent style={styles.content} maxWidth={400}>

        {/* Logo */}
        <View style={styles.logoArea}>
          <View style={[styles.iconCircle, { backgroundColor: primary + "22" }]}>
            <FontAwesome name="lock" size={26} color={primary} />
          </View>
          <Text style={styles.appName}>MyApp</Text>
          <Text style={[styles.tagline, { color: textMuted }]}>
            Sign in to continue
          </Text>
        </View>

        {/* Card */}
        <Card style={styles.card}>
          <Pressable
            style={({ pressed }) => [
              styles.primaryBtn,
              { backgroundColor: primary, opacity: pressed ? 0.85 : 1 },
            ]}
            onPress={async () => {
              await signIn("demo-token");
              showToast("Authenticated", "success");
            }}
          >
            <Text style={styles.primaryBtnText} lightColor="#fff" darkColor="#fff">
              Sign in (demo)
            </Text>
          </Pressable>

          <View style={[styles.divider, { backgroundColor: border }]} />

          <Text style={[styles.hint, { color: textMuted }]}>
            Replace with your auth logic in{"\n"}
            <Text style={[styles.hintCode, { color: primary }]}>
              app/AuthScreen.tsx
            </Text>
          </Text>
        </Card>

      </ScreenContent>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: "center", justifyContent: "center" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  content: { flex: 0, padding: 28, gap: 28 },
  logoArea: { alignItems: "center", gap: 12 },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  appName: { fontSize: 28, fontWeight: "700", letterSpacing: -0.5 },
  tagline: { fontSize: 15 },
  card: { borderRadius: 16, padding: 20, gap: 16 },
  primaryBtn: { borderRadius: 12, paddingVertical: 14, alignItems: "center" },
  primaryBtnText: { fontSize: 16, fontWeight: "600" },
  divider: { height: 1 },
  hint: { fontSize: 13, textAlign: "center", lineHeight: 20 },
  hintCode: { fontWeight: "500" },
});
