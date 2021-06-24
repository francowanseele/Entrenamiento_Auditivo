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
            tarjetas: [
                {elem:'d4',prioridad:1}, 
                {elem:'4-8',prioridad:1}, 
                {elem:'8-4',prioridad:1},
                {elem:'4-4-4',prioridad:1}
                // {elem:'1',prioridad:1}, 
                // {elem:'2',prioridad:1}, 
                // {elem:'4',prioridad:1}, 
                // {elem:'16-16-16-16T',prioridad:1},
                // {elem:'8-8',prioridad:1},
                // {elem:'8-16-16',prioridad:1},
                // {elem:'16-8-16',prioridad:1}       
            
            ],
            nroCompases: 5,
            numeradorDenominador: [
                                    // {elem:'4/4', prioridad:1},
                                    // {elem:'3/4', prioridad:1},
                                    // {elem:'2/4', prioridad:1}
                                    {elem:'6/8',prioridad:1},
                                    {elem:'9/8',prioridad:1},
                                    {elem:'12/8',prioridad:1}  
                                ],
            tipoCelulas:'compuestas'
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
                    { elem: 'Fa', prioridad: 0},
                ],
                cantDictado: figsDictadoRes.figurasDictado.length,
            };

            const dictadoRes = await melodicDictationApi(data);

            if (dictadoRes.ok) {
                setDictado(dictadoRes.dictado);
                navigation.navigate('module', {
                    clave:dictadoRes.clave,
                    escalaDiatonica:dictadoRes.escalaDiatonica,
                    dictado: dictadoRes.dictado,
                    figurasDictado: figsDictadoRes.figurasDictado,
                    figurasConCompas: figsDictadoRes.figurasConCompas,
                    notasTraducidas: dictadoRes.dictadoTraducido,
                    numerador: figsDictadoRes.numerador,
                    denominador: figsDictadoRes.denominador
                });
                // toastRef.current.show('Dictado creado');
            } else {
                // TODO -> handle error (show in modal or popup)
                // console.log('1');
                console.log('error');
            }
        } else {
            // console.log('2');
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
