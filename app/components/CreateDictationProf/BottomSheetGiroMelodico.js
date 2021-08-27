import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Animated } from 'react-native';
import { ListItem, Icon, Slider, Button, Divider } from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import { PRIMARY_COLOR, TEXT_COLOR_WRONG } from '../../../utils/colorPalette';

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
    const [renderSlider, setRenderSlider] = useState(false);
    const [title, setTitle] = useState('Nuevo giro melódico');

    const confirmation = () => {
        const newGiro = {
            giros_melodicos: giro,
            prioridad: prio,
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
        setRenderSlider(false);
        if (add) {
            setGiro([]);
            setPrio(1);
            setTitle('Nuevo giro melódico');
        } else {
            setGiro(giro_melodico_reglaEdit.giros_melodicos);
            setPrio(giro_melodico_reglaEdit.prioridad);
            setTitle('Editar giro melódico');
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
                    height: '60%',
                },
            }}
        >
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
                        title="Confirmar"
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
                        {!add ? (
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
                        ) : (
                            <></>
                        )}
                    </View>

                    <View style={styles.contentSlider}>
                        {renderSlider ? (
                            <Slider
                                value={prio}
                                onValueChange={(value) => setPrio(value)}
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

                    <KeyboardIntervals notes={giro} setNotes={setGiro} mayor={mayor} />
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
