import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DictationProf from '../screens/Teacher/DictationProf';
import SummaryCreateDictation from '../screens/Teacher/SummaryCreateDictation';

const Stack = createStackNavigator();

export default function () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="dictationProf"
                component={DictationProf}
                options={{ title: 'Ver configuración dictados' }}
            />
            <Stack.Screen
                name="summaryDictaction"
                component={SummaryCreateDictation}
                options={{ title: 'Ver configuración dictados' }}
            />
        </Stack.Navigator>
    );
}
