import Colors from "@/constants/StyleVariables";
import Constants from "expo-constants";
import * as Linking from "expo-linking";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useColorScheme } from "react-native";

const APP_NAME = Constants.expoConfig?.name ?? "myapp";
const APP_VERSION = Constants.expoConfig?.version ?? "1.0.0";

const LINKS = [
  { label: "Expo Docs", url: "https://docs.expo.dev" },
  { label: "Expo Router", url: "https://docs.expo.dev/router/introduction/" },
  { label: "React Native Docs", url: "https://reactnative.dev/docs/getting-started" },
];

export default function Second() {
  const scheme = useColorScheme();
  const t = Colors[scheme === "dark" ? "dark" : "light"];

  const infoRows = [
    { label: "App", value: `${APP_NAME} ${APP_VERSION}` },
    { label: "Platform", value: Platform.OS },
    {
      label: "OS Version",
      value: Platform.OS === "web" ? "Browser" : String(Platform.Version),
    },
    { label: "Expo SDK", value: "55" },
  ];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: t.bgDark }}
      contentContainerStyle={[
        styles.container,
        Platform.OS === "web" ? styles.containerWeb : null,
      ]}
    >

      {/* Device Info */}
      <Text style={[styles.sectionLabel, { color: t.textMuted }]}>
        DEVICE INFO · expo-constants · Platform
      </Text>
      <View style={[styles.card, { backgroundColor: t.bgLight, borderColor: t.border }]}>
        {infoRows.map(({ label, value }, i) => (
          <View
            key={label}
            style={[
              styles.row,
              i > 0 ? { borderTopWidth: 1, borderTopColor: t.border } : null,
            ]}
          >
            <Text style={[styles.rowLabel, { color: t.textMuted }]}>{label}</Text>
            <Text style={[styles.rowValue, { color: t.text }]}>{value}</Text>
          </View>
        ))}
      </View>

      {/* Links */}
      <Text style={[styles.sectionLabel, { color: t.textMuted }]}>
        LINKS · expo-linking
      </Text>
      <View style={[styles.card, { backgroundColor: t.bgLight, borderColor: t.border }]}>
        {LINKS.map(({ label, url }, i) => (
          <Pressable
            key={url}
            style={({ pressed }) => [
              styles.linkRow,
              i > 0 ? { borderTopWidth: 1, borderTopColor: t.border } : null,
              { opacity: pressed ? 0.6 : 1 },
            ]}
            onPress={() => Linking.openURL(url)}
          >
            <Text style={[styles.linkLabel, { color: t.primary }]}>{label}</Text>
            <Text style={{ color: t.textMuted }}>→</Text>
          </Pressable>
        ))}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 12 },
  containerWeb: { maxWidth: 600, width: "100%", alignSelf: "center" },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.8,
    marginBottom: -4,
  },
  card: { borderRadius: 12, borderWidth: 1, overflow: "hidden" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  rowLabel: { fontSize: 14 },
  rowValue: { fontSize: 14, fontWeight: "500" },
  linkRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  linkLabel: { fontSize: 15, fontWeight: "500" },
});
