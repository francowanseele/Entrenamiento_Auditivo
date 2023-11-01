import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    Alert,
    Image
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { FAB } from 'react-native-elements';
import { ListItem } from '@rneui/themed';
import { ITEMSHOME, TEXTHOME } from '../../styles/styleValues';
import Loading from '../../components/Loading';
import { generateAcordeJazzFileApi } from '../../api/sound';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../../utils/colorPalette';
import { generateAcordeJazzApi, getAcordesJazzApi } from '../../api/acordes';
import { acordeType } from '../../../enums/camposArmonicosEnum';
import { imageMap } from '../../../utils/images';


export default function ConfigAcordesJazz({ route }) {
    const { configAcordesJazz, module, idCAJ } = route.params;

    const [acordes, setAcordes] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
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
        }
    }, [isFocused]);

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

            if (calification.Correcto) {
                return styles.notaGreen;
            } else {
                return styles.notaRed;
            }
        } else return styles.content;
    };

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
                        <ListItem.Content style={{flexDirection: 'row', display: 'flex', justifyContent: 'flex-start'}}>
                            <Image
                                source={imageMap[ac.Tonalidad]}
                                style={{
                                    resizeMode: 'contain',
                                    height: 55,
                                    width: 55,
                                    marginRight: 10
                                }}
                            />
                            <View>
                                <ListItem.Title style={styles.subtitle}>
                                    Acorde #{i + 1}
                                </ListItem.Title>
                                <ListItem.Subtitle style={{ color: 'black' }}>
                                    Tipo: {acordeType.getTypeDescription(ac.Tipo)}
                                </ListItem.Subtitle>
                                {ac.Resuelto[0] ? (
                                    <View style={styles.contentNota}>
                                        <Text>
                                            <Text
                                                style={getStyleByState(ac.Resuelto)}
                                            >
                                                Última Calificación: {getLastCalification(ac.Resuelto).Correcto ? 'Correcto' : 'Mal'}
                                            </Text>
                                        </Text>
                                    </View>
                                ) : (
                                    <Text></Text>
                                )}
                            </View>
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
