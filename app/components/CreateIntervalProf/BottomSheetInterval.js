import React, { useState } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    Dimensions,
} from 'react-native';
import {
    Icon,
    Button,
    Divider,
    CheckBox,
} from 'react-native-elements';
import Slider from '@react-native-community/slider';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
    BACKGROUND_COLOR_RIGHT,
    BORDER_COLOR_RIGHT,
    FIFTH_COLOR,
    PRIMARY_COLOR,
    TEXT_COLOR_RIGHT,
} from '../../../utils/colorPalette';


export default function BottomSheetInterval(props) {
    const { intervaloRegla, setIntervaloRegla, refRBSheet } = props;

    const [renderSlider, setRenderSlider] = useState(false);
    const [intervaloReglaLocal, setIntervaloReglaLocal] = useState([]);

    const initialStateOpen = () => {
        setRenderSlider(false);

        // intervaloRegla = { Intervalo: string, Prioridad: int, Checked: bool }
        setIntervaloReglaLocal(intervaloRegla);

        setRenderSlider(true);
    }

    const confirmation = () => {
        setIntervaloRegla(intervaloReglaLocal);
        refRBSheet.current.close();
    }

    const pressIntervalo = async (intervalo) => {
        const chck = !intervalo.Checked;
        await setIntervaloReglaLocal(intervaloReglaLocal.map((i) => {
            if (i.Intervalo == intervalo.Intervalo) {
                return {
                    ...i,
                    Checked: chck,
                    Prioridad: chck ? 1 : 0,
                };
            } else {
                return i;
            }
        }));
    }

    const setPriority = (intervalo, prioridad) => {
        setIntervaloReglaLocal(intervaloReglaLocal.map((i) => {
            if (i.Intervalo == intervalo.Intervalo) {
                return {
                    ...i,
                    Prioridad: prioridad,
                    Checked: prioridad != 0,
                };
            } else {
                return i;
            }
        }));
    }

    const showInterval = (intervalInput) => {
        let interval = intervalInput;
        interval = interval.split("A").join("+");
        interval = interval.split("d").join("-");
        interval = interval.split("P").join("J");
        return interval
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
            <View>
                <View
                    style={{
                        flexDirection: 'row',
                        paddingRight: 15,
                    }}
                >
                    <Text style={styles.titleBottom}>
                        Prioridad a cada intervalo
                    </Text>
                    <Button
                        containerStyle={styles.okGiroMelodico}
                        buttonStyle={styles.okGiroMelodicoButton}
                        title="Confirmar"
                        onPress={() => confirmation()}
                    />
                </View>
                <ScrollView>
                    {renderSlider ? (
                        <View style={{ marginBottom: 120 }}>
                            {intervaloReglaLocal.map((intervalo, i) => (
                                <View key={i}>
                                    <CheckBox
                                        title={showInterval(intervalo.Intervalo)}
                                        containerStyle={
                                            styles.containerCheckbox
                                        }
                                        textStyle={styles.textCheckbox}
                                        iconRight
                                        onPress={() =>
                                            pressIntervalo(intervalo)
                                        }
                                        checked={ intervalo.Prioridad != 0 }
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
                                    <Text style={styles.textPrioridad}>
                                        Prioridad:{' '}
                                        {intervalo.Prioridad}
                                    </Text>
                                    <View style={styles.contentSlider}>
                                        <Slider
                                            value={intervalo.Prioridad}
                                            onValueChange={(value) =>
                                                setPriority(
                                                    intervalo,
                                                    value
                                                )
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
        width: 60,
    },
    okGiroMelodico: {
        marginTop: 10,
        width: '30%',
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
        marginLeft: 30,
        textAlign: 'left',
        fontSize: 17,
    },
    contentSlider: {
        paddingLeft: 25,
        paddingRight: 25,
        margin: 10,
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
    containerCheckbox: {
        backgroundColor: 'transparent',
        borderWidth: 0,
    },
    textCheckbox: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    divider: {
        marginBottom: 15,
    },
});
