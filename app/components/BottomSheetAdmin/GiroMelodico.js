import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Dimensions, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { ListItem, Icon } from '@rneui/themed';
import RBSheet from 'react-native-raw-bottom-sheet';

import {
    BACKGROUND_COLOR_RIGHT,
    BORDER_COLOR_RIGHT,
    FIFTH_COLOR,
    PRIMARY_COLOR,
    TEXT_COLOR_WRONG,
} from '../../../utils/colorPalette';
import {
    addGiroMelodicoApi,
} from '../../api/giro_melodico';
import { getAll } from '../../api/giro_melodico_grupo';
import KeyboardIntervals from '../CreateDictationProf/KeyboardIntervals';
import OverlayPicker from '../CreateDictationProf/OverlayPicker';
import Loading from '../Loading';

export function GiroMelodico(props) {
    const {
        refRBSheet,
        mayor,
    } = props;
    const [giro, setGiro] = useState([]);
    const [title, setTitle] = useState('Crear giro melódico');

    const [loading, setLoading] = useState(false);

    // Giros melodicos grupo
    const [grupos, setGrupos] = useState([]);
    const [subGrupos, setSubGrupos] = useState([]);
    const [grupo, setGrupo] = useState(null);
    const [subGrupo, setSubGrupo] = useState(null);
    const [visibleGrupo, setVisibleGrupo] = useState(false);
    const [visibleSubgrupo, setVisibleSubgrupo] = useState(false);
    const [titleOverlay, setTitleOverlay] = useState('');
    const [msjErrorOverlay, setMsjErrorOverlay] = useState('');

    useEffect(() => {
        setSubGrupo(null);
        if (grupo) {
            setSubGrupos(grupo.subGrupo);
        } else {
            setSubGrupos([]);
        }
    }, [grupo])
    

    const saveGiroMelodico = async () => {
        if (giro.length === 0) {
            Alert.alert('Debe escribir un giro melódico.');
        } else if (grupo == null || subGrupo == null) {
            Alert.alert('Debe especificar grupo y subgrupo para el giro melódico.');
        } else {
            const data = {
                giro_melodico: giro,
                mayor: mayor,
                grupoId: subGrupo.id,
            };
    
            const addGiroMelodicoResult = await addGiroMelodicoApi(data);
    
            if (!addGiroMelodicoResult.ok) {
                Alert.alert('No se pudo guardar el giro melódico');
            } 

            Alert.alert('Giro melódico añadido a la lista del sistema!');
            refRBSheet.current.close();
        }
    };

    const initialStateOpen = async () => {
        setLoading(true);
        setGrupo(null);
        setSubGrupo(null);
        setTitle('Crear giro melódico');
        setGiro([]);

        getAll().then((result) => {
            if(result.ok) {
                setGrupos(result.girosMelodicosGrupo);
            }
        })

        setLoading(false);
    };

    const editGrupo = async () => {
        if (grupos && grupos.length) {
            await setMsjErrorOverlay('');
            await setTitleOverlay('Seleccionar Grupo');
        } else {
            await setMsjErrorOverlay('No hay grupos disponibles. Si es un usuario administrador puede agregar nuevos en "Administrar grupos en ADA". De lo contrario puede ponerse en contacto con administradores.');
        }
        setVisibleGrupo(true);
    };

    const editSubGrupo = async () => {
        if (subGrupos && subGrupos.length) {
            await setMsjErrorOverlay('');
            await setTitleOverlay('Seleccionar Subgrupo');
        } else {
            if (grupo) {
                await setMsjErrorOverlay('No hay subgrupos disponibles. Si es un usuario administrador puede agregar nuevos en "Administrar grupos en ADA". De lo contrario puede ponerse en contacto con administradores.');
            } else {
                await setMsjErrorOverlay('No hay grupo seleccionado. Por favor seleccione un grupo antes de seleccionar un subgrupo.');
            }
        }
        setVisibleSubgrupo(true);
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
            height={Dimensions.get('window').height * 0.75}
            customStyles={{
                wrapper: {
                    backgroundColor: 'rgba(0,0,0,.25)',
                },
                draggableIcon: {
                    backgroundColor: '#000',
                },
                container: {
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                },
            }}
        >
            {loading ? (
                <Loading isVisible={true} text="Cargando" />
            ) : (
                <View>
                    <View>
                        <View
                            style={{
                                flexDirection: 'row',
                                paddingRight: 15,
                            }}
                        >
                            <Text style={styles.titleBottom}>{title}</Text>
                            <Button
                                style={styles.okGiroMelodico}
                                buttonStyle={styles.okGiroMelodicoButton}
                                title={'Guardar en ADA'}
                                onPress={() => saveGiroMelodico()}
                                containerStyle={styles.okGiroMelodicoContainer}
                            />
                        </View>
                        <ScrollView>
                            <ListItem key={0} bottomDivider>
                                <ListItem.Content style={styles.content}>
                                    <View style={styles.contentListLeft}>
                                        <ListItem.Title>Grupo</ListItem.Title>
                                        <ListItem.Subtitle>
                                            {grupo?.Nombre
                                                ? grupo.Nombre
                                                : 'Sin definir'}
                                        </ListItem.Subtitle>
                                    </View>
                                    <View style={styles.contentListRight}>
                                        <Icon
                                            type="material-community"
                                            name="pencil-outline"
                                            onPress={() => editGrupo()}
                                            containerStyle={{ width: '100%' }}
                                        />
                                    </View>
                                </ListItem.Content>
                            </ListItem>

                            <ListItem key={1} bottomDivider>
                                <ListItem.Content style={styles.content}>
                                    <View style={styles.contentListLeft}>
                                        <ListItem.Title>Subgrupo</ListItem.Title>
                                        <ListItem.Subtitle>
                                            {subGrupo?.Nombre
                                                ? subGrupo.Nombre
                                                : 'Sin definir'}
                                        </ListItem.Subtitle>
                                    </View>
                                    <View style={styles.contentListRight}>
                                        <Icon
                                            type="material-community"
                                            name="pencil-outline"
                                            onPress={() => editSubGrupo()}
                                            containerStyle={{ width: '100%' }}
                                        />
                                    </View>
                                </ListItem.Content>
                            </ListItem>
                            <KeyboardIntervals
                                notes={giro}
                                setNotes={setGiro}
                                mayor={mayor}
                            />
                        </ScrollView>
                    </View>
                </View> 
            )}

            <OverlayPicker
                visible={visibleGrupo}
                setVisible={setVisibleGrupo}
                values={grupos}
                setValue={setGrupo}
                msjErrorOverlay={msjErrorOverlay}
                titleOverlay={titleOverlay}
            />

            <OverlayPicker
                visible={visibleSubgrupo}
                setVisible={setVisibleSubgrupo}
                values={subGrupos}
                setValue={setSubGrupo}
                msjErrorOverlay={msjErrorOverlay}
                titleOverlay={titleOverlay}
            />
        </RBSheet>
    );
}

const styles = StyleSheet.create({
    contentButtonDelete: {
        paddingTop: 20,
        width: '20%',
    },
    contentKeyboard: {
        flexDirection: 'row',
    },
    buttonDelete: {
        borderStyle: 'solid',
        alignSelf: 'flex-end',
    },
    buttonDeleteContainer: {
        width: '50%',
    },
    buttonSaveAndAddTitle: {
        color: PRIMARY_COLOR,
        textDecorationLine: 'underline',
    },
    buttonDeleteTitle: {
        color: TEXT_COLOR_WRONG,
        textDecorationLine: 'underline',
    },
    okGiroMelodico: {
        marginTop: 10,
    },
    okGiroMelodicoContainer: {
        width: '45%',
    },
    okGiroMelodicoButton: {
        backgroundColor: PRIMARY_COLOR,
    },
    titleBottom: {
        fontSize: 20,
        color: PRIMARY_COLOR,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        width: '55%',
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
        width: '50%',
    },
    textPrioridadListado: {
        marginLeft: 30,
        textAlign: 'left',
        fontSize: 17,
    },
    contentSlider: {
        paddingLeft: 25,
        paddingRight: 25,
        margin: 10,
    },
    containerCheckbox: {
        backgroundColor: 'transparent',
        borderWidth: 0,
    },
    textCheckbox: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    containerCheckUnchecked: {
        backgroundColor: FIFTH_COLOR,
        padding: 5,
        marginHorizontal: 10,
        borderStyle: 'solid',
        borderColor: 'lightgrey',
        borderWidth: 3,
        borderRadius: 5,
    },
    containerCheckChecked: {
        backgroundColor: BACKGROUND_COLOR_RIGHT,
        padding: 5,
        marginHorizontal: 10,
        borderStyle: 'solid',
        borderColor: BORDER_COLOR_RIGHT,
        borderWidth: 3,
        borderRadius: 5,
    },
    divider: {
        marginBottom: 15,
    },
    content: {
        flexDirection: 'row',
        width: '100%',
    },
    contentListLeft: {
        textAlign: 'left',
        width: '80%',
    },
    contentListRight: {
        textAlign: 'right',
        width: '20%',
    }, 
    contentListLeftTwo: {
        textAlign: 'left',
        width: '70%',
    },
    contentListRightTwo: {
        flexDirection: 'row',
        textAlign: 'right',
        width: '30%',
    },
});
