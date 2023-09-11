import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon, Button } from 'react-native-elements';
import {
    TEXTHOME,
} from '../../styles/styleValues';
import { saveListenDictationApi, tramsitDictationApi, tramsitNoteReferenceApi } from '../../api/sound';
import { getStorageItem, ID_USER } from '../../../utils/asyncStorageManagement';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../../utils/colorPalette';
import ScreenPlaying from '../../components/ScreenPlaying';
import TrackPlayer, { Event, Capability } from 'react-native-track-player';
import { addTrack, setupPlayer } from '../../../services/audioExternalService';
import Bugsnag from '@bugsnag/react-native';

export default function IntervalosPlay({ route }) {
    const { intervalo } = route.params;

    const [reproduciendo, setReproduciendo] = useState(false);
    const [playingNoteRef, setPlayingNoteRef] = useState(false);

    const navigation = useNavigation();

    const play = async (tran) => {
        try {
            const ok = await setupPlayer()
            if (ok) {
                await addTrack(tran);
                await TrackPlayer.play();
            }
    
            TrackPlayer.addEventListener(Event.PlaybackQueueEnded, async () => {
                setPlayingNoteRef(false);
                setReproduciendo(false);
            });
        } catch (e) {
            Bugsnag.notify(e);
            setPlayingNoteRef(false);
            setReproduciendo(false);
        }
    };

    const playNoteRef = async () => {
        try {
            setPlayingNoteRef(true);
            const id = await getStorageItem(ID_USER);
            const tran = await tramsitNoteReferenceApi(id);
            console.log(tran);
    
            await play(tran);
        } catch (e) {
            Bugsnag.notify(e);
        }
    };

    const playIntervalo = async () => {
        try {
            setReproduciendo(true);
            const data = {
                dictadoId: null, 
                acordeJazzId: null, 
                dictadoArmonicoId: null, 
                intervaloId: intervalo.id,
            };
            saveListenDictationApi(data);

            const id = await getStorageItem(ID_USER);
            const tran = await tramsitDictationApi(id);
            console.log(tran);

            setTimeout(async () => {
                await play(tran);
            }, 1000);
        } catch (e) {
            Bugsnag.notify(e);
            setReproduciendo(false);
        }
    };

    const openSolution = () => {
        navigation.navigate('solution_intervalo', {
            intervalo: intervalo
        })
    }

    return (
        <>
            <View style={styles.container}>
                <View style={{ marginVertical: 30, alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                        Nota de referencia: {intervalo.NotaReferencia}
                    </Text>
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
                    onPress={playIntervalo}
                />
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
