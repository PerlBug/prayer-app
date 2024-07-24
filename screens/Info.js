import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import useTheme from "../useTheme";
import { useSettings } from "../SettingsProvider";

export default function Info() {
  const { primaryBg, primaryText } = useTheme();
  const { fontSize, infoText } = useSettings();

  return (
    <ScrollView style={[styles.container, { backgroundColor: primaryBg }]}>
      <Text style={[styles.text, { color: primaryText, fontSize }]}>
        {infoText}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  text: {
    lineHeight: 28,
    marginBottom: 60,
  },
});
