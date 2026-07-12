import { Card, Text, useThemeColor } from "@/components/Themed";
import Constants from "expo-constants";
import { Platform, ScrollView, StyleSheet, View } from "react-native";

export default function ModalScreen() {
  const bgDark = useThemeColor({}, "bgDark");
  const textMuted = useThemeColor({}, "textMuted");
  const border = useThemeColor({}, "border");

  const rows = [
    { label: "App", value: Constants.expoConfig?.name ?? "myapp" },
    { label: "Version", value: Constants.expoConfig?.version ?? "1.0.0" },
    { label: "Platform", value: Platform.OS },
    { label: "Expo SDK", value: Constants.expoConfig?.sdkVersion ?? "unknown" },
  ];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: bgDark }}
      contentContainerStyle={[
        styles.container,
        Platform.OS === "web" ? styles.containerWeb : null,
      ]}
    >
      <Text style={styles.title}>About</Text>
      <Text style={[styles.subtitle, { color: textMuted }]}>
        expo-constants · Platform
      </Text>

      <Card style={styles.card}>
        {rows.map(({ label, value }, i) => (
          <View
            key={label}
            style={[
              styles.row,
              i > 0 ? { borderTopWidth: 1, borderTopColor: border } : null,
            ]}
          >
            <Text style={[styles.rowLabel, { color: textMuted }]}>{label}</Text>
            <Text style={styles.rowValue}>{value}</Text>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 16 },
  containerWeb: { maxWidth: 500, width: "100%", alignSelf: "center" },
  title: { fontSize: 24, fontWeight: "700" },
  subtitle: { fontSize: 13, marginTop: -8 },
  card: { padding: 0, overflow: "hidden" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  rowLabel: { fontSize: 14 },
  rowValue: { fontSize: 14, fontWeight: "500" },
});
