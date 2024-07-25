import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Prayer from "./screens/Prayer";
import Settings from "./screens/Settings";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import useTheme from "./useTheme";
import { useSettings } from "./SettingsProvider";
import { categories } from "./categories";
import PrayerList from "./screens/PrayerList";
import Info from "./screens/Info";
import Bookmarks from "./screens/Bookmarks"; // Add this import
const Stack = createNativeStackNavigator();

const mainInfoText = `This app connects Armenian diaspora youth with their spiritual heritage by making traditional prayers accessible in English. \n\n It features prayers used throughout history within the Armenian Apostolic Church. The app is designed for young Armenians living outside their ancestral homeland who want to explore their faith and cultural identity. My goal is to provide an easy way for you to incorporate these time-honored Armenian prayers into your daily life, fostering a sense of connection to your roots regardless of your fluency in the Armenian language. \n\n I hope you'll use this app to grow closer to Christ and deepen your faith while embracing your Armenian Christian heritage.`;

const IconButton = ({ onPress, children }) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      padding: 10, // This increases the touch area
      marginHorizontal: -10, // This offsets the increased padding
    }}
  >
    {children}
  </TouchableOpacity>
);

export default function Main() {
  const { secondaryBg, primaryText, secondaryText } = useTheme();
  const {
    toggleTheme,
    theme,
    language,
    setInfoText,
    setInfoTitle,
    toggleBookmark,
    isBookmarked,
    infoText,
    infoTitle,
  } = useSettings();

  const renderInfoIcon = (onPress) => (
    <IconButton onPress={onPress}>
      <FontAwesome5 name="info-circle" size={22} color={secondaryText} />
    </IconButton>
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
                <IconButton onPress={() => navigation.navigate("Settings")}>
                  <FontAwesome5 name="cog" size={22} color={secondaryText} />
                </IconButton>
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
          {categories.map(
            (i, idx) =>
              i.slug !== "bookmark" && (
                <Stack.Screen
                  name={i.title}
                  key={idx + i.title}
                  component={PrayerList}
                  options={({ route, navigation }) => ({
                    title: route.params.name,
                    slug: `${route.params.slug}`,
                    headerRight: () => (
                      <View>
                        {i.infoDescription &&
                          renderInfoIcon(() => {
                            setInfoText(i.infoDescription);
                            setInfoTitle(i.infoTitle);

                            return navigation.navigate("Info");
                          })}
                      </View>
                    ),
                  })}
                />
              )
          )}

          <Stack.Screen
            name="Bookmarks"
            component={Bookmarks}
            options={({ navigation }) => ({
              title: "Bookmarks",
              headerRight: () => (
                <IconButton onPress={() => navigation.navigate("Settings")}>
                  <FontAwesome5 name="cog" size={22} color={secondaryText} />
                </IconButton>
              ),
            })}
          />
          <Stack.Screen
            name="Prayer"
            component={Prayer}
            options={({
              route: {
                params: { name, id, slug: paramSlug, category },
              },
              navigation,
              slug,
            }) => ({
              title: name,
              headerRight: () => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity
                    style={{ marginRight: 30 }}
                    onPress={() =>
                      toggleBookmark(language, paramSlug, id, name, category)
                    }
                  >
                    <FontAwesome
                      name={
                        isBookmarked(language, paramSlug, id)
                          ? "bookmark"
                          : "bookmark-o"
                      }
                      size={22}
                      color={secondaryText}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Settings")}
                  >
                    <FontAwesome5 name="cog" size={22} color={secondaryText} />
                  </TouchableOpacity>
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
