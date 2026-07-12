import { useSession } from "@/src/context/AuthContext";
import { useToast } from "@/src/context/ToastProvider";
import {
  Card,
  ScreenContent,
  Text,
  View as ThemedView,
  useThemeColor,
} from "@/components/Themed";
import * as Haptics from "expo-haptics";
import { Pressable, StyleSheet, View } from "react-native";

export default function Home() {
  const { signOut } = useSession();
  const { showToast } = useToast();
  const textMuted = useThemeColor({}, "textMuted");
  const border = useThemeColor({}, "border");
  const bgDark = useThemeColor({}, "bgDark");
  const success = useThemeColor({}, "success");
  const danger = useThemeColor({}, "danger");

  const impact = (style: Haptics.ImpactFeedbackStyle) =>
    Haptics.impactAsync(style).catch(() => {});

  return (
    <ThemedView style={styles.root}>
      <ScreenContent style={styles.content}>

        {/* Haptics */}
        <Text style={[styles.sectionLabel, { color: textMuted }]}>
          HAPTICS · expo-haptics
        </Text>
        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Impact Feedback</Text>
          <Text style={[styles.cardDesc, { color: textMuted }]}>
            Tactile response on iOS &amp; Android. No-op on web.
          </Text>
          <View style={styles.chipRow}>
            {(["Light", "Medium", "Heavy"] as const).map((level) => (
              <Pressable
                key={level}
                style={({ pressed }) => [
                  styles.chip,
                  {
                    backgroundColor: bgDark,
                    borderColor: border,
                    opacity: pressed ? 0.6 : 1,
                  },
                ]}
                onPress={() => impact(Haptics.ImpactFeedbackStyle[level])}
              >
                <Text style={styles.chipText}>{level}</Text>
              </Pressable>
            ))}
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.outlineBtn,
              { borderColor: success, opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={() =>
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
              ).catch(() => {})
            }
          >
            <Text style={[styles.outlineBtnText, { color: success }]}>
              Notification · Success
            </Text>
          </Pressable>
        </Card>

        <View style={styles.spacer} />

        {/* Sign out */}
        <Pressable
          style={({ pressed }) => [
            styles.signOutBtn,
            { borderColor: danger, opacity: pressed ? 0.7 : 1 },
          ]}
          onPress={() => {
            Haptics.notificationAsync(
              Haptics.NotificationFeedbackType.Warning
            ).catch(() => {});
            signOut();
            showToast("Signed out", "info");
          }}
        >
          <Text style={[styles.signOutText, { color: danger }]}>Sign out</Text>
        </Pressable>

      </ScreenContent>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: "center" },
  content: { gap: 12 },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.8,
    marginBottom: -4,
  },
  card: { gap: 12 },
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
  spacer: { flex: 1 },
  signOutBtn: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  signOutText: { fontSize: 15, fontWeight: "600" },
});
