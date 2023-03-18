import React, { useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import {
    ListItem,
    Icon,
    Switch,
    CheckBox,
    Button,
} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import AlertValidator from './AlertValidator';
import OverlayInfo from './OverlayInfo';

export default function ConfigJazzChords(props) {
    const { refRBSheet_Tonalidad, okTonality, camposArmonicosToSend, setCamposArmonicosToSend } = props;

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

    return (
        <View>
            <ListItem
                key={0}
                style={styles.listOne}
                bottomDivider
            >
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

            {/* Tonalidades (ESCALAS DIATÓNICAS) */}
            <ListItem
                key={1}
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
});
