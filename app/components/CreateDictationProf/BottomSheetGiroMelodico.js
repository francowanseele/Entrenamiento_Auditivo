import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Dimensions, Alert } from 'react-native';
import {
    ListItem,
    Icon,
    Slider,
    Button,
    Divider,
    CheckBox,
} from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import SwitchSelector from 'react-native-switch-selector';
import { getStorageIsAdmin } from '../../../utils/asyncStorageManagement';

import {
    BACKGROUND_COLOR_RIGHT,
    BORDER_COLOR_RIGHT,
    FIFTH_COLOR,
    PRIMARY_COLOR,
    QUARTER_COLOR,
    SECONDARY_COLOR,
    TEXT_COLOR_RIGHT,
    TEXT_COLOR_WRONG,
} from '../../../utils/colorPalette';
import { CLOSE_BOTTOM_SHEET } from '../../../utils/constants';
import {
    deleteGiroMelodicoApi,
    editGiroMelodicoApi,
    getGiroMelodicoApi,
} from '../../api/giro_melodico';
import { getAll } from '../../api/giro_melodico_grupo';
import OverlayConfirmation from '../OverlayConfirmation';
import KeyboardIntervals from './KeyboardIntervals';
import OverlayPicker from './OverlayPicker';

export default function BottomSheetGiroMelodico(props) {
    const {
        giro_melodico_regla,
        setGiro_melodico_regla,
        add,
        giro_melodico_reglaEdit,
        refRBSheet,
        mayor,
    } = props;
    const [prio, setPrio] = useState(1);
    const [giro, setGiro] = useState([]);
    const [readBothDirections, setReadBothDirections] = useState(false);
    const [renderSlider, setRenderSlider] = useState(false);
    const [title, setTitle] = useState('Nuevo giro melódico');
    const [writeGiroMelodico, setWriteGiroMelodico] = useState(true);
    const [girosMelodicosDB, setGirosMelodicosDB] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [height, setHeight] = useState(0.75);
    const [grupos, setGrupos] = useState([]);
    const [grupoSelected, setGrupoSelected] = useState(null);
    const [showGirosMelodicos, setShowGirosMelodicos] = useState(false);

    // Editar GM
    const [editarGiroMelodico, setEditarGiroMelodico] = useState(null);
    const [grupoEditarGM, setGrupoEditarGM] = useState(null);
    const [subGrupoEditarGM, setSubGrupoEditarGM] = useState(null);
    const [subGrupos, setSubGrupos] = useState([]);
    const [visibleGrupo, setVisibleGrupo] = useState(false);
    const [visibleSubgrupo, setVisibleSubgrupo] = useState(false);
    const [msjErrorOverlay, setMsjErrorOverlay] = useState('');
    const [titleOverlay, setTitleOverlay] = useState('');

    // Delete GM
    const [modalConfirmationVisible, setModalConfirmationVisible] = useState(false);
    const [modalConfirmationTitle, setModalConfirmationTitle] = useState('');
    const [modalConfirmationText, setModalConfirmationText] = useState('');
    const [giroMelodicoToDelete, setGiroMelodicoToDelete] = useState(null);

    useEffect(() => {
        setSubGrupoEditarGM(null);
        if (grupoEditarGM) {
            setSubGrupos(grupoEditarGM.subGrupo);
        } else {
            setSubGrupos([]);
        }
    }, [grupoEditarGM])

    const confirmation = () => {
        const newGiro = {
            giros_melodicos: giro,
            prioridad: prio,
            lecturaAmbasDirecciones: readBothDirections,
        };

        var newGiroMelodicoRegla = [];
        giro_melodico_regla.forEach((gm_regla) => {
            if (add) {
                newGiroMelodicoRegla.push(gm_regla);
            } else {
                if (gm_regla == giro_melodico_reglaEdit) {
                    newGiroMelodicoRegla.push(newGiro);
                } else {
                    newGiroMelodicoRegla.push(gm_regla);
                }
            }
        });
        if (add) {
            newGiroMelodicoRegla.push(newGiro);
        }

        setGiro_melodico_regla(newGiroMelodicoRegla);
        refRBSheet.current.close();
    };

    const deleteGiro = () => {
        var newGiroMelodicoRegla = [];
        giro_melodico_regla.forEach((gm_regla) => {
            if (gm_regla != giro_melodico_reglaEdit) {
                newGiroMelodicoRegla.push(gm_regla);
            }
        });

        setGiro_melodico_regla(newGiroMelodicoRegla);
        refRBSheet.current.close();
    };

    const initialStateOpen = async () => {
        setHeight(0.75);
        setShowGirosMelodicos(false);
        setRenderSlider(false);
        setEditarGiroMelodico(null);
        setGrupoEditarGM(null);
        setSubGrupoEditarGM(null);

        if (add) {
            setGiro([]);
            setPrio(1);
            setReadBothDirections(false);
            setTitle('Nuevo giro melódico');
        } else {
            setGiro(giro_melodico_reglaEdit.giros_melodicos);
            setPrio(giro_melodico_reglaEdit.prioridad);
            setReadBothDirections(
                giro_melodico_reglaEdit.lecturaAmbasDirecciones
            );
            setTitle('Editar giro melódico');
        }

        const data = {
            mayor: mayor,
        };
        const girosMelodicosResonse = await getGiroMelodicoApi(data);
        if (girosMelodicosResonse.ok) {
            var girosMelodicosDBTemp = [];
            girosMelodicosResonse.girosMelodicos.forEach((gm) => {
                var encontrado = false;
                var prio = 0;
                var lecturaAmbasDireccionesAux = false;
                giro_melodico_regla.forEach((gm_regla) => {
                    if (
                        printArray(gm.map((g) => g.Nota)) ==
                        printArray(gm_regla.giros_melodicos)
                    ) {
                        encontrado = true;
                        prio = gm_regla.prioridad;
                        lecturaAmbasDireccionesAux =
                            gm_regla.lecturaAmbasDirecciones;
                    }
                });

                girosMelodicosDBTemp.push({
                    giros_melodicos: gm.map((g) => g.Nota),
                    prioridad: prio,
                    add: encontrado,
                    lecturaAmbasDirecciones: lecturaAmbasDireccionesAux,
                    grupoId: gm[0].GrupoId,
                    id: gm[0].id
                });
            });

            setGirosMelodicosDB(girosMelodicosDBTemp);
        }

        const gruposResult = await getAll();
        if (gruposResult.ok) {
            let gruposRes = [];
            gruposResult.girosMelodicosGrupo.forEach(g => {
                gruposRes.push({...g, expanded: false});
            });

            setGrupos(gruposRes);
        }

        const isAdminFromStorage = await getStorageIsAdmin();

        await setIsAdmin(isAdminFromStorage);

        setRenderSlider(true);
    };

    const openCloseGrupo = (grupo) => {
        let res = [];
        grupos.forEach(gr => {
            if(gr.id == grupo.id) {
                res.push({
                    id: gr.id,
                    Nombre: gr.Nombre,
                    Nivel: gr.Nivel,
                    subGrupo: gr.subGrupo,
                    expanded: !gr.expanded,
                })
            } else {
                res.push(gr);
            }
        });

        setGrupos(res);
    }

    const showListGirosMelodicos = (subG) => {
        refRBSheet.current.close();
        setTimeout(async () => {
            await setHeight(0.9);
            refRBSheet.current.open();
            setTimeout(async () => {
                await setShowGirosMelodicos(true);
                await setGrupoSelected(subG);
            }, 10);
        }, CLOSE_BOTTOM_SHEET);
    }

    const showGirosMelodicosSinGurpo = () => {
        refRBSheet.current.close();
        setTimeout(async () => {
            await setHeight(0.9);
            refRBSheet.current.open();
            setTimeout(async () => {
                await setShowGirosMelodicos(true);
                await setGrupoSelected(null);
            }, 10);
        }, CLOSE_BOTTOM_SHEET);
    }

    const existGirosMelodicosWithoutGrupo = () => {
        return girosMelodicosDB.filter(gm => gm.grupoId == undefined).length > 0;
    }

    const subGrupoHasGirosMelodicos = (subG) => {
        return girosMelodicosDB.filter(gm => gm.grupoId == subG.id).length > 0; 
    }

    const grupoHasGirosMelodicos = (g) => {
        let res = false;
        g.subGrupo.forEach(subG => {
            res = res || subGrupoHasGirosMelodicos(subG);
        });

        return res;
    }

    const getGirosMelodicosToShow = (girosMelodicosList) => {
        return girosMelodicosList.filter(gm => gm.grupoId == grupoSelected?.id);
    }

    const atras = async () => {
        refRBSheet.current.close();
        setTimeout(async () => {
            await setHeight(0.75);
            refRBSheet.current.open();
            setTimeout(async () => {
                await setHeight(0.75);
                await setShowGirosMelodicos(false);
                await setRenderSlider(false);
            }, 10);
        }, CLOSE_BOTTOM_SHEET);
    }

    const editGiroMelodico = (gm) => {
        const gmEditando = {
            giroMelodico: gm,
        };
        setEditarGiroMelodico(gmEditando);
    }

    const deleteGiroMelodico = (gm) => {
        setGiroMelodicoToDelete(gm);
        setModalConfirmationVisible(true);
        setModalConfirmationTitle('Eliminar giro melódico del sistema ADA')
        setModalConfirmationText(`¿Desea eliminar el giro melódico ${printArray(gm.giros_melodicos)} del sistema? Este ya no podrá ser utilizado para crear nuevos generadores de dictado.`)
    }

    const confirmDeleted = async () => {
        const response = await deleteGiroMelodicoApi(giroMelodicoToDelete.id);

        if (response.ok) {
            Alert.alert('Giro melódico eliminado correctamente.')
        } else {
            Alert.alert('No se pudo eliminar el giro melódico.')
        }

        refRBSheet.current.close();
    }

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
            if (grupoEditarGM) {
                await setMsjErrorOverlay('No hay subgrupos disponibles. Si es un usuario administrador puede agregar nuevos en "Administrar grupos en ADA". De lo contrario puede ponerse en contacto con administradores.');
            } else {
                await setMsjErrorOverlay('No hay grupo seleccionado. Por favor seleccione un grupo antes de seleccionar un subgrupo.');
            }
        }
        setVisibleSubgrupo(true);
    }

    const confirmarEditarGiroMelodico = async () => {
        if (subGrupoEditarGM?.id) {
            const gmId = editarGiroMelodico.giroMelodico.id;
            const data = {
                grupoId: subGrupoEditarGM.id,
            };
    
            const response = await editGiroMelodicoApi(gmId, data);

            if (response.ok) {
                Alert.alert(`El giro melódico fue establecido en el grupo ${grupoEditarGM.Nombre}/${subGrupoEditarGM.Nombre}.`)
            } else {
                Alert.alert(`No se pudo modificar el giro melódico.`)
            }
            
            refRBSheet.current.close();
        } else {
            Alert.alert('Debe seleccionar un grupo y un subgrupo.')
        }
    }

    const printArray = (arr) => {
        var res = '';
        for (let i = 0; i < arr.length - 1; i++) {
            const elem = arr[i];
            res = res.concat(elem, ' - ');
        }
        if (arr.length > 0) {
            res = res.concat(arr[arr.length - 1]);
        } else {
            res = 'SIN DEFINIR';
        }

        return res;
    };

    const isGiroIn = (giro, giroArr) => {
        var ok = false;
        giroArr.forEach((g) => {
            ok = ok || printArray(giro) == printArray(g);
        });

        return ok;
    };

    const isGiroAdded = (giro) => {
        var ok = false;
        girosMelodicosDB.forEach((gm_db) => {
            ok =
                ok ||
                (printArray(giro) == printArray(gm_db.giros_melodicos) &&
                    gm_db.add);
        });

        return ok;
    };

    const confirmationFromList = async () => {
        var setGiro_melodico_reglaARR = giro_melodico_regla;
        girosMelodicosDB.forEach(async (gm_db) => {
            var index = giro_melodico_regla.findIndex(
                (x) =>
                    printArray(x.giros_melodicos) ==
                    printArray(gm_db.giros_melodicos)
            );

            if (index === -1) {
                // not match
                if (gm_db.add) {
                    var newGiro_melodico_regla = [];
                    setGiro_melodico_reglaARR.forEach((gm_regla) => {
                        newGiro_melodico_regla.push(gm_regla);
                    });
                    newGiro_melodico_regla.push({
                        giros_melodicos: gm_db.giros_melodicos,
                        prioridad: gm_db.prioridad,
                        lecturaAmbasDirecciones: gm_db.lecturaAmbasDirecciones,
                    });

                    setGiro_melodico_reglaARR = newGiro_melodico_regla;
                }
            } else {
                // match
                if (gm_db.add) {
                    // update
                    let g = giro_melodico_regla[index];
                    g['prioridad'] = gm_db.prioridad;
                    g['lecturaAmbasDirecciones'] =
                        gm_db.lecturaAmbasDirecciones;
                    setGiro_melodico_reglaARR = [
                        ...setGiro_melodico_reglaARR.slice(0, index),
                        g,
                        ...setGiro_melodico_reglaARR.slice(index + 1),
                    ];
                } else {
                    // delete
                    setGiro_melodico_reglaARR = [
                        ...setGiro_melodico_reglaARR.slice(0, index),
                        ...setGiro_melodico_reglaARR.slice(index + 1),
                    ];
                }
            }
        });

        setGiro_melodico_regla(setGiro_melodico_reglaARR);

        refRBSheet.current.close();
    };

    const addDeleteGiroMelodico = async (giro) => {
        var index = girosMelodicosDB.findIndex(
            (x) =>
                printArray(x.giros_melodicos) ==
                printArray(giro.giros_melodicos)
        );

        let g = girosMelodicosDB[index];

        g['add'] = !g['add'];
        g['add'] ? (g['prioridad'] = 1) : (g['prioridad'] = 0);
        setRenderSlider(false);
        if (index === -1) {
            // TODO: handle error
            console.log('no match');
        } else {
            await setGirosMelodicosDB([
                ...girosMelodicosDB.slice(0, index),
                g,
                ...girosMelodicosDB.slice(index + 1),
            ]);
        }

        setRenderSlider(true);
    };

    const setPriorityGiroMelodico = async (prio, gm) => {
        var index = girosMelodicosDB.findIndex(
            (x) =>
                printArray(x.giros_melodicos) == printArray(gm.giros_melodicos)
        );

        let g = girosMelodicosDB[index];

        g['prioridad'] = prio;
        g['prioridad'] == 0 ? (g['add'] = false) : (g['add'] = true);

        if (index === -1) {
            // TODO: handle error
            console.log('no match');
        } else {
            await setGirosMelodicosDB([
                ...girosMelodicosDB.slice(0, index),
                g,
                ...girosMelodicosDB.slice(index + 1),
            ]);
        }
    };

    const setLecturaAmbasDirecciones = async (giro) => {
        var index = girosMelodicosDB.findIndex(
            (x) =>
                printArray(x.giros_melodicos) ==
                printArray(giro.giros_melodicos)
        );

        let g = girosMelodicosDB[index];

        g['lecturaAmbasDirecciones'] = !g['lecturaAmbasDirecciones'];

        if (index === -1) {
            // TODO: handle error
            console.log('no match');
        } else {
            await setGirosMelodicosDB([
                ...girosMelodicosDB.slice(0, index),
                g,
                ...girosMelodicosDB.slice(index + 1),
            ]);
        }
    };

    function ReadingDirection(props) {
        const { giroMelodico } = props;
        return (
            <CheckBox
                title="Leer en ambas direcciones"
                checked={
                    giroMelodico
                        ? giroMelodico.lecturaAmbasDirecciones
                        : readBothDirections
                }
                onPress={
                    giroMelodico
                        ? () => setLecturaAmbasDirecciones(giroMelodico)
                        : () => setReadBothDirections(!readBothDirections)
                }
                containerStyle={styles.containerCheckbox}
            />
        );
    }

    function ButtonEliminarSave() {
        if (add) {
                return (<></>)
        } else {
            return (
                <Button
                    icon={
                        <Icon
                            name="delete-circle-outline"
                            type="material-community"
                            color={TEXT_COLOR_WRONG}
                        />
                    }
                    titleStyle={styles.buttonDeleteTitle}
                    title="Eliminar"
                    containerStyle={styles.buttonDeleteContainer}
                    buttonStyle={styles.buttonDelete}
                    type="clear"
                    onPress={() => deleteGiro()}
                />
            );
        }
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
            height={Dimensions.get('window').height * height}
            closeDuration={CLOSE_BOTTOM_SHEET}
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
            <View>
                {add && !showGirosMelodicos ? (
                    <SwitchSelector
                        initial={!add || writeGiroMelodico ? 0 : 1}
                        onPress={(value) => setWriteGiroMelodico(value == 'e')}
                        textColor={'black'}
                        selectedColor={'white'}
                        buttonColor={SECONDARY_COLOR}
                        borderColor={PRIMARY_COLOR}
                        hasPadding
                        options={[
                            {
                                label: 'Escribir',
                                value: 'e',
                            },
                            {
                                label: 'Listar',
                                value: 'l',
                            },
                        ]}
                        testID="gender-switch-selector"
                        accessibilityLabel="gender-switch-selector"
                        style={{
                            alignSelf: 'center',
                            width: '95%',
                        }}
                    />
                ) : (
                    <></>
                )}
                {!add || writeGiroMelodico ? (
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
                                title={add ? 'Agregar' : 'Confirmar'}
                                onPress={() => confirmation()}
                                containerStyle={styles.okGiroMelodicoContainerEscribir}
                            />
                        </View>
                        <ScrollView>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    paddingRight: 20,
                                }}
                            >
                                <Text style={styles.textPrioridad}>
                                    Prioridad: {prio}
                                </Text>

                                <ButtonEliminarSave />
                            </View>

                            <View style={styles.contentSlider}>
                                {renderSlider ? (
                                    <Slider
                                        value={prio}
                                        onValueChange={(value) =>
                                            setPrio(value)
                                        }
                                        minimumValue={0}
                                        maximumValue={5}
                                        step={1}
                                        thumbStyle={{
                                            height: 20,
                                            width: 20,
                                            backgroundColor: 'transparent',
                                        }}
                                        thumbProps={{
                                            children: (
                                                <Icon
                                                    name="circle-small"
                                                    type="material-community"
                                                    size={15}
                                                    reverse
                                                    containerStyle={{
                                                        bottom: 15,
                                                        right: 15,
                                                    }}
                                                    color="black"
                                                />
                                            ),
                                        }}
                                    />
                                ) : (
                                    <></>
                                )}
                            </View>

                            <Divider orientation="horizontal" />

                            <ReadingDirection />

                            <KeyboardIntervals
                                notes={giro}
                                setNotes={setGiro}
                                mayor={mayor}
                            />
                        </ScrollView>
                    </View>
                ) : !showGirosMelodicos ? (
                    <ScrollView>
                        <View style={{ marginBottom: 300 }}>
                            {grupos.map((g, key) => 
                                grupoHasGirosMelodicos(g) && (
                                    <ListItem.Accordion
                                        content={
                                            <>
                                                <Icon name="code-brackets" size={25} type="material-community" style={{marginRight:15}} />
                                                <ListItem.Content>
                                                    <ListItem.Title>{g.Nombre}</ListItem.Title>
                                                </ListItem.Content>
                                            </>
                                        }
                                        isExpanded={g.expanded}
                                        onPress={() => {
                                            openCloseGrupo(g)
                                        }}
                                        key={key}
                                    >
                                        {g.subGrupo.map((subG, i) => 
                                            subGrupoHasGirosMelodicos(subG) && (
                                                <ListItem key={i} bottomDivider onPress={() => showListGirosMelodicos(subG)}>
                                                    <ListItem.Content>
                                                        <ListItem.Title> - {subG.Nombre}</ListItem.Title>
                                                    </ListItem.Content>
                                                    <ListItem.Chevron />
                                                </ListItem>
                                            )
                                        )}
                                    </ListItem.Accordion>
                                )
                            )}
                            {existGirosMelodicosWithoutGrupo() && (
                                <ListItem onPress={() => {
                                    showGirosMelodicosSinGurpo()
                                }}>
                                    <Icon name="code-brackets" size={25} type="material-community" />
                                    <ListItem.Content>
                                        <ListItem.Title>Sin grupo</ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Chevron />
                                </ListItem>
                            )}
                        </View>
                    </ScrollView>
                ) : editarGiroMelodico ? (
                    <View>
                         <View
                            style={{
                                flexDirection: 'row',
                                paddingRight: 15,
                            }}
                        >
                            <Text style={styles.titleBottomModificarGrupo}>Modificar grupo en ADA</Text>
                            <Button
                                style={styles.okGiroMelodico}
                                buttonStyle={styles.okGiroMelodicoButton}
                                title={'Confirmar'}
                                onPress={() => confirmarEditarGiroMelodico()}
                                containerStyle={styles.confirmarButtonModificarGrupo}
                            />
                        </View>
                        <ScrollView>
                            <View style={styles.contentTextPrioridad}>
                                <Text style={styles.textPrioridadModificarGiroUp}>{`El giro melódico ${printArray(editarGiroMelodico.giroMelodico.giros_melodicos)} pasará a formar parte del grupo que se especifique a continuación.`}</Text>
                                <Text style={styles.textPrioridadModificarGiro}>Solo es posible modificar el grupo al que pertenece el giro melódico. Si desea modificar los elementos que lo componen, deberá eliminar dicho giro melódico y crear uno nuevo.</Text>
                            </View>
                            <ListItem key={0} bottomDivider>
                                <ListItem.Content style={styles.content}>
                                    <View style={styles.contentListLeft}>
                                        <ListItem.Title>Grupo</ListItem.Title>
                                        <ListItem.Subtitle>
                                            {grupoEditarGM?.Nombre
                                                ? grupoEditarGM.Nombre
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
                                            {subGrupoEditarGM?.Nombre
                                                ? subGrupoEditarGM.Nombre
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
                        </ScrollView>
                    </View>
                ) : (
                    // listar giros melódicos
                    <View>
                        <View
                            style={{
                                flexDirection: 'row',
                                paddingHorizontal: 15,
                            }}
                        >
                            <Button
                                style={styles.atrasGiroMelodico}
                                buttonStyle={styles.atrasGiroMelodicoButton}
                                title={'<'}
                                onPress={async () => await atras()}
                                containerStyle={styles.atrasGiroMelodicoContainer}
                            />
                            <Button
                                style={styles.okGiroMelodico}
                                buttonStyle={styles.okGiroMelodicoButton}
                                title={add ? 'Agregar' : 'Confirmar'}
                                onPress={() => confirmationFromList()}
                                containerStyle={styles.okGiroMelodicoContainer}
                            />
                        </View>
                        <ScrollView>
                            <View style={{ marginBottom: 300 }}>
                                {renderSlider ? (
                                    getGirosMelodicosToShow(girosMelodicosDB).map((gm, i) => (
                                        <View key={i}>
                                            <View>
                                                <CheckBox
                                                    title={printArray(
                                                        gm.giros_melodicos
                                                    )}
                                                    checked={gm.add}
                                                    containerStyle={
                                                        styles.containerCheckbox
                                                    }
                                                    textStyle={
                                                        styles.textCheckbox
                                                    }
                                                    iconRight
                                                    onPress={() =>
                                                        addDeleteGiroMelodico(
                                                            gm
                                                        )
                                                    }
                                                    checkedIcon={
                                                        <Icon
                                                            name="check-circle"
                                                            type="material-community"
                                                            color={
                                                                TEXT_COLOR_RIGHT
                                                            }
                                                            containerStyle={
                                                                styles.containerCheckChecked
                                                            }
                                                        />
                                                    }
                                                    uncheckedIcon={
                                                        <Icon
                                                            name="check-circle"
                                                            type="material-community"
                                                            color={'grey'}
                                                            containerStyle={
                                                                styles.containerCheckUnchecked
                                                            }
                                                        />
                                                    }
                                                />

                                                {isAdmin && (
                                                    <View style={{flexDirection:'row'}}>
                                                        <Button
                                                            title="Editar en ADA"
                                                            onPress={() => editGiroMelodico(gm)}
                                                            titleStyle={{color: PRIMARY_COLOR, textDecorationLine: 'underline'}}
                                                            type='clear'
                                                            containerStyle={{width: '50%'}}
                                                        />
                                                        <Button
                                                            title="Eliminar de ADA"
                                                            onPress={() => deleteGiroMelodico(gm)}
                                                            titleStyle={{color: 'darkred', textDecorationLine: 'underline'}}
                                                            type='clear'
                                                            containerStyle={{width: '50%'}}
                                                        />
                                                    </View>
                                                )}

                                                <ReadingDirection
                                                    giroMelodico={gm}
                                                />

                                                <Text
                                                    style={
                                                        styles.textPrioridadListado
                                                    }
                                                >
                                                    Prioridad: {gm.prioridad}
                                                </Text>
                                            </View>
                                            <View style={styles.contentSlider}>
                                                <Slider
                                                    value={gm.prioridad}
                                                    onValueChange={(value) =>
                                                        setPriorityGiroMelodico(
                                                            value,
                                                            gm
                                                        )
                                                    }
                                                    minimumValue={0}
                                                    maximumValue={5}
                                                    step={1}
                                                    thumbStyle={{
                                                        height: 20,
                                                        width: 20,
                                                        backgroundColor:
                                                            'transparent',
                                                    }}
                                                    thumbProps={{
                                                        children: (
                                                            <Icon
                                                                name="circle-small"
                                                                type="material-community"
                                                                size={15}
                                                                reverse
                                                                containerStyle={{
                                                                    bottom: 15,
                                                                    right: 15,
                                                                }}
                                                                color="black"
                                                            />
                                                        ),
                                                    }}
                                                />
                                            </View>
                                            <Divider
                                                style={styles.divider}
                                                orientation="horizontal"
                                            />
                                        </View>
                                    ))
                                ) : (
                                    <></>
                                )}
                            </View>
                        </ScrollView>
                    </View>
                )}
            </View>

            <OverlayPicker
                visible={visibleGrupo}
                setVisible={setVisibleGrupo}
                values={grupos}
                setValue={setGrupoEditarGM}
                msjErrorOverlay={msjErrorOverlay}
                titleOverlay={titleOverlay}
            />

            <OverlayPicker
                visible={visibleSubgrupo}
                setVisible={setVisibleSubgrupo}
                values={subGrupos}
                setValue={setSubGrupoEditarGM}
                msjErrorOverlay={msjErrorOverlay}
                titleOverlay={titleOverlay}
            />

            <OverlayConfirmation
                visible={modalConfirmationVisible}
                setVisible={setModalConfirmationVisible}
                title={modalConfirmationTitle}
                text={modalConfirmationText}
                functionOk={confirmDeleted}
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
    atrasGiroMelodico: {
        marginTop: 10,
    },
    okGiroMelodicoContainer: {
        width: '50%',
    },
    okGiroMelodicoContainerEscribir: {
        width: '30%',
    },
    confirmarButtonModificarGrupo: {
        width: '30%',
    },
    atrasGiroMelodicoContainer: {
        width: '50%',
    },
    okGiroMelodicoButton: {
        backgroundColor: PRIMARY_COLOR,
    },
    atrasGiroMelodicoButton: {
        backgroundColor: QUARTER_COLOR,
    },
    titleBottom: {
        fontSize: 20,
        color: PRIMARY_COLOR,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        width: '70%',
    },
    titleBottomModificarGrupo: {
        fontSize: 20,
        color: PRIMARY_COLOR,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        width: '70%',
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
    contentTextPrioridad: {
        marginHorizontal: 20,
        marginVertical: 5,
        borderLeftWidth: 2,
        borderStyle: 'solid',
        borderColor: PRIMARY_COLOR,
        backgroundColor: FIFTH_COLOR,
        padding: 10,
        borderRadius: 5,
    },
    textPrioridadModificarGiro: {
        fontSize: 17,
    },
    textPrioridadModificarGiroUp: {
        fontSize: 17,
        marginBottom: 10,
    },
});
