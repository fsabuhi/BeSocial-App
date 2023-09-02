import * as React from "react";
import  {Icon}  from "react-native-elements";
import { SafeAreaView } from "react-native";
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
import styles from '../styling/Style';
import {useApp, UserProvider, AppProvider} from '@realm/react';
import Realm from 'realm';


export default function Login({navigation}) {
  const [email, enteredEmail] = useState("");
  const [password,enteredPassword] = useState("");
  const app = useApp();
  async function login() {
    try{
      await app.logIn(Realm.Credentials.emailPassword(email, password));
    }
    catch (AppError) {
      alert('Səhv E-Mail/Parol')
    }
    
  }
  return (
    <KeyboardAvoidingView behavior='padding' style={[styles.container]}>
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
              onChangeText={enteredEmail}
              placeholder="E-mail adresi"
              autoCapitalize='none'
              placeholderTextColor="#fad745"
              keyboardType="ascii-capable"
            />

            <TextInput
              style={styles.placeholder}
              onChangeText={enteredPassword}
              placeholder="Parol"
              placeholderTextColor="#fad745"
              secureTextEntry={true}
            />

            <View>
              <TouchableOpacity style={styles.loginbutton} onPress={login}>
                <Text>Daxil Ol</Text>
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
            <Text style={{ color: "white" }}>Qeydiyyatdan keçməmisiniz?</Text>
            <TouchableOpacity onPress={() => navigation.replace('Register')}>
              <Text style={{ color: "white",fontWeight:'bold' }}> Bura keçid edin</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

