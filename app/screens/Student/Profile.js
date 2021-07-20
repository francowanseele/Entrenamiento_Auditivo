import React from 'react';
import { View, StyleSheet, Button, Text, TouchableOpacity } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {BACKGROUNDHOME, ITEMSHOME, TEXTHOME, TOPSCREENHOME} from '../../styles/styleValues';
import { setStorageUserLogout } from '../../../utils/asyncStorageManagement';

export default function Profile() {
    const logout = async () => {
        // Si se toca el botton se tiene que recargar el emulador para que cierre sesión
        // para hacerlo bien tendría que llegar la función setLogin (de la pantalla Start.js)
        await setStorageUserLogout();
    };

    return (
        <LinearGradient 
        style={styles.lineargradient}
        // Background Linear Gradient
        colors={[BACKGROUNDHOME,BACKGROUNDHOME,ITEMSHOME,ITEMSHOME]}
         >
        <Text>Perfil...</Text>
        <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={logout}
                >
                    <Text style={styles.textLogin}>Cerrar Sesion</Text>
                </TouchableOpacity>
        </View> 
        </LinearGradient>
    );
}
const styles = StyleSheet.create({
    lineargradient:{
        height:'100%'
    },
    buttonContainer:{
        flexDirection:'column',
        padding:5,
        height:'6%',
        width:'50%',
        alignItems:'center',
        alignSelf:'center',
        borderRadius:10
    },
    button:{
        backgroundColor:ITEMSHOME,
        borderRadius:4,
        height:'100%',
        width:'100%',
        alignSelf:'center',
        alignItems:'center'
        
    },
    textLogin:{
        fontSize:20,
        fontWeight:'bold',
        color: TEXTHOME,
        alignSelf:'center'
    },  
});