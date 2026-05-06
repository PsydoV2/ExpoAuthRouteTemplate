import {
  Platform,
  StyleSheet,
  Text as DefaultText,
  View as DefaultView,
} from "react-native";

import Colors from "@/constants/StyleVariables";
import { useColorScheme } from "./useColorScheme";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

type Theme = "light" | "dark";

function resolveTheme(scheme: ReturnType<typeof useColorScheme>): Theme {
  return scheme === "dark" ? "dark" : "light";
}

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = resolveTheme(useColorScheme());
  return props[theme] ?? Colors[theme][colorName];
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "bgDark"
  );
  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

/** Card with bgLight background and a subtle border. */
export function Card(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "bgLight"
  );
  const borderColor = useThemeColor({}, "border");
  return (
    <DefaultView
      style={[
        themedStyles.card,
        { backgroundColor, borderColor },
        style,
      ]}
      {...otherProps}
    />
  );
}

/** Full-width flex container constrained to maxWidth 600 on web. */
export function ScreenContent({
  style,
  lightColor: _lc,
  darkColor: _dc,
  ...props
}: ViewProps) {
  return (
    <DefaultView
      style={[
        themedStyles.screenContent,
        Platform.OS === "web" ? themedStyles.screenContentWeb : null,
        style,
      ]}
      {...props}
    />
  );
}

const themedStyles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  screenContent: {
    flex: 1,
    width: "100%",
    padding: 20,
    gap: 16,
  },
  screenContentWeb: {
    maxWidth: 600,
    alignSelf: "center",
  },
});
