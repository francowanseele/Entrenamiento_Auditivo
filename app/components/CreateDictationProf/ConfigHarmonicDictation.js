import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import {
    ListItem,
    Icon,
    Button,
} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import AlertValidator from './AlertValidator';
import OverlayInfo from './OverlayInfo';
import { PRIMARY_COLOR } from '../../../utils/colorPalette';

export default function ConfigHarmonicDictation(props) {
    const {
        refRBSheet_Tonalidad,
        okTonality,
        camposArmonicosToSend,
        setCamposArmonicosToSend,
        referenceRule,
        setReferenceRule,
        camposArmonicosInicioToSend,
        setCamposArmonicosInicioToSend,
        camposArmonicosFinToSend,
        setCamposArmonicosFinToSend,
        camposArmonicosReferenciaToSend,
        setCamposArmonicosReferenciaToSend,
        dictationLength,
        refRBSheet_PickerDictationLength
    } = props;

    const [visibleInfo, setVisibleInfo] = useState(false);
    const [textInfo, setTextInfo] = useState('');
    const [titleInfo, setTitleInfo] = useState('');

    const navigation = useNavigation();

    const TEXT_INFO_TONALITY =
        'Asigne una probabilidad de al menos valor 1 a una o más tonalidades.';
    const TITLE_INFO_TONALITY =
        'Todas las Tonalidades tienen probabilidad cero de aparecer en un dictado';

    const editTonalidad = () => {
        refRBSheet_Tonalidad.current.open();
    };

    const editCampoArmonico = () => {
        navigation.navigate('configCampoArmonico', { 
            camposArmonicosToSend,
            setCamposArmonicosToSend,
        });
    }

    const editCampoArmonicoInicio = () => {
        navigation.navigate('configCampoArmonico', { 
            camposArmonicosToSend: camposArmonicosInicioToSend,
            setCamposArmonicosToSend: setCamposArmonicosInicioToSend,
        });
    }

    const editCampoArmonicoFin = () => {
        navigation.navigate('configCampoArmonico', { 
            camposArmonicosToSend: camposArmonicosFinToSend,
            setCamposArmonicosToSend: setCamposArmonicosFinToSend,
        });
    }

    const editCampoArmonicoReferencia = () => {
        navigation.navigate('configCampoArmonico', { 
            camposArmonicosToSend: camposArmonicosReferenciaToSend,
            setCamposArmonicosToSend: setCamposArmonicosReferenciaToSend,
        });
    }

    const openSetDictationLength = () => {
        refRBSheet_PickerDictationLength.current.open();
    }

    return (
        <View>
            {/* Nro acordes */}
            <View style={styles.contentTitle}>
                <Text style={styles.title}>Nro. Acordes</Text>
                <Button
                    containerStyle={styles.buttonRight}
                    title={dictationLength}
                    onPress={openSetDictationLength}
                    buttonStyle={{
                        backgroundColor: PRIMARY_COLOR,
                        width: 55,
                        borderRadius: 15,
                    }}
                />
            </View>

            <ListItem key={0} style={styles.listOne} bottomDivider>
                <ListItem.Content style={styles.content}>
                    <View style={styles.contentAlert}></View>
                    <View style={styles.contentListLeft}>
                        <ListItem.Title style={styles.titleSingle}>
                            Campos armónicos
                        </ListItem.Title>
                    </View>
                    <View style={styles.contentListRight}>
                        <Icon
                            type="material-community"
                            name="pencil-outline"
                            onPress={() => editCampoArmonico()}
                        />
                    </View>
                </ListItem.Content>
            </ListItem>

            <ListItem key={1}  bottomDivider>
                <ListItem.Content style={styles.content}>
                    <View style={styles.contentAlert}></View>
                    <View style={styles.contentListLeft}>
                        <ListItem.Title style={styles.titleSingle}>
                            Acordes de inicio
                        </ListItem.Title>
                    </View>
                    <View style={styles.contentListRight}>
                        <Icon
                            type="material-community"
                            name="pencil-outline"
                            onPress={() => editCampoArmonicoInicio()}
                        />
                    </View>
                </ListItem.Content>
            </ListItem>

            <ListItem key={2} bottomDivider>
                <ListItem.Content style={styles.content}>
                    <View style={styles.contentAlert}></View>
                    <View style={styles.contentListLeft}>
                        <ListItem.Title style={styles.titleSingle}>
                            Acordes de fin
                        </ListItem.Title>
                    </View>
                    <View style={styles.contentListRight}>
                        <Icon
                            type="material-community"
                            name="pencil-outline"
                            onPress={() => editCampoArmonicoFin()}
                        />
                    </View>
                </ListItem.Content>
            </ListItem>

            {/* Tonalidades (ESCALAS DIATÓNICAS) */}
            <ListItem key={3} style={styles.listOne} bottomDivider>
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

            {/* Acorde de referencia */}
            <ListItem key={4} style={styles.listOne} bottomDivider>
                <ListItem.Content style={styles.content}>
                    <View style={styles.contentAlert}></View>
                    <View style={styles.contentListLeft}>
                        <ListItem.Title style={styles.titleSingle}>
                            Acorde de referencia
                        </ListItem.Title>
                    </View>
                    <View style={styles.contentListRight}>
                        <Icon
                            type="material-community"
                            name="pencil-outline"
                            onPress={() => editCampoArmonicoReferencia()}
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
    content: {
        flexDirection: 'row',
    },
    contentAlert: {
        width: '10%',
    },
    contentListLeft: {
        textAlign: 'left',
        width: '70%',
    },
    titleSingle: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    contentListRight: {
        textAlign: 'right',
        width: '20%',
    },
    contentTitle: {
        marginTop: 25,
        flexDirection: 'row',
        margin: 10,
    },
    buttonRight: {
        textAlign: 'right',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        margin: 10,
        textAlign: 'left',
    },
});
