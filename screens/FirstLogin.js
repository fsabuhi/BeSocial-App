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

// This is the main component of the First Login screen
export default function FirstLogin() {
    // Get the user object from the Realm UserProvider
    user = useUser();
    // Set up state for the selected level and entered name
    const [selectedLevel, setSelectedLevel] = useState();
    const [name, enteredName]  = useState("");

    // Function to save the entered data to the user's custom data collection
    async function saveData(){
        // Get the custom user data collection for the logged in user
        const customUserDataCollection = user
        .mongoClient('mongodb-atlas')
        .db('BeSocial')
        .collection('users');

        // Set up a filter to query for the user object of the logged in user
        const filter = {
            user: user.id,
        };
        // Set up an update document with the entered name and selected level
        const updateDoc = {
            $set: {
                name: name,
                level: selectedLevel,
            },
        };
        // Update the user's custom data collection with the entered data
        await customUserDataCollection.updateOne(filter, updateDoc, { upsert: true });
        // Navigate to the Login screen
        navigation.navigate('Login');
    }

    // Render the First Login screen
    return (
        <View style={styles.container}>
            {/* Render the BeSocial logo */}
            <Image
                style={styles.logo}
                source={require('../assets/BeSocialLogo.png')}
            />
            {/* Render the text input for the user's name */}
            <TextInput
                style={styles.input}
                onChangeText={enteredName}
                value={name}
                placeholder="Enter your name"
            />
            {/* Render the picker for the user's level */}
            <Picker
                selectedValue={selectedLevel}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedLevel(itemValue)
                }
                style={styles.picker}
            >
                <Picker.Item label="Select your level" value="" />
                <Picker.Item label="Beginner" value="beginner" />
                <Picker.Item label="Intermediate" value="intermediate" />
                <Picker.Item label="Advanced" value="advanced" />
            </Picker>
            {/* Render the button to save the entered data */}
            <Pressable style={styles.button} onPress={saveData}>
                <Text style={styles.buttonText}>Save</Text>
            </Pressable>
        </View>
    );
}