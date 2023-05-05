import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, Text, Alert } from 'react-native';
import Graphic from '../../components/Graphic';
import { setAutoevaluacion } from '../../api/user';
import {BACKGROUNDHOME,BACKGROUNDHOME2,ITEMSHOME, TEXTHOME, TOPSCREENHOME} from '../../styles/styleValues';
import CheckBox from 'react-native-check-box';
// import { Button } from 'react-native-paper';
import { Button, Overlay } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { getStorageItem } from '../../../utils/asyncStorageManagement';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../../utils/colorPalette';
import CalificationOptions from '../../components/Calification/CalificationOptions';
import { addCalification } from '../../api/calification';
import { tipoConfiguracion } from '../../../enums/tipoConfiguracion';
// import MusicSheet from '../../components/MusicSheet';

export default function Solution({ route }) {
    const { dictation } = route.params;
    const [cantNotas, setCantNotas] = useState(dictation.notas.length);
    const [evaluacionNota, setevaluacionNota] = useState(-1);
    const [currentUserMail, setCurrentUserEmail] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [optionsCalification, setOptionsCalification] = useState(initializeOptionsCalification(dictation.notas));

    const navigation = useNavigation();

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

    useEffect(() => {
        getStorageItem('email').then((email) => {
            setCurrentUserEmail(email);
        });
    }, []);

    const calcularPorcentaje = (porcentaje) => {
        return Math.trunc((cantNotas * porcentaje) / 100);
    };
    const calcularResultado = (tipoError) => {
        if (tipoError == "ninguno") { 
            setAutoevaluacion( 
                currentUserMail,
                dictation._id,
                12,
                tipoError
            ).then(() => {
                navigation.goBack();
            });
            return;
         }
        setAutoevaluacion( 
            currentUserMail,
            dictation._id,
            evaluacionNota,
            tipoError
        ).then(() => {
            navigation.goBack();
        });
    };

    const confirmFunction = async  (option) => {
        // Save calification
        const data = {
            note: option.note,
            correct: null,
            typeConfig: tipoConfiguracion.ConfiguracionDictado,
        };
        const result = await addCalification(data, dictation.id);

        if (result.ok) {
            navigation.goBack();
        } else {
            Alert.alert('No se ha podido guardar la calificación.');
        }
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.graficoContainer}>
                {/* {console.log('original',dictation.figuras)} */}
                <Graphic
                    figurasSeparadasPorLigaudra={dictation.figurasSeparadasPorLigaudra}
                    figurasConCompas={dictation.figurasSeparadasPorLigaudra}
                    figurasSinCompas={null}
                    dictadoGeneradoTraducidoParam={dictation.notas}
                    numeradorParam={dictation.numerador}
                    denominadorParam={dictation.denominador}
                    claveParam={traducirClave(dictation.clave)}
                    escalaDiatonica={dictation.escala_diatonica}
                    isNotaReferencia={false}
                />
            </View>
            {/* <MusicSheet dictation={dictation} /> */}

            <CalificationOptions 
                confirmFunction={confirmFunction}
                optionsCalification={optionsCalification} 
            />
            {/* <ScrollView style={styles.checkboxContainer}>
                <Button
                    title={'Ningún error'}
                    type="outline"
                    titleStyle={{ color: SECONDARY_COLOR }}
                    containerStyle={styles.button}
                    onPress={() => {
                        calcularResultado('ninguno')
                        navigation.goBack();
                    }}
                    buttonStyle={{ borderColor: PRIMARY_COLOR, borderWidth: 1 }}
                />
                <Button
                    title={
                        'De 1 a ' +
                        calcularPorcentaje(10).toString() +
                        ' de errores'
                    }
                    type="outline"
                    titleStyle={{ color: TEXTHOME }}
                    containerStyle={styles.button}
                    onPress={() => {
                        setevaluacionNota(10);
                        setModalVisible(true);
                    }}
                    buttonStyle={{ borderColor: PRIMARY_COLOR, borderWidth: 1 }}
                />
                <Button
                    title={
                        'De ' +
                        (calcularPorcentaje(10) + 1).toString() +
                        ' a ' +
                        calcularPorcentaje(20).toString() +
                        ' de errores'
                    }
                    type="outline"
                    titleStyle={{ color: TEXTHOME }}
                    containerStyle={styles.button}
                    onPress={() => {
                        setevaluacionNota(8);
                        setModalVisible(true);
                    }}
                    buttonStyle={{ borderColor: PRIMARY_COLOR, borderWidth: 1 }}
                />
                <Button
                    title={
                        'De ' +
                        (calcularPorcentaje(20) + 1).toString() +
                        ' a ' +
                        calcularPorcentaje(40).toString() +
                        ' de errores'
                    }
                    type="outline"
                    titleStyle={{ color: TEXTHOME }}
                    containerStyle={styles.button}
                    onPress={() => {
                        setevaluacionNota(6);
                        setModalVisible(true);
                    }}
                    buttonStyle={{ borderColor: PRIMARY_COLOR, borderWidth: 1 }}
                />
                <Button
                    title={
                        'De ' +
                        (calcularPorcentaje(40) + 1).toString() +
                        ' a ' +
                        calcularPorcentaje(65).toString() +
                        ' de errores'
                    }
                    type="outline"
                    titleStyle={{ color: TEXTHOME }}
                    containerStyle={styles.button}
                    onPress={() => {
                        setevaluacionNota(2);
                        setModalVisible(true);
                    }}
                    buttonStyle={{ borderColor: PRIMARY_COLOR, borderWidth: 1 }}
                />
                <Button
                    title={
                        'Más de ' +
                        (calcularPorcentaje(65) + 1).toString() +
                        ' de errores'
                    }
                    titleStyle={{ color: TEXTHOME }}
                    type="outline"
                    containerStyle={styles.button}
                    onPress={() => {
                        setevaluacionNota(1);
                        setModalVisible(true);
                    }}
                    buttonStyle={{ borderColor: PRIMARY_COLOR, borderWidth: 1 }}
                />

                <Overlay
                    animationType="slide"
                    visible={modalVisible}
                    onBackdropPress={() => {
                        setModalVisible(!modalVisible);
                    }}
                    // onRequestClose={() => {
                    //     setModalVisible(!modalVisible);
                    // }}
                >
                    <View style={styles.modalView}>
                        <Text style={{ marginBottom: 10 }}>
                            Qué tipos de errores tuviste?
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Button
                                title={'Ritmicos'}
                                titleStyle={{ color: TEXTHOME }}
                                type="outline"
                                containerStyle={styles.buttonModal}
                                onPress={() => {``
                                    calcularResultado('ritmico');
                                }}
                            />
                            <Button
                                title={'Melodicos'}
                                titleStyle={{ color: TEXTHOME }}
                                type="outline"
                                containerStyle={styles.buttonModal}
                                onPress={() => {
                                    calcularResultado('melodico');
                                }}
                            />
                            <Button
                                title={'Ambos'}
                                titleStyle={{ color: TEXTHOME }}
                                type="outline"
                                containerStyle={styles.buttonModal}
                                onPress={() => {
                                    calcularResultado('ambos');
                                }}
                            />
                        </View>
                    </View>
                </Overlay>
                <Text style={styles.textoDatos} >Al  realizar la autoevaluación  estas de acuerdo de que estos datos serán usados con fines estadísticos.</Text>
            </ScrollView> */}
        </View>
    );
}

function initializeOptionsCalification(notas) {
    if (notas.length >= 10) {
        const interval = Math.trunc(notas.length / 5);
        return [
            {
                label: "Todas bien",
                note: 12,
            },
            {
                label: "De 1 a " + interval.toString() + " errores",
                note: 10,
            },
            {
                label: "De " + (interval + 1).toString() +" a " + (interval * 2).toString() + " errores",
                note: 8,
            },
            {
                label: "De " + ((2 * interval) + 1).toString() +" a " + (interval * 3).toString() + " errores",
                note: 6,
            },
            {
                label: "De " + ((3 * interval) + 1).toString() +" a " + (interval * 4).toString() + " errores",
                note: 4,
            },
            {
                label: "Más de " + ((4 * interval) + 1).toString() +" errores",
                note: 2,
            },
        ]
    } else if (notas.length >= 8) {
        const interval = Math.trunc(notas.length / 4);
        return [
            {
                label: "Todas bien",
                note: 12,
            },
            {
                label: "De 1 a " + interval.toString() + " errores",
                note: 9,
            },
            {
                label: "De " + (interval + 1).toString() +" a " + (interval * 2).toString() + " errores",
                note: 6,
            },
            {
                label: "De " + ((2 * interval) + 1).toString() +" a " + (interval * 3).toString() + " errores",
                note: 3,
            },
            {
                label: "Más de " + ((3 * interval) + 1).toString() +" errores",
                note: 1,
            },
        ]
    } else if (notas.length >= 6) {
        const interval = Math.trunc(notas.length / 3);
        return [
            {
                label: "Todas bien",
                note: 12,
            },
            {
                label: "De 1 a " + interval.toString() + " errores",
                note: 8,
            },
            {
                label: "De " + (interval + 1).toString() +" a " + (interval * 2).toString() + " errores",
                note: 4,
            },
            {
                label: "Más de " + ((2 * interval) + 1).toString() +" errores",
                note: 1,
            },
        ]
    } else {
        const interval = Math.trunc(notas.length / 2);
        return [
            {
                label: "Todas bien",
                note: 12,
            },
            {
                label: "De 1 a " + interval.toString() + " errores",
                note: 8,
            },
            {
                label: "Más de " + (interval + 1).toString() +" errores",
                note: 4,
            },
        ]
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: BACKGROUNDHOME,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    textoDatos:{
        width:'90%',
        alignSelf:"center",
        marginTop:10
    },
    modalView: {
        flexDirection: 'column',
        // marginTop:'95%',
        margin: 20,
        // backgroundColor: 'white',
        borderRadius: 20,
        // padding: 35,
        padding: '5%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        margin: 3,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'white',
    },
    buttonModal: {
        margin: 3,
        width: '35%',
        alignSelf: 'center',
    },
    graficoContainer: {
        paddingHorizontal: 5,
        height: '30%',
        marginBottom: 20,
    },
    checkboxContainer: {
        paddingTop: 70,
        width: '100%',
        //height: '40%',
    },
    checkbox: {
        alignSelf: 'center',
        marginVertical: 10,
        marginHorizontal: 10,
        width: '70%',
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