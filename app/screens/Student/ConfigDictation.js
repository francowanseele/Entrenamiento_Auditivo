import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ListItem, Icon } from 'react-native-elements';
import {BACKGROUNDHOME, ITEMSHOME, TEXTHOME} from '../../styles/styleValues';
import Loading from '../../components/Loading';
import { generateDictationApi, getDictationApi } from '../../api/user';
import { generateDictationFileApi } from '../../api/sound';
import {LinearGradient} from 'expo-linear-gradient';
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
    const [ stateDict, setStateDict ] = useState('nuevo');

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
                                    }
                                });
                            } else {
                                // TODO Error
                                // Mostrar cartel de que no se pudo generar ningún dictado si viene error 400
                                console.log('ERROR');
                            }
                        });
                    } else {
                        setDictations(result.dictations);
                    }
                } else {
                    // TODO Error
                }
            });
        });
    }, []);

    const dictationIn = async (dictation) => {
        // Generar midi y mp3
        const data = {
            dictado: dictation.notas,
            figurasDictado: dictation.figuras,
            escalaDiatoica: dictation.escala_diatonica
        };

        const id = await getStorageItem(ID_USER);
        var { ok, dictadoTransformado, message } =
            await generateDictationFileApi(data, id);

        console.log('---> CONTROL ---------');
        console.log('Dictado original (SIN alteraciones):');
        console.log(dictation.notas);
        console.log('Dictado graficado (CON alteraciones):');
        console.log(dictadoTransformado);
        console.log('Escala diatónica: ');
        console.log(dictation.escala_diatonica);
        console.log('------------------------');

        if (ok) {
            navigation.navigate('dictation', {
                dictation,
            });
        } else {
            // TODO Error
            console.log(message);
        }
    };
    const  getStyleByState = (stateDict) => {
        if (stateDict ){
            if (stateDict.nota  <= 2){
                return styles.notaRed
            }else if( stateDict.nota >=3 && stateDict.nota <= 8){
                return styles.contentNota
            }else {
                return styles.notaGreen
            }
        }
        else return styles.content
    }

    if (!dictations) return <Loading isVisible={true} text="Cargando" />;

    return (
        <ScrollView  style={styles.container} >
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
                    <ListItem.Content >
                        <ListItem.Title style={styles.subtitle } >Dictado #{i}</ListItem.Title>
                        <ListItem.Subtitle style={{color:'black'}} >
                            Clave {dict.clave} | Escala diatónica{' '}
                            {dict.escala_diatonica}                             
                        </ListItem.Subtitle>
                        { dict.resuelto[0] ? 
                          <View style={styles.contentNota}> 
                            <Text><Text style={getStyleByState(dict.resuelto[0])}>Nota más reciente: {dict.resuelto[0].nota}</Text></Text>
                          </View>:
                         <Text></Text>  }
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        height:'100%'
    },
    content:{
        marginTop:10,
        backgroundColor:ITEMSHOME,
        flexDirection:'row',
        width:'90%',
        alignSelf:'center',
        borderRadius:10,
        shadowColor: '#470000',
        shadowOffset: {width: 10, height: 10},
        shadowOpacity: 0.2,
        elevation:13,    
    },
    contentNota:{
        borderRadius:100,
        alignSelf:'flex-start',
        width:'60%'     
    },
    nota:{
        alignSelf:'flex-start',
        borderRadius:100,
        fontWeight:'bold'
    },
    notaGreen:{
        color:TEXTHOME,
        alignSelf:'flex-start',
        borderRadius:100,
        fontWeight:'bold'
    },
    notaRed:{
        color:'#f1503f',
        alignSelf:'flex-start',
        borderRadius:100,
        fontWeight:'bold'
    },
    subtitle:{
        color: TEXTHOME,
        fontWeight:'bold',
        fontSize:20
    }
});