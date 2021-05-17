import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Student/Home';
import Module from '../screens/Student/Module';

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
        </Stack.Navigator>
    );
}
