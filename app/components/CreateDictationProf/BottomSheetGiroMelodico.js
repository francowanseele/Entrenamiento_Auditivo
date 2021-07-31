import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Animated } from 'react-native';
import { ListItem, Icon, Slider, Button, Divider } from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';

import Keyboard from './Keyboard';

export default function BottomSheetGiroMelodico(props) {
    const {
        giro_melodico_regla,
        setGiro_melodico_regla,
        add,
        giro_melodico_reglaEdit,
        refRBSheet,
    } = props;
    const [prio, setPrio] = useState(1);
    const [giro, setGiro] = useState([]);
    const [renderSlider, setRenderSlider] = useState(false);

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
        } else {
            setGiro(giro_melodico_reglaEdit.giros_melodicos);
            setPrio(giro_melodico_reglaEdit.prioridad);
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
            <ScrollView>
                {add ? (
                    <Text style={styles.titleBottom}>Nuevo giro melódico</Text>
                ) : (
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.titleBottom}>
                            Editar giro melódico
                        </Text>
                        <Button
                            icon={
                                <Icon
                                    name="delete-circle-outline"
                                    type="material-community"
                                    color="white"
                                />
                            }
                            buttonStyle={styles.buttonDelete}
                            onPress={() => deleteGiro()}
                        />
                    </View>
                )}
                <Text style={styles.textPrioridad}>Prioridad: {prio}</Text>
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

                <Keyboard notes={giro} setNotes={setGiro} />

                <Button
                    style={styles.okGiroMelodico}
                    title="Ok"
                    onPress={() => confirmation()}
                />
            </ScrollView>
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
        marginTop: 10,
        borderRadius: 30,
        backgroundColor: 'red',
    },
    okGiroMelodico: {
        marginTop: 20,
    },
    titleBottom: {
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        width: '80%',
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
        marginLeft: 20,
        textAlign: 'left',
        fontSize: 17,
    },
    contentSlider: {
        paddingLeft: 25,
        paddingRight: 25,
        margin: 10,
    },
});
