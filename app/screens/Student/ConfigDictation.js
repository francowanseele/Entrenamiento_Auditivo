import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ListItem, Icon } from 'react-native-elements';

import Loading from '../../components/Loading';
import { generateDictationApi, getDictationApi } from '../../api/user';
import { generateDictationFileApi } from '../../api/sound';
import {
    getParams,
    getStorageItem,
    ID_CURRENT_CURSE,
    ID_USER,
} from '../../../utils/asyncStorageManagement';
// import { getNativeSourceAndFullInitialStatusForLoadAsync } from 'expo-av/build/AV';

export default function ConfigDictation({ route }) {
    const navigation = useNavigation();
    const { configDictation, module } = route.params;
    const [dictations, setDictations] = useState(null);

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

    useEffect(() => {
        getParams().then((d) => {
            const idUser = d.id;
            const logged = d.logged;
            const email = d.email;
            const isStudent = d.isStudent;
            const idCourse = d.id_course;
            getDictationApi(idUser, configDictation._id).then((result) => {
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
                            bpm: configDictation.bpm
                                ? configDictation.bpm
                                : 128,
                            dictado_ritmico: configDictation.dictado_ritmico
                                ? configDictation.dictado_ritmico
                                : false,
                        };
                        generateDictationApi(
                            idUser,
                            idCourse,
                            module._id,
                            configDictation._id,
                            5,
                            data
                        ).then((resultDictation) => {
                            if (resultDictation.ok) {
                                getDictationApi(
                                    idUser,
                                    configDictation._id
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

    if (!dictations) return <Loading isVisible={true} text="Cargando" />;

    return (
        <ScrollView>
            {dictations.map((dict, i) => (
                <ListItem
                    key={i}
                    bottomDivider
                    onPress={() => {
                        dictationIn(dict);
                    }}
                >
                    {/* <Icon name={item.icon} /> */}
                    <ListItem.Content>
                        <ListItem.Title>Dictado #{i}</ListItem.Title>
                        <ListItem.Subtitle>
                            Clave {dict.clave} | Escala diatónica{' '}
                            {dict.escala_diatonica}
                        </ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            ))}
        </ScrollView>
    );
}
