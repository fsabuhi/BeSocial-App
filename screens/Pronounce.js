import * as React from 'react';
import  Icon  from 'react-native-elements';
import { SafeAreaView } from 'react-native';
import { View, StyleSheet, ActivityIndicator, Text, ImageBackground, Image, TextInput, Button, Touchable, TouchableOpacity, KeyboardAvoidingView, Pressable } from 'react-native';
import getAudioLink from '../api/getAudioLink.js';
import { Audio } from 'expo-av';
import styles from '../styling/Style';
export default function Pronounce() {
    const [savedWord, saveWord] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [sound, setSound] = React.useState();
        var playSound = async function playSound() {
        setLoading(true);
        console.log(savedWord);
        try {
            let uri = await getAudioLink(savedWord);
            const { sound } = await Audio.Sound.createAsync({ uri: uri });
            setSound(sound);
            console.log('Playing Sound');
            setLoading(false);
            await sound.playAsync();
        }
        catch {
            setLoading(false);
            alert()
        }
    }
    React.useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    return (
        <KeyboardAvoidingView behavior='padding' style={[styles.container]}>
            <ImageBackground style={styles.container} resizeMode="cover" source={require('../assets/background.png')}>
                <SafeAreaView style={{
                    paddingTop: Platform.OS === 'android' ? 25 : 0
                    , flex: 1,
                }}>
                    <View style={styles.login}>
                        <TextInput
                            style={styles.placeholder}
                            placeholder='Söz'
                            placeholderTextColor='#fad745'
                            keyboardType='ascii-capable'
                            onChangeText={saveWord}
                        />
                        <TouchableOpacity onPress={playSound} style={{
                            alignSelf: 'center',
                            borderRadius: 50,
                            borderColor: "#fad745",
                            borderWidth: 2,
                            backgroundColor: "transparent",
                            padding: '2%',
                        }}>
                            {loading ? <ActivityIndicator />
                                : <Text style={{ color: 'white' }}>Tələffüz</Text>}</TouchableOpacity>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </KeyboardAvoidingView>
    )
}