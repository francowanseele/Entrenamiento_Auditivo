import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Animated } from 'react-native';
import { ListItem, Icon, Slider, Button, Divider } from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import { set } from 'react-native-reanimated';

import Keyboard from './Keyboard';

export default function BottomSheetTonalidad(props) {
    const { escala_diatonica_regla, setEscala_diatonica_regla, refRBSheet } =
        props;
    const [prio, setPrio] = useState(1);
    const [renderSlider, setRenderSlider] = useState(false);

    // states -> escalas diatonicas
    const [Do, setDo] = useState(1);
    const [Sol, setSol] = useState(1);
    const [Re, setRe] = useState(1);
    const [La, setLa] = useState(1);
    const [Mi, setMi] = useState(1);
    const [Si, setSi] = useState(1);
    const [FaS, setFaS] = useState(1);
    const [Solb, setSolb] = useState(1);
    const [Reb, setReb] = useState(1);
    const [Lab, setLab] = useState(1);
    const [Mib, setMib] = useState(1);
    const [Sib, setSib] = useState(1);
    const [Fa, setFa] = useState(1);

    const confirmation = () => {
        var escalaDiatonicaRes = [
            {
                escala_diatonica: 'Do',
                prioridad: Do,
            },
            {
                escala_diatonica: 'Sol',
                prioridad: Sol,
            },
            {
                escala_diatonica: 'Re',
                prioridad: Re,
            },
            {
                escala_diatonica: 'La',
                prioridad: La,
            },
            {
                escala_diatonica: 'Mi',
                prioridad: Mi,
            },
            {
                escala_diatonica: 'Si',
                prioridad: Si,
            },
            {
                escala_diatonica: 'Fa#',
                prioridad: FaS,
            },
            {
                escala_diatonica: 'Solb',
                prioridad: Solb,
            },
            {
                escala_diatonica: 'Reb',
                prioridad: Reb,
            },
            {
                escala_diatonica: 'Lab',
                prioridad: Lab,
            },
            {
                escala_diatonica: 'Mib',
                prioridad: Mib,
            },
            {
                escala_diatonica: 'Sib',
                prioridad: Sib,
            },
            {
                escala_diatonica: 'Fa',
                prioridad: Fa,
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
                    setDo(escala.prioridad);
                    break;
                case 'Sol':
                    setSol(escala.prioridad);
                    break;
                case 'Re':
                    setRe(escala.prioridad);
                    break;
                case 'La':
                    setLa(escala.prioridad);
                    break;
                case 'Mi':
                    setMi(escala.prioridad);
                    break;
                case 'Si':
                    setSi(escala.prioridad);
                    break;
                case 'Fa#':
                    setFaS(escala.prioridad);
                    break;
                case 'Solb':
                    setSolb(escala.prioridad);
                    break;
                case 'Reb':
                    setReb(escala.prioridad);
                    break;
                case 'Lab':
                    setLab(escala.prioridad);
                    break;
                case 'Mib':
                    setMib(escala.prioridad);
                    break;
                case 'Sib':
                    setSib(escala.prioridad);
                    break;
                case 'Fa':
                    setFa(escala.prioridad);
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
                setDo(prio);
                break;
            case 'Sol':
                setSol(prio);
                break;
            case 'Re':
                setRe(prio);
                break;
            case 'La':
                setLa(prio);
                break;
            case 'Mi':
                setMi(prio);
                break;
            case 'Si':
                setSi(prio);
                break;
            case 'Fa#':
                setFaS(prio);
                break;
            case 'Solb':
                setSolb(prio);
                break;
            case 'Reb':
                setReb(prio);
                break;
            case 'Lab':
                setLab(prio);
                break;
            case 'Mib':
                setMib(prio);
                break;
            case 'Sib':
                setSib(prio);
                break;
            case 'Fa':
                setFa(prio);
                break;

            default:
                break;
        }
    };

    const getPriority = (escala) => {
        switch (escala) {
            case 'Do':
                return Do;
            case 'Sol':
                return Sol;
            case 'Re':
                return Re;
            case 'La':
                return La;
            case 'Mi':
                return Mi;
            case 'Si':
                return Si;
            case 'Fa#':
                return FaS;
            case 'Solb':
                return Solb;
            case 'Reb':
                return Reb;
            case 'Lab':
                return Lab;
            case 'Mib':
                return Mib;
            case 'Sib':
                return Sib;
            case 'Fa':
                return Fa;

            default:
                return 0;
        }
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
                <Text style={styles.titleBottom}>
                    Prioridad a cada tonalidad
                </Text>
                {escala_diatonica_regla.map((escala, i) => (
                    <ListItem key={i} bottomDivider>
                        <ListItem.Content>
                            <View style={{ width: '100%' }}>
                                <ListItem.Title>
                                    {escala.escala_diatonica}
                                </ListItem.Title>
                                <ListItem.Subtitle>
                                    Prioridad{' '}
                                    {getPriority(escala.escala_diatonica)}
                                </ListItem.Subtitle>
                                {renderSlider ? (
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
                                ) : (
                                    <></>
                                )}
                            </View>
                        </ListItem.Content>
                    </ListItem>
                ))}

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
        marginBottom: 40,
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
