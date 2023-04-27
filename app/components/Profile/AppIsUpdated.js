import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking, Platform } from 'react-native';
import { Icon } from 'react-native-elements';

import {
    BACKGROUND_COLOR_RIGHT,
    BACKGROUND_COLOR_WORNING,
    BORDER_COLOR_RIGHT,
    BORDER_COLOR_WORNING,
    TEXT_COLOR_RIGHT,
    TEXT_COLOR_WORNING,
} from '../../../utils/colorPalette';
import { needUpdateApi } from '../../api/versionCheckLocal';

import VersionCheck from 'react-native-version-check';

export default function AppIsUpdated() {
    const [updateAvailable, setUpdateAvailable] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    Promise.all([VersionCheck.needUpdate(), needUpdateApi()]).then((values) => {
        const resVersionCheck = values[0];
        const resVersionCheckLocal = values[1];

        if (
            resVersionCheckLocal &&
            resVersionCheckLocal.ok &&
            resVersionCheckLocal.isNeeded
        ) {
            setShowUpdate(true);
            if (resVersionCheck && resVersionCheck.isNeeded) {
                setUpdateAvailable(true);
            }
        }
    });

    const goToUpdate = () => {
        if (updateAvailable) {
            if (Platform.OS == 'ios') {
                Linking.openURL('https://apps.apple.com/uy/app/ada/id1636156710?l=es');
            } else {
                Linking.openURL('https://play.google.com/store/apps/details?id=com.entrenamiento_auditivo');
            }
        }
    }

    if (!showUpdate) return <></>
    
    return (
        <TouchableOpacity style={styles.contentGral} onPress={goToUpdate}>
            <View key={0} style={styles.card}>
                <View key={0} style={styles.contentCard}>
                    {updateAvailable ? (
                        <>
                            <View key={1} style={styles.content}>
                                <Text style={styles.titleUpdate}>
                                    Tienes una actualización disponible
                                </Text>
                            </View>

                            <View key={3} style={styles.content}>
                                <Text>
                                    Presiona aquí para actualizar
                                </Text>
                            </View>
                        </>
                    ) : (
                        <View key={1} style={styles.content}>
                            <Text style={styles.title}>App Actualizada</Text>
                        </View>
                    )}

                    {/* <View key={2} style={styles.content}>
                        <Text style={styles.title}>Versión disponible: </Text>
                        <Text>1235</Text>
                    </View> */}
                </View>
                {updateAvailable ? (
                    <View style={styles.contentIcon}>
                        <Image
                            source={require('../../../assets/update-available.png')}
                            style={styles.imageStyle}
                        />
                    </View>
                ) : (
                    <View style={styles.contentIcon}>
                        <Image
                            source={require('../../../assets/updated.png')}
                            style={styles.imageStyle}
                        />
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    imageStyle: {
        height: 130,
        // height: Dimensions.get('window').height * 0.45,
        resizeMode: 'contain',
        alignSelf: 'center',
    },

    title: {
        marginTop: 15,
        fontWeight: 'bold',
        fontSize: 14,
    },
    titleUpdate: {
        marginTop: 15,
        fontWeight: 'bold',
        fontSize: 14,
        color: 'darkred',
    },

    content: {
        flexDirection: 'row',
        marginTop: 5,
    },

    card: {
        flex: 1,
        flexDirection: 'row',
        height: 150,
        marginHorizontal: 15,
        marginTop: 10,
        shadowColor: '#000',
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 0 },
    },

    contentCard: {
        width: '50%',
        height: 150,
        backgroundColor: 'white',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
    },
    iconContainerStyle: {
        backgroundColor: BACKGROUND_COLOR_WORNING,
        paddingTop: 10,
        paddingBottom: 10,
        marginRight: 10,
        borderStyle: 'solid',
        borderColor: BORDER_COLOR_WORNING,
        borderWidth: 3,
        borderRadius: 5,
    },
    iconStyle: {
        fontSize: 40,
        color: TEXT_COLOR_WORNING,
    },
    iconContainerStyleRight: {
        backgroundColor: BACKGROUND_COLOR_RIGHT,
        paddingTop: 10,
        paddingBottom: 10,
        marginRight: 10,
        borderStyle: 'solid',
        borderColor: BORDER_COLOR_RIGHT,
        borderWidth: 3,
        borderRadius: 5,
    },
    iconStyleRight: {
        fontSize: 40,
        color: TEXT_COLOR_RIGHT,
    },

    contentIcon: {
        width: '50%',
        height: 150,
        backgroundColor: 'white',
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        justifyContent: 'center',
    },
});
