import React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { Audio } from 'expo-av';

import { tramsitDictationApi } from '../../api/sound';

export default function Dictation({ route }) {
    // ---------------------
    // DICTADO PARA GRAFICAR
    // ---------------------
    const {denominador , numerador, clave, escalaDiatonica, figurasConCompas, notasTraducidas, figurasDictado } = route.params;
    const navigation = useNavigation();

    const playDictado = async () => {
        // TODO -> id del usuario
        const id = 1;
        const tran = await tramsitDictationApi(id);

        const { sound } = await Audio.Sound.createAsync({ uri: tran });
        await sound.playAsync();
    };

    const openSolution = () => {
        navigation.navigate('solution', {
            clave:clave,
            escalaDiatonica:escalaDiatonica,
            figurasConCompas: figurasConCompas,
            notasTraducidas: notasTraducidas,
            figurasDictado: figurasDictado,
            numerador:numerador,
            denominador:denominador
        });
    };

    return (
        <View>
            <Text>
                Mostrar pentagrama con nota de referencia y opción para
                reproducirla
            </Text>
            <Icon
                type="material-community"
                name="play-circle-outline"
                iconStyle={styles.iconPlay}
                onPress={playDictado}
            />
            <Button title="Ver solución" onPress={openSolution} />
        </View>
    );
}

const styles = StyleSheet.create({
    iconPlay: {
        fontSize: 150,
        marginTop: 100,
    },
});
