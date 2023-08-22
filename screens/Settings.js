import { View } from "react-native";
import { FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import useTheme from "../useTheme";
import { Ionicons } from "@expo/vector-icons";

export default function Settings() {
  const { primaryBg, primaryText, secondaryText, border } = useTheme();

  // Convert the JSON structure to the data format expected by FlatList
  const data = [
    {
      idx: 0,
      name: `English`,
    },
    {
      idx: 1,
      name: `Armenian`,
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
      onPress={() =>
        navigation.navigate("Prayer", { prayerIdx: item.prayerIdx })
      }
      key={item.idx + item.name}
    >
      <Text style={{ color: primaryText }}>{item.name}</Text>
      <Ionicons
        name="md-checkmark-sharp"
        size={20}
        color={secondaryText}
        onPress={() => navigation.navigate("Language")}
      />
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
