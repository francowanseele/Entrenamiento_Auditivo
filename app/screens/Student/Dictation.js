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
import {
    BACKGROUNDHOME,
    TEXTHOME,
    ITEMSHOME,
    TOPSCREENHOME,
} from '../../styles/styleValues';
import { tramsitDictationApi, tramsitNoteReferenceApi } from '../../api/sound';
import { getStorageItem, ID_USER } from '../../../utils/asyncStorageManagement';
import Graphic from '../../components/Graphic';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../../utils/colorPalette';
import ScreenPlaying from '../../components/ScreenPlaying';
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player';
import { addTrack, setupPlayer } from '../../../services/trackPlayerServices';

export default function Dictation({ route }) {
    // ---------------------
    // DICTADO PARA GRAFICAR
    // ---------------------
    const { dictation } = route.params;
    const navigation = useNavigation();
    const [reproduciendo, setReproduciendo] = useState(false);
    const [playingNoteRef, setPlayingNoteRef] = useState(false);
    const [sound, setSound] = useState();

    const playerState = usePlaybackState();

    useEffect(() => {
        return sound
            ? () => {
                  sound.unloadAsync();
                  setReproduciendo(false);
              }
            : undefined;
    }, [sound]);

    useEffect(() => {
        if (playerState === State.Paused || playerState === State.Stopped) {
            if (reproduciendo) {
                setReproduciendo(false);
            }
            if (playingNoteRef) {
                setPlayingNoteRef(false);
            }
        }
    }, [playerState])

    useEffect(() => {
        setupPlayer();
    }, [])

    const play = async (tran) => {
        await addTrack(tran);
        TrackPlayer.play();
    };

    const playNoteRef = async () => {
        try {
            setPlayingNoteRef(true);
            const id = await getStorageItem(ID_USER);
            const tran = await tramsitNoteReferenceApi(id);
            console.log(tran);
    
            await play(tran);
        } catch (error) {
            setPlayingNoteRef(false);
            console.log(error);
        }
    };

    const playDictado = async () => {
        try {
            setReproduciendo(true);
            const id = await getStorageItem(ID_USER);
            const tran = await tramsitDictationApi(id);
            console.log(tran);

            await play(tran);
        } catch (error) {
            setReproduciendo(false);
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
