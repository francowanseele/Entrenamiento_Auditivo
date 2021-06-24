import React from 'react';
import { Button } from 'react-native';
import { View, Text } from 'react-native';
import { setStorageUserLogged } from '../../../utils/asyncStorageManagement';

export default function UserGuest(props) {
    const { setLogin, setIsStudent } = props;
    const loginStudent = async () => {
        await setStorageUserLogged(
            'franco.wanseele@gmail.com',
            '1',
            '60ca130df62dc319f92173d6',
            '60c524e76b07c02c7250abba'
        );

        setIsStudent(true);
        setLogin(true);
    };

    const loginDoc = async () => {
        await setStorageUserLogged(
            'franco.wanseele@gmail.com',
            '0',
            'DEFINIR',
            '60c524e76b07c02c7250abba'
        );

        setIsStudent(false);
        setLogin(true);
    };

    return (
        <View>
            <Button title="boton que no hace nada" />
            <Button title="Entrar como estudiante" onPress={loginStudent} />
            <Button title="Entrar como docente" onPress={loginDoc} />
        </View>
    );
}
