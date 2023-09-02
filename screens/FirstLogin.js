import * as React from "react";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
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
import { getWords } from "../features/realmFunctions";

export default function FirstLogin() {
    user = useUser();
    const [selectedLevel, setSelectedLevel] = useState();
    const [name, enteredName]  = useState("");
    async function saveData(){
        const customUserDataCollection = user
        .mongoClient('mongodb-atlas')
        .db('BeSocial')
        .collection('users');

        const filter = {
            user: user.id, // Query for the user object of the logged in user
          };
          const updateDoc = {
            $set: {
              level : selectedLevel,
              name : name
            }
          };
          const options = {upsert: true};
          await customUserDataCollection.updateOne(filter, updateDoc,options);
          // Refresh custom user data once it's been updated on the server
          await user.refreshCustomData();
          await user.callFunction('assignSuperMemo', user.id, selectedLevel);

    }
return(
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

<View style={styles.login}>
<Image
              style={styles.profile}
              source={require("../assets/sabuhi.jpeg")}
            />
            <TextInput
              style={styles.widePlaceholder}
              placeholder="Adınız"
              onChangeText={enteredName}
              placeholderTextColor="#fad745"
              keyboardType="ascii-capable"
            />
            <Picker
              selectedValue={selectedLevel}
              placeholder="İngilis dili səviyyəniz"
              style={{
                justifyContent: "center",
                borderRadius: 20,
                borderColor: "#fad745",
                borderWidth: 2,
                color: "#fad745",
                padding: "3%",
                margin: "1%",
                width: "90%",
                height: "30%"
              }}
              itemStyle={{ color: "white", height: "150%" }}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLevel(itemValue)}
            >
              <Picker.Item label="Pre-A1 (Foundation)" value="Pre-A1" />
              <Picker.Item label="A1 (Elementary)" value="A1" />
              <Picker.Item label="A2 (Pre-Intermediate)" value="A2" />
              <Picker.Item label="B1 (Intermediate)" value="B1" />
              <Picker.Item label="B2 (Upper-Intermediate)" value="B2" />
              <Picker.Item label="C1-C2 (Advanced)" value="C1-C2" />
            </Picker>
            <View>
              <TouchableOpacity style={styles.loginbutton} onPress={saveData} >
                <Text>Yadda saxla</Text>
              </TouchableOpacity>

            </View>
          </View>
          </SafeAreaView>
          </ImageBackground>
          </KeyboardAvoidingView>


)
}