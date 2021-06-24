import React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { Audio } from 'expo-av';

import { tramsitDictationApi } from '../../api/sound';
import { getStorageItem, ID_USER } from '../../../utils/asyncStorageManagement';

export default function Dictation({ route }) {
    // ---------------------
    // DICTADO PARA GRAFICAR
    // ---------------------
    const { dictation } = route.params;
    const navigation = useNavigation();

    const playDictado = async () => {
        // TODO -> id del usuario
        const id = await getStorageItem(ID_USER);
        const tran = await tramsitDictationApi(id);

        const { sound } = await Audio.Sound.createAsync({ uri: tran });
        await sound.playAsync();
    };

    const openSolution = () => {
        navigation.navigate('solution', {
            dictation,
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
