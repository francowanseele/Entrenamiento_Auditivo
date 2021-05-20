import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { generateDictationFileApi } from '../../api/sound';

export default function Module({ route }) {
    const navigation = useNavigation();
    const { dictado, figurasDictado, figurasConCompas } = route.params;

    const openDictado = async () => {
        // Generar midi y mp3
        if (dictado) {
            const data = {
                dictado: dictado,
                figurasDictado: figurasDictado,
            };
            // TODO -> id del usuario
            const id = 1;
            var { ok, message } = await generateDictationFileApi(data, id);

            if (ok) {
                // ---------------------
                // PASO EL DICTADO PARA GRAFICAR
                // ---------------------
                navigation.navigate('dictation', {
                    figurasConCompas: figurasConCompas,
                });
            } else {
                console.log(message);
            }
        } else {
            // toastRef.current.show('Dictado no creado.');
        }
    };

    return (
        <View>
            <Button title="Dictado 01" onPress={openDictado} />
            <Button title="Dictado 02" onPress={openDictado} />
            <Button title="Dictado 03" onPress={openDictado} />
            <Button title="Dictado 04" onPress={openDictado} />
            <Button title="Dictado 05" onPress={openDictado} />
        </View>
    );
}
