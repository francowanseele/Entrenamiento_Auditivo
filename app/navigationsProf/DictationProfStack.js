import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DictationProf from '../screens/Teacher/DictationProf';

const Stack = createStackNavigator();

export default function () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="dictationProf"
                component={DictationProf}
                options={{ title: 'Ver configuración dictados' }}
            />
        </Stack.Navigator>
    );
}
