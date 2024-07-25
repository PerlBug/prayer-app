import React from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import useTheme from "../useTheme";
import { useSettings } from "../SettingsProvider";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { categories } from "../categories";
import { getSpecificPrayer } from "../prayers";

export default function BookmarksList() {
  const navigation = useNavigation();
  const { bookmarks, toggleBookmark, language } = useSettings();
  const { primaryBg, primaryText, secondaryText, border } = useTheme();
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        paddingHorizontal: 16,
        paddingVertical: 20,
        borderColor: border,
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      onPress={() =>
        navigation.navigate("Prayer", {
          prayerIdx: item.prayerIdx,
          slug: item.slug,
          name: item.name,
          id: item.prayerId,
          text:
            getSpecificPrayer(language, item.slug, item.prayerId)?.text || "",
          category: categories.find((c) => c.slug === item.slug)?.title,
        })
      }
    >
      <View style={{ flex: 1 }}>
        <Text style={{ color: primaryText, fontSize: 16 }}>{item.name}</Text>
        <Text style={{ color: secondaryText, fontSize: 14, marginTop: 4 }}>
          {item.category}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          return toggleBookmark(
            language,
            item.slug,
            item.prayerId,
            item.name,
            item.category
          );
        }}
      >
        <MaterialCommunityIcons
          name="bookmark-remove"
          size={24}
          color={secondaryText}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <FlatList
      style={{
        flex: 1,
        backgroundColor: primaryBg,
      }}
      data={bookmarks}
      renderItem={renderItem}
      keyExtractor={(item) => item.prayerId + item.slug}
      contentContainerStyle={{
        paddingBottom: 80,
      }}
      ListEmptyComponent={
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingTop: 40,
          }}
        >
          <Text
            style={{ color: secondaryText, fontSize: 14, textAlign: "center" }}
          >
            To bookmark a prayer, tap the
          </Text>
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
          >
            <FontAwesome5 name="bookmark" size={16} color={secondaryText} />
            <Text style={{ color: secondaryText, fontSize: 14, marginLeft: 5 }}>
              icon in the prayer screen
            </Text>
          </View>
        </View>
      }
    />
  );
}
