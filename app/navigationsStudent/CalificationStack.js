import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Calification from '../screens/Student/Calification';
import { TOPSCREENHOME, TEXTHOME } from '../styles/styleValues';
const Stack = createStackNavigator();

export default function () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="calification"
                component={Calification}
                options={{
                    title: 'Calificaciones' ,
                    headerStyle: {
                      backgroundColor: TOPSCREENHOME,
                    },
                    headerTintColor: TEXTHOME,
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  }} 
            />
        </Stack.Navigator>
    );
}
