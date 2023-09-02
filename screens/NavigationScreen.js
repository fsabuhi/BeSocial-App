import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Quiz from "./Quiz";
import Dictionary from './Dictionary';
import HomeScreen from './HomeScreen';
import Account from './Account';



export default function NavigationScreen() {
  const Tab = createBottomTabNavigator();
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <ImageBackground
          style={styles.container}
          resizeMode="cover"
          source={require("../assets/background.png")}
        >
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: "#fad745",
              tabBarInactiveTintColor: "#fbfbf9",
              headerShown: false,
              backgroundColor: "#f4511e",
              // tabBarStyle: { backgroundColor:'#000' }
              tabBarBackground: () =>
                <BlurView
                  tint="dark"
                  intensity={100}
                  style={StyleSheet.absoluteFill}
                />
            }}
          >
            <Tab.Screen
              name="Əsas səhifə"
              component={HomeScreen}
              options={{
                tabBarIcon: ({ color, size }) =>
                  <MaterialCommunityIcons
                    name="home"
                    color={color}
                    size={size}
                  />
              }}
            />
            <Tab.Screen
              name="Quiz"
              component={Quiz}
              options={{
                tabBarIcon: ({ color, size }) =>
                  <MaterialCommunityIcons
                    name="chat-question"
                    color={color}
                    size={size}
                  />
              }}
            />
           <Tab.Screen
              name="Lüğət"
              component={Dictionary}
              options={{
                tabBarIcon: ({ color, size }) =>
                  <MaterialCommunityIcons
                    name="book-search"
                    color={color}
                    size={size}
                  />
              }}
            />
                        <Tab.Screen
              name="Hesab"
              component={Account}
              options={{
                tabBarIcon: ({ color, size }) =>
                  <MaterialCommunityIcons
                    name="account-circle"
                    color={color}
                    size={size}
                  />
              }}
            />

          </Tab.Navigator>
        </ImageBackground>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
