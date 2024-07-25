import React from "react";
import { FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import narek from "../prayers/en/narek/narek.json";
import useTheme from "../useTheme";
import { getPrayerData } from "../prayers";
import { useSettings } from "../SettingsProvider";
import { categories } from "../categories";

export default function PrayerList({ route }) {
  const { slug } = route.params;

  const jsonPath = `../prayers/en/${slug}/${slug}.json`;
  const navigation = useNavigation();
  const { fontSize } = useSettings();
  const { primaryBg, primaryText, secondaryText, border } = useTheme();

  const prayerData = getPrayerData("en", slug);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        paddingHorizontal: 16,
        paddingVertical: 20,
        borderColor: border,
        borderBottomWidth: 1,
      }}
      onPress={() =>
        navigation.navigate("Prayer", {
          prayerIdx: item.prayerIdx,
          slug: slug,
          name: item.name,
          text: item.text,
          id: item.id,
          category: categories.find((c) => c.slug === slug)?.title,
        })
      }
    >
      <Text style={{ color: primaryText, fontSize: 16 }}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      style={{
        flex: 1,
        backgroundColor: primaryBg,
      }}
      data={prayerData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{
        paddingBottom: 80,
      }}
    />
  );
}
