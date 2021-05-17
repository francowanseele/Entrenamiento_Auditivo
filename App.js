import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Button, ScrollView} from 'react-native';
import { Audio } from 'expo-av';
import { Overlay, Icon } from 'react-native-elements';
import Toast from 'react-native-easy-toast';

import { generateDictationFileApi, tramsitDictationApi } from './app/api/sound';
import { melodicDictationApi, rhythmicDictationApi } from './app/api/dictation';
import { Graficar } from './componentes'

export default function App() {
    const [visible, setVisible] = useState(false);
    const [dictado, setDictado] = useState(null);
    const [figurasDictado, setFigurasDictado] = useState(null);
    const toastRef = useRef();

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const api_dictation = async () => {
        const dataRitmic = {
            tarjetas: ["1", "2", "4", "d4-8", "8-16-16"],
            nroCompases: 10,
            numerador: 3,
            denominador: 4,
        };
        const figsDictadoRes = await rhythmicDictationApi(dataRitmic);        
        if (figsDictadoRes.ok) {
            console.log(figsDictadoRes.figurasDictado);
            setFigurasDictado(figsDictadoRes.figurasDictado);

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
                toastRef.current.show('Dictado creado');
            } else {
                // TODO -> handle error (show in modal or popup)
                console.log('error');
            }
        } else {
            // TODO -> handle error (show in modal or popup)
            console.log('error');
        }
    };

    const playDictadoPopUp = async () => {
        // Generar midi y mp3
        if (dictado) {
            const data = {
                dictado: dictado,
                figurasDictado: figurasDictado,
            };
            // TODO -> id del usuario
            const id = 1;
            var { ok, message } = await generateDictationFileApi(data, id);
            ok ? setVisible(true) : toastRef.current.show(message);

            console.log(dictado);
            console.log(figurasDictado);
        } else {
            toastRef.current.show('Dictado no creado.');
        }
    };

    const playDictado = async () => {
        // TODO -> id del usuario
        const id = 1;
        const tran = await tramsitDictationApi(id);

        const { sound } = await Audio.Sound.createAsync({ uri: tran });
        await sound.playAsync();
    };
    const generarGrafico = () => {
        //["A/4","4"], 
        
        res = []
        for ( figura in figurasDictado){
            res = res.push([])
        }
    }

    return (
        <View style={styles.container}>
             <View style={styles.graficoContainer}>
                <ScrollView horizontal={true} style={styles.scrollView}>
                    <Graficar 
                        style={styles.grafico}  
                        figurasParam={
                            [                             
                                ["A/4","4"], 
                                ["B/4","4"],
                                ["C/4","4"],
                                ["B/4","1"],
                                ["B/4","1"],
                                ["NuevoCompas"],
                                ["A/4","2"], 
                                ["B/4","2"],
                                ["C/4","2"],
                                ["B/4","2"],
                                ["B/4","2"],
                                ["NuevoCompas"],
                                ["A/4","2"], 
                                ["B/4","2"],
                                ["C/4","2"],
                                ["B/4","2"],
                                ["NuevoCompas"],
                                ["B/4","2"],
                                ["B/4","1"], 
                                ["B/4","4"],
                                ["C/4","4"]                                                     
                                ]
                        }
                        numeradorParam={4}
                        denominadorParam={4}
                        claveParam={'treble'} 
                    />
                </ScrollView>
            </View>            
            <Button title="Generar dictado" onPress={api_dictation} />
            <Button title="Reproducir dictado" onPress={playDictadoPopUp} />

            <Overlay
                isVisible={visible}
                onBackdropPress={toggleOverlay}
                overlayStyle={styles.popup}
            >
                <Icon
                    type="material-community"
                    name="play-circle-outline"
                    iconStyle={styles.iconPlay}
                    onPress={playDictado}
                />

                <Button title="Ver soluciones" />
            </Overlay>
            <Toast ref={toastRef} position="center" opacity={0.9} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    graficoContainer:{
        paddingTop:30,
        paddingHorizontal:5,
        height:'40%',
    },
    scrollView:{
        height:100,
    },

    grafcio:{
        height:100,
        width:2000,
    },

    popup: {
        width: '75%',
        height: '70%',
    },

    iconPlay: {
        fontSize: 150,
        marginTop: 100,
    },
});
