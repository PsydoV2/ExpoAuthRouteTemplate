import Colors from "@/constants/StyleVariables";
import Constants from "expo-constants";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { useColorScheme } from "react-native";

export default function ModalScreen() {
  const scheme = useColorScheme();
  const t = Colors[scheme === "dark" ? "dark" : "light"];

  const rows = [
    { label: "App", value: Constants.expoConfig?.name ?? "myapp" },
    { label: "Version", value: Constants.expoConfig?.version ?? "1.0.0" },
    { label: "Platform", value: Platform.OS },
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
      <Text style={[styles.title, { color: t.text }]}>About</Text>
      <Text style={[styles.subtitle, { color: t.textMuted }]}>
        expo-constants · Platform
      </Text>

      <View style={[styles.card, { backgroundColor: t.bgLight, borderColor: t.border }]}>
        {rows.map(({ label, value }, i) => (
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 16 },
  containerWeb: { maxWidth: 500, width: "100%", alignSelf: "center" },
  title: { fontSize: 24, fontWeight: "700" },
  subtitle: { fontSize: 13, marginTop: -8 },
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
});
