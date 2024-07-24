import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import useTheme from "../useTheme";
import { useSettings } from "../SettingsProvider";

export default function Prayer({ route }) {
  const { prayerIdx, text } = route.params;
  const { primaryBg, primaryText, secondaryText, border } = useTheme();
  const { fontSize } = useSettings();

  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: primaryBg,
      }}
    >
      <View
        style={{
          marginBottom: 48,
        }}
      >
        {text.split("\n").map((line, lineIndex) => (
          <Text
            key={lineIndex}
            style={{
              fontSize,
              marginBottom: 8, // Adjust this value for spacing between lines
              color: primaryText,
              lineHeight: 28,
            }}
          >
            {line}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}
