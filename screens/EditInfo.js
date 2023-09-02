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
import { useApp, UserProvider, AppProvider, useUser } from "@realm/react";
import Realm from "realm";

export default function EditInfo() {
  user = useUser();

  const [selectedLanguage, setSelectedLanguage] = useState(
    user.customData["level"]
  );
  const [email, enteredEmail] = useState(user.profile["email"]);
  const [name, enteredName] = useState(user.customData["name"]);
  const [password, enteredPassword] = useState("");



  async function saveData() {
    const customUserDataCollection = user
      .mongoClient("mongodb-atlas")
      .db("BeSocial")
      .collection("users");

    const filter = {
      user: user.id // Query for the user object of the logged in user
    };
    const updateDoc = {
      $set: {
        level: selectedLanguage,
        name: name
      }
    };
    const options = { upsert: true };
    await customUserDataCollection.updateOne(filter, updateDoc, options);
    // Refresh custom user data once it's been updated on the server
    const customUserData = await user.refreshCustomData();
    alert("Dəyişikliklər qeydə alındı");
  }
  return (
    <View style={styles.login}>
      <Image style={styles.profile} source={require("../assets/sabuhi.jpeg")} />
      <TextInput
        style={styles.widePlaceholder}
        placeholder="Adınız"
        onChangeText={enteredName}
        value={name}
        placeholderTextColor="#fad745"
        keyboardType="ascii-capable"
      />
      <TextInput
        style={styles.widePlaceholder}
        placeholder="E-Mail Adresi"
        onChangeText={enteredEmail}
        value={email}
        editable={false}
        autoCapitalize="none"
        placeholderTextColor="#fad745"
        keyboardType="email-address"
      />

      <Picker
        selectedValue={selectedLanguage}
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
        onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
      >
              <Picker.Item label="Pre-A1 (Foundation)" value="Pre-A1" />
              <Picker.Item label="A1 (Elementary)" value="A1" />
              <Picker.Item label="A2 (Pre-Intermediate)" value="A2" />
              <Picker.Item label="B1 (Intermediate)" value="B1" />
              <Picker.Item label="B2 (Upper-Intermediate)" value="B2" />
              <Picker.Item label="C1-C2 (Advanced)" value="C1-C2" />
      </Picker>
      <View>
        <TouchableOpacity style={styles.loginbutton} onPress={saveData}>
          <Text>Yadda saxla</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
