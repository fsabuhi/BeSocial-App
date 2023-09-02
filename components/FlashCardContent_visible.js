import * as React from "react";
import { useState } from "react";
import Icon from "react-native-vector-icons";
import { SafeAreaView, VirtualizedList } from "react-native";
import {
  View,
  StyleSheet,
  Audi,
  Text,
  ImageBackground,
  ActivityIndicator,
  Image,
  TextInput,
  Button,
  Touchable,
  TouchableOpacity,
  KeyboardAvoidingView,
  Pressable
} from "react-native";
import androidSafeAreaView from "../screens/androidSafeAreaView";
import { Audio } from "expo-av";
import getAudioLink from "../api/getAudioLink.js";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from '../styling/Style';


export default function FlashCardContent_visible(props) {
    const [loading, setLoading] = React.useState(false);
    const [sound, setSound] = React.useState();
    async function playSound() {
      setLoading(true);
      console.log("Loading Sound");
      let uri = await getAudioLink(props.word);
      const { sound } = await Audio.Sound.createAsync({ uri: uri });
      setSound(sound);
      console.log("Playing Sound");
      setLoading(false);
      await sound.playAsync();
    }
  
    React.useEffect(
      () => {
        return sound
          ? () => {
              console.log("Unloading Sound");
              sound.unloadAsync();
            }
          : undefined;
      },
      [sound]
    );
    return (
      <View>
        <View>
          <Text style={styles.mainWord}>
            {props.word}
          </Text>
          <TouchableOpacity
            onPress={playSound}
            style={{
              alignSelf: "center",
              borderRadius: 50,
              borderColor: "#fad745",
              borderWidth: 2,
              backgroundColor: "transparent",
              padding: "2%"
            }}
          >
            {loading
              ? <ActivityIndicator />
              
              :<MaterialCommunityIcons
                      name="volume-high"
                      color="#fad745"
                      size= {20}
                    />}
          </TouchableOpacity>
        </View>
        <Text style={styles.word}>
          {props.meaning}
        </Text>
        <Text style={styles.word}>
          {props.example}
        </Text>
        <Text style={styles.boldWord}>
          {props.translation}
        </Text>
      </View>
    )};
