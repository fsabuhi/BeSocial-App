
import * as React from "react";
import {
  View,
  StyleSheet,
  Text
} from "react-native";
import androidSafeAreaView from "../screens/androidSafeAreaView";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import styles from '../styling/Style';

export default function FlashCardContent_hidden(props) {
    return (
      <View>
        <Text style={styles.mainWord}>
          {props.word}
        </Text>
      </View>
    );
  }
