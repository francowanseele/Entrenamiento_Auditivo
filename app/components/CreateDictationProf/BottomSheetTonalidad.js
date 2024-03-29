import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Animated, Dimensions, Image } from 'react-native';
import {
    Icon,
    Slider,
    Button,
    Divider,
    CheckBox,
} from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import { set } from 'react-native-reanimated';
import {
    BACKGROUND_COLOR_RIGHT,
    BORDER_COLOR_RIGHT,
    FIFTH_COLOR,
    PRIMARY_COLOR,
    TEXT_COLOR_RIGHT,
} from '../../../utils/colorPalette';

import KeyboardIntervals from './KeyboardIntervals';

export default function BottomSheetTonalidad(props) {
    const { escala_diatonica_regla, setEscala_diatonica_regla, refRBSheet } =
        props;
    const [prio, setPrio] = useState(1);
    const [renderSlider, setRenderSlider] = useState(false);

    // states -> escalas diatonicas
    const [Do, setDo] = useState({ prioridad: 1, checked: true });
    const [Sol, setSol] = useState({ prioridad: 1, checked: true });
    const [Re, setRe] = useState({ prioridad: 1, checked: true });
    const [La, setLa] = useState({ prioridad: 1, checked: true });
    const [Mi, setMi] = useState({ prioridad: 1, checked: true });
    const [Si, setSi] = useState({ prioridad: 1, checked: true });
    const [FaS, setFaS] = useState({ prioridad: 1, checked: true });
    const [Solb, setSolb] = useState({ prioridad: 1, checked: true });
    const [Reb, setReb] = useState({ prioridad: 1, checked: true });
    const [Lab, setLab] = useState({ prioridad: 1, checked: true });
    const [Mib, setMib] = useState({ prioridad: 1, checked: true });
    const [Sib, setSib] = useState({ prioridad: 1, checked: true });
    const [Fa, setFa] = useState({ prioridad: 1, checked: true });

    const confirmation = () => {
        var escalaDiatonicaRes = [
            {
                escala_diatonica: 'Do',
                prioridad: Do.prioridad,
            },
            {
                escala_diatonica: 'Sol',
                prioridad: Sol.prioridad,
            },
            {
                escala_diatonica: 'Re',
                prioridad: Re.prioridad,
            },
            {
                escala_diatonica: 'La',
                prioridad: La.prioridad,
            },
            {
                escala_diatonica: 'Mi',
                prioridad: Mi.prioridad,
            },
            {
                escala_diatonica: 'Si',
                prioridad: Si.prioridad,
            },
            {
                escala_diatonica: 'Fa#',
                prioridad: FaS.prioridad,
            },
            {
                escala_diatonica: 'Solb',
                prioridad: Solb.prioridad,
            },
            {
                escala_diatonica: 'Reb',
                prioridad: Reb.prioridad,
            },
            {
                escala_diatonica: 'Lab',
                prioridad: Lab.prioridad,
            },
            {
                escala_diatonica: 'Mib',
                prioridad: Mib.prioridad,
            },
            {
                escala_diatonica: 'Sib',
                prioridad: Sib.prioridad,
            },
            {
                escala_diatonica: 'Fa',
                prioridad: Fa.prioridad,
            },
        ];

        setEscala_diatonica_regla(escalaDiatonicaRes);
        refRBSheet.current.close();
    };

    const initialStateOpen = async () => {
        setRenderSlider(false);

        escala_diatonica_regla.forEach((escala) => {
            switch (escala.escala_diatonica) {
                case 'Do':
                    setDo({
                        prioridad: escala.prioridad,
                        checked: escala.prioridad != 0,
                    });
                    break;
                case 'Sol':
                    setSol({
                        prioridad: escala.prioridad,
                        checked: escala.prioridad != 0,
                    });
                    break;
                case 'Re':
                    setRe({
                        prioridad: escala.prioridad,
                        checked: escala.prioridad != 0,
                    });
                    break;
                case 'La':
                    setLa({
                        prioridad: escala.prioridad,
                        checked: escala.prioridad != 0,
                    });
                    break;
                case 'Mi':
                    setMi({
                        prioridad: escala.prioridad,
                        checked: escala.prioridad != 0,
                    });
                    break;
                case 'Si':
                    setSi({
                        prioridad: escala.prioridad,
                        checked: escala.prioridad != 0,
                    });
                    break;
                case 'Fa#':
                    setFaS({
                        prioridad: escala.prioridad,
                        checked: escala.prioridad != 0,
                    });
                    break;
                case 'Solb':
                    setSolb({
                        prioridad: escala.prioridad,
                        checked: escala.prioridad != 0,
                    });
                    break;
                case 'Reb':
                    setReb({
                        prioridad: escala.prioridad,
                        checked: escala.prioridad != 0,
                    });
                    break;
                case 'Lab':
                    setLab({
                        prioridad: escala.prioridad,
                        checked: escala.prioridad != 0,
                    });
                    break;
                case 'Mib':
                    setMib({
                        prioridad: escala.prioridad,
                        checked: escala.prioridad != 0,
                    });
                    break;
                case 'Sib':
                    setSib({
                        prioridad: escala.prioridad,
                        checked: escala.prioridad != 0,
                    });
                    break;
                case 'Fa':
                    setFa({
                        prioridad: escala.prioridad,
                        checked: escala.prioridad != 0,
                    });
                    break;

                default:
                    break;
            }
        });

        setRenderSlider(true);
    };

    const setPriority = (escala, prio) => {
        switch (escala) {
            case 'Do':
                setDo({ prioridad: prio, checked: prio != 0 });
                break;
            case 'Sol':
                setSol({ prioridad: prio, checked: prio != 0 });
                break;
            case 'Re':
                setRe({ prioridad: prio, checked: prio != 0 });
                break;
            case 'La':
                setLa({ prioridad: prio, checked: prio != 0 });
                break;
            case 'Mi':
                setMi({ prioridad: prio, checked: prio != 0 });
                break;
            case 'Si':
                setSi({ prioridad: prio, checked: prio != 0 });
                break;
            case 'Fa#':
                setFaS({ prioridad: prio, checked: prio != 0 });
                break;
            case 'Solb':
                setSolb({ prioridad: prio, checked: prio != 0 });
                break;
            case 'Reb':
                setReb({ prioridad: prio, checked: prio != 0 });
                break;
            case 'Lab':
                setLab({ prioridad: prio, checked: prio != 0 });
                break;
            case 'Mib':
                setMib({ prioridad: prio, checked: prio != 0 });
                break;
            case 'Sib':
                setSib({ prioridad: prio, checked: prio != 0 });
                break;
            case 'Fa':
                setFa({ prioridad: prio, checked: prio != 0 });
                break;

            default:
                break;
        }
    };

    const getPriority = (escala) => {
        switch (escala) {
            case 'Do':
                return Do.prioridad;
            case 'Sol':
                return Sol.prioridad;
            case 'Re':
                return Re.prioridad;
            case 'La':
                return La.prioridad;
            case 'Mi':
                return Mi.prioridad;
            case 'Si':
                return Si.prioridad;
            case 'Fa#':
                return FaS.prioridad;
            case 'Solb':
                return Solb.prioridad;
            case 'Reb':
                return Reb.prioridad;
            case 'Lab':
                return Lab.prioridad;
            case 'Mib':
                return Mib.prioridad;
            case 'Sib':
                return Sib.prioridad;
            case 'Fa':
                return Fa.prioridad;

            default:
                break;
        }
    };

    const checkedEscala = async (escala) => {
        var chck;
        switch (escala) {
            case 'Do':
                chck = !Do.checked;
                setRenderSlider(false);
                await setDo({ prioridad: chck ? 1 : 0, checked: chck });
                setRenderSlider(true);
                break;
            case 'Sol':
                chck = !Sol.checked;
                setRenderSlider(false);
                await setSol({ prioridad: chck ? 1 : 0, checked: chck });
                setRenderSlider(true);
                break;
            case 'Re':
                chck = !Re.checked;
                setRenderSlider(false);
                await setRe({ prioridad: chck ? 1 : 0, checked: chck });
                setRenderSlider(true);
                break;
            case 'La':
                chck = !La.checked;
                setRenderSlider(false);
                await setLa({ prioridad: chck ? 1 : 0, checked: chck });
                setRenderSlider(true);
                break;
            case 'Mi':
                chck = !Mi.checked;
                setRenderSlider(false);
                await setMi({ prioridad: chck ? 1 : 0, checked: chck });
                setRenderSlider(true);
                break;
            case 'Si':
                chck = !Si.checked;
                setRenderSlider(false);
                await setSi({ prioridad: chck ? 1 : 0, checked: chck });
                setRenderSlider(true);
                break;
            case 'Fa#':
                chck = !FaS.checked;
                setRenderSlider(false);
                await setFaS({ prioridad: chck ? 1 : 0, checked: chck });
                setRenderSlider(true);
                break;
            case 'Solb':
                chck = !Solb.checked;
                setRenderSlider(false);
                await setSolb({ prioridad: chck ? 1 : 0, checked: chck });
                setRenderSlider(true);
                break;
            case 'Reb':
                chck = !Reb.checked;
                setRenderSlider(false);
                await setReb({ prioridad: chck ? 1 : 0, checked: chck });
                setRenderSlider(true);
                break;
            case 'Lab':
                chck = !Lab.checked;
                setRenderSlider(false);
                await setLab({ prioridad: chck ? 1 : 0, checked: chck });
                setRenderSlider(true);
                break;
            case 'Mib':
                chck = !Mib.checked;
                setRenderSlider(false);
                await setMib({ prioridad: chck ? 1 : 0, checked: chck });
                setRenderSlider(true);
                break;
            case 'Sib':
                chck = !Sib.checked;
                setRenderSlider(false);
                await setSib({ prioridad: chck ? 1 : 0, checked: chck });
                setRenderSlider(true);
                break;
            case 'Fa':
                chck = !Fa.checked;
                setRenderSlider(false);
                await setFa({ prioridad: chck ? 1 : 0, checked: chck });
                setRenderSlider(true);
                break;

            default:
                break;
        }
    };

    const getTonalidadTitle = (tonalidad) => {
        switch (tonalidad) {
            case 'Do':
                return 'Do(M)/La(m)'
            case 'Sol':
                return 'Sol(M)/Mi(m)'
            case 'Re':
                return 'Re(M)/Si(m)'
            case 'La':
                return 'La(M)/Fa#(m)'
            case 'Mi':
                return 'Mi(M)/Do#(m)'
            case 'Si':
                return 'Si(M)/Sol#(m)'
            case 'Fa#':
                return 'Fa#(M)/Re#(m)'
            case 'Solb':
                return 'Solb(M)/Mib(m)'
            case 'Reb':
                return 'Reb(M)/Sib(m)'
            case 'Lab':
                return 'Lab(M)/Fa(m)'
            case 'Mib':
                return 'Mib(M)/Do(m)'
            case 'Sib':
                return 'Sib(M)/Sol(m)'
            case 'Fa':
                return 'Fa(M)/Re(m)'
            default:
                return tonalidad;
        }
    }

    var imageMap = {
        'Do': require('../../../assets/tonalidades/Do.png'),
        'Fa': require('../../../assets/tonalidades/Fa.png'),
        'Fa#': require('../../../assets/tonalidades/FaSOS.png'),
        'La': require('../../../assets/tonalidades/La.png'),
        'Lab': require('../../../assets/tonalidades/Lab.png'),
        'Mi': require('../../../assets/tonalidades/Mi.png'),
        'Mib': require('../../../assets/tonalidades/Mib.png'),
        'Re': require('../../../assets/tonalidades/Re.png'),
        'Reb': require('../../../assets/tonalidades/Reb.png'),
        'Si': require('../../../assets/tonalidades/Si.png'),
        'Sib': require('../../../assets/tonalidades/Sib.png'),
        'Sol': require('../../../assets/tonalidades/Sol.png'),
        'Solb': require('../../../assets/tonalidades/Solb.png'),
    };

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
                        Prioridad a cada tonalidad
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
                            {escala_diatonica_regla.map((escala, i) => (
                                // <ListItem key={i} bottomDivider>
                                //     <ListItem.Content>
                                <View key={i}>
                                    {/* <ListItem.Title> */}
                                    <View style={{flexDirection: 'row', paddingLeft: 25}}>
                                        <Image
                                            source={imageMap[escala.escala_diatonica]}
                                            style={{
                                                resizeMode: 'contain',
                                                height: 70,
                                                width: 70,
                                            }}

                                        />
                                        <CheckBox
                                            // title={escala.escala_diatonica}
                                            title={getTonalidadTitle(escala.escala_diatonica)}
                                            containerStyle={
                                                styles.containerCheckbox
                                            }
                                            textStyle={styles.textCheckbox}
                                            iconRight
                                            onPress={() =>
                                                checkedEscala(
                                                    escala.escala_diatonica
                                                )
                                            }
                                            checked={
                                                getPriority(
                                                    escala.escala_diatonica
                                                ) != 0
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
                                    </View>
                                    <Text style={styles.textPrioridad}>
                                        Prioridad:{' '}
                                        {getPriority(escala.escala_diatonica)}
                                    </Text>
                                    {/* </ListItem.Title>
                                    <ListItem.Subtitle>
                                        Prioridad{' '}
                                        {getPriority(escala.escala_diatonica)}
                                    </ListItem.Subtitle> */}
                                    <View style={styles.contentSlider}>
                                        <Slider
                                            value={getPriority(
                                                escala.escala_diatonica
                                            )}
                                            onValueChange={(value) =>
                                                setPriority(
                                                    escala.escala_diatonica,
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
                                //     </ListItem.Content>
                                // </ListItem>
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
        padding: 2,
        marginLeft: 0,
        marginHorizontal: 10,
        borderStyle: 'solid',
        borderColor: BORDER_COLOR_RIGHT,
        borderWidth: 3,
        borderRadius: 5,
    },
    containerCheckUnchecked: {
        backgroundColor: FIFTH_COLOR,
        padding: 2,
        marginLeft: 0,
        marginHorizontal: 10,
        borderStyle: 'solid',
        borderColor: 'lightgrey',
        borderWidth: 3,
        borderRadius: 5,
    },
    containerCheckbox: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        marginLeft: 0,
        paddingHorizontal: 0,
    },
    textCheckbox: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    divider: {
        marginBottom: 15,
    },
});
