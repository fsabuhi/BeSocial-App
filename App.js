import React from "react";
import { View } from "react-native";
import {
  AppProvider,
  UserProvider,
  RealmProvider,
  useRealm
} from "@realm/react";
import { createRealmContext } from "@realm/react";
import HomeScreen from "./screens/HomeScreen";
import AuthScreen from "./screens/AuthScreen";
import styles from "./styling/Style";
import WelcomeScreen from "./screens/WelcomeScreen";
import { wordSchema, SuperMemoSchema } from "./api/schema";

// This is the main component of the app
export default function App() {
  return (
    // The top-level container for the app
    <View style={styles.container}>
      {/* The AppProvider component provides the app with an ID */}
      <AppProvider id={"besocial-kovas"} >
        {/* The UserProvider component provides the app with a fallback screen */}
        <UserProvider fallback={<AuthScreen />}>
          {/* The RealmProvider component provides the app with a Realm database */}
          <RealmProvider
            schema={[SuperMemoSchema, wordSchema]}
          >
            {/* The WelcomeScreen component is the first screen the user sees */}
            <View style={styles.container}>
              <WelcomeScreen/>
            </View>
          </RealmProvider>
        </UserProvider>
      </AppProvider>
    </View>
  );
}