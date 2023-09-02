import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { View, StyleSheet, ActivityIndicator, Text, ImageBackground, Image, TextInput, Button, Touchable, TouchableOpacity, KeyboardAvoidingView, Pressable } from 'react-native';
import getAudioLink from '../api/getAudioLink.js';
import { Audio } from 'expo-av';
import styles from '../styling/Style';
import FlashCardContent_visible from '../components/FlashCardContent_visible.js';
import {useUser,useRealm} from '@realm/react';
export default function Dictionary() {
    const [savedWord, saveWord] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [sound, setSound] = React.useState();
    const [found, setFound] = React.useState(false);
    const [foundWord,setFoundWord] = React.useState("")
    var user = useUser();
    const realm = useRealm();
    // const collection = context.services.get("mongodb-atlas").db("BeSocial").collection("users");
    // console.log(collection);
    // const doc = collection.insertOne({ user: '39214094091', name: 'lkdfjaklfdf',level:'fsdjflaksjfasl' });  

    var findWord = async function findWord(){
        setFound(false);
        setLoading(true);
        // const mongodb = user.mongoClient("mongodb-atlas");
        // const wordCollection = mongodb.db("BeSocial").collection("words");
        // var wordToSearch = savedWord.toLowerCase();
        // var searchResult = (await wordCollection.findOne({
        //     word: wordToSearch
        //   }))
        var searchResult = realm.objects('word').filtered('word = $0',savedWord.toLowerCase())[0];
        if (searchResult == null){
            setFound(false);
            setLoading(false);
            setFoundWord("");
            alert('Axtardığınız söz lüğətimizdə tapılmadı. Yaxın zamanda əlavə ediləcək.')

        }else{
            setFound(true);
            setLoading(false);
            setFoundWord(searchResult);
        }

    }

    var playSound = async function playSound() {
        setLoading(true);
        console.log(savedWord);
        try {
            var uri = await getAudioLink(savedWord);
            const { sound } = await Audio.Sound.createAsync({ uri: uri });
            setSound(sound);
            console.log('Playing Sound');
            setLoading(false);
            setFound(true);
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
        <KeyboardAvoidingView behavior='bottom' style={styles.container}>
            <ImageBackground style={styles.container} resizeMode="cover" source={require('../assets/background.png')}>
                <SafeAreaView style={{
                    paddingTop: Platform.OS === 'android' ? 25 : 0
                    , flex: 1,
                }}>
                    <View style={styles.login}>
                    {found ? <View style={styles.flashCard}>
                         <FlashCardContent_visible
                            word={foundWord['word']}
                            example={foundWord['example']}
                            meaning={foundWord['meaning']}
                            translation={foundWord['translation']}
                        /> 
                        </View>
                        : undefined}
                        <TextInput
                            style={styles.placeholder}
                            placeholder='Söz'
                            placeholderTextColor='#fad745'
                            keyboardType='ascii-capable'
                            onChangeText={saveWord}
                        />

                        {loading ? <Image style={{
                            width: "20%",
                            height: undefined,
                            aspectRatio: 1 / 1,
                            alignSelf: "center"
                        }}

                            source={require('../assets/search.gif')} />
                            : <TouchableOpacity onPress={findWord} style={
                                styles.button

                            }><Text style={{ color: 'white' }}>Axtar</Text></TouchableOpacity>}
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </KeyboardAvoidingView>
    )
}
