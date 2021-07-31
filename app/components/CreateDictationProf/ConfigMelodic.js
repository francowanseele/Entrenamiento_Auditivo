import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { ListItem, Icon, Button } from 'react-native-elements';

import ListEmpty from './ListEmpty';

export default function ConfigMelodic(props) {
    const {
        refRBSheet_GiroMelodico,
        giro_melodico_regla,
        notas_inicio,
        notas_fin,
        clave_prioridad,
        nota_base,
        setAdd,
        setGiro_melodico_reglaEdit,
        setNotesStart,
        setClaveEdit,
        refRBSheet_Clave,
        refRBSheet_Tonalidad,
        refRBSheet_NotesStartEnd,
        refRBSheet_Reference,
    } = props;

    const printArray = (arr) => {
        var res = '';
        for (let i = 0; i < arr.length - 1; i++) {
            const elem = arr[i];
            res = res.concat(elem, ' - ');
        }
        if (arr.length > 0) {
            res = res.concat(arr[arr.length - 1]);
        } else {
            res = 'SIN DEFINIR';
        }

        return res;
    };

    const printPrioridadClave = (clave, clavePrio) => {
        var res = null;
        clavePrio.forEach((cp) => {
            if (cp.clave == clave) {
                res = cp.prioridad.toString();
            }
        });

        return res;
    };

    const addGiroMelodicoRegla = async () => {
        await setAdd(true);
        refRBSheet_GiroMelodico.current.open();
    };

    const editGiroMelodicoRegla = async (giro) => {
        await setAdd(false);
        await setGiro_melodico_reglaEdit(giro);
        refRBSheet_GiroMelodico.current.open();
    };

    const editNotasIncio = async () => {
        await setNotesStart(true);
        refRBSheet_NotesStartEnd.current.open();
    };

    const editNotasFin = async () => {
        await setNotesStart(false);
        refRBSheet_NotesStartEnd.current.open();
    };

    const editClave = async (clave) => {
        await setClaveEdit(clave);
        refRBSheet_Clave.current.open();
    };

    const editNotaReferencia = () => {
        refRBSheet_Reference.current.open();
    };

    const editTonalidad = () => {
        refRBSheet_Tonalidad.current.open();
    };

    return (
        <ScrollView>
            {/* Giros melódicos */}
            <View style={styles.contentTitle}>
                <Text style={styles.title}>Giros melódicos</Text>
                <Button
                    style={styles.buttonRight}
                    title="Agregar"
                    onPress={addGiroMelodicoRegla}
                />
            </View>
            {giro_melodico_regla.length == 0 && (
                <ListEmpty
                    text={'Agregue Giros Melódicos presionando "Agregar"'}
                />
            )}
            {giro_melodico_regla.map((giro, i) => (
                <ListItem key={i} bottomDivider>
                    <ListItem.Content style={styles.content}>
                        <View style={styles.contentListLeft}>
                            <ListItem.Title>
                                {printArray(giro.giros_melodicos)}
                            </ListItem.Title>
                            <ListItem.Subtitle>
                                Prioridad {giro.prioridad}
                            </ListItem.Subtitle>
                        </View>
                        <View style={styles.contentListRight}>
                            <Icon
                                type="material-community"
                                name="pencil-outline"
                                onPress={() => editGiroMelodicoRegla(giro)}
                            />
                        </View>
                    </ListItem.Content>
                </ListItem>
            ))}

            {/* Notas inicio y Notas fin */}
            <ListItem
                key={giro_melodico_regla.length}
                style={styles.listOne}
                bottomDivider
            >
                <ListItem.Content style={styles.content}>
                    <View style={styles.contentListLeft}>
                        <ListItem.Title style={styles.titleSingle}>
                            Notas Inicio
                        </ListItem.Title>
                        <ListItem.Subtitle>
                            {printArray(notas_inicio)}
                        </ListItem.Subtitle>
                    </View>
                    <View style={styles.contentListRight}>
                        <Icon
                            type="material-community"
                            name="pencil-outline"
                            onPress={() => editNotasIncio()}
                        />
                    </View>
                </ListItem.Content>
            </ListItem>
            <ListItem key={giro_melodico_regla.length + 1} bottomDivider>
                <ListItem.Content style={styles.content}>
                    <View style={styles.contentListLeft}>
                        <ListItem.Title style={styles.titleSingle}>
                            Notas Fin
                        </ListItem.Title>
                        <ListItem.Subtitle>
                            {printArray(notas_fin)}
                        </ListItem.Subtitle>
                    </View>
                    <View style={styles.contentListRight}>
                        <Icon
                            type="material-community"
                            name="pencil-outline"
                            onPress={() => editNotasFin()}
                        />
                    </View>
                </ListItem.Content>
            </ListItem>

            {/* Claves */}
            <ListItem
                key={giro_melodico_regla.length + 2}
                style={styles.listOne}
                bottomDivider
            >
                <ListItem.Content style={styles.content}>
                    <View style={styles.contentListLeft}>
                        <ListItem.Title style={styles.titleSingle}>
                            Clave de Sol
                        </ListItem.Title>
                        <ListItem.Subtitle>
                            Prioridad{' '}
                            {printPrioridadClave('Sol', clave_prioridad)}
                        </ListItem.Subtitle>
                    </View>
                    <View style={styles.contentListRight}>
                        <Icon
                            type="material-community"
                            name="pencil-outline"
                            onPress={() => editClave('Sol')}
                        />
                    </View>
                </ListItem.Content>
            </ListItem>
            <ListItem key={giro_melodico_regla.length + 3} bottomDivider>
                <ListItem.Content style={styles.content}>
                    <View style={styles.contentListLeft}>
                        <ListItem.Title style={styles.titleSingle}>
                            Clave de Fa
                        </ListItem.Title>
                        <ListItem.Subtitle>
                            Prioridad{' '}
                            {printPrioridadClave('Fa', clave_prioridad)}
                        </ListItem.Subtitle>
                    </View>
                    <View style={styles.contentListRight}>
                        <Icon
                            type="material-community"
                            name="pencil-outline"
                            onPress={() => editClave('Fa')}
                        />
                    </View>
                </ListItem.Content>
            </ListItem>

            {/* Tonalidades (ESCALAS DIATÓNICAS) */}
            <ListItem
                key={giro_melodico_regla.length + 4}
                style={styles.listOne}
                bottomDivider
            >
                <ListItem.Content style={styles.content}>
                    <View style={styles.contentListLeft}>
                        <ListItem.Title style={styles.titleSingle}>
                            Tonalidades
                        </ListItem.Title>
                    </View>
                    <View style={styles.contentListRight}>
                        <Icon
                            type="material-community"
                            name="pencil-outline"
                            onPress={() => editTonalidad()}
                        />
                    </View>
                </ListItem.Content>
            </ListItem>

            {/* Nota de referencia */}
            <ListItem
                key={giro_melodico_regla.length + 5}
                style={styles.listOne}
                bottomDivider
            >
                <ListItem.Content style={styles.content}>
                    <View style={styles.contentListLeft}>
                        <ListItem.Title style={styles.titleSingle}>
                            Nota de Referencia
                        </ListItem.Title>
                        <ListItem.Subtitle>
                            {nota_base ? nota_base : 'SIN DEFINIR'}
                        </ListItem.Subtitle>
                    </View>
                    <View style={styles.contentListRight}>
                        <Icon
                            type="material-community"
                            name="pencil-outline"
                            onPress={() => editNotaReferencia()}
                        />
                    </View>
                </ListItem.Content>
            </ListItem>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
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
