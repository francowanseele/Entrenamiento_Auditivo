import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/Student/Profile';

const Stack = createStackNavigator();

export default function () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="profile"
                component={Profile}
                options={{ title: 'Perfil' }}
            />
        </Stack.Navigator>
    );
}
