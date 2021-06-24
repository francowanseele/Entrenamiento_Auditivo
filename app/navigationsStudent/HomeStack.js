import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Student/Home';
import Dictation from '../screens/Student/Dictation';
import Solution from '../screens/Student/Solution';
import ConfigDictation from '../screens/Student/ConfigDictation';

const Stack = createStackNavigator();

export default function () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="home"
                component={Home}
                options={{ title: 'Curso XX' }}
            />
            <Stack.Screen
                name="config_dictation"
                component={ConfigDictation}
                options={{ title: 'Configuración dictado XX' }}
            />
            <Stack.Screen
                name="dictation"
                component={Dictation}
                options={{ title: 'Dictado XX' }}
            />
            <Stack.Screen
                name="solution"
                component={Solution}
                options={{ title: 'Solución' }}
            />
        </Stack.Navigator>
    );
}
