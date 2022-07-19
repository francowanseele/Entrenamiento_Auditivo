import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, Animated, Dimensions } from 'react-native';
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
    SECONDARY_COLOR,
    TEXT_COLOR_RIGHT,
    TEXT_COLOR_WRONG,
} from '../../../utils/colorPalette';
import {
    addGiroMelodicoApi,
    getGiroMelodicoApi,
} from '../../api/giro_melodico';
import KeyboardIntervals from './KeyboardIntervals';

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

    const saveGiroMelodico = async () => {
        const data = {
            giro_melodico: giro,
            mayor: mayor,
        };

        const addGiroMelodicoResult = await addGiroMelodicoApi(data);

        if (addGiroMelodicoResult.ok) {
            confirmation();
        }
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
        setRenderSlider(false);
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
                });
            });

            setGirosMelodicosDB(girosMelodicosDBTemp);
        }

        const isAdminFromStorage = await getStorageIsAdmin();

        await setIsAdmin(isAdminFromStorage);

        setRenderSlider(true);
    };

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
            if (isAdmin) {
                return (
                    <Button
                        titleStyle={styles.buttonSaveAndAddTitle}
                        title="Agregar y guardar"
                        containerStyle={styles.buttonDeleteContainer}
                        buttonStyle={styles.buttonDelete}
                        type="clear"
                        onPress={saveGiroMelodico}
                    />
                );
            } else {
                return (<></>)
            }
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
            // closeOnPressMask={false}
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
            <View>
                {add ? (
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
                                containerStyle={styles.okGiroMelodicoContainer}
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
                ) : (
                    // listar giros melódicos
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
                                onPress={() => confirmationFromList()}
                                containerStyle={styles.okGiroMelodicoContainer}
                            />
                        </View>
                        <ScrollView>
                            <View style={{ marginBottom: 300 }}>
                                {renderSlider ? (
                                    girosMelodicosDB.map((gm, i) => (
                                        <View key={i}>
                                            <View>
                                                {/* <Text>{printArray(gm)}</Text> */}
                                                <CheckBox
                                                    title={printArray(
                                                        gm.giros_melodicos
                                                    )}
                                                    // checkedIcon="dot-circle-o"
                                                    // uncheckedIcon="circle-o"
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
        width: '30%',
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
});
