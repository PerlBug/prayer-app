import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import prayers from "../prayers/english/prayers.json";

export default function Prayer({ route }) {
  const { prayerIdx } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        Speaking with God from the Depths of the Heart {"\n"}
        {"\n"}
      </Text>
      {prayers[prayerIdx].map((item, index) => (
        <View key={index} style={styles.textContainer}>
          {item.split("\n").map((line, lineIndex) => (
            <Text key={lineIndex} style={styles.line}>
              {line}
            </Text>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  textContainer: {
    marginBottom: 48,
  },
  line: {
    fontSize: 16,
    marginBottom: 8, // Adjust this value for spacing between lines
  },
  title: {
    fontWeight: "bold",
  },
});
