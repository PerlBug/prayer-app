import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Prayer from "./screens/Prayer";
import Settings from "./screens/Settings";
import { Ionicons } from "@expo/vector-icons";
import useTheme from "./useTheme";
import { useSettings } from "./SettingsProvider";
import NarekPrayers from "./screens/NarekPrayers";
import { categories } from "./categories";
const Stack = createNativeStackNavigator();

export default function Main() {
  const { secondaryBg, primaryText, secondaryText } = useTheme();
  const { toggleTheme, theme, language } = useSettings();

  console.log({ theme, language });
  return (
    <>
      <StatusBar style={theme === "light" ? "dark" : "light"} />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: secondaryBg,
            },
            headerTintColor: primaryText,
            headerBackTitleVisible: false,
          }}
        >
          <Stack.Screen
            name="Armenian Prayers"
            component={Home}
            options={({ navigation }) => ({
              headerLeft: () => (
                <Ionicons
                  name="cog"
                  size={22}
                  color={secondaryText}
                  style={{ marginRight: 15 }}
                  onPress={() => navigation.navigate("Language")}
                />
              ),
              headerRight: () => (
                <View style={{ paddingRight: 15 }}>
                  <Ionicons
                    name={theme === "light" ? "moon" : "sunny"}
                    size={22}
                    color={secondaryText}
                    onPress={toggleTheme}
                  />
                </View>
              ),
            })}
          />
          {categories.map((i, idx) => (
            <Stack.Screen
              name={i.title}
              key={idx + i.title}
              component={NarekPrayers}
              options={({ route }) => ({
                title: route.params.name,
                slug: `${route.params.slug}`,
              })}
            />
          ))}

          <Stack.Screen
            name="Prayer"
            component={Prayer}
            options={({ route }) => ({
              title: route.params.name,
            })}
          />
          <Stack.Screen name="Language" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
