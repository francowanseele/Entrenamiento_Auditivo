import React from 'react';
import { Button } from 'react-native';
import { View, Text } from 'react-native';
import { setStorageUserLogged } from '../../../utils/asyncStorageManagement';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ConfigMelodic from '../../components/CreateDictationProf/ConfigMelodic';
import ConfigRhythmic from '../../components/CreateDictationProf/ConfigRhythmic';

const Tab = createMaterialTopTabNavigator();

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
            {/* <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen name="Home" component={ConfigMelodic} />
                    <Tab.Screen name="Settings" component={ConfigRhythmic} />
                </Tab.Navigator>
            </NavigationContainer> */}
        </View>
    );
}
