import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon, Divider, Button } from 'react-native-elements';
import { Audio } from 'expo-av';
import {
    BACKGROUNDHOME,
    TEXTHOME,
    ITEMSHOME,
    TOPSCREENHOME,
} from '../../styles/styleValues';
import { tramsitDictationApi, tramsitNoteReferenceApi } from '../../api/sound';
import { getStorageItem, ID_USER } from '../../../utils/asyncStorageManagement';
import Graphic from '../../components/Graphic';
import { Ionicons } from '@expo/vector-icons';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../../utils/colorPalette';
import ScreenPlaying from '../../components/ScreenPlaying';

export default function Dictation({ route }) {
    // ---------------------
    // DICTADO PARA GRAFICAR
    // ---------------------
    const { dictation } = route.params;
    const navigation = useNavigation();
    const [reproduciendo, setReproduciendo] = useState(false);
    const [sound, setSound] = useState();

    useEffect(() => {
        return sound
            ? () => {
                  sound.unloadAsync();
                  setReproduciendo(false);
              }
            : undefined;
    }, [sound]);

    const playStick = async () => {
        try {
            const timePulseMs = Math.round(60000 / dictation.bpm);
            const soundObjectStickArr = [];

            const soundObjectStick0 = new Audio.Sound();
            await soundObjectStick0.loadAsync(
                require('../../../assets/stick_sound.mp3')
            );
            soundObjectStickArr.push(soundObjectStick0);

            const soundObjectStick1 = new Audio.Sound();
            await soundObjectStick1.loadAsync(
                require('../../../assets/stick_sound.mp3')
            );
            soundObjectStickArr.push(soundObjectStick1);

            const soundObjectStick2 = new Audio.Sound();
            await soundObjectStick2.loadAsync(
                require('../../../assets/stick_sound.mp3')
            );
            soundObjectStickArr.push(soundObjectStick2);

            const soundObjectStick3 = new Audio.Sound();
            await soundObjectStick3.loadAsync(
                require('../../../assets/stick_sound.mp3')
            );
            soundObjectStickArr.push(soundObjectStick3);
            // console.log('-------');
            // console.log(dictation.numerador);
            // console.log('-------');
            for (let i = 0; i < dictation.numerador && i < 4; i++) {
                setTimeout(function () {
                    soundObjectStickArr[i].playAsync();
                }, timePulseMs * i);
            }

            if (dictation.numerador <= 4) {
                return timePulseMs * dictation.numerador;
            } else {
                return timePulseMs * 4;
            }
        } catch (error) {
            setReproduciendo(false);
            return 0;
        }
    };

    const playNoteRef = async () => {
        const id = await getStorageItem(ID_USER);
        const tran = await tramsitNoteReferenceApi(id);
        console.log(tran);

        const { sound } = await Audio.Sound.createAsync({ uri: tran });
        setSound(sound);

        await sound.playAsync();
        setReproduciendo(false);
    };

    const playDictado = async () => {
        try {
            setReproduciendo(true);
            const id = await getStorageItem(ID_USER);
            const tran = await tramsitDictationApi(id);
            console.log(tran);

            const soundObject = new Audio.Sound();
            await soundObject.loadAsync({ uri: tran });

            soundObject.setOnPlaybackStatusUpdate(async (status) => {
                const dur = status.durationMillis;

                setTimeout(async () => {
                    // audio has finished!
                    await soundObject.unloadAsync();
                    setReproduciendo(false);
                }, dur + 1000);

                // if (status.didJustFinish === true) {
                //     // audio has finished!
                //     await soundObject.unloadAsync();
                //     setReproduciendo(false);
                // }
            });

            const timeToStart = await playStick();

            setTimeout(function () {
                soundObject.playAsync();
            }, timeToStart);

            // const { sound } = await Audio.Sound.createAsync({ uri: tran });
            // setSound(sound);

            // console.log('Playing Sound');
            // await sound.playAsync();
        } catch (error) {
            await soundObject.unloadAsync();
            setReproduciendo(false);
        }
    };

    const openSolution = () => {
        navigation.navigate('solution', {
            dictation,
        });
    };
    const traducirClave = (claveParamFunc) => {
        let claveTrans;
        switch (claveParamFunc) {
            case 'Fa':
                claveTrans = 'bass';
                break;
            case 'Sol':
                claveTrans = 'treble';
                break;
        }
        return claveTrans;
    };

    // console.log(dictation)
    return (
        <>
            <View style={styles.container}>
                <View style={styles.graficoContainer}>
                    <Graphic
                        figurasConCompas={[['1']]}
                        figurasSinCompas={null}
                        dictadoGeneradoTraducidoParam={[dictation.nota_base]}
                        numeradorParam={dictation.numerador}
                        denominadorParam={dictation.denominador}
                        claveParam={traducirClave(dictation.clave)}
                        escalaDiatonica={dictation.escala_diatonica}
                        isNotaReferencia={true}
                    />
                </View>
                <Button
                    title="Play Nota referencia"
                    buttonStyle={styles.btnPlayNoteRef}
                    style={{ width: '70%', alignSelf: 'center' }}
                    onPress={playNoteRef}
                />
                <Icon
                    type="material-community"
                    name="play-circle-outline"
                    iconStyle={styles.iconPlay}
                    onPress={playDictado}
                />
                {/* { reproduciendo == true ? <Ionicons 
                name="md-stop-outline" 
                size={styles.iconPlay} 
                color="black" 
                onPress={setReproduciendo(false)}
                /> :  <Ionicons 
                // name="play-outline" 
                name="md-stop-outline"
                style={styles.iconPlay} 
                color="black" 
                onPress={()=>{
                    setReproduciendo(true);
                    // playDictado();
                }} />             
            } */}
                {/* <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={openSolution}
                    >
                        <Text style={styles.textbutton}>Ver Solución</Text>
                    </TouchableOpacity>
                </View> */}
            </View>
            <Button
                title="Ver solución"
                buttonStyle={styles.btonShowSolution}
                onPress={openSolution}
            />
            <ScreenPlaying isVisible={reproduciendo} text={'Escucha...'} />
        </>
    );
}

const styles = StyleSheet.create({
    btonShowSolution: {
        backgroundColor: PRIMARY_COLOR,
    },
    btnPlayNoteRef: {
        backgroundColor: SECONDARY_COLOR,
    },
    iconPlay: {
        fontSize: 150,
        marginTop: 20,
    },
    container: {
        // alignItems: 'center',
        height: '90%',
        width: '100%',
    },
    buttonContainer: {
        alignItems: 'center',
        height: '7%',
    },
    button: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },
    graficoContainer: {
        paddingTop: 20,
        paddingHorizontal: 5,
        height: '35%',
        alignItems: 'center',
        width: '40%',
        marginLeft: 100,
    },
    grafcio: {
        height: 200,
        width: 900,
    },
    textbutton: {
        color: TEXTHOME,
        fontSize: 25,
        fontWeight: 'bold',
    },
});
