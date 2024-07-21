import { View } from "react-native";
import { FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import useTheme from "../useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useSettings } from "../SettingsProvider";

export default function Settings() {
  const { primaryBg, primaryText, secondaryText, border } = useTheme();
  const { language, setLanguage } = useSettings();

  // Convert the JSON structure to the data format expected by FlatList
  const data = [
    {
      idx: 0,
      name: `English`,
      value: "en",
    },
    {
      idx: 1,
      name: `Armenian`,
      value: "am",
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        paddingHorizontal: 16,
        paddingVertical: 20,
        borderColor: border,
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
      onPress={() => setLanguage(item.value)}
    >
      <Text style={{ color: primaryText }}>{item.name}</Text>
      {item.value === language && (
        <Ionicons name="md-checkmark-sharp" size={20} color={secondaryText} />
      )}
    </TouchableOpacity>
  );

  return (
    <FlatList
      style={{
        flex: 1,
        backgroundColor: primaryBg,
      }}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.idx}
    />
  );
}
