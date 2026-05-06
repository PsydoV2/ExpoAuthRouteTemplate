import { useSession } from "@/src/context/AuthContext";
import { useToast } from "@/src/context/ToastProvider";
import Colors from "@/constants/StyleVariables";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Redirect } from "expo-router";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useColorScheme } from "react-native";

export default function AuthScreen() {
  const { isAuthenticated, isLoading, signIn } = useSession();
  const { showToast } = useToast();
  const scheme = useColorScheme();
  const t = Colors[scheme === "dark" ? "dark" : "light"];

  if (isLoading) {
    return (
      <View style={[styles.center, { backgroundColor: t.bgDark }]}>
        <ActivityIndicator size="large" color={t.primary} />
      </View>
    );
  }

  if (isAuthenticated) {
    return <Redirect href="/(auth)/(tabs)" />;
  }

  return (
    <View style={[styles.root, { backgroundColor: t.bgDark }]}>
      <View style={[styles.content, Platform.OS === "web" ? styles.contentWeb : null]}>

        {/* Logo */}
        <View style={styles.logoArea}>
          <View style={[styles.iconCircle, { backgroundColor: t.primary + "22" }]}>
            <FontAwesome name="lock" size={26} color={t.primary} />
          </View>
          <Text style={[styles.appName, { color: t.text }]}>MyApp</Text>
          <Text style={[styles.tagline, { color: t.textMuted }]}>
            Sign in to continue
          </Text>
        </View>

        {/* Card */}
        <View style={[styles.card, { backgroundColor: t.bgLight, borderColor: t.border }]}>
          <Pressable
            style={({ pressed }) => [
              styles.primaryBtn,
              { backgroundColor: t.primary, opacity: pressed ? 0.85 : 1 },
            ]}
            onPress={async () => {
              await signIn("demo-token");
              showToast("Authenticated", "success");
            }}
          >
            <Text style={styles.primaryBtnText}>Sign in (demo)</Text>
          </Pressable>

          <View style={[styles.divider, { backgroundColor: t.border }]} />

          <Text style={[styles.hint, { color: t.textMuted }]}>
            Replace with your auth logic in{"\n"}
            <Text style={{ color: t.primary, fontWeight: "500" }}>
              app/AuthScreen.tsx
            </Text>
          </Text>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: "center", justifyContent: "center" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  content: { width: "100%", padding: 28, gap: 28 },
  contentWeb: { maxWidth: 400 },
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
  card: { borderRadius: 16, borderWidth: 1, padding: 20, gap: 16 },
  primaryBtn: { borderRadius: 12, paddingVertical: 14, alignItems: "center" },
  primaryBtnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  divider: { height: 1 },
  hint: { fontSize: 13, textAlign: "center", lineHeight: 20 },
});
