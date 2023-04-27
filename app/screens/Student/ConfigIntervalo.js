import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Alert,
    Text,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { FAB } from 'react-native-elements';
import { ListItem } from '@rneui/themed';
import { ITEMSHOME, TEXTHOME } from '../../styles/styleValues';
import Loading from '../../components/Loading';
import { generateIntervaloFileApi } from '../../api/sound';
import { PRIMARY_COLOR } from '../../../utils/colorPalette';
import { generateIntervaloApi, getIntervaloApi } from '../../api/intervalos';
import { tipoIntervalo } from '../../../enums/tipoIntervalo';

export default function ConfigIntervalo({ route }) {
    const { configIntervalo, module } = route.params;

    const [loading, setLoading] = useState(false);
    const [intervalos, setIntervalos] = useState([]);

    const navigation = useNavigation();
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            setLoading(true);
            getIntervaloApi(configIntervalo.id).then((result) => {
                if (result.ok) {
                    if (result.intervalos.length == 0) {
                        // Generate news
                        const data = {
                            dataIntervalos: configIntervalo.dataIntervalos,
                            intervaloRegla: configIntervalo.intervaloRegla,
                        }
                        generateIntervaloApi(data, configIntervalo.id, 5, false).then((resultGenerateIntervalos) => {
                            if (resultGenerateIntervalos.ok) {
                                setIntervalos(resultGenerateIntervalos.intervalos.sort((a, b) => a.id - b.id));
                            } else {
                                Alert.alert('No se pudo generar ningún Intervalo :(');
                            }

                            setLoading(false);
                        })
                        
                    } else {
                        setIntervalos(result.intervalos.sort((a, b) => a.id - b.id));
                        setLoading(false);
                    }
                } else {
                    setIntervalos([]);
                    setLoading(false);
                }
            })
        }
    }, [isFocused]);

    const generateNewIntervalo = async () => {
        setLoading(true);

        const data = {
            dataIntervalos: configIntervalo.dataIntervalos,
            intervaloRegla: configIntervalo.intervaloRegla,
        }
        const result = await generateIntervaloApi(data, configIntervalo.id, 1, false);
        if (result.ok) {
            let intervalosAux = intervalos;
            intervalosAux.push(result.intervalos[0]);
            setIntervalos(intervalosAux);
        } else {
            Alert.alert('No se pudo generar nuevo Intervalo :(');
        }

        setLoading(false);
    }

    const intervaloIn = async (interval) => {
        const data = {
            notes: interval.Notas,
            referenceNote: interval.NotaReferencia,
            type: interval.Tipo,
        };
        const result = await generateIntervaloFileApi(data);
        
        if (result.ok) {
            navigation.navigate('intervalos_play', {
                intervalo: interval,
            });
        } else {
            Alert.alert('No se puede acceder al Intervalo :(');
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
                {intervalos.map((interval, i) => (
                    <ListItem
                        containerStyle={styles.content}
                        key={i}
                        bottomDivider
                        onPress={() => {
                            intervaloIn(interval);
                        }}
                    >
                        <ListItem.Content>
                            <ListItem.Title style={styles.subtitle}>
                                Intervalo #{i + 1}
                            </ListItem.Title>
                            <ListItem.Subtitle style={{ color: 'black' }}>
                                Tipo: {tipoIntervalo.getTipoIntervaloDescription(interval.Tipo)} |
                                Clave: {interval.Clave}
                            </ListItem.Subtitle>
                            {interval.Resuelto[0] ? (
                                <View style={styles.contentNota}>
                                    <Text>
                                        <Text
                                            style={getStyleByState(interval.Resuelto)}
                                        >
                                            Última Calificación: {getLastCalification(interval.Resuelto).Correcto ? 'Correcto' : 'Mal'}
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
                onPress={generateNewIntervalo}
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
