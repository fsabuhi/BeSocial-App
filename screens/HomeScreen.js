import * as React from "react";
import  Icon  from "react-native-elements";
import { SafeAreaView } from "react-native";
import PhotoView from "react-native-photo-view";
import ProgressBar from 'react-native-progress/Bar';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Linking,
  Image,
  TextInput,
  Button,
  Touchable,
  TouchableOpacity,
  KeyboardAvoidingView,
  Pressable,
  ScrollView
} from "react-native";
import styles from "../styling/Style";
import FlashCardContent_visible from "../components/FlashCardContent_visible.js";
import { useRealm, useUser } from "@realm/react";
import { color } from "@rneui/base";
export default function HomeScreen() {
  const name = useUser().customData['name']
  const level = useUser().customData['level']
  const hour = new Date().getHours();
  const [greeetingMessage,setGreetingMessage] = React.useState();
  const levelOrder = ["Pre-A1","A1","A2","B1","B2","C1-C2"];
  const currentlevelOrder = levelOrder.indexOf(level);
  const totalWordCount = useRealm().objects("word").filtered("level == $0", level).length;
  const learnedWordCount = useRealm().objects("SuperMemo").filtered("user == $0",useUser().id).length;
  console.log(learnedWordCount) 
  console.log(totalWordCount)
  const supportedURL = "https://www.instagram.com/p/CrNxrvFq14Y";
  return (
    <ImageBackground
      style={styles.container}
      resizeMode="cover"
      source={require("../assets/background.png")}
    >
      <SafeAreaView
        style={{
          paddingTop: Platform.OS === "android" ? 25 : 0,
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <View>
          <Text style={styles.mainWord}>✨Good Evening, {name}</Text>
        </View>

        <View style={{flexDirection:'row'}}>
        <Text style={styles.boldWord}>{levelOrder[currentlevelOrder]}</Text>
        <View style={styles.centeralize}>
          <ProgressBar progress={learnedWordCount/totalWordCount} width={200} height={10}/>
          </View>
          <Text style={styles.boldWord}>{levelOrder[currentlevelOrder+1]}</Text>
        </View>
        <ScrollView
          style={{ width: "100%", alignSelf: "center", padding: "5%" }}
        >
          <View style={styles.scrollContainer}>
            <Text style={styles.word}>
              Bu gün öyrəniləcək sözlərin sayı : 12
            </Text>
          </View>

          <View style={styles.scrollContainer}>
            <Text style={styles.mainWord}>Bilirdiniz mi?</Text>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(supportedURL);
              }}
            >
              <Image
                style={styles.post}
                source={require("../assets/post.png")}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.scrollContainer}>
            <Text style={styles.mainWord}>Günün sözü</Text>
            <View style={styles.flashCard}>
              <FlashCardContent_visible
                word={"act"}
                meaning={
                  "take action; do something/ behave in the way specified."
                }
                example={"He knew he had to act quickly"}
                translation={"hərəkət etmək/akt"}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

