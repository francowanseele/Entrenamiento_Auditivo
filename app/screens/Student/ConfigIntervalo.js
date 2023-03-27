import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ListItem, FAB } from 'react-native-elements';
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

    useEffect(() => {
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
    }, []);

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
            console.log(result);
            navigation.navigate('intervalos_play', {
                intervalo: interval,
            });
        } else {
            Alert.alert('No se puede acceder al Intervalo :(');
        }
    }

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
