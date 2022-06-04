import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Image } from 'react-native';
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

export const getImagenFromB64String = (imagen)=>{
    return (
        <Image style={{marginLeft:15, width:90,height:50}} source={{uri: `data:image/gif;base64,${imagen}`}} />
    )
}

export default function BottomSheetCelulaRitmica(props) {
    const {
        add,
        simple,
        celula_ritmica_regla,
        editCelula_ritmica,
        setCelula_ritmica_regla,
        refRBSheet,
    } = props;
    const [renderSlider, setRenderSlider] = useState(false);

    const [listAllCR, setListAllCR] = useState([]);

    const confirmation = () => {
        var resCR = [];
        if (add) {
            listAllCR.forEach((crLocal) => {
                if (crLocal.checked) {
                    resCR.push({
                        id: crLocal.id,
                        celula_ritmica: crLocal.figuras,
                        simple: crLocal.simple,
                        prioridad: crLocal.prioridad,
                    });
                }
            });
        } else {
            celula_ritmica_regla.forEach((crReg) => {
                if (
                    crReg.celula_ritmica == listAllCR[0].figuras &&
                    crReg.simple == listAllCR[0].simple
                ) {
                    resCR.push({
                        id: crReg.id,
                        celula_ritmica: crReg.celula_ritmica,
                        simple: crReg.simple,
                        prioridad: listAllCR[0].prioridad,
                    });
                } else {
                    resCR.push(crReg);
                }
            });
        }

        setCelula_ritmica_regla(resCR);
        refRBSheet.current.close();
    };

    const deleteCelulaRitmica = () => {
        var crRes = [];
        celula_ritmica_regla.forEach((crReg) => {
            if (
                crReg.celula_ritmica != listAllCR[0].figuras ||
                crReg.simple != listAllCR[0].simple
            ) {
                crRes.push({
                    id: crReg.id,
                    celula_ritmica: crReg.celula_ritmica,
                    simple: crReg.simple,
                    prioridad: crReg.prioridad,
                });
            }
        });

        setCelula_ritmica_regla(crRes);
        refRBSheet.current.close();
    };

    const initialStateOpen = async () => {
        setRenderSlider(false);

        if (add) {
            const celulaRitmicaResult = await getCelulaRitmicaApi(simple);
            if (celulaRitmicaResult.ok) {
                var listAllCRRes = [];
                celulaRitmicaResult.celulaRitmica.forEach((CRResult) => {
                    const index = celula_ritmica_regla.findIndex(
                        (x) =>
                            x.celula_ritmica == CRResult.figuras &&
                            x.simple == CRResult.simple
                    );
                    listAllCRRes.push({
                        id: CRResult.id,
                        figuras: CRResult.figuras,
                        simple: CRResult.simple,
                        imagen: CRResult.imagen,
                        checked: index != -1,
                        prioridad:
                            index == -1
                                ? 0
                                : celula_ritmica_regla[index].prioridad,
                    });
                });
                setListAllCR(listAllCRRes);
            }
        } else {
            setListAllCR([
                {
                    id: editCelula_ritmica.id,
                    figuras: editCelula_ritmica.celula_ritmica,
                    simple: editCelula_ritmica.simple,
                    checked: true,
                    prioridad: editCelula_ritmica.prioridad,
                },
            ]);
        }

        setRenderSlider(true);
    };

    const setPriorityCelulaRitmica = (prio, cr) => {
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

    const checkedCelulaRitmica = async (cr) => {
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
            ref={refRBSheet}
            closeOnDragDown={true}
            // closeOnPressMask={false}
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
                        <Text style={styles.titleBottom}>
                            Agregar célula rítmica
                        </Text>
                        <Button
                            // containerStyle={styles.okGiroMelodico}
                            buttonStyle={styles.okGiroMelodicoButton}
                            title="Confirmar"
                            onPress={() => confirmation()}
                            // containerStyle={styles.okGiroMelodicoContainer}
                        />
                    </View>
                ) : (
                    <>
                        <View
                            style={{ flexDirection: 'row', paddingRight: 15 }}
                        >
                            <Text style={styles.titleBottom}>
                                Editar célula rítmica
                            </Text>
                            <Button
                                // containerStyle={styles.okGiroMelodico}
                                buttonStyle={styles.okGiroMelodicoButton}
                                title="Confirmar"
                                onPress={() => confirmation()}
                                // containerStyle={styles.okGiroMelodicoContainer}
                            />
                        </View>
                    </>
                )}
                <ScrollView>
                    {renderSlider ? (
                        <View style={{ marginBottom: 140 }}>
                            {listAllCR.map((cr, i) => (
                                <View key={i}>
                                    <View>
                                        {add ? (
                                            <>
                                            {getImagenFromB64String(cr.imagen)}
                                            <CheckBox
                                                // checkedIcon="dot-circle-o"
                                                // uncheckedIcon="circle-o"
                                                checked={cr.checked}
                                                containerStyle={
                                                    styles.containerCheckbox
                                                }
                                                textStyle={styles.textCheckbox}
                                                iconRight
                                                onPress={() =>
                                                    checkedCelulaRitmica(cr)
                                                }
                                                // checkedIcon={
                                                //     <Icon
                                                //         name="check-circle"
                                                //         type="material-community"
                                                //         color={TEXT_COLOR_RIGHT}
                                                //         containerStyle={
                                                //             styles.containerCheckChecked
                                                //         }
                                                //     />
                                                // }
                                                // uncheckedIcon={
                                                //     <Icon
                                                //         name="check-circle"
                                                //         type="material-community"
                                                //         color={'grey'}
                                                //         containerStyle={
                                                //             styles.containerCheckUnchecked
                                                //         }
                                                //     />
                                                // }
                                            />
                                            </>
                                        ) : (
                                            // <CheckBox
                                            //     title={`Célula rítmica ${cr.figuras}`}
                                            //     checkedIcon="dot-circle-o"
                                            //     uncheckedIcon="circle-o"
                                            //     checked={cr.checked}
                                            //     containerStyle={
                                            //         styles.containerCheckbox
                                            //     }
                                            //     textStyle={styles.textCheckbox}
                                            //     onPress={() =>
                                            //         checkedCelulaRitmica(cr)
                                            //     }
                                            // />
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    paddingRight: 20,
                                                    marginTop: 10,
                                                }}
                                            >
                                                
                                                <Text
                                                    style={{
                                                        fontSize: 18,
                                                        fontWeight: 'bold',
                                                        marginLeft: 20,
                                                        width: '70%',
                                                    }}
                                                >
                                                    {getFigure(cr.figuras)}
                                                </Text>
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
                                                        deleteCelulaRitmica()
                                                    }
                                                />
                                            </View>
                                        )}
                                        <Text style={styles.textPrioridad}>
                                            Prioridad: {cr.prioridad}
                                        </Text>
                                    </View>
                                    <View style={styles.contentSlider}>
                                        <Slider
                                            value={cr.prioridad}
                                            onValueChange={(value) =>
                                                setPriorityCelulaRitmica(
                                                    value,
                                                    cr
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
