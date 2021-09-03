import React, { useState, useRef } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import {
    ListItem,
    Icon,
    Switch,
    CheckBox,
    Button,
} from 'react-native-elements';
import SwitchSelector from 'react-native-switch-selector';

import ListEmpty from './ListEmpty';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../../utils/colorPalette';

export default function ConfigRhythmic(props) {
    const {
        nro_compases,
        simple,
        setSimple,
        compas_regla,
        celula_ritmica_regla,
        BPM,
        setAddCelulaRitmica,
        setAddCompas,
        setEditCompas_regla,
        setEditCelula_ritmica,
        refRBSheet_Picker,
        refRBSheet_Compas,
        refRBSheet_CelulaRitmica,
        refRBSheet_BPM,
    } = props;

    const openSetNroCompas = () => {
        refRBSheet_Picker.current.open();
    };

    const addCompas = async () => {
        await setAddCompas(true);
        refRBSheet_Compas.current.open();
    };

    const addCelulaRitmica = async () => {
        await setAddCelulaRitmica(true);
        refRBSheet_CelulaRitmica.current.open();
    };

    const editCompas = async (compas) => {
        await setAddCompas(false);
        await setEditCompas_regla(compas);
        refRBSheet_Compas.current.open();
    };

    const editCelulaRitmica = async (celula) => {
        await setAddCelulaRitmica(false);
        await setEditCelula_ritmica(celula);
        refRBSheet_CelulaRitmica.current.open();
    };

    const editBPM = () => {
        refRBSheet_BPM.current.open();
    };

    const cantCompasRegla = (compasRegla, simple) => {
        var cant = 0;
        compasRegla.forEach((comp) => {
            if (comp.simple == simple) {
                cant++;
            }
        });

        return cant;
    };

    const cantCelulaRitmica = (celulaRitmicaRegla, simple) => {
        var cant = 0;
        celulaRitmicaRegla.forEach((celula) => {
            if (celula.simple == simple) {
                cant++;
            }
        });

        return cant;
    };

    return (
        <View>
            <View style={styles.contentSimpleCompuesto}>
                <SwitchSelector
                    initial={0}
                    onPress={(value) => setSimple(value == 's')}
                    textColor={'black'}
                    selectedColor={'white'}
                    buttonColor={SECONDARY_COLOR}
                    borderColor={PRIMARY_COLOR}
                    hasPadding
                    options={[
                        {
                            label: 'Dictado Simple',
                            value: 's',
                        },
                        {
                            label: 'Dictado Compuesto',
                            value: 'c',
                        },
                    ]}
                    testID="gender-switch-selector"
                    accessibilityLabel="gender-switch-selector"
                    style={{
                        width: '80%',
                    }}
                />
            </View>

            {/* Compás */}
            <View style={styles.contentTitle}>
                <Text style={styles.title}>Compás</Text>
                <Button
                    icon={
                        <Icon
                            type="material-community"
                            name="plus-thick"
                            color="white"
                        />
                    }
                    style={styles.buttonRight}
                    buttonStyle={styles.buttonAdd}
                    onPress={() => {
                        addCompas();
                    }}
                />
            </View>
            {cantCompasRegla(compas_regla, simple) == 0 && (
                <ListEmpty text={'Agregue Compases presionando "+"'} />
            )}
            {compas_regla
                .filter((compasSinFilter) => compasSinFilter.simple == simple)
                .map((compas, i) => (
                    <ListItem key={i} bottomDivider>
                        <ListItem.Content style={styles.content}>
                            <View style={styles.contentListLeft}>
                                <ListItem.Title>
                                    {compas.numerador}/{compas.denominador}
                                </ListItem.Title>
                                <ListItem.Subtitle>
                                    Prioridad {compas.prioridad}
                                </ListItem.Subtitle>
                            </View>
                            <View style={styles.contentListRight}>
                                <Icon
                                    type="material-community"
                                    name="pencil-outline"
                                    onPress={() => editCompas(compas)}
                                />
                            </View>
                        </ListItem.Content>
                    </ListItem>
                ))}

            {/* Nro compases */}
            <View style={styles.contentTitle}>
                <Text style={styles.title}>Nro. Compases</Text>
                <Button
                    style={styles.buttonRight}
                    title={nro_compases}
                    onPress={openSetNroCompas}
                />
            </View>

            {/* Células rítmicas */}
            <View style={styles.contentTitle}>
                <Text style={styles.title}>Células Rítmicas</Text>
                <Button
                    icon={
                        <Icon
                            type="material-community"
                            name="plus-thick"
                            color="white"
                        />
                    }
                    style={styles.buttonRight}
                    buttonStyle={styles.buttonAdd}
                    onPress={() => {
                        addCelulaRitmica();
                    }}
                />
            </View>
            {cantCelulaRitmica(celula_ritmica_regla, simple) == 0 && (
                <ListEmpty text={'Agregue Células Rítmicas presionando "+"'} />
            )}
            {celula_ritmica_regla
                .filter(
                    (celula_ritmica_reglaSinFilter) =>
                        celula_ritmica_reglaSinFilter.simple == simple
                )
                .map((celula, i) => (
                    <ListItem key={i} bottomDivider>
                        <ListItem.Content style={styles.content}>
                            <View style={styles.contentListLeft}>
                                <ListItem.Title>
                                    {celula.celula_ritmica}
                                </ListItem.Title>
                                <ListItem.Subtitle>
                                    Prioridad {celula.prioridad}
                                </ListItem.Subtitle>
                            </View>
                            <View style={styles.contentListRight}>
                                <Icon
                                    type="material-community"
                                    name="pencil-outline"
                                    onPress={() => editCelulaRitmica(celula)}
                                />
                            </View>
                        </ListItem.Content>
                    </ListItem>
                ))}

            {/* BPM */}
            <ListItem key={0} style={styles.listOne} bottomDivider>
                <ListItem.Content style={styles.content}>
                    <View style={styles.contentListLeft}>
                        <ListItem.Title style={styles.titleSingle}>
                            BPM nota{' '}
                            {
                                <Icon
                                    name="music-note-quarter"
                                    type="material-community"
                                />
                            }
                        </ListItem.Title>
                        <ListItem.Subtitle>
                            Rango: [ {BPM.menor} bpm - {BPM.mayor} bpm ]
                        </ListItem.Subtitle>
                    </View>
                    <View style={styles.contentListRight}>
                        <Icon
                            type="material-community"
                            name="pencil-outline"
                            onPress={() => editBPM()}
                        />
                    </View>
                </ListItem.Content>
            </ListItem>
        </View>
    );
}

const styles = StyleSheet.create({
    contentSimpleCompuesto: {
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 15,
    },
    containerSimplecompuesto: {
        backgroundColor: 'transparent',
    },
    listOne: {
        marginTop: 15,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        margin: 10,
        textAlign: 'left',
    },
    titleSingle: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    buttonRight: {
        textAlign: 'right',
    },
    content: {
        flexDirection: 'row',
    },
    contentTitle: {
        flexDirection: 'row',
        margin: 10,
    },
    contentListLeft: {
        textAlign: 'left',
        width: '80%',
    },
    contentListRight: {
        textAlign: 'right',
        width: '20%',
    },
    buttonAdd: {
        backgroundColor: SECONDARY_COLOR,
        borderRadius: 15,
        paddingHorizontal: 15,
    },
});
