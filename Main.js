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
import Info from "./screens/Info";
const Stack = createNativeStackNavigator();

const mainInfoText = `This app connects Armenian diaspora youth with their spiritual heritage by making traditional prayers accessible in English. \n\n It features prayers used throughout history within the Armenian Apostolic Church. The app is designed for young Armenians living outside their ancestral homeland who want to explore their faith and cultural identity. My goal is to provide an easy way for you to incorporate these time-honored Armenian prayers into your daily life, fostering a sense of connection to your roots regardless of your fluency in the Armenian language. \n\n I hope you'll use this app to grow closer to Christ and deepen your faith while embracing your Armenian Christian heritage.`;

export default function Main() {
  const { secondaryBg, primaryText, secondaryText } = useTheme();
  const {
    toggleTheme,
    theme,
    language,
    setInfoText,
    setInfoTitle,
    infoText,
    infoTitle,
  } = useSettings();

  const renderInfoIcon = (onPress) => (
    <View style={{ width: 30, alignItems: "center" }}>
      <FontAwesome5
        name="info-circle"
        size={22}
        color={secondaryText}
        onPress={onPress}
      />
    </View>
  );

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
              headerLeft: () => (
                <View>
                  {renderInfoIcon(() => {
                    setInfoText(mainInfoText);
                    setInfoTitle("About");

                    return navigation.navigate("Info");
                  })}
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
              options={({ route, navigation }) => ({
                title: route.params.name,
                slug: `${route.params.slug}`,
                headerRight: () => (
                  <View>
                    {renderInfoIcon(() => {
                      setInfoText(i.infoDescription);
                      setInfoTitle(i.infoTitle);

                      return navigation.navigate("Info");
                    })}
                  </View>
                ),
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
          <Stack.Screen
            name="Info"
            component={Info}
            options={{ title: infoTitle }}
          />
          <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
