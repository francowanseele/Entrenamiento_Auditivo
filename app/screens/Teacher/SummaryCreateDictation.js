import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import {
    getParams,
    getStorageIsLogged,
} from '../../../utils/asyncStorageManagement';
import {
    FIFTH_COLOR,
    PRIMARY_COLOR,
    QUARTER_COLOR,
    SECONDARY_COLOR,
} from '../../../utils/colorPalette';
import { addConfigDictationApi } from '../../api/course';
import OverlayInfo from '../../components/CreateDictationProf/OverlayInfo';
import { dictationType } from '../../../enums/dictationType';
import { addConfigAcordeJazzApi } from '../../api/acordes';
import { addConfigIntervaloApi } from '../../api/intervalos';
import { addConfigDictadoArmonicoApi } from '../../api/dictadosArmonicos';

export default function SummaryCreateDictation({ route }) {
    const {
        dictationRhythmic,
        course,
        module,
        nameConfig,
        descriptionConfig,
        giro_melodico_regla,
        notas_inicio,
        notas_fin,
        clave_prioridad,
        escala_diatonica_regla,
        nota_base,
        nro_compases,
        simple,
        compas_regla,
        celula_ritmica_regla,
        BPM,
        tesitura,
        mayor,
        isOnlyView,
        ligadura_regla,
        generatorType,
        dataCAJ,
        dataIntervalo,
        dataConfig,
        dataCDA,
    } = route.params;

    const [visibleEndCreate, setVisibleEndCreate] = useState(false);
    const [textEndCreate, setTextEndCreate] = useState('');
    const [titleEndCreate, setTitleEndCreate] = useState('');

    const navigation = useNavigation();
     const getImagenFromB64String = (imagen)=>{
        return (
            <Image style={{marginLeft:15, width:50,height:50, resizeMode: 'contain'}} source={{uri: `data:image/gif;base64,${imagen}`}} />
        )
    }
    const printArray = (arr) => {
        var res = '';
        if (arr) {
            for (let i = 0; i < arr.length - 1; i++) {
                const elem = arr[i];
                res = res.concat(elem, ' - ');
            }
            if (arr.length > 0) {
                res = res.concat(arr[arr.length - 1]);
            } else {
                res = 'SIN DEFINIR';
            }
        }
        return res;
    };

    const printPrioridadClave = (clave, clavePrio) => {
        var res = null;
        clavePrio.forEach((cp) => {
            if (cp.clave == clave) {
                res = cp.prioridad.toString();
            }
        });

        return res;
    };

    const returnToCreateEmpty = () => {
        const cleanAll = Math.floor(Math.random() * 10000 + 1); // nro random de 4 cifras
        navigation.navigate('createDictationProf', { cleanAll });
    };

    const createConfigDictation = async () => {
        const dataStorage = await getParams();
        const logged = await getStorageIsLogged();

        if (logged) {
            if (generatorType == dictationType.melodic || generatorType == dictationType.rhythmic) {
                const data = {
                    name: nameConfig,
                    description: descriptionConfig,
                    giroMelodicoRegla: giro_melodico_regla,
                    tesitura: tesitura,
                    startNotes: notas_inicio,
                    endNotes: notas_fin,
                    clefPriority: clave_prioridad,
                    escalaDiatonicaRegla: escala_diatonica_regla,
                    celulaRitmicaRegla: celula_ritmica_regla,
                    nroCompases: parseInt(nro_compases),
                    compasRegla: compas_regla,
                    simple: simple,
                    notaBase: nota_base[0],
                    bpm: BPM,
                    dictado_ritmico: dictationRhythmic,
                    mayor: mayor,
                    ligaduraRegla: ligadura_regla,
                };
    
                const resultNewConfig = await addConfigDictationApi(
                    course.id,
                    module.id,
                    dataStorage.id,
                    data
                );
    
                if (resultNewConfig.ok) {
                    setTitleEndCreate('Configuración exitosa!!');
                    setTextEndCreate('Su configuración fue creada con éxito.');
                    setVisibleEndCreate(true);
                } else {
                    setTitleEndCreate('Lo sentimos, algo salio mal..');
                    setTextEndCreate('Por favor intentelo más tarde.');
                    setVisibleEndCreate(true);
                    console.log('Error al crear la configuración');
                }
            } else if (generatorType == dictationType.jazzChrods) {
                const result = await addConfigAcordeJazzApi(dataCAJ, module.id);
                if (result.ok) {
                    setTitleEndCreate('Configuración exitosa!!');
                    setTextEndCreate('Su configuración fue creada con éxito.');
                    setVisibleEndCreate(true);
                } else {
                    setTitleEndCreate('Lo sentimos, algo salio mal..');
                    setTextEndCreate('Por favor intentelo más tarde.');
                    setVisibleEndCreate(true);
                }
            } else if (generatorType == dictationType.interval) {
                const result = await addConfigIntervaloApi(dataIntervalo, module.id);

                if (result.ok) {
                    setTitleEndCreate('Configuración exitosa!!');
                    setTextEndCreate('Su configuración fue creada con éxito.');
                    setVisibleEndCreate(true);
                } else {
                    setTitleEndCreate('Lo sentimos, algo salio mal..');
                    setTextEndCreate('Por favor intentelo más tarde.');
                    setVisibleEndCreate(true);
                }
            } else if (generatorType == dictationType.harmonicDictation) {
                // console.log(dataCDA.dataCamposArmonicos.filter(x => x.Nivel == 1 && x.CheckEscala &&
                //     x.CheckKeyNote &&
                //     x.CheckNombreCifrado));
                const result = await addConfigDictadoArmonicoApi(dataCDA, module.id);

                if (result.ok) {
                    setTitleEndCreate('Configuración exitosa!!');
                    setTextEndCreate('Su configuración fue creada con éxito.');
                    setVisibleEndCreate(true);
                } else {
                    setTitleEndCreate('Lo sentimos, algo salio mal..');
                    setTextEndCreate('Por favor intentelo más tarde.');
                    setVisibleEndCreate(true);
                }
            }
        } else {
            // TODO: user no logged
        }
    };

    return (
        <ScrollView>
            {generatorType == dictationType.jazzChrods ? (
                <View style={styles.contentAll}>
                    {!isOnlyView ? (
                        <View style={styles.contentInfoGral}>
                            <Text style={styles.titleSection}>
                                Crear generador de Acorde
                            </Text>
                        </View>
                    ) : (
                        <View style={styles.contentInfoGral}>
                            <View style={styles.contentTitleSection}>
                                <Text style={styles.titleSection}>
                                    Configuración general
                                </Text>
                            </View>
                            <View style={styles.contentTexts}>
                                <Text style={styles.textSubtitle}>Curso: </Text>
                                <Text style={styles.textInfo}>{course?.name}</Text>
                            </View>

                            <View style={styles.contentTexts}>
                                <Text style={styles.textSubtitle}>Módulo: </Text>
                                <Text style={styles.textInfo}>{module?.name}</Text>
                            </View>

                            <View style={styles.contentTexts}>
                                <Text style={styles.textSubtitle}>
                                    Nombre Nueva configuración:{' '}
                                </Text>
                                <Text style={styles.textInfo}>{dataConfig.configAcorde.Nombre}</Text>
                            </View>

                            <View style={styles.contentTexts}>
                                <Text style={styles.textSubtitle}>
                                    Descripción Nueva configuración:{' '}
                                </Text>
                                <Text style={styles.textInfo}>{dataConfig.configAcorde.Descripcion}</Text>
                            </View>
                        </View>
                    )}
                </View>
            ) : generatorType == dictationType.harmonicDictation ? (
                <View style={styles.contentAll}>
                    {!isOnlyView ? (
                        <View style={styles.contentInfoGral}>
                            <Text style={styles.titleSection}>
                                Crear generador de Dictados Armónicos
                            </Text>
                        </View>
                    ) : (
                        <View style={styles.contentInfoGral}>
                            <View style={styles.contentTitleSection}>
                                <Text style={styles.titleSection}>
                                    Configuración general
                                </Text>
                            </View>
                            <View style={styles.contentTexts}>
                                <Text style={styles.textSubtitle}>Curso: </Text>
                                <Text style={styles.textInfo}>{course?.name}</Text>
                            </View>

                            <View style={styles.contentTexts}>
                                <Text style={styles.textSubtitle}>Módulo: </Text>
                                <Text style={styles.textInfo}>{module?.name}</Text>
                            </View>

                            <View style={styles.contentTexts}>
                                <Text style={styles.textSubtitle}>
                                    Nombre Nueva configuración:{' '}
                                </Text>
                                <Text style={styles.textInfo}>{dataConfig.configAcorde.Nombre}</Text>
                            </View>

                            <View style={styles.contentTexts}>
                                <Text style={styles.textSubtitle}>
                                    Descripción Nueva configuración:{' '}
                                </Text>
                                <Text style={styles.textInfo}>{dataConfig.configAcorde.Descripcion}</Text>
                            </View>
                        </View>
                    )}
                </View>
            ) : generatorType == dictationType.interval ? (
                <View style={styles.contentAll}>
                    {!isOnlyView ? (
                        <View style={styles.contentInfoGral}>
                            <Text style={styles.titleSection}>
                                Crear generador de Intervalo
                            </Text>
                        </View>
                    ) : (
                        <View style={styles.contentInfoGral}>
                            <View style={styles.contentTitleSection}>
                                <Text style={styles.titleSection}>
                                    Configuración general
                                </Text>
                            </View>
                            <View style={styles.contentTexts}>
                                <Text style={styles.textSubtitle}>Curso: </Text>
                                <Text style={styles.textInfo}>{course?.name}</Text>
                            </View>

                            <View style={styles.contentTexts}>
                                <Text style={styles.textSubtitle}>Módulo: </Text>
                                <Text style={styles.textInfo}>{module?.name}</Text>
                            </View>

                            <View style={styles.contentTexts}>
                                <Text style={styles.textSubtitle}>
                                    Nombre Nueva configuración:{' '}
                                </Text>
                                <Text style={styles.textInfo}>{dataConfig.configIntervalo.Nombre}</Text>
                            </View>

                            <View style={styles.contentTexts}>
                                <Text style={styles.textSubtitle}>
                                    Descripción Nueva configuración:{' '}
                                </Text>
                                <Text style={styles.textInfo}>{dataConfig.configIntervalo.Descripcion}</Text>
                            </View>
                        </View>
                    )}
                </View>
            ) : (
                <View style={styles.contentAll}>
                    <View style={styles.contentInfoGral}>
                        <View style={styles.contentTitleSection}>
                            <Text style={styles.titleSection}>
                                Configuración general
                            </Text>
                        </View>
                        <View style={styles.contentTexts}>
                            <Text style={styles.textSubtitle}>Curso: </Text>
                            <Text style={styles.textInfo}>{course.name}</Text>
                        </View>

                        <View style={styles.contentTexts}>
                            <Text style={styles.textSubtitle}>Módulo: </Text>
                            <Text style={styles.textInfo}>{module.name}</Text>
                        </View>

                        <View style={styles.contentTexts}>
                            <Text style={styles.textSubtitle}>
                                Nombre Nueva configuración:{' '}
                            </Text>
                            <Text style={styles.textInfo}>{nameConfig}</Text>
                        </View>

                        <View style={styles.contentTexts}>
                            <Text style={styles.textSubtitle}>
                                Descripción Nueva configuración:{' '}
                            </Text>
                            <Text style={styles.textInfo}>{descriptionConfig}</Text>
                        </View>
                    </View>

                    {/* -------------------------------------- */}

                    <View style={styles.contentInfoGral}>
                        <View style={styles.contentTitleSection}>
                            <Text style={styles.titleSection}>
                                Configuración Melódica
                            </Text>
                        </View>
                        <View style={styles.contentTexts}>
                            <Text style={styles.textSubtitle}>
                                Giros melódicos:{' '}
                            </Text>
                            {giro_melodico_regla.map((giro, i) => (
                                <Text key={i} style={styles.textInfo}>
                                    [{printArray(giro.giros_melodicos)}](Prioridad{' '}
                                    {giro.prioridad})
                                </Text>
                            ))}
                        </View>

                        <View style={styles.contentTexts}>
                            <Text style={styles.textSubtitle}>
                                Notas de inicio:{' '}
                            </Text>
                            <Text style={styles.textInfo}>
                                [{printArray(notas_inicio)}]
                            </Text>
                        </View>

                        <View style={styles.contentTexts}>
                            <Text style={styles.textSubtitle}>Notas de fin: </Text>
                            <Text style={styles.textInfo}>
                                [{printArray(notas_fin)}]
                            </Text>
                        </View>

                        <View style={styles.contentTexts}>
                            <Text style={styles.textSubtitle}>Clave Sol</Text>
                            <Text style={styles.textInfo}>
                                (Prioridad{' '}
                                {printPrioridadClave('Sol', clave_prioridad)})
                            </Text>
                        </View>
                        <View style={styles.contentTexts}>
                            <Text style={styles.textSubtitle}>Clave Fa</Text>
                            <Text style={styles.textInfo}>
                                (Prioridad{' '}
                                {printPrioridadClave('Fa', clave_prioridad)})
                            </Text>
                        </View>

                        <View style={styles.contentTexts}>
                            <Text style={styles.textSubtitle}>
                                Nota de referencia
                            </Text>
                            <Text style={styles.textInfo}>{nota_base}</Text>
                        </View>
                    </View>

                    {/* -------------------------------------- */}

                    <View style={styles.contentInfoGral}>
                        <View style={styles.contentTitleSection}>
                            <Text style={styles.titleSection}>
                                Configuración Rítmica
                            </Text>
                        </View>
                        <View style={styles.contentTexts}>
                            <Text style={styles.textSubtitle}>Compases: </Text>
                            {compas_regla.map((compas, i) => (
                                <Text key={i} style={styles.textInfo}>
                                    [{compas.numerador}/{compas.denominador}
                                    ](Prioridad {compas.prioridad})
                                </Text>
                            ))}
                        </View>

                        <View style={styles.contentTexts}>
                            <Text style={styles.textSubtitle}>
                                Número de compases:{' '}
                            </Text>
                            <Text style={styles.textInfo}>{nro_compases}</Text>
                        </View>

                        <View style={styles.contentTexts}>
                            <Text style={styles.textSubtitle}>
                                Células rítmicas:{' '}
                            </Text>
                            {celula_ritmica_regla.map((celula, i) => (
                                <Text key={i} style={styles.textInfo}>
                                    {/* FALTA OBTENER LA IMAGEN EN LA CR
                                    no pude encontrarlo
                                    {console.log(celula)}
                                    {celula.imagen? getImagenFromB64String(celula.imagen)
                                    :<></>} */}
                                    [{celula.celula_ritmica}
                                    ](Prioridad {celula.prioridad})
                                </Text>
                            ))}
                        </View>

                        <View style={styles.contentTexts}>
                            <Text style={styles.textSubtitle}>BPM menor: </Text>
                            <Text style={styles.textInfo}>{BPM.menor} bpm</Text>
                        </View>
                        <View style={styles.contentTexts}>
                            <Text style={styles.textSubtitle}>BPM mayor: </Text>
                            <Text style={styles.textInfo}>{BPM.mayor} bpm</Text>
                        </View>
                    </View>
                </View>
            )}

            <Button
                title={isOnlyView ? "Volver" : "Finalizar"}
                onPress={async () => {
                    if (!isOnlyView) {
                        await createConfigDictation();
                    } else {
                        navigation.goBack();
                    }
                }}
                buttonStyle={{ backgroundColor: PRIMARY_COLOR }}
            />

            <OverlayInfo
                visible={visibleEndCreate}
                setVisible={setVisibleEndCreate}
                title={titleEndCreate}
                text={textEndCreate}
                functionOk={returnToCreateEmpty}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    contentAll: {
        padding: 15,
    },
    contentInfoGral: {
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 5,
        padding: 15,
        borderColor: 'lightgrey',
        marginBottom: 20,
        backgroundColor: 'white',
    },
    contentTitleSection: {
        borderBottomWidth: 2,
        borderStyle: 'solid',
        borderColor: SECONDARY_COLOR,
        marginBottom: 10,
    },
    titleSection: {
        fontSize: 20,
    },
    textSubtitle: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    textInfo: {
        fontSize: 17,
    },
    contentTexts: {
        // flexDirection: 'row',
        marginTop: 5,
    },
});
