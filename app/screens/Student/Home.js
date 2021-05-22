import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { melodicDictationApi, rhythmicDictationApi } from '../../api/dictation';

export default function Home() {
    const navigation = useNavigation();

    const [dictado, setDictado] = useState(null);
    const [figurasDictado, setFigurasDictado] = useState(null);

    const moduloIn = async () => {
        // TODO
        // Consultar si tiene dictados generados, si los tiene mostrarlos
        // si no tiene ningun generar 5 dictados nuevos y listarlos en la screen Module.js

        // Dato de la configuración (BD)
        const dataRitmic = {
            tarjetas: ['1', '2', '4','8'],
            nroCompases: 5,
            numerador: 4,
            denominador: 4,
        };
        const figsDictadoRes = await rhythmicDictationApi(dataRitmic);

        if (figsDictadoRes.ok) {
            setFigurasDictado(figsDictadoRes.figurasDictado);

            // Dato de la configuración (BD)
            const data = {
                notasRegla: [
                    ['Do4', 'Re4', 'Mi4', 'Fa4', 'Sol4', 'La4', 'Si4', 'Do5'],
                    ['Do4', 'Mi4', 'Sol4', 'Do5'],
                ],
                nivelPrioridadRegla: [
                    { regla: 0, prioridad: 1 },
                    { regla: 1, prioridad: 3 },
                ],
                intervaloNotas: [
                    { clave: 'Sol', notaMenor: 'La3', notaMayor: 'Do6' },
                    { clave: 'Fa', notaMenor: 'Do2', notaMayor: 'Mi4' },
                ],
                notasBase: ['Do4', 'Sol4'],
                notasFin: ['Do4', 'Sol4'],
                nivelPrioridadClave: [
                    { elem: 'Sol', prioridad: 3 },
                    { elem: 'Fa', prioridad: 1 },
                ],
                cantDictado: figsDictadoRes.figurasDictado.length,
            };

            const dictadoRes = await melodicDictationApi(data);

            if (dictadoRes.ok) {
                setDictado(dictadoRes.dictado);
                navigation.navigate('module', {
                    dictado: dictadoRes.dictado,
                    figurasDictado: figsDictadoRes.figurasDictado,
                    figurasConCompas: figsDictadoRes.figurasConCompas,
                    notasTraducidas: dictadoRes.dictadoTraducido,
                });
                // toastRef.current.show('Dictado creado');
            } else {
                // TODO -> handle error (show in modal or popup)
                console.log('1');
                console.log('error');
            }
        } else {
            console.log('2');
            // TODO -> handle error (show in modal or popup)
            console.log('error');
        }
    };

    return (
        <View>
            <Button title="Modulo 01" onPress={moduloIn} />
            <Button title="Modulo 02" onPress={moduloIn} />
            <Button title="Modulo 03" onPress={moduloIn} />
        </View>
    );
}