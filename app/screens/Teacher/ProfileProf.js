import React from 'react';
import { View, Text, Button ,StyleSheet,TouchableOpacity} from 'react-native';
import { setStorageUserLogout } from '../../../utils/asyncStorageManagement';
import { BACKGROUNDHOME, ITEMSHOME, TEXTHOME } from '../../styles/styleValues';


export default function ProfileProf(props) {
    const { setLogin } = props;

    const logout = async () => {
        // Si se toca el botton se tiene que recargar el emulador para que cierre sesión
        // para hacerlo bien tendría que llegar la función setLogin (de la pantalla Start.js)
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
    container:{
        flex:1
    },
    buttonContainer: {
        flexDirection:'column',
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
        marginBottom:20,
    },
    textLogin: {
        fontSize: 20,
        fontWeight: 'bold',
        color: TEXTHOME,
        alignSelf: 'center',
    },
});
