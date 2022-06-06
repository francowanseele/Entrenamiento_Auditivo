import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ListItem, Icon, FAB } from 'react-native-elements';
import { BACKGROUNDHOME, ITEMSHOME, TEXTHOME } from '../../styles/styleValues';
import Loading from '../../components/Loading';
import { generateDictationApi, getDictationApi } from '../../api/user';
import { generateDictationFileApi } from '../../api/sound';
import { Ionicons } from '@expo/vector-icons';
import {
    getParams,
    getStorageItem,
    ID_CURRENT_CURSE,
    ID_USER,
} from '../../../utils/asyncStorageManagement';
import { set } from 'react-native-reanimated';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../../utils/colorPalette';
// import { getNativeSourceAndFullInitialStatusForLoadAsync } from 'expo-av/build/AV';

export default function ConfigDictation({ route }) {
    const navigation = useNavigation();
    const { configDictation, module } = route.params;
    const [dictations, setDictations] = useState([]);
    const [stateDict, setStateDict] = useState('nuevo');
    const [loading, setLoading] = useState(false);

    const getTarjetas = (celulaRitmica) => {
        var res = [];
        celulaRitmica.forEach((celula) => {
            res.push({
                elem: celula.celula_ritmica,
                prioridad: celula.prioridad,
            });
        });

        return res;
    };

    const getGirosMelodicos = (girosMelodicos) => {
        var resGiros = [];
        var resPrio = [];

        for (let i = 0; i < girosMelodicos.length; i++) {
            const giro = girosMelodicos[i];
            resGiros.push(giro.giros_melodicos);
            resPrio.push({
                regla: i,
                prioridad: giro.prioridad,
                lecturaAmbasDirecciones: giro.lecturaAmbasDirecciones,
            });
        }

        return [resGiros, resPrio];
    };

    const getTesitura = (tesitura) => {
        var res = [];
        tesitura.forEach((t) => {
            res.push({
                clave: t.clave,
                notaMenor: t.nota_menor,
                notaMayor: t.nota_mayor,
            });
        });

        return res;
    };

    const getPrioridadClave = (clavePrioridad) => {
        var res = [];
        clavePrioridad.forEach((cp) => {
            res.push({
                elem: cp.clave,
                prioridad: cp.prioridad,
            });
        });

        return res;
    };

    const getEscalasDiatonicas = (escalas) => {
        var res = [];
        escalas.forEach((escala) => {
            res.push({
                elem: escala.escala_diatonica,
                prioridad: escala.prioridad,
            });
        });

        return res;
    };

    const getCompas = (compasRegla) => {
        var res = [];
        compasRegla.forEach((compas) => {
            const numDenom =
                compas.numerador.toString() +
                '/' +
                compas.denominador.toString();
            res.push({
                elem: numDenom,
                prioridad: compas.prioridad,
            });
        });

        return res;
    };

    const getSimple = (compasRegla) => {
        var simple = false;
        compasRegla.forEach((compas) => {
            compas.simple;
        });
    };

    const generarDictadoNuevo = async () => {
        setLoading(true);
        const { logged, email, id, isStudent, id_course } = await getParams();
        const idUser = parseInt(id);
        const idCourse = parseInt(id_course);
        const resGirosMelodicos = getGirosMelodicos(
            configDictation.giro_melodico_regla
        );

        const data = {
            tarjetas: getTarjetas(configDictation.celula_ritmica_regla),
            nroCompases: configDictation.nro_compases,
            compas: getCompas(configDictation.compas_regla),
            simple: configDictation.simple ? 'simples' : 'compuestas',
            notasRegla: resGirosMelodicos[0],
            nivelPrioridadRegla: resGirosMelodicos[1],
            intervaloNotas: getTesitura(configDictation.tesitura),
            notasBase: configDictation.notas_inicio,
            notasFin: configDictation.notas_fin,
            nivelPrioridadClave: getPrioridadClave(
                configDictation.clave_prioridad
            ),
            escalaDiatonicaRegla: getEscalasDiatonicas(
                configDictation.escala_diatonica_regla
            ),
            notaBase: configDictation.nota_base,
            bpm: configDictation.bpm ? configDictation.bpm : 128,
            dictado_ritmico: configDictation.dictado_ritmico
                ? configDictation.dictado_ritmico
                : false,
            ligaduraRegla: configDictation.ligaduraRegla,
        };

        const resultDictation = await generateDictationApi(
            idUser,
            idCourse,
            module.id,
            configDictation.id,
            1,
            data,
            false
        );

        if (resultDictation.ok) {
            getDictationApi(idUser, configDictation.id).then(
                (resultNewDictation) => {
                    if (resultNewDictation.ok) {
                        setDictations(resultNewDictation.dictations);
                        // dictations.push(resultNewDictation.dictations)
                    } else {
                        // TODO ERROR
                        setDictations([]);
                    }
                }
            );
        } else {
            // TODO Error
            // Mostrar cartel de que no se pudo generar ningún dictado si viene error 400
            if (resultDictation.issueConfig) {
                // Error de la configuración
                console.log('Error de la configuración....');
            } else {
                // Error del servidor
                console.log('Error del servidor.');
            }
            console.log('ERROR');
        }

        setLoading(false);
    };

    useEffect(() => {
        getParams().then((d) => {
            const idUser = parseInt(d.id);
            const logged = d.logged;
            const email = d.email;
            const isStudent = d.isStudent;
            const idCourse = parseInt(d.id_course);
            getDictationApi(idUser, configDictation.id).then((result) => {
                if (result.ok) {
                    if (result.dictations.length == 0) {
                        // Generar nuevos
                        const resGirosMelodicos = getGirosMelodicos(
                            configDictation.giro_melodico_regla
                        );
                        const data = {
                            tarjetas: getTarjetas(
                                configDictation.celula_ritmica_regla
                            ),
                            nroCompases: configDictation.nro_compases,
                            compas: getCompas(configDictation.compas_regla),
                            simple: configDictation.simple
                                ? 'simples'
                                : 'compuestas',
                            notasRegla: resGirosMelodicos[0],
                            nivelPrioridadRegla: resGirosMelodicos[1],
                            intervaloNotas: getTesitura(
                                configDictation.tesitura
                            ),
                            notasBase: configDictation.notas_inicio,
                            notasFin: configDictation.notas_fin,
                            nivelPrioridadClave: getPrioridadClave(
                                configDictation.clave_prioridad
                            ),
                            escalaDiatonicaRegla: getEscalasDiatonicas(
                                configDictation.escala_diatonica_regla
                            ),
                            notaBase: configDictation.nota_base,
                            bpm:
                                configDictation.bpm.menor &&
                                configDictation.bpm.mayor
                                    ? configDictation.bpm
                                    : { menor: 128, mayor: 128 },
                            dictado_ritmico: configDictation.dictado_ritmico
                                ? configDictation.dictado_ritmico
                                : false,
                            ligaduraRegla: configDictation.ligaduraRegla,
                        };
                        generateDictationApi(
                            idUser,
                            idCourse,
                            module.id,
                            configDictation.id,
                            5,
                            data,
                            false
                        ).then((resultDictation) => {
                            if (resultDictation.ok) {
                                getDictationApi(
                                    idUser,
                                    configDictation.id
                                ).then((resultNewDictation) => {
                                    if (resultNewDictation.ok) {
                                        setDictations(
                                            resultNewDictation.dictations
                                        );
                                    } else {
                                        // TODO ERROR
                                        setDictations([]);
                                    }
                                });
                            } else {
                                // TODO Error
                                // Mostrar cartel de que no se pudo generar ningún dictado si viene error 400
                                if (resultDictation.issueConfig) {
                                    // Error de la configuración
                                    console.log(
                                        'Error de la configuración....'
                                    );
                                } else {
                                    // Error del servidor
                                    console.log('Error del servidor.');
                                }
                                console.log('ERROR');
                            }
                        });
                    } else {
                        setDictations(result.dictations);
                    }
                } else {
                    // TODO Error
                    setDictations([]);
                }
            });
        });
    }, []);

    const dictationIn = async (dictation) => {
        // Generar midi y mp3
        const data = {
            dictado: dictation.notas,
            figurasDictado: dictation.figuras,
            escalaDiatoica: dictation.escala_diatonica,
            bpm: dictation.bpm ? dictation.bpm : 128,
            nota_base: dictation.nota_base,
            numerador: dictation.numerador,
            denominador: dictation.denominador,
        };

        const id = await getStorageItem(ID_USER);
        var { ok, dictadoTransformado, message } =
            await generateDictationFileApi(data, id);

        // console.log('---> CONTROL ---------');
        // console.log('Dictado original (SIN alteraciones):');
        // console.log(dictation.notas);
        // console.log('Dictado graficado (CON alteraciones):');
        // console.log(dictadoTransformado);
        // console.log('Escala diatónica: ');
        // console.log(dictation.escala_diatonica);
        // console.log('------------------------');

        if (ok) {
            navigation.navigate('dictation', {
                dictation,
            });
        } else {
            // TODO Error
            console.log(message);
        }
    };
    const getStyleByState = (stateDict) => {
        if (stateDict) {
            if (stateDict.nota <= 2) {
                return styles.notaRed;
            } else if (stateDict.nota >= 3 && stateDict.nota <= 8) {
                return styles.notaOrange;
            } else {
                return styles.notaGreen;
            }
        } else return styles.content;
    };

    if (dictations.length < 1)
        return <Loading isVisible={true} text="Cargando" />;

    return (
        <View style={styles.container}>
            <ScrollView>
                {dictations.map((dict, i) => (
                    <ListItem
                        containerStyle={styles.content}
                        key={i}
                        bottomDivider
                        onPress={() => {
                            dictationIn(dict);
                        }}
                    >
                        {/* <Icon name={item.icon} /> */}
                        <ListItem.Content>
                            <ListItem.Title style={styles.subtitle}>
                                Dictado #{i}
                            </ListItem.Title>
                            <ListItem.Subtitle style={{ color: 'black' }}>
                                Clave {dict.clave} | Escala diatónica{' '}
                                {dict.escala_diatonica}
                            </ListItem.Subtitle>
                            {dict.resuelto[0] ? (
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
                            )}
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                ))}
            </ScrollView>
            <FAB
                placement="right"
                title="+ Generar"
                titleStyle={{ padding: 0 }}
                size="large"
                color={PRIMARY_COLOR}
                onPress={() => {
                    generarDictadoNuevo();
                }}
            />
            {/* <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                    generarDictadoNuevo();
                }}
            >
                <Ionicons
                    style={styles.button}
                    name="md-add-circle-sharp"
                    size={50}
                />
            </TouchableOpacity> */}
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
