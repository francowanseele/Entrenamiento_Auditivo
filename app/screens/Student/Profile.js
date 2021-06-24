import React from 'react';
import { View, Text, Button } from 'react-native';

import { setStorageUserLogout } from '../../../utils/asyncStorageManagement';

export default function Profile() {
    const logout = async () => {
        // Si se toca el botton se tiene que recargar el emulador para que cierre sesión
        // para hacerlo bien tendría que llegar la función setLogin (de la pantalla Start.js)
        await setStorageUserLogout();
    };

    return (
        <View>
            <Text>Perfil...</Text>
            <Button title="Cerrar sesión" onPress={logout} />
        </View>
    );
}
