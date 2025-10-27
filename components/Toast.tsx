import Colors from "@/constants/StyleVariables";
import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View, useColorScheme } from "react-native";

type ToastProps = {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number; // in ms
  onHide?: () => void;
};

export default function Toast({
  message,
  type = "info",
  duration = 3000,
  onHide,
}: ToastProps) {
  const [visible, setVisible] = useState(true);
  const translateY = useRef(new Animated.Value(-100)).current;
  const colorScheme = useColorScheme();
  const colorPalette = colorScheme == "dark" ? Colors.dark : Colors.light;

  const bgColor =
    type === "success"
      ? colorPalette.success
      : type === "error"
      ? colorPalette.danger
      : colorPalette.info;

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setVisible(false);
        onHide?.();
      });
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: bgColor, transform: [{ translateY }] },
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 40,
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    zIndex: 9999,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    color: "white",
    fontWeight: "600",
  },
});
