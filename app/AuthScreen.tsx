import { Button, StyleSheet, TextInput, useColorScheme } from "react-native";
import { Text, View } from "@/components/Themed";
import { useSession } from "@/src/context/ctx";
import { router } from "expo-router";

export default function Login() {
  const { signIn } = useSession();
  const colorScheme = useColorScheme();

  const isDark = colorScheme === "dark";

  const handleLogin = () => {
    signIn();
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back</Text>
      <Text style={[styles.paragraph, { color: isDark ? "#aaa" : "#555" }]}>
        This template gives you a ready-to-use structure for authentication and
        routing. Use it as a starting point and build your own app on top of it.
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor={isDark ? "#aaa" : "#888"}
        style={[
          styles.input,
          {
            backgroundColor: isDark ? "#111" : "#fff",
            borderColor: isDark ? "#444" : "#ccc",
            color: isDark ? "#eee" : "#000",
          },
        ]}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={isDark ? "#aaa" : "#888"}
        style={[
          styles.input,
          {
            backgroundColor: isDark ? "#111" : "#fff",
            borderColor: isDark ? "#444" : "#ccc",
            color: isDark ? "#eee" : "#000",
          },
        ]}
        secureTextEntry
      />

      <View style={styles.button}>
        <Button
          title="Login"
          onPress={handleLogin}
          color={isDark ? "#ddd" : "#444"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 6,
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    borderRadius: 6,
    overflow: "hidden",
  },
});
