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
// import { Audio } from 'expo-av';
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
import TrackPlayer, { Event, Capability } from 'react-native-track-player';

export default function Dictation({ route }) {
    // ---------------------
    // DICTADO PARA GRAFICAR
    // ---------------------
    const { dictation } = route.params;
    const navigation = useNavigation();
    const [reproduciendo, setReproduciendo] = useState(false);
    const [playingNoteRef, setPlayingNoteRef] = useState(false);
    const [sound, setSound] = useState();

    useEffect(() => {
        return sound
            ? () => {
                  sound.unloadAsync();
                  setReproduciendo(false);
              }
            : undefined;
    }, [sound]);

    const playWithoutSticks = async (tran) => {
        setReproduciendo(true);

        await TrackPlayer.destroy();
        await TrackPlayer.setupPlayer();

        await TrackPlayer.updateOptions({
            stopWithApp: false,
            alwaysPauseOnInterruption: true,
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
            ],
        });

        await TrackPlayer.add({
            id: 'trackId',
            url: tran,
            title: 'Track Title',
            artist: 'Track Artist',
        });

        TrackPlayer.addEventListener(Event.PlaybackQueueEnded, async (e) => {
            setReproduciendo(false);
            await TrackPlayer.destroy();
        });

        await TrackPlayer.play();
    };

    const playWithStick = async (tran) => {
        try {
            const timePulseMs = Math.round(60000 / dictation.bpm);

            await TrackPlayer.setupPlayer();

            await TrackPlayer.updateOptions({
                stopWithApp: false,
                alwaysPauseOnInterruption: true,
                capabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.SkipToNext,
                    Capability.SkipToPrevious,
                ],
            });

            for (let i = 0; i < dictation.numerador; i++) {
                await TrackPlayer.add({
                    id: 'stick' + i.toString(),
                    url: require('../../../assets/stick_sound.mp3'),
                    title: 'stick' + i.toString() + 'Title',
                    artist: 'stick' + i.toString(),
                    duration: 1,
                });
            }
            await TrackPlayer.add({
                id: 'trackId',
                url: tran,
                title: 'Track Title',
                artist: 'Track Artist',
            });

            //add listener on track change
            TrackPlayer.addEventListener(
                Event.PlaybackQueueEnded,
                async (e) => {
                    //console.log('song ended', e);

                    const trackId = (await TrackPlayer.getCurrentTrack()) - 1; //get the current id

                    console.log('track id', trackId);

                    // if (trackId !== index.current) {
                    //     setSongIndex(trackId);
                    //     isItFromUser.current = false;

                    //     if (trackId > index.current) {
                    //         goNext();
                    //     } else {
                    //         goPrv();
                    //     }
                    //     setTimeout(() => {
                    //         isItFromUser.current = true;
                    //     }, 200);
                    // }

                    // isPlayerReady.current = true;
                }
            );

            //add listener on track change
            TrackPlayer.addEventListener(
                Event.PlaybackTrackChanged,
                async (e) => {
                    console.log('song CHANGE', e);

                    const trackId = (await TrackPlayer.getCurrentTrack()) - 1; //get the current id

                    console.log('track id', trackId);
                    // isPlayerReady.current = true;
                }
            );

            // const a = await TrackPlayer.getTrack(3);
            // console.log(a);

            TrackPlayer.play();

            // var i = 1;
            // var interval = setInterval(async () => {
            //     console.log('SONIDO STICK');
            //     if (i == 1) {
            //         TrackPlayer.play();
            //     } else {
            //         TrackPlayer.seekTo(0);
            //         TrackPlayer.play();
            //     }
            //     i++;

            //     if (i > dictation.numerador || i > 4) {
            //         await TrackPlayer.add({
            //             id: 'trackId',
            //             url: tran,
            //             title: 'Track Title',
            //             artist: 'Track Artist',
            //         });

            //         const durationDictation = await TrackPlayer.getDuration();
            //         console.log(durationDictation);
            //         await TrackPlayer.play();

            //         var j = 0;
            //         var intervalDictation = setInterval(() => {
            //             if (j > 0) {
            //                 setReproduciendo(false);
            //                 clearInterval(intervalDictation);
            //             }
            //             j++;
            //         }, durationDictation * 1000 + 1000);

            //         clearInterval(interval);
            //     }
            // }, timePulseMs * i);

            // if (dictation.numerador <= 4) {
            //     return timePulseMs * dictation.numerador;
            // } else {
            //     return timePulseMs * 4;
            // }
        } catch (error) {
            setReproduciendo(false);
            console.log('ERROR STICKS');
            console.log(error);
            return 0;
        }
    };

    const playNoteRef = async () => {
        setPlayingNoteRef(true);
        const id = await getStorageItem(ID_USER);
        const tran = await tramsitNoteReferenceApi(id);
        console.log(tran);

        await TrackPlayer.setupPlayer();

        await TrackPlayer.updateOptions({
            stopWithApp: false,
            alwaysPauseOnInterruption: true,
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
            ],
        });

        await TrackPlayer.add({
            id: 'trackReferenceId',
            url: tran,
            title: 'TrackReference Title',
            artist: 'TrackReference Artist',
        });

        TrackPlayer.addEventListener(Event.PlaybackQueueEnded, async (e) => {
            // setReproduciendo(false);
            setPlayingNoteRef(false);
            await TrackPlayer.destroy();
        });

        await TrackPlayer.play();
    };

    const playDictado = async () => {
        try {
            setReproduciendo(true);
            const id = await getStorageItem(ID_USER);
            const tran = await tramsitDictationApi(id);
            console.log(tran);

            await playWithoutSticks(tran);
            // await playWithStick(tran);

            // var durationDictation = 0;
            // var intervalSticks = setInterval(async () => {
            //     await TrackPlayer.setupPlayer();

            //     await TrackPlayer.add({
            //         id: 'trackId',
            //         url: tran,
            //         title: 'Track Title',
            //         artist: 'Track Artist',
            //     });

            //     durationDictation = await TrackPlayer.getDuration();
            //     await TrackPlayer.play();
            //     clearInterval(intervalSticks);
            // }, duration + 500);

            // var intervalDictation = setInterval(async () => {
            //     // audio has finished!
            //     setReproduciendo(false);
            //     clearInterval(intervalDictation);
            // }, durationDictation * 1000 + 1000);

            // ------------------------------------------------------

            // Start playing it
            // await TrackPlayer.play();

            // const soundObject = new Audio.Sound();
            // await soundObject.loadAsync({ uri: tran });

            // soundObject.setOnPlaybackStatusUpdate(async (status) => {
            //     const dur = status.durationMillis;

            //     setTimeout(async () => {
            //         // audio has finished!
            //         await soundObject.unloadAsync();
            //         setReproduciendo(false);
            //     }, dur + 1000);

            //     // if (status.didJustFinish === true) {
            //     //     // audio has finished!
            //     //     await soundObject.unloadAsync();
            //     //     setReproduciendo(false);
            //     // }
            // });

            // const timeToStart = await playStick();

            // setTimeout(function () {
            //     soundObject.playAsync();
            // }, timeToStart);

            // const { sound } = await Audio.Sound.createAsync({ uri: tran });
            // setSound(sound);

            // console.log('Playing Sound');
            // await sound.playAsync();
        } catch (error) {
            // await soundObject.unloadAsync();
            // setReproduciendo(false);
            console.log(error);
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
                    title={
                        playingNoteRef
                            ? 'Escuchando..'
                            : 'Escuchar Nota referencia'
                    }
                    buttonStyle={styles.btnPlayNoteRef}
                    containerStyle={{ width: '70%', alignSelf: 'center' }}
                    onPress={playNoteRef}
                    disabled={playingNoteRef}
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
