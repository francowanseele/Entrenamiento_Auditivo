import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { playSoundApi } from './app/api/sound';
import Soundfont from 'soundfont-player';
import Navigation from './app/navigationsStudent/Navigation';

export default function App() {
    const hello_music = () => {
        playSoundApi();
    };

    const music_player = () => {
        Soundfont.instrument(new AudioContext(), 'acoustic_grand_piano').then(
            function (piano) {
                piano.play('C4');
            }
        );
    };

    // return (
    //     <View style={styles.container}>
    //         <Button title="Hello Music" onPress={hello_music} />
    //         <Button title="Music Player" onPress={music_player} />
    //         <StatusBar style="auto" />
    //     </View>
    // );

    return <Navigation />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
