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
import TrackPlayer, { Event, Capability } from 'react-native-track-player';

export default function AcordesPlay({ route }) {
    const [reproduciendo, setReproduciendo] = useState(false);
    const [playingNoteRef, setPlayingNoteRef] = useState(false);

    const { acorde } = route.params;

    const navigation = useNavigation();

    const play = async (tran) => {
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

    const playAcorde = async () => {
        try {
            setReproduciendo(true);
            const id = await getStorageItem(ID_USER);
            const tran = await tramsitDictationApi(id);
            console.log(tran);

            await play(tran);
        } catch (error) {
            // await soundObject.unloadAsync();
            setReproduciendo(false);
            console.log(error);
        }
    };

    const openSolution = () => {
        navigation.navigate('solution_acorde', {
            acorde
        })
    }

    return (
        <>
            <View style={styles.container}>
                {/* <View style={styles.graficoContainer}> */}
                {/* </View> */}
                <View style={{marginVertical: 30, alignItems: 'center'}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Nota de referencia: {acorde.NotaReferencia}</Text>
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
                    onPress={playAcorde}
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
