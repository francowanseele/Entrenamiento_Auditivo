import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, Text } from 'react-native';
import Graphic from '../../components/Graphic';
import { setAutoevaluacion } from '../../api/user';
import {BACKGROUNDHOME,BACKGROUNDHOME2,ITEMSHOME, TEXTHOME, TOPSCREENHOME} from '../../styles/styleValues';
import CheckBox from 'react-native-check-box';
// import { Button } from 'react-native-paper';
import { Button, Overlay } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { getStorageItem } from '../../../utils/asyncStorageManagement';
import { ScrollView } from 'react-native-gesture-handler';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../../utils/colorPalette';

export default function Solution({ route }) {
    const { dictation } = route.params;
    const [cantNotas, setCantNotas] = useState(dictation.notas.length);
    const [evaluacionNota, setevaluacionNota] = useState(-1);
    const [currentUserMail, setCurrentUserEmail] = useState();
    const [modalVisible, setModalVisible] = useState(false);

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

    return (
        <View style={styles.container}>
            <View style={styles.graficoContainer}>
                <Graphic
                    figurasConCompas={dictation.figuras}
                    figurasSinCompas={null}
                    dictadoGeneradoTraducidoParam={dictation.notas}
                    numeradorParam={dictation.numerador}
                    denominadorParam={dictation.denominador}
                    claveParam={traducirClave(dictation.clave)}
                    escalaDiatonica={dictation.escala_diatonica}
                    isNotaReferencia={false}
                />
            </View>
            <ScrollView style={styles.checkboxContainer}>
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
                {/* Queda redundante: más de x incorrectas y todas incorrectas aplican ambas */}
                {/* <Button
                    title={'Todas incorrectas'}
                    titleStyle={{ color: TEXTHOME }}
                    type="outline"
                    containerStyle={styles.button}
                    onPress={() => {
                        setevaluacionNota(0);
                        setModalVisible(true);
                    }}
                /> */}
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
                <Text style={styles.textoDatos} >Al  realizar la autoevaluación  estas de acuerdo de que estos datos serán ran usados con fines estadísticos.</Text>
            </ScrollView>
        </View>
    );
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
