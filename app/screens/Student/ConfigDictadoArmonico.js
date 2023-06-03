import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Alert,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { FAB } from 'react-native-elements';
import { ListItem } from '@rneui/themed';
import { TEXTHOME } from '../../styles/styleValues';
import Loading from '../../components/Loading';
import { generateDictadoArmonicoFileApi } from '../../api/sound';
import { PRIMARY_COLOR } from '../../../utils/colorPalette';
import { generateDictadoArmonicoApi, getDictadoArmonicoApi } from '../../api/dictadosArmonicos';
import { generateMusicSheetReferenceImageApi } from '../../api/musicSheet';

export default function ConfigDictadoArmonico({ route }) {
    const { configDictadoArmonico, module, idCDA } = route.params;
    
    const [dictados, setDictados] = useState([])
    const [allAcordes, setAllAcordes] = useState([])
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            setLoading(true);
            getDictadoArmonicoApi(configDictadoArmonico.id).then((result) => {
                if (result.ok) {
                    if (result.dictadosArmonicos.length == 0 && result.acordes.length == 0) {
                        const data = {
                            dataCamposArmonicos: configDictadoArmonico.dataCamposArmonicos,
                            dataCamposArmonicosInicio: configDictadoArmonico.dataCamposArmonicosInicio,
                            dataCamposArmonicosFin: configDictadoArmonico.dataCamposArmonicosFin,
                            dataCamposArmonicosReferencia: configDictadoArmonico.dataCamposArmonicosReferencia,
                            escalaDiatonicaRegla: configDictadoArmonico.escalaDiatonicaRegla.map((x) => {return {elem: x.Tonalidad, prioridad: x.Prioridad}}),
                        }
                        generateDictadoArmonicoApi(data, idCDA, configDictadoArmonico.dictationLength, 5, false).then((resultDictadosArmonicos) => {
                            if (resultDictadosArmonicos.ok) {
                                setDictados(resultDictadosArmonicos.dictadosArmonicos.sort((a, b) => a.id - b.id));
                                setAllAcordes(resultDictadosArmonicos.acordes.sort((a, b) => a.Orden - b.Orden));
                            } else {
                                Alert.alert('No se pudo generar ningún Acorde :(');
                            }

                            setLoading(false);
                        })
                        
                    } else {
                        setDictados(result.dictadosArmonicos.sort((a, b) => a.id - b.id));
                        setAllAcordes(result.acordes.sort((a, b) => a.Orden - b.Orden));
                        setLoading(false);
                    }
                } else {
                    setDictados([]);
                    setAllAcordes([]);
                    setLoading(false);
                }
            })
        }
    }, [isFocused]);

    const generateNewDictado = async () => {
        setLoading(true);

        const data = {
            dataCamposArmonicos: configDictadoArmonico.dataCamposArmonicos,
            dataCamposArmonicosInicio: configDictadoArmonico.dataCamposArmonicosInicio,
            dataCamposArmonicosFin: configDictadoArmonico.dataCamposArmonicosFin,
            dataCamposArmonicosReferencia: configDictadoArmonico.dataCamposArmonicosReferencia,
            escalaDiatonicaRegla: configDictadoArmonico.escalaDiatonicaRegla.map((x) => {return {elem: x.Tonalidad, prioridad: x.Prioridad}}),
        }
        const result = await generateDictadoArmonicoApi(data, idCDA, configDictadoArmonico.dictationLength, 1, false);
        if (result.ok) {
            let dictadosAux = dictados;
            dictadosAux.push(result.dictadosArmonicos[0]);
            setDictados(dictadosAux);

            let acordesAux = allAcordes
            acordesAux = acordesAux.concat(result.acordes)
            setAllAcordes(acordesAux.sort((a, b) => a.Orden - b.Orden))
        } else {
            Alert.alert('No se pudo generar nuevo Dictado :(');
        }

        setLoading(false);
    }

    const dictadoIn = async (dictado) => {
        const acordesToSend = allAcordes.filter((a) => a.DictadoArmonicoId == dictado.id).sort((a, b) => a.Orden - b.Orden)
        const data = {
            dictado: dictado,
            acordes: acordesToSend,
        }
        const dataMusicSheet = {
            acorde: dictado.AcordeReferencia.split(','),
            tonality: dictado.Tonalidad,
        }
        const result = await generateDictadoArmonicoFileApi(data)
        const resultMusicSheet = await generateMusicSheetReferenceImageApi(dataMusicSheet)

        if (result.ok && resultMusicSheet.ok) {
            navigation.navigate('dictado_armonico_play', {
                dictado: dictado,
                acordes: acordesToSend,
            });
        } else {
            Alert.alert('No se puede acceder al dictado :(');
        }
    }

    const getLastCalification = (califications) => {
        // califications: [ {"Correcto": null, "DictadoId": 175, "Nota": 8, "UsuarioId": 1, "created_at": "2023-03-29T21:18:13.732Z", "id": 1} ]
        const newCalifications = califications.map((c) => {
            return {
                ...c,
                created_at: new Date(c.created_at)
            }
        });

        let result = newCalifications[0];
        for (let i = 1; i < newCalifications.length; i++) {
            const c = newCalifications[i];
            if (c.created_at > result.created_at) {
                result = c;
            }
        }
        return result;
    }

    const getStyleByState = (stateDict) => {
        if (stateDict.length > 0) {
            const calification = getLastCalification(stateDict);

            if (calification.Nota <= 2) {
                return styles.notaRed;
            } else if (calification.Nota >= 3 && calification.Nota <= 8) {
                return styles.notaOrange;
            } else {
                return styles.notaGreen;
            }
        } else return styles.content;
    };
    
    return (
        <View style={styles.container}>
            <ScrollView>
                {dictados.map((dictado, i) => (
                    <ListItem
                        containerStyle={styles.content}
                        key={i}
                        bottomDivider
                        onPress={() => {
                            dictadoIn(dictado);
                        }}
                    >
                        <ListItem.Content>
                            <ListItem.Title style={styles.subtitle}>
                                Dictado #{i + 1}
                            </ListItem.Title>
                            <ListItem.Subtitle style={{ color: 'black' }}>
                                Tonalidad: {dictado.Tonalidad}
                            </ListItem.Subtitle>
                            {dictado.Resuelto && dictado.Resuelto[0] ? (
                                <View style={styles.contentNota}>
                                    <Text>
                                        <Text
                                            style={getStyleByState(dictado.Resuelto)}
                                        >
                                            Última Calificación:{' '}
                                            {getLastCalification(dictado.Resuelto).Nota}
                                        </Text>
                                    </Text>
                                </View>
                            ) : (
                                <Text></Text>
                            )}
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                ))}
                <View style={{ marginBottom: 100 }}></View>
            </ScrollView>
            <FAB
                placement="right"
                title="+ Generar"
                titleStyle={{ padding: 0 }}
                size="large"
                color={PRIMARY_COLOR}
                onPress={generateNewDictado}
            />
            {loading && <Loading isVisible={true} text="Cargando" />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    buttonContainer: {
        alignItems: 'center',
        width: '100%',
        margin: 15,
    },
    button: {
        color: TEXTHOME,
    },
    content: {
        marginTop: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        width: '96%',
        alignSelf: 'center',
        borderRadius: 10,
        shadowColor: '#470000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        elevation: 13,
    },
    contentNota: {
        borderRadius: 100,
        alignSelf: 'flex-start',
        width: '80%',
    },
    nota: {
        alignSelf: 'flex-start',
        borderRadius: 100,
        fontWeight: 'bold',
    },
    notaOrange: {
        color: '#f99856',
        alignSelf: 'flex-start',
        borderRadius: 100,
        fontWeight: 'bold',
    },
    notaGreen: {
        color: '#008000',
        alignSelf: 'flex-start',
        borderRadius: 100,
        fontWeight: 'bold',
    },
    notaRed: {
        color: '#f1503f',
        alignSelf: 'flex-start',
        borderRadius: 100,
        fontWeight: 'bold',
    },
    subtitle: {
        color: TEXTHOME,
        fontWeight: 'bold',
        fontSize: 20,
    },
});
