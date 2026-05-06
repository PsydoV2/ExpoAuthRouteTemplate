import { useSession } from "@/src/context/AuthContext";
import { useToast } from "@/src/context/ToastProvider";
import Colors from "@/constants/StyleVariables";
import * as Haptics from "expo-haptics";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useColorScheme } from "react-native";

export default function Home() {
  const { signOut } = useSession();
  const { showToast } = useToast();
  const scheme = useColorScheme();
  const t = Colors[scheme === "dark" ? "dark" : "light"];

  const impact = (style: Haptics.ImpactFeedbackStyle) =>
    Haptics.impactAsync(style).catch(() => {});

  return (
    <View style={[styles.root, { backgroundColor: t.bgDark }]}>
      <View style={[styles.content, Platform.OS === "web" ? styles.contentWeb : null]}>

        {/* Haptics */}
        <Text style={[styles.sectionLabel, { color: t.textMuted }]}>
          HAPTICS · expo-haptics
        </Text>
        <View style={[styles.card, { backgroundColor: t.bgLight, borderColor: t.border }]}>
          <Text style={[styles.cardTitle, { color: t.text }]}>
            Impact Feedback
          </Text>
          <Text style={[styles.cardDesc, { color: t.textMuted }]}>
            Tactile response on iOS &amp; Android. No-op on web.
          </Text>
          <View style={styles.chipRow}>
            {(["Light", "Medium", "Heavy"] as const).map((level) => (
              <Pressable
                key={level}
                style={({ pressed }) => [
                  styles.chip,
                  {
                    backgroundColor: t.bgDark,
                    borderColor: t.border,
                    opacity: pressed ? 0.6 : 1,
                  },
                ]}
                onPress={() => impact(Haptics.ImpactFeedbackStyle[level])}
              >
                <Text style={[styles.chipText, { color: t.text }]}>{level}</Text>
              </Pressable>
            ))}
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.outlineBtn,
              { borderColor: t.success, opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={() =>
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
              ).catch(() => {})
            }
          >
            <Text style={[styles.outlineBtnText, { color: t.success }]}>
              Notification · Success
            </Text>
          </Pressable>
        </View>

        <View style={{ flex: 1 }} />

        {/* Sign out */}
        <Pressable
          style={({ pressed }) => [
            styles.signOutBtn,
            { borderColor: t.danger, opacity: pressed ? 0.7 : 1 },
          ]}
          onPress={() => {
            Haptics.notificationAsync(
              Haptics.NotificationFeedbackType.Warning
            ).catch(() => {});
            signOut();
            showToast("Signed out", "info");
          }}
        >
          <Text style={[styles.signOutText, { color: t.danger }]}>Sign out</Text>
        </Pressable>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: "center" },
  content: { flex: 1, width: "100%", padding: 20, gap: 12 },
  contentWeb: { maxWidth: 600 },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.8,
    marginBottom: -4,
  },
  card: { borderRadius: 12, borderWidth: 1, padding: 16, gap: 12 },
  cardTitle: { fontSize: 15, fontWeight: "600" },
  cardDesc: { fontSize: 13, lineHeight: 18 },
  chipRow: { flexDirection: "row", gap: 8 },
  chip: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
  chipText: { fontSize: 13, fontWeight: "500" },
  outlineBtn: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  outlineBtnText: { fontSize: 14, fontWeight: "500" },
  signOutBtn: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  signOutText: { fontSize: 15, fontWeight: "600" },
});
