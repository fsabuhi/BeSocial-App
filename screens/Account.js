import * as React from "react";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native";
import ProgressBar from 'react-native-progress/Bar';

import {
  View,
  StyleSheet,
  Text,
  Linking,
  ImageBackground,
  Image,
  TextInput,
  Button,
  Touchable,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  Pressable
} from "react-native";
import styles from "../styling/Style";
import { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useApp, UserProvider, AppProvider,useUser,useRealm } from '@realm/react';
import Realm from 'realm';
import EditInfo from './EditInfo'
export default function Account() {
  const app = useApp();
  const realm = useRealm();
  const level = useUser().customData['level']
  const totalWordCount = useRealm().objects("word").filtered("level == $0", level).length;
  const learnedWordCount = useRealm().objects("SuperMemo").filtered("user == $0",useUser().id).length;
  const [showModal, triggerShowModal] = useState(false);
  const levelOrder = ["Pre-A1","A1","A2","B1","B2","C1-C2"];
  const currentlevelOrder = levelOrder.indexOf(level);
  const levelName = {
    "Pre-A1": "Pre-A1 (Foundation)",
    "A1": "A1 (Elementary)",
    "A2": "A2 (Pre-Intermediate)",
    "B1": "B1 (Intermediate)",
    'B2': "B2 (Upper-Intermediate)",
    "C1-C2": "C1-C2 (Advanced)"
  };
  return (
    <KeyboardAvoidingView behavior="bottom" style={[styles.container]}>
      <ImageBackground
        style={styles.container}
        resizeMode="cover"
        source={require("../assets/background.png")}
      >
        <SafeAreaView
          style={{
            paddingTop: Platform.OS === 'android' ? 25 : 0,
            flex: 1,
            justifyContent: "space-around"
          }}
        >
          <Modal
            transparent={true}
            animationType="fade"
            visible={showModal}

          >
            <SafeAreaView
              style={{
                paddingTop: Platform.OS === "android" ? 25 : 0,
                flex: 1
              }}
            >
              <View style={styles.modalView}>
                <View>
                  <TouchableOpacity onPress={() => { triggerShowModal(!showModal) }}>
                    <MaterialCommunityIcons
                      name="close"
                      color={'white'}
                      size={30}
                    />
                  </TouchableOpacity>
                </View>
                <EditInfo/>
              </View>
            </SafeAreaView>
          </Modal >
          <Pressable onPress={() => { triggerShowModal(!showModal) }}>
            <View style={styles.blockContainer}>
              <Image
                style={styles.profile}
                source={require("../assets/sabuhi.jpeg")}
              />
              <View style={{ justifyContent: "center" }}>
                <Text style={styles.mainWord}>{useUser().customData['name']}</Text>
                <Text style={styles.word}>{levelName[useUser().customData['level']]}</Text>
                <ProgressBar progress={learnedWordCount/totalWordCount} width={200} height={10}/>
              </View>
            </View>
            
          </Pressable>
          <View style={{ width: "90%", alignSelf: "center" }}>
            {/* <TouchableOpacity style={styles.button}>
            <MaterialCommunityIcons
                name="rotate-left"
                color="white"
                size={30}
              />
              <Text style={styles.word}>Yeni Sözlər öyrən</Text>
            </TouchableOpacity> */}

            <TouchableOpacity style={styles.button} onPress={() => { triggerShowModal(!showModal) }} >
              <MaterialCommunityIcons name="pencil" color="white" size={30} />
              <Text style={styles.word}>Məlumatları dəyiş</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.tgloginbutton}
              onPress={() => {
                Linking.openURL("https://t.me/BeSocialBot");
              }}
            >
              <Icon
                name="sc-telegram"
                type="evilicon"
                color="#fbfbf9"
                size={30}
              />
              <Text style={styles.word}>Telegram Bota keçid</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <MaterialCommunityIcons
                name="rotate-left"
                color="white"
                size={30}
              />
              <Text style={styles.word}>Hesabı Sıfırla</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => { app.currentUser?.logOut(); }}>
              <MaterialCommunityIcons name="logout"
                color="white"
                size={30} />
              <Text style={styles.word}>Çıxış</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}
