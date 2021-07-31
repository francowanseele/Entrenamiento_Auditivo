import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreateDictationProf from '../screens/Teacher/CreateDictationProf';
import SummaryCreateDictation from '../screens/Teacher/SummaryCreateDictation';

const Stack = createStackNavigator();

export default function () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="createDictationProf"
                component={CreateDictationProf}
                options={{ title: 'Crear dictados' }}
            />
            <Stack.Screen
                name="summaryCreateDictation"
                component={SummaryCreateDictation}
                options={{ title: 'Último paso - Crear dictado' }}
            />
        </Stack.Navigator>
    );
}