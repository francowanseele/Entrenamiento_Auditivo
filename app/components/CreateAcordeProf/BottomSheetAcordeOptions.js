import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Button, Icon, Slider, CheckBox } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import RBSheet from 'react-native-raw-bottom-sheet';
import { estadoAcorde } from '../../../enums/estadoAcorde';
import { PRIMARY_COLOR, QUARTER_COLOR } from '../../../utils/colorPalette';
import { CLOSE_BOTTOM_SHEET } from '../../../utils/constants';

export default function BottomSheetAcordeOptions(props) {
    const {
        refRBSheet,
        elem,
        moreOptions,
        priorityElem,
        setPriorityAcordeEscala,
        typeElem,
        estadosAcorde,
        setEstadoAcordeEscala,
        hasMoreOptions,
        escalaForMoreOptions,
    } = props;

    const [height, setHeight] = useState(0.5);
    const [state, setState] = useState('options');
    const [priority, setPriority] = useState(0);

    // Acordes state
    const [estadoFundamental, setEstadoFundamental] = useState(true);
    const [estadoPrimeraInversion, setEstadoPrimeraInversion] = useState(false);
    const [estadoSegundaInversion, setEstadoSegundaInversion] = useState(false);
    const [estadoTerceraInversion, setEstadoTerceraInversion] = useState(false);

    const initialStateOpen = async () => {
        await setHeight(0.5);

        const statesWithoutBlanckSpaces = estadosAcorde.replace(' ', '');
        const estados = statesWithoutBlanckSpaces.split(',').map((x) => parseInt(x));

        setEstadoFundamental(estados.indexOf(estadoAcorde.fundamental) != -1);
        setEstadoPrimeraInversion(estados.indexOf(estadoAcorde.primeraInversion) != -1);
        setEstadoSegundaInversion(estados.indexOf(estadoAcorde.segundaInversion) != -1);
        setEstadoTerceraInversion(estados.indexOf(estadoAcorde.terceraInversion) != -1);

        setPriority(priorityElem);
        if (typeElem == 'escala') {
            await setState('priority');
        } else {
            await setState('options');
        }
    };

    const assignPriority = async () => {
        refRBSheet.current.close();
        setTimeout(async () => {
            // await setHeight(0.8);
            refRBSheet.current.open();
            setTimeout(async () => {
                await setState('priority');
            }, 10);
        }, CLOSE_BOTTOM_SHEET);
    }

    const assignState = async () => {
        refRBSheet.current.close();
        setTimeout(async () => {
            await setHeight(0.75);
            refRBSheet.current.open();
            setTimeout(async () => {
                await setState('state');
            }, 10);
        }, CLOSE_BOTTOM_SHEET);
    }

    const selectMoreOptions = (acorde) => {
        moreOptions(acorde, escalaForMoreOptions);
        refRBSheet.current.close();
    }

    const confirm = () => {
        if (state == 'state') {
            let estadosAcordeStr = '';
            if (estadoFundamental) estadosAcordeStr = estadosAcordeStr + estadoAcorde.fundamental.toString() + ',';
            if (estadoPrimeraInversion) estadosAcordeStr = estadosAcordeStr + estadoAcorde.primeraInversion.toString() + ',';
            if (estadoSegundaInversion) estadosAcordeStr = estadosAcordeStr + estadoAcorde.segundaInversion.toString() + ',';
            if (estadoTerceraInversion) estadosAcordeStr = estadosAcordeStr + estadoAcorde.terceraInversion.toString() + ',';

            if (estadosAcordeStr != '') {
                estadosAcordeStr = estadosAcordeStr.slice(0, -1);
                setEstadoAcordeEscala(elem, estadosAcordeStr, escalaForMoreOptions);
                refRBSheet.current.close();
            } else {
                Alert.alert('Debes seleccionar al menos un estado.');
            }
        } else { 
            setPriorityAcordeEscala(elem, typeElem, priority, escalaForMoreOptions);
            refRBSheet.current.close();
        }

    }

    return (
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={true}
            animationType="none"
            dragFromTopOnly={true}
            onOpen={initialStateOpen}
            height={Dimensions.get('window').height * height}
            closeDuration={CLOSE_BOTTOM_SHEET}
            customStyles={{
                wrapper: {
                    backgroundColor: 'rgba(0,0,0,.25)',
                },
                draggableIcon: {
                    backgroundColor: '#000',
                },
                container: {
                    borderTopRightRadius: 30,
                    borderTopLeftRadius: 30,
                },
            }}
        >
            {state == 'options' ? (
                <View>
                    {hasMoreOptions && (
                        <TouchableOpacity
                            style={styles.container}
                            onPress={() => selectMoreOptions(elem)}
                        >
                            <Icon
                                name="format-list-text"
                                type="material-community"
                                iconStyle={styles.iconOption}
                            />
                            <Text style={styles.options}>
                                Mostrar/Ocultar opciones para '{elem}'
                            </Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        style={styles.container}
                        onPress={assignPriority}
                    >
                        <Icon
                            name="pencil-outline"
                            type="material-community"
                            iconStyle={styles.iconOption}
                        />
                        <Text style={styles.options}>
                            Editar prioridad para '{elem}' ({priorityElem})
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.container}
                        onPress={assignState}
                    >
                        <Icon
                            name="format-list-checks"
                            type="material-community"
                            iconStyle={styles.iconOption}
                        />
                        <Text style={styles.options}>
                            Estado para '{elem}'
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : state == 'priority' ? (
                <View>
                    <View style={styles.containerTitle}>
                        <Text style={styles.title}>
                            Editar prioridad a {typeElem} {elem}
                        </Text>
                    </View>
                    <Text style={styles.textPrioridad}>
                        Prioridad:{' '}
                        {priority}
                    </Text>
                    <View style={styles.contentSlider}>
                        <Slider
                            value={priority}
                            onValueChange={(value) =>
                                setPriority(value)
                            }
                            minimumValue={1}
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
                    <Button
                        title={'Guardar'}
                        onPress={() => confirm()}
                        buttonStyle={{ backgroundColor: PRIMARY_COLOR }}
                    />
                </View>
            ) : state == 'state' ? (
                <ScrollView>
                    <View style={styles.containerTitle}>
                        <Text style={styles.title}>
                            Estado para '{elem}'
                        </Text>
                    </View>

                    <View>
                        <CheckBox
                            title='Estado fundamental'
                            checked={estadoFundamental}
                            onPress={() => setEstadoFundamental(!estadoFundamental)}
                        />
                        <CheckBox
                            title='Primera inversión'
                            checked={estadoPrimeraInversion}
                            onPress={() => setEstadoPrimeraInversion(!estadoPrimeraInversion)}
                        />
                        <CheckBox
                            title='Segunda inversión'
                            checked={estadoSegundaInversion}
                            onPress={() => setEstadoSegundaInversion(!estadoSegundaInversion)}
                        />
                        <CheckBox
                            title='Tercera inversión'
                            checked={estadoTerceraInversion}
                            onPress={() => setEstadoTerceraInversion(!estadoTerceraInversion)}
                        />
                    </View>

                    <Button
                        title={'Guardar'}
                        onPress={() => confirm()}
                        buttonStyle={{ backgroundColor: PRIMARY_COLOR }}
                    />
                </ScrollView>
            ) : (
                <></>
            )}
        </RBSheet>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flexDirection: 'row',
    },
    iconOption: {
        fontSize: 25,
        paddingVertical: 10,
        paddingLeft: 25,
        paddingRight: 5,
        color: PRIMARY_COLOR,
    },
    options: {
        fontSize: 18,
        paddingRight: 15,
        paddingVertical: 10,
    },
    confirmationTitle: {
        fontSize: 22,
        alignSelf: 'center',
        marginVertical: 22,
        fontWeight: 'bold',
    },
    editTitle: {
        fontSize: 22,
        alignSelf: 'center',
        marginVertical: 22,
        fontWeight: 'bold',
    },
    confirmationText: {
        fontSize: 20,
        paddingHorizontal: 15,
    },
    containerConfirmation: {
        position: 'relative',
        height: '100%',
    },
    containerButtons: {
        bottom: 0,
        position: 'absolute',
        width: '100%',
        marginBottom: '20%',
    },
    containerButtonOk: {
        marginHorizontal: 10,
        marginTop: 5,
        backgroundColor: PRIMARY_COLOR,
    },
    containerButtonCancel: {
        marginHorizontal: 10,
        marginTop: 5,
        backgroundColor: QUARTER_COLOR,
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
        paddingBottom: 30,
    },
    containerTitle: {
        marginLeft: 30,
        marginVertical: 20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
    }
});
