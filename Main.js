import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PrayerList from "./screens/PrayerList";
import Prayer from "./screens/Prayer";
import Settings from "./screens/Settings";
import { Ionicons } from "@expo/vector-icons";
import ThemeContext from "./ThemeContext";
import useTheme from "./useTheme";
const Stack = createNativeStackNavigator();

export default function Main() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const { secondaryBg, primaryText, secondaryText } = useTheme();

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
          }}
        >
          <Stack.Screen
            name="Narek"
            component={PrayerList}
            options={({ navigation }) => ({
              headerRight: () => (
                <Ionicons
                  name="settings-outline"
                  size={20}
                  color={secondaryText}
                  style={{ marginRight: 15 }}
                  onPress={() => navigation.navigate("Settings")}
                />
              ),
              headerLeft: () => (
                <View style={{ flexDirection: "row", marginRight: 15 }}>
                  <Ionicons
                    name={theme === "light" ? "moon" : "sunny"}
                    size={20}
                    color={secondaryText}
                    style={{ marginRight: 15 }}
                    onPress={toggleTheme}
                  />
                </View>
              ),
            })}
          />

          <Stack.Screen
            name="Prayer"
            component={Prayer}
            options={({ route }) => ({
              title: `Prayer ${route.params.prayerIdx + 1}`,
            })}
          />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
