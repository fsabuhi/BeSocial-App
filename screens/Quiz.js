import React, { useRef, useEffect } from "react";
import { useState } from "react";
import Icon from "react-native-vector-icons";
import { sync } from "../features/realmFunctions.js";
import { SafeAreaView, VirtualizedList } from "react-native";
import { getWords } from "../features/realmFunctions.js";
import { getSuperMemo } from "../features/realmFunctions.js";
import { SuperMemo } from "../features/SuperMemo.js";
//import mongodb from 'mongodb';
import { ObjectId } from "bson";
import {
  View,
  StyleSheet,
  Animated,
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
import { SuperMemoSchema, wordSchema } from "../api/schema.js";
import androidSafeAreaView from "./androidSafeAreaView.js";
import { Audio } from "expo-av";
import getAudioLink from "../api/getAudioLink.js";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "../styling/Style";
import FlashCardContent_visible from "../components/FlashCardContent_visible.js";
import FlashCardContent_hidden from "../components/FlashCardContent_hidden.js";
import { createRealmContext, useQuery, useRealm, useUser } from "@realm/react";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry.js";

const FadeInView = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(
    () => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true
      }).start();
    },
    [fadeAnim]
  );

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
};

export default function Quiz() {
  const [show, show_answer] = useState(false);
  const realm = useRealm();
  const user = useUser();
 //getSuperMemo();
  // Access linked MongoDB collection
  const [quiz, setquiz] = useQuery("SuperMemo").filtered("interval == 0 AND user == $0", user.id);
  console.log(quiz);
  function calculate_update_SuperMemo(quiz, user_grade) {
    const newSuperMemo = new SuperMemo(
      new ObjectId(quiz._id),
      quiz.user,
      quiz.word, 
      quiz.repetition,
      quiz.efactor,
      quiz.interval
    );
    newSuperMemo.reCalculate(user_grade);
    realm.write(() => {
      realm.create("SuperMemo", newSuperMemo, "modified");
    });
    show_answer(false);
  }



  function FlashCard_buttons() {
    return (
      <FadeInView>
        <View style={styles.flashCardbuttons}>
          <TouchableOpacity
            style={styles.flashCardbutton}
            onPress={() => calculate_update_SuperMemo(quiz, 5)}
          >
            <Text style={styles.buttonWord}>Bilirdim</Text>
            <Text style={{ fontSize: 8, color: "#fbfbf9" }}>7 gün</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flashCardbutton}
            onPress={() => calculate_update_SuperMemo(quiz, 3)}
          >
            <Text style={styles.buttonWord}>Təxmini bilirdim</Text>
            <Text style={{ fontSize: 8, color: "#fbfbf9" }}>4 gün</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flashCardbutton}
            onPress={() => calculate_update_SuperMemo(quiz, 1)}
          >
            <Text style={styles.buttonWord}>Öyrəndim</Text>
            <Text style={{ fontSize: 8, color: "#fbfbf9" }}>3 gün</Text>
          </TouchableOpacity>
        </View>
      </FadeInView>
    );
  }
  if (quiz)
    return (
      <ImageBackground
        style={styles.container}
        resizeMode="cover"
        source={require("../assets/background.png")}
      >
        <SafeAreaView style={styles.flex_center_spaced}>
          <View style={styles.flashCard}>
            {show
              ? <FadeInView>
                  <FlashCardContent_visible
                    word={quiz.word}
                    example={
                      realm.objects("word").filtered("word == $0", quiz.word)[0]
                        .example
                    }
                    meaning={
                      realm.objects("word").filtered("word == $0", quiz.word)[0]
                        .meaning
                    }
                    translation={
                      realm.objects("word").filtered("word == $0", quiz.word)[0]
                        .translation
                    }
                  />
                </FadeInView>
              : <FlashCardContent_hidden word={quiz.word} />}
          </View>

          {show
            ? undefined
            : <TouchableOpacity
                onPress={() => {
                  show_answer(current => !current);
                }}
                style={styles.button}
              >
                <Text style={{ color: "white" }}>Göstər</Text>
              </TouchableOpacity>}

          {show ? <FlashCard_buttons /> : undefined}
          {/* <View style={{ flexDirection: 'column', alignItems: 'center', alignItems: 'center', marginBottom: '3%' }}>
                    <Text style={{ color: 'white' }}>
                        Qeyd: Quiz bölməsi SuperMemo alqoritmi ilə işləyir
                    </Text>
                    <TouchableOpacity ><Text style={{ color: 'white' }}> Əlavə Məlumat</Text></TouchableOpacity>
                </View> */}
        </SafeAreaView>
      </ImageBackground>
    );
  else
    return (
      <ImageBackground
        style={styles.container}
        resizeMode="cover"
        source={require("../assets/background.png")}
      >
        <SafeAreaView style={styles.flex_center_spaced}>
          <Text style={styles.mainWord}>Bu günlük bu qədər</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // user.callFunction(
              //   "assignSuperMemo",
              //   user.id,
              //   user.customData["level"]
              // );
              update();
            }}
          >
            <Text style={styles.word}>Yeni sözlər</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    );
}
