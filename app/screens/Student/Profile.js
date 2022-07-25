import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import { getParams, setStorageUserLogout } from '../../../utils/asyncStorageManagement';
import { PRIMARY_COLOR } from '../../../utils/colorPalette';
import { softDeleteUserApi } from '../../api/user';

export default function Profile(props) {
    const setLogin = props.setLogin;
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);

    const logout = async () => {
        await setStorageUserLogout();
        await setLogin(false);
    };

    const deleteAccountConfirmation = () => {
        setDeleteConfirmation(!deleteConfirmation);
    }

    const deleteAccount = async () => {
        const { id } = await getParams();
        const deletedResult = await softDeleteUserApi(id);

        if (deletedResult.ok) {
            await logout();
        }
    }

    const toggleOverlay = () => {
        setDeleteConfirmation(!deleteConfirmation);
    };

    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'column-reverse',
                alignContent: 'center',
            }}
        >
            <Button
                buttonStyle={styles.mainButton}
                title="Cerrar sesión"
                onPress={logout}
            />
            <Button
                type="clear"
                title="Eliminar cuenta"
                onPress={deleteAccountConfirmation}
            />

            <Overlay
                isVisible={deleteConfirmation}
                onBackdropPress={toggleOverlay}
                overlayStyle={styles.overlaySelectPicker}
            >
                <View style={styles.content}>
                    <Text style={styles.title}>¿Desea eliminar la cuenta?</Text>
                    <Text style={styles.text}>
                        La cuenta como estudiante será eliminada de forma permanente.
                    </Text>
                </View>
                <Button
                    title="Eliminar"
                    type="clear"
                    onPress={deleteAccount}
                    titleStyle={{color: 'red'}}
                    buttonStyle={{marginTop: 50}}
                />
                <Button
                    title="Cancelar"
                    onPress={toggleOverlay}
                    buttonStyle={styles.mainButton}
                />
            </Overlay>
        </View>
    );
}
const styles = StyleSheet.create({
    mainButton: {
        width: '95%',
        backgroundColor: PRIMARY_COLOR,
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 25,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    text: {
        marginTop: 20,
        fontSize: 17,
    },
});
