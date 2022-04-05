import React, { useState, useEffect } from 'react';
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
import SwitchSelector from 'react-native-switch-selector';

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
import KeyboardCreateCelulas from './KeyboardCreateCelulas';

export default function BottomSheetCreateCelulaRitmica(props) {
    const {
        add,
        setSimple,
        refRBSheet
    } = props;
    // const [prio, setPrio] = useState(1);
    const [figuras, setFiguras] = useState([]);
    const [renderSlider, setRenderSlider] = useState(false);
    const [title, setTitle] = useState('Nueva celula ritmica');
    const [writeGiroMelodico, setWriteGiroMelodico] = useState(true);
    const [girosMelodicosDB, setGirosMelodicosDB] = useState([]);


    

    const confirmation = () => {
        // const newGiro = {
        //     giros_melodicos: giro,
        //     prioridad: prio,
        // };

        // var newGiroMelodicoRegla = [];
        // giro_melodico_regla.forEach((gm_regla) => {
        //     if (add) {
        //         newGiroMelodicoRegla.push(gm_regla);
        //     } else {
        //         if (gm_regla == giro_melodico_reglaEdit) {
        //             newGiroMelodicoRegla.push(newGiro);
        //         } else {
        //             newGiroMelodicoRegla.push(gm_regla);
        //         }
        //     }
        // });
        // if (add) {
        //     newGiroMelodicoRegla.push(newGiro);
        // }

        // setGiro_melodico_regla(newGiroMelodicoRegla);
        refRBSheet.current.close();
    };

  
    const deleteGiro = () => {
        // var newGiroMelodicoRegla = [];
        // giro_melodico_regla.forEach((gm_regla) => {
        //     if (gm_regla != giro_melodico_reglaEdit) {
        //         newGiroMelodicoRegla.push(gm_regla);
        //     }
        // });

        // setGiro_melodico_regla(newGiroMelodicoRegla);
        // refRBSheet.current.close();
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

    return (
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={false}
            // closeOnPressMask={true}
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
                        <SwitchSelector
                        initial={!add || writeGiroMelodico ? 0 : 1}
                        onPress={(value) => setSimple(value == 'e')}
                        textColor={'black'}
                        selectedColor={'white'}
                        buttonColor={SECONDARY_COLOR}
                        borderColor={PRIMARY_COLOR}
                        hasPadding
                        options={[
                            {
                                label: 'Simple',
                                value: 'e',
                            },
                            {
                                label: 'Compuesta',
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
                        <ScrollView>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    paddingRight: 20,
                                }}
                            >
                                <Text style={styles.textPrioridad}>
                                    Figuras: 
                                </Text>

                            </View>

                            <Divider orientation="horizontal" />

                            <KeyboardCreateCelulas
                                figuras={figuras}
                                setFiguras={setFiguras}
                                // mayor={mayor}
                            />
                        </ScrollView>
                    </View>
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
