import React, { useState, useRef } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import {
    ListItem,
    Icon,
    Switch,
    CheckBox,
    Button,
} from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';

import BottomSheetPicker from './BottomSheetPicker';
import ListEmpty from './ListEmpty';

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
        <ScrollView>
            <View style={styles.contentSimpleCompuesto}>
                <CheckBox
                    center
                    title="Dictado simple"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={simple}
                    containerStyle={styles.containerSimplecompuesto}
                    onPress={() => setSimple(true)}
                />
                <CheckBox
                    center
                    title="Dictado compuesto"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={!simple}
                    containerStyle={styles.containerSimplecompuesto}
                    onPress={() => setSimple(false)}
                />
            </View>

            {/* Compás */}
            <View style={styles.contentTitle}>
                <Text style={styles.title}>Compás</Text>
                <Button
                    style={styles.buttonRight}
                    title="Agregar"
                    onPress={() => {
                        addCompas();
                    }}
                />
            </View>
            {cantCompasRegla(compas_regla, simple) == 0 && (
                <ListEmpty text={'Agregue Compases presionando "Agregar"'} />
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
                    style={styles.buttonRight}
                    title="Agregar"
                    onPress={() => {
                        addCelulaRitmica();
                    }}
                />
            </View>
            {cantCelulaRitmica(celula_ritmica_regla, simple) == 0 && (
                <ListEmpty
                    text={'Agregue Células Rítmicas presionando "Agregar"'}
                />
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
                            BPM
                        </ListItem.Title>
                        <ListItem.Subtitle>
                            Nota negra {BPM} bpm
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
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    contentSimpleCompuesto: {
        flexDirection: 'row',
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
});
