import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Prayer from "./screens/Prayer";
import Settings from "./screens/Settings";
import { FontAwesome5 } from "@expo/vector-icons";
import useTheme from "./useTheme";
import { useSettings } from "./SettingsProvider";
import { categories } from "./categories";
import PrayerList from "./screens/PrayerList";
const Stack = createNativeStackNavigator();

export default function Main() {
  const { secondaryBg, primaryText, secondaryText } = useTheme();
  const { toggleTheme, theme, language } = useSettings();

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
              headerRight: () => (
                <View style={{ width: 30, alignItems: "center" }}>
                  <FontAwesome5
                    name="cog"
                    size={22}
                    color={secondaryText}
                    onPress={() => navigation.navigate("Settings")}
                  />
                </View>
              ),
              /* headerRight: () => (
                <View style={{ paddingRight: 15 }}>
                  <Ionicons
                    name={theme === "light" ? "moon" : "sunny"}
                    size={22}
                    color={secondaryText}
                    onPress={toggleTheme}
                  />
                </View>
              ), */
            })}
          />
          {categories.map((i, idx) => (
            <Stack.Screen
              name={i.title}
              key={idx + i.title}
              component={PrayerList}
              options={({ route }) => ({
                title: route.params.name,
                slug: `${route.params.slug}`,
              })}
            />
          ))}

          <Stack.Screen
            name="Prayer"
            component={Prayer}
            options={({ route, navigation }) => ({
              title: route.params.name,
              headerRight: () => (
                <View style={{ width: 30, alignItems: "center" }}>
                  <FontAwesome5
                    name="cog"
                    size={22}
                    color={secondaryText}
                    onPress={() => navigation.navigate("Settings")}
                  />
                </View>
              ),
            })}
          />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
