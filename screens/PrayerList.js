import React from "react";
import { FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import prayers from "../prayers/english/prayers.json";

import useTheme from "../useTheme";
export default function PrayerList() {
  const navigation = useNavigation();
  const { primaryBg, primaryText, secondaryText, border } = useTheme();

  // Convert the JSON structure to the data format expected by FlatList
  const data = prayers.map((group, idx) => ({
    id: String(idx + 1),
    name: `Prayer ${idx + 1}`,
    prayerIdx: idx,
  }));

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        paddingHorizontal: 16,
        paddingVertical: 20,
        borderColor: border,
        borderBottomWidth: 1,
      }}
      onPress={() =>
        navigation.navigate("Prayer", { prayerIdx: item.prayerIdx })
      }
    >
      <Text style={{ color: primaryText }}>{item.name}</Text>
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
      keyExtractor={(item) => item.id}
    />
  );
}
