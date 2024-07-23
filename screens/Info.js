import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import useTheme from "../useTheme";
import { useSettings } from "../SettingsProvider";

export default function Info({ route }) {
  const { infoData } = route.params;
  const { primaryBg, primaryText } = useTheme();
  const { fontSize } = useSettings();

  return (
    <ScrollView style={[styles.container, { backgroundColor: primaryBg }]}>
      <Text style={[styles.text, { color: primaryText, fontSize }]}>
        {infoData}
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
    lineHeight: 24,
  },
});
