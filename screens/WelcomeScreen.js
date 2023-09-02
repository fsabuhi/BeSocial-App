import * as React from "react";
import { Button, View, Text } from "react-native";
import Login from "./Login";
import Register from "./Register";
import {useUser,useEffect} from '@realm/react';
import NavigationScreen from "./NavigationScreen";
import AuthScreen from "./AuthScreen";
import styles from '../styling/Style';
import { useState } from "react";
import FirstLogin from "./FirstLogin";
import { getWords, getSuperMemo } from "../features/realmFunctions";
export default function WelcomeScreen() {
    const user = useUser();
    getWords();
    getSuperMemo();
    const [isFirstLogin, setIsFirstLogin] = (useState(user.customData['level'] == ""));
    function readCurrentCustomUserData() {
      setIsFirstLogin(user.customData['level'] == "");
        user.removeAllListeners();
    }
    if (isFirstLogin == true){
    user.addListener(readCurrentCustomUserData)
    }
  return (
    <View style={styles.container}>
    {isFirstLogin ? <FirstLogin/> : <NavigationScreen/>}
    </View>
  );
}

