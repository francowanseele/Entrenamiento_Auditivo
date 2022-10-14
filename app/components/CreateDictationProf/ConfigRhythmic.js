import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import {
    ListItem,
    Icon,
    Switch,
    CheckBox,
    Button,
} from 'react-native-elements';
import SwitchSelector from 'react-native-switch-selector';
import SelectPicker from 'react-native-form-select-picker';

import ListEmpty from './ListEmpty';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../../utils/colorPalette';
import { getStorageIsAdmin } from '../../../utils/asyncStorageManagement';
// import getImagenFromB64String from '../CreateDictationProf/BottomSheetCelulaRitmica'

 const getImagenFromB64String = (imagen)=>{
    return (
        <Image style={{width:50,height:50, resizeMode: 'contain'}} source={{uri: `data:image/gif;base64,${imagen}`}} />
    )
}

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
        setEditLigaduraFirstCR,
        refRBSheet_Picker,
        refRBSheet_Compas,
        refRBSheet_CelulaRitmica,
        refRBSheet_CreateRitmica,
        refRBSheet_BPM,
        refRBSheet_Ligaduras,
    } = props;

    // BORRAR
    const [selected, setSelected] = useState();
    const options = [
        'Apple',
        'Banana',
        'Orange',
        'a',
        'b',
        'c',
        'd',
        'cd',
        'sdf',
    ];

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        getStorageIsAdmin().then((admin) => {
            setIsAdmin(admin);
        });
    }, []);
    

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
    const createCelulaRitmica = async () => {
        refRBSheet_CreateRitmica.current.open();
    };

    const setLigaduras = async (celula) => {
        await setEditLigaduraFirstCR({
            id: celula.id,
            figuras: celula.celula_ritmica,
            imagen: celula.imagen
        });
        refRBSheet_Ligaduras.current.open();
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
        <View>
            <View style={styles.contentSimpleCompuesto}>
                <SwitchSelector
                    value={simple ? 0 : 1}
                    initial={0}
                    onPress={(value) => setSimple(value == 's')}
                    textColor={'black'}
                    selectedColor={'white'}
                    buttonColor={SECONDARY_COLOR}
                    borderColor={PRIMARY_COLOR}
                    hasPadding
                    options={[
                        {
                            label: 'Compás Simple',
                            value: 's',
                        },
                        {
                            label: 'Compás Compuesto',
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
                    containerStyle={styles.buttonRight}
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
                    containerStyle={styles.buttonRight}
                    title={nro_compases}
                    onPress={openSetNroCompas}
                    buttonStyle={{
                        backgroundColor: PRIMARY_COLOR,
                        width: 55,
                        borderRadius: 15,
                    }}
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
                    containerStyle={styles.buttonRight}
                    buttonStyle={styles.buttonAdd}
                    onPress={() => {
                        addCelulaRitmica();
                    }}
                />
                {isAdmin ? (
                    <Button
                        icon={
                            <Icon
                                type="material-community"
                                name="pencil-outline"
                                color="white"
                            />
                        }
                        containerStyle={styles.buttonRight}
                        buttonStyle={styles.buttonAdd}
                        onPress={() => {
                            createCelulaRitmica();
                        }}
                    />
                ) : (
                    <></>
                )}
                
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
                            <View style={styles.contentListCRLeft}>
                                <ListItem.Title>
                                    {/* {getFigure(celula.celula_ritmica)} */}
                                        { getImagenFromB64String(celula.imagen)}
                                </ListItem.Title>
                                <ListItem.Subtitle>
                                    Prioridad {celula.prioridad}
                                </ListItem.Subtitle>
                            </View>
                            <View style={styles.contentListCRRight}>
                                <TouchableOpacity
                                    style={styles.slursContainer}
                                    onPress={() => {
                                        setLigaduras(celula);
                                    }}
                                >
                                    <Image
                                        style={styles.slursImage}
                                        source={require('../../../assets/slurs.png')}
                                    />
                                </TouchableOpacity>
                                <Icon
                                    style={styles.iconEdit}
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

            {/* BORRAR */}
            <SelectPicker
                onValueChange={(value) => {
                    // Do anything you want with the value.
                    // For example, save in state.
                    setSelected(value);
                }}
                selected={selected}
            >
                {Object.values(options).map((val, index) => (
                    <SelectPicker.Item label={val} value={val} key={index} />
                ))}
            </SelectPicker>
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
    contentListCRLeft: {
        textAlign: 'left',
        width: '75%',
    },
    contentListLeft: {
        textAlign: 'left',
        width: '80%',
    },
    contentListCRRight: {
        textAlign: 'right',
        width: '25%',
        flexDirection: 'row',
    },
    contentListRight: {
        textAlign: 'right',
        width: '20%',
    },
    buttonAdd: {
        backgroundColor: SECONDARY_COLOR,
        borderRadius: 15,
        paddingHorizontal: 15,
        margin:4
    },
    slursContainer: {
        width: 30,
        height: 30,
        textAlign: 'left',
        borderWidth: 1,
        borderRadius: 3,
        padding: 2,
    },
    slursImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
    },
    iconEdit: {
        textAlign: 'right',
        marginLeft: '20%',
    },
});
