import React from "react";
import {
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useTheme from "../useTheme"; // Make sure this path is correct
import { useSettings } from "../SettingsProvider"; // Make sure this path is correct
import { categories } from "../categories";

const PrayerCategories = ({ navigation }) => {
  const { theme } = useSettings(); // Get the current theme
  const { primaryBg, primaryText, secondaryBg, secondaryText } = useTheme();

  const CategoryCard = ({ title, icon, onPress }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: secondaryBg }]}
      onPress={onPress}
    >
      <MaterialCommunityIcons name={icon} size={40} color={primaryText} />
      <Text style={[styles.cardTitle, { color: primaryText }]}>{title}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <CategoryCard
      title={item.title}
      icon={item.icon}
      onPress={() => navigation.navigate(item.title, { category: item.title })}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: primaryBg }]}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2} // Changed to 2 columns for better layout with 5 items
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 10,
  },
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    height: 120,
    borderRadius: 10,
  },
  cardTitle: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 14, // Adjusted for potentially longer titles
  },
});

export default PrayerCategories;
