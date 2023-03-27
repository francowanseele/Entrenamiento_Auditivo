import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ListItem, FAB } from 'react-native-elements';
import { ITEMSHOME, TEXTHOME } from '../../styles/styleValues';
import Loading from '../../components/Loading';
import { generateAcordeJazzFileApi } from '../../api/sound';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../../utils/colorPalette';
import { generateAcordeJazzApi, getAcordesJazzApi } from '../../api/acordes';
import { acordeType } from '../../../enums/camposArmonicosEnum';


export default function ConfigAcordesJazz({ route }) {
    const { configAcordesJazz, module, idCAJ } = route.params;

    const [acordes, setAcordes] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        setLoading(true);
        getAcordesJazzApi(configAcordesJazz.id).then((result) => {
            if (result.ok) {
                if (result.acordesJazz.length == 0) {
                    // Generate news
                    const data = {
                        dataCamposArmonicos: configAcordesJazz.dataCamposArmonicos, 
                        escalaDiatonicaRegla: configAcordesJazz.escalaDiatonicaRegla.map((x) => {return {elem: x.Tonalidad, prioridad: x.Prioridad}})
                    }
                    generateAcordeJazzApi(data, idCAJ, 5, false).then((resultGenerateAcordes) => {
                        if (resultGenerateAcordes.ok) {
                            setAcordes(resultGenerateAcordes.acordes.sort((a, b) => a.id - b.id));
                        } else {
                            Alert.alert('No se pudo generar ningún Acorde :(');
                        }

                        setLoading(false);
                    })
                    
                } else {
                    setAcordes(result.acordesJazz.sort((a, b) => a.id - b.id));
                    setLoading(false);
                }
            } else {
                setAcordes([]);
                setLoading(false);
            }
        })
    }, []);

    const generateNewAcorde = async () => {
        setLoading(true);

        const data = {
            dataCamposArmonicos: configAcordesJazz.dataCamposArmonicos, 
            escalaDiatonicaRegla: configAcordesJazz.escalaDiatonicaRegla.map((x) => {return {elem: x.Tonalidad, prioridad: x.Prioridad}})
        }
        const result = await generateAcordeJazzApi(data, idCAJ, 1, false);
        if (result.ok) {
            let acordesAux = acordes;
            acordesAux.push(result.acordes[0]);
            setAcordes(acordesAux);
        } else {
            Alert.alert('No se pudo generar nuevo Acorde :(');
        }

        setLoading(false);
    }

    const acordeIn = async (acorde) => {
        const data = {
            notes: acorde.Notas,
            referenceNote: acorde.NotaReferencia,
        };
        const result = await generateAcordeJazzFileApi(data);
        
        if (result.ok) {
            navigation.navigate('acordes_play', {
                acorde,
            });
        } else {
            Alert.alert('No se puede acceder al acorde :(');
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                {acordes.map((ac, i) => (
                    <ListItem
                        containerStyle={styles.content}
                        key={i}
                        bottomDivider
                        onPress={() => {
                            acordeIn(ac);
                        }}
                    >
                        <ListItem.Content>
                            <ListItem.Title style={styles.subtitle}>
                                Acorde #{i + 1}
                            </ListItem.Title>
                            <ListItem.Subtitle style={{ color: 'black' }}>
                                Tipo: {acordeType.getTypeDescription(ac.Tipo)} | Escala diatónica:{' '}
                                {ac.Tonalidad}
                            </ListItem.Subtitle>
                            {/* {dict.resuelto[0] ? (
                                <View style={styles.contentNota}>
                                    <Text>
                                        <Text
                                            style={getStyleByState(
                                                dict.resuelto[
                                                    dict.resuelto.length - 1
                                                ]
                                            )}
                                        >
                                            Última Calificación:{' '}
                                            {
                                                dict.resuelto[
                                                    dict.resuelto.length - 1
                                                ].nota
                                            }
                                        </Text>
                                    </Text>
                                </View>
                            ) : (
                                <Text></Text>
                            )} */}
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                ))}
                <View style={{marginBottom: 100}}></View>
            </ScrollView>
            <FAB
                placement="right"
                title="+ Generar"
                titleStyle={{ padding: 0 }}
                size="large"
                color={PRIMARY_COLOR}
                onPress={generateNewAcorde}
            />
            {loading && (
                <Loading
                    isVisible={true}
                    text="Cargando"
                />
            )}
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
        backgroundColor: ITEMSHOME,
        flexDirection: 'row',
        width: '96%',
        alignSelf: 'center',
        borderRadius: 10,
        shadowColor: '#470000',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.2,
        elevation: 13,
    },
    contentNota: {
        borderRadius: 100,
        alignSelf: 'flex-start',
        width: '60%',
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
