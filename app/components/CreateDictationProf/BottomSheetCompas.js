import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Animated } from 'react-native';
import {
    ListItem,
    Icon,
    Slider,
    Button,
    Divider,
    CheckBox,
} from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
    BACKGROUND_COLOR_RIGHT,
    BORDER_COLOR_RIGHT,
    FIFTH_COLOR,
    PRIMARY_COLOR,
    QUARTER_COLOR,
    TEXT_COLOR_RIGHT,
    TEXT_COLOR_WRONG,
} from '../../../utils/colorPalette';

import { getCompasesApi } from '../../api/compas';

export default function BottomSheetCompas(props) {
    const {
        add,
        simple,
        compas_regla,
        setCompas_regla,
        editCompas_regla,
        refRBSheet,
    } = props;
    const [prio, setPrio] = useState(1);
    const [giro, setGiro] = useState([]);
    const [renderSlider, setRenderSlider] = useState(false);

    const [listAllCompases, setListAllCompases] = useState([]);

    const confirmation = () => {
        var resCompas = [];
        if (add) {
            listAllCompases.forEach((compasLocal) => {
                if (compasLocal.checked) {
                    resCompas.push({
                        numerador: compasLocal.numerador,
                        denominador: compasLocal.denominador,
                        simple: compasLocal.simple,
                        prioridad: compasLocal.prioridad,
                    });
                }
            });
        } else {
            compas_regla.forEach((comReg) => {
                if (
                    comReg.numerador == listAllCompases[0].numerador &&
                    comReg.denominador == listAllCompases[0].denominador
                ) {
                    resCompas.push({
                        numerador: comReg.numerador,
                        denominador: comReg.denominador,
                        simple: comReg.simple,
                        prioridad: listAllCompases[0].prioridad,
                    });
                } else {
                    resCompas.push(comReg);
                }
            });
        }

        setCompas_regla(resCompas);
        refRBSheet.current.close();
    };

    const deleteCompas = () => {
        var compasRes = [];
        compas_regla.forEach((comReg) => {
            if (
                comReg.numerador != listAllCompases[0].numerador ||
                comReg.denominador != listAllCompases[0].denominador
            ) {
                compasRes.push({
                    numerador: comReg.numerador,
                    denominador: comReg.denominador,
                    simple: comReg.simple,
                    prioridad: comReg.prioridad,
                });
            }
        });

        setCompas_regla(compasRes);
        refRBSheet.current.close();
    };

    const initialStateOpen = async () => {
        setRenderSlider(false);

        if (add) {
            const compasesResult = await getCompasesApi(simple);
            if (compasesResult.ok) {
                var listAllCompasesRes = [];
                compasesResult.compases.forEach((compasRes) => {
                    const index = compas_regla.findIndex(
                        (x) =>
                            x.numerador == compasRes.numerador &&
                            x.denominador == compasRes.denominador &&
                            x.simple == simple
                    );
                    listAllCompasesRes.push({
                        numerador: compasRes.numerador,
                        denominador: compasRes.denominador,
                        simple: compasRes.simple,
                        checked: index != -1,
                        prioridad:
                            index == -1 ? 0 : compas_regla[index].prioridad,
                    });
                });
                setListAllCompases(listAllCompasesRes);
            }
        } else {
            setListAllCompases([
                {
                    numerador: editCompas_regla.numerador,
                    denominador: editCompas_regla.denominador,
                    simple: editCompas_regla.simple,
                    checked: true,
                    prioridad: editCompas_regla.prioridad,
                },
            ]);
        }

        setRenderSlider(true);
    };

    const setPriorityCompas = (prio, compas) => {
        var index = listAllCompases.findIndex(
            (x) =>
                x.numerador == compas.numerador &&
                x.denominador == compas.denominador
        );

        let g = listAllCompases[index];

        g['prioridad'] = prio;
        g['prioridad'] == 0 ? (g['checked'] = false) : (g['checked'] = true);

        if (index === -1) {
            // handle error
            console.log('no match');
        } else {
            setListAllCompases([
                ...listAllCompases.slice(0, index),
                g,
                ...listAllCompases.slice(index + 1),
            ]);
        }
    };

    const checkedCompas = async (compas) => {
        var index = listAllCompases.findIndex(
            (x) =>
                x.numerador == compas.numerador &&
                x.denominador == compas.denominador
        );

        let g = listAllCompases[index];

        g['checked'] = !g['checked'];
        g['checked'] ? (g['prioridad'] = 1) : (g['prioridad'] = 0);
        setRenderSlider(false);
        if (index === -1) {
            // handle error
            console.log('no match');
        } else {
            await setListAllCompases([
                ...listAllCompases.slice(0, index),
                g,
                ...listAllCompases.slice(index + 1),
            ]);
        }
        setRenderSlider(true);
    };

    return (
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={false}
            closeOnPressMask={true}
            animationType="slide"
            dragFromTopOnly={true}
            onOpen={async () => {
                await initialStateOpen();
            }}
            customStyles={{
                wrapper: {
                    backgroundColor: 'rgba(0,0,0,.25)',
                },
                draggableIcon: {
                    backgroundColor: '#000',
                },
                container: {
                    height: '75%',
                },
            }}
        >
            <View>
                {add ? (
                    <View
                        style={{
                            flexDirection: 'row',
                            paddingRight: 15,
                        }}
                    >
                        <Text style={styles.titleBottom}>Agregar compases</Text>
                        <Button
                            style={styles.okGiroMelodico}
                            buttonStyle={styles.okGiroMelodicoButton}
                            title="Confirmar"
                            onPress={() => confirmation()}
                            containerStyle={styles.okGiroMelodicoContainer}
                        />
                    </View>
                ) : (
                    <View style={{ flexDirection: 'row', paddingRight: 15 }}>
                        <Text style={styles.titleBottom}>Editar compás</Text>
                        <Button
                            style={styles.okGiroMelodico}
                            buttonStyle={styles.okGiroMelodicoButton}
                            title="Confirmar"
                            onPress={() => confirmation()}
                            containerStyle={styles.okGiroMelodicoContainer}
                        />
                    </View>
                )}
                <ScrollView>
                    {renderSlider ? (
                        <View style={{ marginBottom: 120 }}>
                            {listAllCompases.map((compas, i) => (
                                <View key={i}>
                                    <View>
                                        {add ? (
                                            <CheckBox
                                                title={`Compás ${compas.numerador}/${compas.denominador}`}
                                                checkedIcon="dot-circle-o"
                                                uncheckedIcon="circle-o"
                                                checked={compas.checked}
                                                containerStyle={
                                                    styles.containerCheckbox
                                                }
                                                textStyle={styles.textCheckbox}
                                                iconRight
                                                onPress={() =>
                                                    checkedCompas(compas)
                                                }
                                                checkedIcon={
                                                    <Icon
                                                        name="check-circle"
                                                        type="material-community"
                                                        color={TEXT_COLOR_RIGHT}
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
                                        ) : (
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    paddingRight: 20,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 18,
                                                        fontWeight: 'bold',
                                                        marginLeft: 20,
                                                        width: '70%',
                                                    }}
                                                >{`Compás ${compas.numerador}/${compas.denominador}`}</Text>
                                                <Button
                                                    icon={
                                                        <Icon
                                                            name="delete-circle-outline"
                                                            type="material-community"
                                                            color={
                                                                TEXT_COLOR_WRONG
                                                            }
                                                        />
                                                    }
                                                    titleStyle={
                                                        styles.buttonDeleteTitle
                                                    }
                                                    title="Eliminar"
                                                    containerStyle={
                                                        styles.buttonDeleteContainer
                                                    }
                                                    buttonStyle={
                                                        styles.buttonDelete
                                                    }
                                                    type="clear"
                                                    onPress={() =>
                                                        deleteCompas()
                                                    }
                                                />
                                            </View>
                                        )}
                                        <Text style={styles.textPrioridad}>
                                            Prioridad: {compas.prioridad}
                                        </Text>
                                    </View>
                                    <View style={styles.contentSlider}>
                                        <Slider
                                            value={compas.prioridad}
                                            onValueChange={(value) =>
                                                setPriorityCompas(value, compas)
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
                                    </View>
                                    <Divider
                                        style={styles.divider}
                                        orientation="horizontal"
                                    />
                                </View>
                            ))}
                        </View>
                    ) : (
                        <></>
                    )}
                </ScrollView>
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
    },
    buttonDeleteContainer: {
        width: '30%',
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
    titlePrioridad: {
        fontSize: 17,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    textPrioridad: {
        marginLeft: 30,
        textAlign: 'left',
        fontSize: 17,
    },
    contentSlider: {
        paddingLeft: 25,
        paddingRight: 25,
        margin: 10,
    },
    divider: {
        marginBottom: 15,
    },
    containerCheckbox: {
        backgroundColor: 'transparent',
        borderWidth: 0,
    },
    textCheckbox: {
        fontSize: 18,
        fontWeight: 'bold',
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
    containerCheckUnchecked: {
        backgroundColor: FIFTH_COLOR,
        padding: 5,
        marginHorizontal: 10,
        borderStyle: 'solid',
        borderColor: 'lightgrey',
        borderWidth: 3,
        borderRadius: 5,
    },
});
