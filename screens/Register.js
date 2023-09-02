import * as React from "react";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  TextInput,
  Button,
  Touchable,
  TouchableOpacity,
  KeyboardAvoidingView,
  Pressable
} from "react-native";
import styles from "../styling/Style";
import Login from "./Login";
import {useApp, UserProvider, AppProvider, useUser} from '@realm/react';
import Realm from 'realm';

export default function Register({navigation}) {
  

  const [email, enteredEmail] = useState("");
  const [password,enteredPassword] = useState("");
  const app = useApp();
  async function register() {
    await app.emailPasswordAuth.registerUser({ email, password });
    await app.logIn(Realm.Credentials.emailPassword(email, password));
  }

  
  return (
    <KeyboardAvoidingView behavior="bottom" style={[styles.container]}>
      <ImageBackground
        style={styles.container}
        resizeMode="cover"
        source={require("../assets/background.png")}
      >
        <SafeAreaView
          style={{
            paddingTop: Platform.OS === "android" ? 25 : 0,
            flex: 1
          }}
        >
          <View>
            <Image style={styles.icon} source={require("../assets/icon.png")} />
          </View>
          <View style={styles.login}>
            <TextInput
              style={styles.placeholder}
              placeholder="E-Mail Adresi"
              onChangeText={enteredEmail}
              autoCapitalize='none'
              placeholderTextColor="#fad745"
              keyboardType="email-address"
            />

            <TextInput
              style={styles.placeholder}
              onChangeText={enteredPassword}
              placeholder="Parol"
              placeholderTextColor="#fad745"
              secureTextEntry={true}
            />
            <View>
              <TouchableOpacity style={styles.loginbutton} onPress={register}>
                <Text>Qeydiyyatdan Keç</Text>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  margin: "1%"
                }}
              >
                <View
                  style={{ flex: 1, height: 1, backgroundColor: "#fbfbf9" }}
                />
                <View>
                  <Text
                    style={{ width: 50, textAlign: "center", color: "#fbfbf9" }}
                  >
                    və ya
                  </Text>
                </View>
                <View
                  style={{ flex: 1, height: 1, backgroundColor: "#fbfbf9" }}
                />
              </View>

              <TouchableOpacity style={styles.tgloginbutton}>
                <Icon name="sc-telegram" type="evilicon" color="#fbfbf9" />
                <Text style={{ color: "#f3ead3" }}>Telegram ilə daxil ol</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-end",
              marginBottom: "3%"
            }}
          >
            <Text style={{ color: "white" }}>Hesabınız var?</Text>
            <TouchableOpacity onPress={() => navigation.replace('Login')}>
              <Text style={{ color: "white",fontWeight:'bold' }}> Bura keçid edin</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}
