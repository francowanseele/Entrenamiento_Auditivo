import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Linking, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { PRIMARY_COLOR, QUARTER_COLOR } from '../../utils/colorPalette';

export default function MustToUpdate() {
    const updateApp = () => {
        if (Platform.OS == 'ios') {
            Linking.openURL('https://apps.apple.com/uy/app/ada/id1636156710?l=es');
        } else {
            Linking.openURL('https://play.google.com/store/apps/details?id=com.entrenamiento_auditivo');
        }
    }

    return (
        <View style={{ marginTop: 70, marginHorizontal: 10 }}>
            <Text style={styles.primarySearchTitle}>Actualización</Text>
            <Image
                source={require('../../assets/need_download.png')}
                style={styles.imageStyle}
            />
            <Text style={styles.primarySearchText}>
                Es necesario actualizar ADA Entrenamiento Auditivo
            </Text>
            <Text style={styles.secondarySearchText}>
                ¡¡ MUCHAS GRACIAS !!
            </Text>
            <Button
                buttonStyle={styles.buttonUpdate}
                title={'Actualizar'}
                onPress={updateApp}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    buttonUpdate: {
        marginTop: 40,
        backgroundColor: PRIMARY_COLOR,
    },
    imageStyle: {
        height: Dimensions.get('window').height * 0.45,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    primarySearchTitle: {
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
        fontSize: 26,
        alignSelf: 'center',
        textAlign: "center",
    },
    primarySearchText: {
        color: PRIMARY_COLOR,
        fontSize: 20,
        alignSelf: 'center',
        textAlign: "center",
    },
    secondarySearchText: {
        color: QUARTER_COLOR,
        fontSize: 16,
        marginTop: 10,
        alignSelf: 'center',
        textAlign: "center",
    },
});
