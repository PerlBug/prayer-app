import React from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import useTheme from "../useTheme";
import { useSettings } from "../SettingsProvider";

export default function Settings() {
  const { primaryBg, primaryText, secondaryText, border, accent } = useTheme();
  const { theme, fontSize, toggleTheme, setFontSize } = useSettings();

  const settingsData = [
    {
      id: "theme",
      title: "Theme",
      value: theme,
      options: [
        { name: "Light", value: "light" },
        { name: "Dark", value: "dark" },
      ],
      onPress: toggleTheme,
    },
    {
      id: "fontSize",
      title: "Font Size",
      value: fontSize,
      options: [
        { name: "Small", value: 18 },
        { name: "Medium", value: 20 },
        { name: "Large", value: 24 },
      ],
      onPress: setFontSize,
    },
    {
      id: "language",
      title: "Language",
      comingSoon: true,
    },
  ];

  const renderSetting = (item) => (
    <View
      key={item.id}
      style={[styles.settingContainer, { borderColor: border }]}
    >
      <Text style={[styles.settingTitle, { color: primaryText }]}>
        {item.title}
      </Text>
      {item.comingSoon ? (
        <Text style={[styles.comingSoonText, { color: secondaryText }]}>
          Coming soon...
        </Text>
      ) : (
        <View style={styles.optionsContainer}>
          {item.options.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.optionButton,
                { borderColor: border },
                item.value === option.value && [
                  styles.selectedOption,
                  { backgroundColor: accent },
                ],
              ]}
              onPress={() => item.onPress(option.value)}
            >
              <Text
                style={[
                  styles.optionText,
                  {
                    color:
                      item.value === option.value ? primaryBg : primaryText,
                  },
                ]}
              >
                {option.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: primaryBg }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {settingsData.map(renderSetting)}
      </ScrollView>
      <View style={styles.aboutContainer}>
        <Text style={[styles.aboutText, { color: secondaryText }]}>
          Made with ❤️ by Mko Galoyan
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  settingContainer: {
    padding: 16,
  },
  settingTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 8,
    minWidth: 80,
  },
  selectedOption: {
    borderWidth: 0,
  },
  optionText: {
    fontWeight: "500",
  },
  comingSoonText: {
    fontStyle: "italic",
    marginTop: 5,
  },
  aboutContainer: {
    padding: 16,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  aboutText: {
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: 24,
  },
});
