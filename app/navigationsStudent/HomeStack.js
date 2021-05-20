import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Student/Home';
import Module from '../screens/Student/Module';
import Dictation from '../screens/Student/Dictation';
import Solution from '../screens/Student/Solution';

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
                name="module"
                component={Module}
                options={{ title: 'Módulo XX' }}
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
