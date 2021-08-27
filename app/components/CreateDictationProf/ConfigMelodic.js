import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { ListItem, Icon, Button } from 'react-native-elements';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../../utils/colorPalette';
import SwitchSelector from 'react-native-switch-selector';

import AlertValidator from './AlertValidator';
import ListEmpty from './ListEmpty';
import OverlayInfo from './OverlayInfo';

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
        okStartNotes,
        okEndNotes,
        okClefs,
        okTonality,
        okReferenceNote,
        setMayor,
        mayor,
    } = props;

    const [visibleInfo, setVisibleInfo] = useState(false);
    const [textInfo, setTextInfo] = useState('');
    const [titleInfo, setTitleInfo] = useState('');

    const TEXT_INFO_START_NOTES =
        'Para solucionarlo quitar las notas de inicio que no pertenezcan a ningún giro melódico o agregar un giro melódico que contenga a dichas notas.';
    const TITLE_INFO_START_NOTES =
        'Alguna/s nota/s de Inicio no coincide/n con las notas establecidas en los Giros Melódicos';

    const TEXT_INFO_END_NOTES =
        'Para solucionarlo quitar las notas de fin que no pertenezcan a ningún giro melódico o agregar un giro melódico que contenga a dichas notas.';
    const TITLE_INFO_END_NOTES =
        'Alguna/s nota/s de Fin no coincide/n con las notas establecidas en los Giros Melódicos';

    const TEXT_INFO_CLEF =
        'Asigne una probabilidad de al menos valor 1 a una o ambas Claves.';
    const TITLE_INFO_CLEF =
        'Tanto la clave de Sol como Fa tienen probabilidad cero de aparecer en un dictado';

    const TEXT_INFO_TONALITY =
        'Asigne una probabilidad de al menos valor 1 a una o más tonalidades.';
    const TITLE_INFO_TONALITY =
        'Todas las Tonalidades tienen probabilidad cero de aparecer en un dictado';

    const TEXT_INFO_REFERENCE_NOTE =
        'Para solucionarlo setear una nota de referencia que pertenezca a algún giro melódico.';
    const TITLE_INFO_REFERENCE_NOTE =
        'La nota de referencia no coincide con ninguna nota establecida en los Giros Melódicos';

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
        <View>
            <View style={styles.contentSimpleCompuesto}>
                <SwitchSelector
                    initial={0}
                    onPress={(value) => setMayor(value == 'mayor')}
                    textColor={'black'}
                    selectedColor={'white'}
                    buttonColor={SECONDARY_COLOR}
                    borderColor={PRIMARY_COLOR}
                    hasPadding
                    options={[
                        {
                            label: 'Intervalos en mayor',
                            value: 'mayor',
                        },
                        {
                            label: 'Intervalos en menor',
                            value: 'menor',
                        },
                    ]}
                    testID="gender-switch-selector"
                    accessibilityLabel="gender-switch-selector"
                    style={{
                        width: '80%',
                    }}
                />
            </View>
            {/* Giros melódicos */}
            <View style={styles.contentTitle}>
                <Text style={styles.title}>Giros melódicos</Text>
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
                    onPress={addGiroMelodicoRegla}
                />
            </View>
            {giro_melodico_regla.length == 0 && (
                <ListEmpty text={'Agregue Giros Melódicos presionando "+"'} />
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
                        <View style={styles.contentAlert}></View>
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
                    {!okStartNotes ? (
                        <View style={styles.contentAlert}>
                            <AlertValidator
                                setVisibleInfo={setVisibleInfo}
                                setTitleInfo={setTitleInfo}
                                setTextInfo={setTextInfo}
                                textInfo={TEXT_INFO_START_NOTES}
                                titleInfo={TITLE_INFO_START_NOTES}
                            />
                        </View>
                    ) : (
                        <View style={styles.contentAlert}></View>
                    )}

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
                    {!okEndNotes ? (
                        <View style={styles.contentAlert}>
                            <AlertValidator
                                setVisibleInfo={setVisibleInfo}
                                setTitleInfo={setTitleInfo}
                                setTextInfo={setTextInfo}
                                textInfo={TEXT_INFO_END_NOTES}
                                titleInfo={TITLE_INFO_END_NOTES}
                            />
                        </View>
                    ) : (
                        <View style={styles.contentAlert}></View>
                    )}
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
                    {!okClefs ? (
                        <View style={styles.contentAlert}>
                            <AlertValidator
                                setVisibleInfo={setVisibleInfo}
                                setTitleInfo={setTitleInfo}
                                setTextInfo={setTextInfo}
                                textInfo={TEXT_INFO_CLEF}
                                titleInfo={TITLE_INFO_CLEF}
                            />
                        </View>
                    ) : (
                        <View style={styles.contentAlert}></View>
                    )}
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
                    {!okClefs ? (
                        <View style={styles.contentAlert}>
                            <AlertValidator
                                setVisibleInfo={setVisibleInfo}
                                setTitleInfo={setTitleInfo}
                                setTextInfo={setTextInfo}
                                textInfo={TEXT_INFO_CLEF}
                                titleInfo={TITLE_INFO_CLEF}
                            />
                        </View>
                    ) : (
                        <View style={styles.contentAlert}></View>
                    )}
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
                    {!okTonality ? (
                        <View style={styles.contentAlert}>
                            <AlertValidator
                                setVisibleInfo={setVisibleInfo}
                                setTitleInfo={setTitleInfo}
                                setTextInfo={setTextInfo}
                                textInfo={TEXT_INFO_TONALITY}
                                titleInfo={TITLE_INFO_TONALITY}
                            />
                        </View>
                    ) : (
                        <View style={styles.contentAlert}></View>
                    )}
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
                    {!okReferenceNote ? (
                        <View style={styles.contentAlert}>
                            <AlertValidator
                                setVisibleInfo={setVisibleInfo}
                                setTitleInfo={setTitleInfo}
                                setTextInfo={setTextInfo}
                                textInfo={TEXT_INFO_REFERENCE_NOTE}
                                titleInfo={TITLE_INFO_REFERENCE_NOTE}
                            />
                        </View>
                    ) : (
                        <View style={styles.contentAlert}></View>
                    )}
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

            <OverlayInfo
                visible={visibleInfo}
                setVisible={setVisibleInfo}
                title={titleInfo}
                text={textInfo}
            />
        </View>
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
    contentAlert: {
        width: '10%',
    },
    contentTitle: {
        flexDirection: 'row',
        margin: 10,
    },
    contentListLeft: {
        textAlign: 'left',
        width: '70%',
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
    contentSimpleCompuesto: {
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 15,
    },
});
