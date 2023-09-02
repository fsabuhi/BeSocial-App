import { StyleSheet, View } from "react-native";
import NavigationScreen from "./screens/NavigationScreen";
import Quiz from "./screens/Quiz";
import Dictionary from "./screens/Dictionary";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { NavigationContainer } from "@react-navigation/native";
import {
  useApp,
  UserProvider,
  AppProvider,
  useUser,
  RealmProvider,
  useRealm
} from "@realm/react";
import { createRealmContext } from "@realm/react";
import HomeScreen from "./screens/HomeScreen";
import AuthScreen from "./screens/AuthScreen";
import styles from "./styling/Style";
import WelcomeScreen from "./screens/WelcomeScreen";
import { wordSchema, SuperMemoSchema } from "./api/schema";

export default function App() {
  return (
    <View style={styles.container}>
      <AppProvider id={"besocial-kovas"} >
        <UserProvider fallback={<AuthScreen />}>
          <RealmProvider
            schema={[SuperMemoSchema, wordSchema]}
          //   sync={{
          //   flexible: true,
          //   initialSubscriptions: {
          //     update(subs, realm) {
          //       subs.add(realm.objects(SuperMemoSchema));
          //     },
          //   },
          // }}
          >
            <View style={styles.container}>
              <WelcomeScreen/>
            </View>
          </RealmProvider>
        </UserProvider>
      </AppProvider>
    </View>
  );
}
