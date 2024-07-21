import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import prayers from "../prayers/english/prayers.json";
import useTheme from "../useTheme";

export default function Prayer({ route }) {
  const { prayerIdx } = route.params;
  const { primaryBg, primaryText, secondaryText, border } = useTheme();

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
        {prayers[prayerIdx].split("\n").map((line, lineIndex) => (
          <Text
            key={lineIndex}
            style={{
              fontSize: 16,
              marginBottom: 8, // Adjust this value for spacing between lines
              color: primaryText,
            }}
          >
            {line}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}
