import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import Colors from "@/constants/StyleVariables";
import { useColorScheme } from "react-native";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={26} style={{ marginBottom: -2 }} {...props} />;
}

export default function TabsLayout() {
  const scheme = useColorScheme();
  const theme = Colors[scheme ?? "light"];

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: theme.bgDark },
        headerTintColor: theme.text,
        tabBarStyle: { backgroundColor: theme.bgDark },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.borderMuted,
        tabBarLabelStyle: { fontSize: 12, fontWeight: "600" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Link href="/(auth)/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={22}
                    color={theme.text}
                    style={{ marginRight: 14, opacity: pressed ? 0.6 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Second",
          tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}
