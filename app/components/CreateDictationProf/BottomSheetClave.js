import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Animated } from 'react-native';
import { ListItem, Icon, Slider, Button, Divider } from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';

import Keyboard from './Keyboard';

export default function BottomSheetClave(props) {
    const { clave_prioridad, setClave_prioridad, clave, refRBSheet } = props;
    const [prio, setPrio] = useState(1);
    const [renderSlider, setRenderSlider] = useState(false);

    const confirmation = () => {
        var clavePrioridadRes = [];

        clave_prioridad.forEach((cp) => {
            if (cp.clave == clave) {
                clavePrioridadRes.push({ clave: clave, prioridad: prio });
            } else {
                clavePrioridadRes.push(cp);
            }
        });

        setClave_prioridad(clavePrioridadRes);
        refRBSheet.current.close();
    };

    const initialStateOpen = async () => {
        setRenderSlider(false);

        clave_prioridad.forEach((cp) => {
            if (cp.clave == clave) {
                setPrio(cp.prioridad);
            }
        });

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
                    height: '50%',
                },
            }}
        >
            <ScrollView>
                <Text style={styles.titleBottom}>Clave de {clave}</Text>
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
        width: 60,
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