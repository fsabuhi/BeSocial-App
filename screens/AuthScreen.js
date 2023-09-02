import "react-native-gesture-handler";
import * as React from "react";
import { Button, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login";
import Register from "./Register";

const Stack = createNativeStackNavigator();

export default function AuthScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
            headerShown: false,

        }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          screenOptions={{
            headerShown: false,
            backgroundColor: "#000000"
          }}
        />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
