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
    BACKGROUND_COLOR_WRONG,
    BORDER_COLOR_RIGHT,
    BORDER_COLOR_WRONG,
    FIFTH_COLOR,
    PRIMARY_COLOR,
    TEXT_COLOR_RIGHT,
    TEXT_COLOR_WORNING,
    TEXT_COLOR_WRONG,
} from '../../../utils/colorPalette';

import { getCelulaRitmicaApi } from '../../api/celula_ritmica';

export default function BottomSheetLigadura(props) {
    const {
        simple,
        ligaduraFirstCR,
        celula_ritmica_regla,
        ligadura_regla,
        setLigadura_regla,
        refRBSheet_Ligaduras,
    } = props;

    /**
     * ligadura_regla= [{
            elem: {
                first: '8-8',
                second: '8-16-16',
            },
            priority: 3,
            must: false,
        }, 
        {...}],
    */

    const [renderSlider, setRenderSlider] = useState(false);

    const [listAllCR, setListAllCR] = useState([]);
    const [must, setMust] = useState(false);

    const confirmation = () => {
        let resLigaduras = [];

        // Se eliminan de ligadura_regla las que voy a agregar ahora
        ligadura_regla.forEach((l) => {
            if (l.elem.first != ligaduraFirstCR.figuras) {
                resLigaduras.push(l);
            }
        });

        // Agrego a ligadura_regla
        listAllCR.forEach((crLocal) => {
            if (crLocal.checked) {
                resLigaduras.push({
                    elem: {
                        first: ligaduraFirstCR.figuras,
                        firstId: ligaduraFirstCR.id,
                        second: crLocal.figuras,
                        secondId: crLocal.id,
                    },
                    priority: crLocal.prioridad,
                    must: must,
                });
            }
        });

        setLigadura_regla(resLigaduras);

        refRBSheet_Ligaduras.current.close();
    };

    const initialStateOpen = async () => {
        setRenderSlider(false);

        const celulaRitmicaResult = await getCelulaRitmicaApi(simple);
        if (celulaRitmicaResult.ok) {
            var listAllCRRes = [];
            celulaRitmicaResult.celulaRitmica.forEach((CRResult) => {
                const index = celula_ritmica_regla.findIndex(
                    (x) =>
                        x.celula_ritmica == CRResult.figuras &&
                        x.simple == CRResult.simple
                );

                if (index != -1) {
                    listAllCRRes.push({
                        id: CRResult.id,
                        // TODO: IMAGEN...........
                        figuras: CRResult.figuras,
                        simple: CRResult.simple,
                        checked: false,
                        prioridad: 0,
                        must: false,
                    });
                }
            });

            // Setear prioridades y must en base a ligadura_regla
            let mustLigadura = false;
            for (let i = 0; i < listAllCRRes.length; i++) {
                const cr = listAllCRRes[i];

                ligadura_regla.forEach((ligadura) => {
                    if (
                        ligadura.elem.first == ligaduraFirstCR.figuras &&
                        ligadura.elem.second == cr.figuras
                    ) {
                        listAllCRRes[i].checked = true;
                        listAllCRRes[i].prioridad = ligadura.priority;
                        listAllCRRes[i].must = ligadura.must;
                        mustLigadura = mustLigadura || ligadura.must;
                    }
                });
            }

            setListAllCR(listAllCRRes);
            setMust(mustLigadura);
        }

        setRenderSlider(true);
    };

    const setPriorityLigadura = (prio, cr) => {
        var index = listAllCR.findIndex((x) => x.figuras == cr.figuras);

        let g = listAllCR[index];

        g['prioridad'] = prio;
        g['prioridad'] == 0 ? (g['checked'] = false) : (g['checked'] = true);

        if (index === -1) {
            // TODO: handle error
            console.log('no match');
        } else {
            setListAllCR([
                ...listAllCR.slice(0, index),
                g,
                ...listAllCR.slice(index + 1),
            ]);
        }
    };

    const checkedLigadura = async (cr) => {
        var index = listAllCR.findIndex(
            (x) => x.figuras == cr.figuras && x.simple == cr.simple
        );

        let g = listAllCR[index];

        g['checked'] = !g['checked'];
        g['checked'] ? (g['prioridad'] = 1) : (g['prioridad'] = 0);
        setRenderSlider(false);
        if (index === -1) {
            // TODO: handle error
            console.log('no match');
        } else {
            await setListAllCR([
                ...listAllCR.slice(0, index),
                g,
                ...listAllCR.slice(index + 1),
            ]);
        }
        setRenderSlider(true);
    };

    const getFigure = (figs) => {
        const arrFigs = figs.split('-');
        var arr = [];
        arrFigs.forEach((f) => {
            switch (f) {
                case '1':
                    arr.push('music-note-whole');
                    break;
                case '2':
                    arr.push('music-note-half');
                    break;
                case 'd2':
                    arr.push('music-note-half-dotted');
                    break;
                case '4':
                    arr.push('music-note-quarter');
                    break;
                case 'd4':
                    arr.push('music-note-quarter-dotted');
                    break;
                case '8':
                    arr.push('music-note-eighth');
                    break;
                case 'd8':
                    arr.push('music-note-eighth-dotted');
                    break;
                case '16':
                    arr.push('music-note-sixteenth');
                    break;
                case 'd16':
                    arr.push('music-note-sixteenth-dotted');
                    break;
                default:
                    break;
            }
        });

        return (
            <View
                style={{
                    flexDirection: 'row',
                    borderStyle: 'solid',
                    borderWidth: 1,
                    borderRadius: 5,
                }}
            >
                {arr.map((icon, i) => (
                    <Icon
                        key={i}
                        name={icon}
                        type="material-community"
                        iconStyle={{ fontSize: 30 }}
                    />
                ))}
            </View>
        );
    };

    return (
        <RBSheet
            ref={refRBSheet_Ligaduras}
            closeOnDragDown={true}
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
                <View
                    style={{
                        flexDirection: 'row',
                        paddingRight: 15,
                    }}
                >
                    <Text style={styles.titleBottom}>
                        Ligaduras para:{' '}
                        {ligaduraFirstCR && ligaduraFirstCR.figuras}
                    </Text>
                    <Button
                        // containerStyle={styles.okGiroMelodico}
                        buttonStyle={styles.okGiroMelodicoButton}
                        title="Confirmar"
                        onPress={() => confirmation()}
                        containerStyle={styles.okGiroMelodicoContainer}
                    />
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        paddingRight: 15,
                    }}
                >
                    <CheckBox
                        title="Ligadura obligatoria"
                        checked={must}
                        onPress={() => setMust(!must)}
                        containerStyle={{
                            width: '100%',
                        }}
                    />
                </View>

                <ScrollView>
                    {renderSlider ? (
                        <View style={{ marginBottom: 140 }}>
                            {listAllCR.map((cr, i) => (
                                <View key={i}>
                                    <View>
                                        <CheckBox
                                            title={getFigure(cr.figuras)}
                                            // checkedIcon="dot-circle-o"
                                            // uncheckedIcon="circle-o"
                                            checked={cr.checked}
                                            containerStyle={
                                                styles.containerCheckbox
                                            }
                                            textStyle={styles.textCheckbox}
                                            iconRight
                                            onPress={() => checkedLigadura(cr)}
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
                                            Prioridad: {cr.prioridad}
                                        </Text>
                                    </View>
                                    <View style={styles.contentSlider}>
                                        <Slider
                                            value={cr.prioridad}
                                            onValueChange={(value) =>
                                                setPriorityLigadura(value, cr)
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
