import React from 'react';
import { View, StyleSheet, Button, Text, TouchableOpacity } from 'react-native';
import { BACKGROUNDHOME, ITEMSHOME, TEXTHOME } from '../../styles/styleValues';
import { setStorageUserLogout } from '../../../utils/asyncStorageManagement';

export default function Profile(props) {
    const setLogin = props.setLogin;
    const logout = async () => {
        await setStorageUserLogout();
        await setLogin(false);
    };

    return (
            <View style={{flex:1, flexDirection:'column-reverse'}}>
                <TouchableOpacity style={styles.button} onPress={logout}>
                    <Text style={styles.textLogin}>Cerrar Sesion</Text>
                </TouchableOpacity>
            </View>
    );
}
const styles = StyleSheet.create({
    buttonContainer: {
        padding: 5,
        height: '6%',
        width: '50%',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
    },
    button: {
        flexDirection:"column-reverse",
        borderRadius: 4,
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    textLogin: {
        flexDirection:"column-reverse",
        fontSize: 20,
        fontWeight: 'bold',
        color: TEXTHOME,
        alignSelf: 'center',
        marginBottom:20,
    },
});
