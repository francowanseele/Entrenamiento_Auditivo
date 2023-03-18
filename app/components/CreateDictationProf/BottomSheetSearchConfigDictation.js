import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Animated, Dimensions, Alert } from 'react-native';
import { ListItem, Icon, Slider, Button, Divider, SearchBar, Image } from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import { dictationType } from '../../../enums/dictationType';
import { FIFTH_COLOR, PRIMARY_COLOR, QUARTER_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from '../../../utils/colorPalette';
import { getConfigDictationApi, getConfigDictationByStringApi } from '../../api/course';
import Loading from '../../components/Loading';
import OverlayConfirmation from '../OverlayConfirmation';

export default function BottomSheetSearchConfigDictation(props) {
    const {
        refRBSheet,
        setGeneratorType,
        setGiro_melodico_regla,
        setNotas_inicio,
        setNotas_fin,
        setClave_prioridad,
        setEscala_diatonica_regla,
        setNota_base,
        setMayor,
        setNro_compases,
        setSimple,
        setCompas_regla,
        setCelula_ritmica_regla,
        setLigadura_regla,
        setBPM,
        setNameConfig,
        setDescriptionConfig
    } = props;
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [searched, setSearched] = useState('');
    const [configSelected, setConfigSelected] = useState(null);
    const [results, setResults] = useState(null);

    // Handle modal
    const [modalConfirmationVisible, setModalConfirmationVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalText, setModalText] = useState('');

    const closeBottomSheet = () => {
        refRBSheet.current.close();
    }

    const initialStateOpen = () => {
        setSearch('');
        setSearched('');
        setModalTitle('');
        setModalText('');
        setResults(null);
        setConfigSelected(null);
    };

    const searchConfigDictation = () => {
        setLoading(true);
        getConfigDictationByStringApi(search)
            .then((result) => {
                if (result.ok) {
                    setResults(result.configs);
                } else {
                    setResults([]);
                    Alert.alert('Hubo un problema al realizar la búsqueda.');
                }
            })
            .catch((_) => {
                setResults([]);
                Alert.alert('Hubo un problema al realizar la búsqueda.');
            })
            .finally(() => {
                setSearched(search);
                setLoading(false);
            });
    }

    const clearSearch = () => {
        setResults(null);
        setSearch('');
        setSearched('');
    }

    const configDictationSelected = (config) => {
        setConfigSelected(config);
        setModalTitle('¿Quieres tomar esta configuración?');
        setModalText(
            `Configuración de dictado: ${config.Nombre} - ${config.Descripcion}
\nEn el móduo: ${config.ModuloNombre} - ${config.ModuloDescripcion}
\nCurso: ${config.CursoNombre} - ${config.CursoDescripcion}`
        );
        setModalConfirmationVisible(true);
    };

    const confirmSelected = () => {
        setLoading(true);

        getConfigDictationApi(configSelected.id)
            .then((result) => {
                if (result.ok) {
                    const configLoaded = result.config;

                    // TODO: Asumo que es configuracion de dictado melódico o rítmico
                    setGeneratorType(configLoaded.dictado_ritmico ? dictationType.rhythmic : dictationType.melodic);
                    setGiro_melodico_regla(
                        configLoaded.giro_melodico_regla.map((o) => ({
                            giros_melodicos: o.giros_melodicos,
                            lecturaAmbasDirecciones: o.lecturaAmbasDirecciones,
                            prioridad: o.prioridad,
                        }))
                    );
                    setNotas_inicio(configLoaded.notas_inicio);
                    setNotas_fin(configLoaded.notas_fin);
                    setClave_prioridad(
                        configLoaded.clave_prioridad.map((o) => ({
                            clave: o.clave,
                            prioridad: o.prioridad,
                        }))
                    );
                    setEscala_diatonica_regla(
                        configLoaded.escala_diatonica_regla.map((o) => ({
                            escala_diatonica: o.escala_diatonica,
                            prioridad: o.prioridad,
                        }))
                    );
                    setNota_base([configLoaded.nota_base]);
                    setMayor(configLoaded.mayor);
                    setNro_compases(configLoaded.nro_compases);
                    setSimple(configLoaded.simple);
                    setCompas_regla(
                        configLoaded.compas_regla.map((o) => ({
                            denominador: parseInt(o.denominador),
                            numerador: parseInt(o.numerador),
                            prioridad: o.prioridad,
                            simple: o.simple,
                        }))
                    );
                    setCelula_ritmica_regla(
                        configLoaded.celula_ritmica_regla.map((o) => ({
                            celula_ritmica: o.celula_ritmica,
                            id: o.id,
                            imagen: o.imagen,
                            prioridad: o.prioridad,
                            simple: o.simple,
                        }))
                    );
                    setLigadura_regla(configLoaded.ligaduraRegla.map((o) => ({
                        elem: {
                            first: o.elem.first,
                            firstId: o.elem.firstId,
                            second: o.elem.second,
                            secondId: o.elem.secondId,
                        },
                        must: o.must,
                        priority: o.priority,
                    })));
                    setBPM(configLoaded.bpm);
                    setNameConfig('COPIA - ' + configLoaded.nombre);
                    setDescriptionConfig('COPIA - ' + configLoaded.descripcion);
                } else {
                    Alert.alert('Hubo un problema acceder al dictado.');
                }
            })
            .catch((_) => {
                Alert.alert('Hubo un problema acceder al dictado.');
            })
            .finally(() => {
                refRBSheet.current.close();
                setLoading(false);
            })
    }

    return (
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={true}
            animationType="none"
            dragFromTopOnly={true}
            onOpen={async () => {
                await initialStateOpen();
            }}
            height={Dimensions.get('window').height}
            customStyles={{
                wrapper: {
                    backgroundColor: 'rgba(0,0,0,.25)',
                },
                draggableIcon: {
                    backgroundColor: '#000',
                },
            }}
        >
            <View>
                <View style={{ height: '20%' }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            paddingRight: 15,
                        }}
                    >
                        <Button
                            type="clear"
                            icon={
                                <Icon
                                    name="close"
                                    type="material-community"
                                    size={25}
                                />
                            }
                            onPress={closeBottomSheet}
                            containerStyle={styles.closeButton}
                        />
                        <Text style={styles.titleBottom}>
                            Buscar configuración de dictado
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                        }}
                    >
                        <SearchBar
                            placeholder="Nombre del dictado.."
                            onChangeText={(e) => setSearch(e)}
                            value={search}
                            containerStyle={styles.inputStyle}
                            platform="ios"
                            lightTheme={true}
                            onSubmitEditing={searchConfigDictation}
                            // onBlur={() => console.log('press out.....')}
                            onClear={clearSearch}
                            onCancel={clearSearch}
                            searchIcon={
                                <Icon
                                    name="magnify"
                                    type="material-community"
                                    onPress={searchConfigDictation}
                                />
                            }
                        />
                    </View>
                </View>
                {loading ? (
                    <View style={{ height: '80%' }}>
                        <Loading isVisible={true} text="Cargando" />
                    </View>
                ) : (
                    <ScrollView style={{ height: '80%' }}>
                        {results === null ? (
                            <View style={{ marginBottom: 150 }}>
                                <Image
                                    source={require('../../../assets/search_dictation.png')}
                                    style={styles.imageStyle}
                                />
                                <Text style={styles.primarySearchText}>
                                    Buscá el nombre de la configuración de
                                    dictado que quieras!
                                </Text>
                                <Text style={styles.secondarySearchText}>
                                    Te brindaremos cualquier configuración que
                                    tengamos en nuestro sistema.
                                </Text>
                            </View>
                        ) : results.length == 0 ? (
                            <>
                                <Image
                                    source={require('../../../assets/no_results.png')}
                                    style={styles.imageStyle}
                                />
                                <Text style={styles.primarySearchText}>
                                    No encontramos resultados para tu búsqueda
                                </Text>
                                <Text style={styles.secondarySearchText}>
                                    Asegurate de buscar el nombre completo (o
                                    una parte) de la configuración de dictado.
                                </Text>
                            </>
                        ) : (
                            <>
                                <Text style={styles.titleSearched}>
                                    Resultados de: {searched}
                                </Text>
                                {results.map((config) => (
                                    <ListItem
                                        key={config.id}
                                        onPress={() =>
                                            configDictationSelected(config)
                                        }
                                        bottomDivider
                                    >
                                        <ListItem.Content>
                                            <View>
                                                <ListItem.Title
                                                    numberOfLines={1}
                                                    style={{
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    {config.Nombre +
                                                        ': ' +
                                                        config.Descripcion}
                                                </ListItem.Title>
                                                <ListItem.Subtitle
                                                    numberOfLines={1}
                                                >
                                                    Curso: {config.CursoNombre}{' '}
                                                    | Módulo:{' '}
                                                    {config.ModuloNombre}
                                                </ListItem.Subtitle>
                                            </View>
                                        </ListItem.Content>
                                    </ListItem>
                                ))}
                            </>
                        )}
                    </ScrollView>
                )}
                <OverlayConfirmation
                    visible={modalConfirmationVisible}
                    setVisible={setModalConfirmationVisible}
                    title={modalTitle}
                    text={modalText}
                    functionOk={confirmSelected}
                />
            </View>
        </RBSheet>
    );
}

const styles = StyleSheet.create({
    titleSearched: {
        color: QUARTER_COLOR,
        fontWeight: 'bold',
        fontSize: 20,
        paddingLeft: 15,
    },
    imageStyle: {
        height: Dimensions.get('window').height * 0.45,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    primarySearchText: {
        color: PRIMARY_COLOR,
        fontSize: 20,
        alignSelf: 'center',
        textAlign: "center",
    },
    secondarySearchText: {
        color: QUARTER_COLOR,
        fontSize: 16,
        marginTop: 10,
        alignSelf: 'center',
        textAlign: "center",
    },
    inputStyle: {
        width: '100%'
    },
    contentButtonDelete: {
        paddingTop: 20,
        width: '20%',
    },
    contentKeyboard: {
        flexDirection: 'row',
    },
    buttonDelete: {
        width: 60,
    },
    okGiroMelodico: {
        marginTop: 20,
        width: '30%',
    },
    okGiroMelodicoContainer: {
        width: '30%',
    },
    okGiroMelodicoButton: {
        backgroundColor: PRIMARY_COLOR,
    },
    closeButton: {
        paddingTop: 12,
        width: '15%'
    },
    titleBottom: {
        fontSize: 20,
        color: PRIMARY_COLOR,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        width: '85%',
    },
    buttonNotes: {
        width: 60,
        margin: 2,
    },
    contentGirosMelodicos: {
        flexDirection: 'row',
        alignContent: 'center',
        padding: 20,
        width: '80%',
    },
    textGirosMelodicos: {
        fontSize: 15,
        width: '100%',
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'white',
        padding: 10,
    },
    textPrioridad: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 5,
        marginLeft: 20,
        width: '70%',
    },
    contentSlider: {
        paddingLeft: 25,
        paddingRight: 25,
        margin: 10,
    },
});
