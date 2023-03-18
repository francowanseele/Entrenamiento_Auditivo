import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreateDictationProf from '../screens/Teacher/CreateDictationProf';
import SummaryCreateDictation from '../screens/Teacher/SummaryCreateDictation';
import ConfigCampoArmonico from '../screens/Teacher/ConfigCampoArmonico';

const Stack = createStackNavigator();

export default function () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="createDictationProf"
                component={CreateDictationProf}
                options={{
                    title: 'Crear dictados',
                    // headerStyle: {
                    //   backgroundColor: TOPSCREENHOME,
                    // },
                    // headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontSize: 20,
                        fontWeight: 'bold',
                    },
                }}
            />
            <Stack.Screen
                name="summaryCreateDictation"
                component={SummaryCreateDictation}
                options={{
                    title: 'Último paso - Crear dictado',
                    headerTitleStyle: {
                        fontSize: 20,
                        fontWeight: 'bold',
                    },
                }}
            />
            <Stack.Screen
                name="configCampoArmonico"
                component={ConfigCampoArmonico}
                options={{
                    title: 'Campos armónicos',
                    headerTitleStyle: {
                        fontSize: 20,
                        fontWeight: 'bold',
                    },
                }}
            />
        </Stack.Navigator>
    );
}
